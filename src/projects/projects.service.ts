import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

type ProjectDefinition = {
  projectId: string;
  projectName?: string;
  description?: string;
  clientName?: string;
  isAssigned?: boolean;
  asignee?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
};

@Injectable()
export class ProjectsService {
  constructor(private db: PrismaService) {}

  // Returns all projects with assigned user details if available
  async findAll() {
    return this.db.project.findMany({
      include: {
        users: {
          select: {
            user: {
              select: {
                firstname: true,
                lastname: true,
              },
            },
          },
        },
      },
      orderBy: {
        projectName: 'asc',
      },
    });
  }

  // Finds and returns one identified project by id with assigned user details if available
  async findOne(id: number) {
    return this.db.project.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        users: {
          select: {
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                username: true,
              },
            },
          },
        },
      },
    });
  }

  // Finds all projects that have been assigned to a specific person
  async findAllAssigned(user_id: string) {
    try {
      // Find all projects assigned to the user by querying the ProjectUserLink table
      const projects = await this.db.projectUserLink.findMany({
        where: {
          userID: user_id['userid'],
        },
        include: {
          project: true,
        },
      });

      // Map and return only the relevant project details
      const assignedProjects = projects.map((link) => link.project);

      return assignedProjects;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  //   Creates a new project from the Data Object
  async createProject(projectDetails: CreateProjectDto) {
    try {
      const project = await this.db.project.create({
        data: projectDetails,
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  // Updates the defined project and optionally assigns it to a user
  async updateProject(body: ProjectDefinition) {
    const { projectId, asignee, ...projectData } = body; // Extract projectId and asignee from body

    // Update the project with the rest of the provided fields
    const projectUpdate = await this.db.project.update({
      where: {
        projectId: projectId,
      },
      data: projectData,
    });

    // If a userid is provided, assign the user to the project using ProjectUserLink
    if (asignee) {
      await this.db.projectUserLink.upsert({
        where: {
          userID_projectID: {
            userID: asignee,
            projectID: projectUpdate.projectId,
          },
        },
        create: {
          userID: asignee,
          projectID: projectUpdate.projectId,
        },
        update: {
          assignedAt: new Date(), // Update the timestamp of assignment if reassigning
        },
      });
    }

    return projectUpdate;
  }

  //   Updates the defined project if the user is assigned to it
  async updateAssignedProject(id: Number, userid: string, body) {
    // Add the details to be updated as an Object/Body

    const res = await this.db.project.update({
      where: {
        id: Number(id),
      },
      data: body,
    });

    return res;
  }

  // Deletes the defined project from the database, including any assignments
  async deleteProject(projectId: number) {
    // First, delete any entries in ProjectUserLink for this project
    await this.db.projectUserLink.deleteMany({
      where: {
        project: {
          id: Number(projectId),
        },
      },
    });

    // Then, delete the project itself
    return this.db.project.delete({
      where: {
        id: Number(projectId),
      },
    });
  }

  // Deletes the defined project if the user is assigned to it
  async deleteAssignedProject(projectId: string, userId: string) {
    // Check if the user is assigned to the project via ProjectUserLink
    const isAssigned = await this.db.projectUserLink.findFirst({
      where: {
        project: {
          projectId: projectId,
        },
        user: {
          userid: userId,
        },
      },
    });

    // If the user is not assigned to the project, return an error or null
    if (!isAssigned) {
      throw new HttpException(
        'User is not assigned to this project.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Delete the project since the user is assigned
    const deletedProject = await this.db.project.delete({
      where: {
        projectId: projectId,
      },
    });

    return deletedProject;
  }

  // Deletes multiple projects from the database at a go
  async deleteProjects(ids: string[]) {
    // return `Projects with ids ${ids} have been deleted`;

    ids.forEach((id) => {
      try {
        this.db.project.delete({
          where: {
            id: Number(id),
          },
        });
      } catch (e) {
        console.log(e);
        throw new HttpException('database error', 404);
      }
    });
  }

  // // Deletes multiple projects from the database at a go
  // async deleteAssignedProjects(userid: string, ids: string[]) {
  //   // return `Projects with ids ${ids} have been deleted`;

  //   ids.forEach((id) => {
  //     try {
  //       this.db.project.delete({
  //         where: {
  //           id: Number(id),
  //           asignee: userid,
  //         },
  //       });
  //     } catch (e) {
  //       console.log(e);
  //       throw new HttpException('database error', 404);
  //     }
  //   });
  // }
}
