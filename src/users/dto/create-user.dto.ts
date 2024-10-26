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
  FirstName: String;
  LastName: String;

  @IsEmail()
  Email: String;

  @IsNotEmpty()
  @IsPhoneNumber('KE')
  PhoneNumber: Number;

  Role: Role;

  @IsNotEmpty()
  @IsAlphanumeric()
  KRAPin: String;
}
