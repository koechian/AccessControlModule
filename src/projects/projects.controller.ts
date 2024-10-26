import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get('getProjects')
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    // Implement Alphabetical Sorting
    return this.projectsService.findAll();
  }

  @Get('getProject/:id')
  findOne(@Param() id: String) {
    console.log(id);
    return this.projectsService.findOne(id['id']);
  }
  @Put('updateProject/:id')
  updateProject(@Param() id: Number, @Body() body: any) {
    // Update the project from the Database

    // Add the details to be updated as an Object/Body
    return this.projectsService.updateProject(Number(id['id']));
  }

  @Post('createProject')
  createProject(@Body(ValidationPipe) body: CreateProjectDto) {
    // Create a project and add to the database

    console.log(body);
    return this.projectsService.createProject(body);
  }

  @Delete('deleteProject/:id')
  deleteProject(@Param() id: Number) {
    // Delete a project

    return this.projectsService.deleteProject(Number(id['id']));
  }

  @Delete('deleteProjecs/:ids')
  deleteProjects(@Param() ids: Number[]) {
    // delete a list of ids

    return this.projectsService.deleteProjects(ids);
  }
}
