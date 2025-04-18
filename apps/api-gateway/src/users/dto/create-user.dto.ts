import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Pratik Gohil',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Valid email address of the user',
    example: 'user@example.com',
    format: 'email',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'User password (min 6 characters)',
    example: 'password123',
    minLength: 6,
  })
  password: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'UUID of the user role (e.g., Admin, Editor, Viewer)',
    example: 'd3c8f7d2-1b55-46ad-bef6-dc5021234567',
    format: 'uuid',
  })
  roleId: string;
}