import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  FirstName: String;
  LastName: String;

  @IsEmail()
  Email: String;

  @IsNotEmpty()
  @IsPhoneNumber('KE')
  PhoneNumber: Number;

  @IsNotEmpty()
  @IsAlphanumeric()
  KRAPin: String;
}
