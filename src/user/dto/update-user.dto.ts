import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'The updated full name of the user',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'The updated email address of the user',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'password123',
    description: 'The updated password of the user (minimum 6 characters)',
  })
  @IsOptional()
  @MinLength(6)
  password?: string;
}
