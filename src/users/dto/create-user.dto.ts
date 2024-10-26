import {
  IsAlphanumeric,
  IsEmail,
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
  firstname: string;
  lastname: String;

  @IsEmail()
  email: String;

  @IsNotEmpty()
  @IsPhoneNumber('KE')
  phonenumber: Number;

  password: String;

  role: Role;

  @IsNotEmpty()
  @IsAlphanumeric()
  kraPin: String;
}
