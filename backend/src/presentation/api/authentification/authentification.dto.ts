import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserResponse {
  @ApiProperty({
    description: 'The id of the user',
    example: '1',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class LoginUserResponse {
  @ApiProperty({
    description: 'The id of the user',
    example: '1',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The access token of the user',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @IsNotEmpty()
  @IsString()
  access_token: string;
}
export class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'The lastname of the user',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'The firstname of the user',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The email confirmation of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  emailConfirmation: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The password confirmation of the user',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  passwordConfirmation: string;
}
