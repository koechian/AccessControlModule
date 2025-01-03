import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
  Response,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Role } from 'src/users/guards/roles/roles.decorator';
import { RolesGuard } from 'src/users/guards/roles/roles.guard';
import { UserGuard } from 'src/users/guards/guards.guard';

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

@Controller('projects')
@UseGuards(RolesGuard)
@UseGuards(UserGuard)
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  // open to:[Project Manager, Admin]
  @Role('Admin')
  @Get('getProjects')
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    // Implement Alphabetical Sorting
    return this.projectsService.findAll();
  }

  // open to Admin Only
  @Role('Admin')
  @Get('getProject/:id')
  findOne(@Param() id: String) {
    return this.projectsService.findOne(id['id']);
  }

  // Open to Project Manager
  @Role('Project Manager', 'Admin', 'Engineer')
  @Get('assigned')
  async findAllAssigned(@Response() res: any, @Body() userid: string) {
    const data = await this.projectsService.findAllAssigned(userid);

    if (data) {
      return res.status(200).json(data);
    }
    throw new HttpException('Error getting Projects', HttpStatus.BAD_GATEWAY);
  }

  // Edits any Project
  // open to:[Admin]
  @Role('Admin', 'Project Manager')
  @Put('updateProject')
  updateProject(@Response() res: any, @Body() body: ProjectDefinition) {
    // Add the details to be updated as an Object/Body
    try {
      this.projectsService.updateProject(body);
      return res.status(200).json({ message: 'Project Updated' });
    } catch (e) {
      throw new HttpException(
        'Error updating the project',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  // open to: [Admin, Project Manager]
  @Role('Admin', 'Project Manager')
  @Put('updateAssignedProject')
  updateAssignedProject(
    @Param() id: Number,
    @Param() userid: string,
    @Body() body: ProjectDefinition,
  ) {
    // Update the project from the Database where the user is assigned
    // Add the details to be updated as an Object/Body
    return this.projectsService.updateAssignedProject(
      Number(id['id']),
      userid,
      body,
    );
  }

  // Only admins
  @Role('Admin')
  @Post('createProject')
  createProject(
    @Response() res: any,
    @Body(ValidationPipe) body: CreateProjectDto,
  ) {
    // Create a project and add to the database
    const result = this.projectsService.createProject(body);
    if (result) return res.status(200).json({ message: 'Project created' });

    throw new HttpException(
      'Error creating the project',
      HttpStatus.BAD_GATEWAY,
    );
  }

  // Only Admins
  @Role('Admin')
  @Delete('deleteProject/:id')
  async deleteProject(@Response() res: any, @Param() id: number) {
    try {
      this.projectsService.deleteProject(id['id']);
      return res.status(200).json({ message: 'Project Deleted' });
    } catch (e) {
      throw new HttpException(
        'Error updating the project',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  // Only Admins and Project Managers
  @Role('Admin')
  @Role('Project Manager')
  @Delete('deleteProject/:id')
  deleteAssignedProject(@Param() id: string, @Param() userid: string) {
    return this.projectsService.deleteAssignedProject(String(id['id']), userid);
  }

  // Delete multiple projects at once
  // @Role('Admin ')
  // @Delete('deleteProjecs/:ids')
  // deleteProjects(@Body() ids: string[]) {
  //   // delete a list of ids

  //   return this.projectsService.deleteProjects(ids);
  // }

  // Delete multiple Projects at once if they are assigned to you
  // @Role('Admin ')
  // @Delete('deleteProjecs/:ids')
  // deleteAssignedProjects(@Param() userid: string, @Body() ids: string[]) {
  //   return this.projectsService.deleteAssignedProjects(userid, ids);
  // }
}
