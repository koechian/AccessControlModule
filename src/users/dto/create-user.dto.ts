import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';

enum Role {
  'Admin',
  'Project Manager',
  'Engineer',
}

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;
  lastName: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('KE')
  phonenumber: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role, {
    message: 'Role must be one of Admin, Engineer or Project Manager',
  })
  role: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  KRAPin: string;
}
