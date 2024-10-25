import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  // Returns all projects from the Projects Table
  async findAll() {
    // Implement Alphabetical Sorting
  }

  //   Finds and returns one identified project
  async findOne(id: Number) {}

  //   Creates a new project from the Data Object
  async createProject(projectDetails: CreateProjectDto) {}

  //   Updates the defined project
  async updateProject(id: Number) {
    // Add the details to be updated as an Object/Body
  }

  //   Deletes the defined project from the database
  async deleteProject(id: Number) {
    return `Projects with id ${id} has been deleted`;
  }

  // Deletes multiple projects from the database at a go
  async deleteProjects(ids: Number[]) {
    return `Projects with ids ${ids} have been deleted`;
  }
}
