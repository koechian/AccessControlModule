import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  @Get('listProjects')
  findAll() {
    return 'All Projects';
  }

  @Get(':id')
  findOne(@Param() id: String) {
    console.log(id);
    return `Found one of id ${id['id']}`;
  }
  @Put(':id')
  updateProject(@Param() id: String, @Body() body: any) {
    // Update the project from the Database
    console.log(id);
    return 'Updated Project Details';
  }

  @Post(':id')
  createProject(@Body() body: JSON) {
    // Create a project and add to the database

    console.log(body);
    return 'Project Created';
  }

  @Delete(':id')
  deleteProject(@Param() id: String) {
    // Create a project and add to the database

    return `Project ${id['id']} has been deleted`;
  }
}
