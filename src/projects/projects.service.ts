import { HttpException, Injectable } from '@nestjs/common';
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

  // Returns all projects from the Projects Table
  async findAll() {
    // Implement Alphabetical Sorting
    return this.db.project.findMany();
  }

  //   Finds and returns one identified project by id
  async findOne(id: Number) {
    return this.db.project.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  // Finds all projects that have been assigned to a specific person
  async findAllAssigned(userid: string) {
    return this.db.project.findMany({
      where: {
        isAssigned: true,
        asignee: userid,
      },
    });
  }

  //   Creates a new project from the Data Object
  async createProject(projectDetails: CreateProjectDto) {
    const project = await this.db.project.create({
      data: projectDetails,
    });

    return project;
  }

  //   Updates the defined project
  async updateProject(body: ProjectDefinition) {
    // Add the details to be updated as an Object/Body

    console.log(body);

    const res = await this.db.project.update({
      where: {
        projectId: body.projectId,
      },

      data: body,
    });

    return res;
  }

  //   Updates the defined project if the user is assigned to it
  async updateAssignedProject(id: Number, userid: string, body) {
    // Add the details to be updated as an Object/Body

    const res = await this.db.project.update({
      where: {
        asignee: userid,
        id: Number(id),
      },
      data: body,
    });

    return res;
  }

  //   Deletes the defined project from the database
  async deleteProject(id: string) {
    return this.db.project.delete({
      where: {
        projectId: id,
      },
    });
  }

  //   Deletes the defined project from the database
  async deleteAssignedProject(id: string, userid: string) {
    return this.db.project.delete({
      where: {
        projectId: id,
        asignee: userid,
      },
    });
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

  // Deletes multiple projects from the database at a go
  async deleteAssignedProjects(userid: string, ids: string[]) {
    // return `Projects with ids ${ids} have been deleted`;

    ids.forEach((id) => {
      try {
        this.db.project.delete({
          where: {
            id: Number(id),
            asignee: userid,
          },
        });
      } catch (e) {
        console.log(e);
        throw new HttpException('database error', 404);
      }
    });
  }
}
