import { Body, Controller, Get, Param, Put } from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  @Get('listProjects')
  findAll() {
    return 'All Projects';
  }

  @Get(':id')
  findOne(@Param() id: String) {
    console.log(id);
    return 'Found one';
  }
  @Put(':id')
  updateProject(@Param() id: String, @Body() body: any) {
    // Update the project from the Database
    console.log(id);
    return 'Found one';
  }
}
