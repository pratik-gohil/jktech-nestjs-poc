import { ApiProperty } from '@nestjs/swagger';
import { User } from 'generated/prisma';
import { Exclude } from 'class-transformer';

export class UserEntity implements Partial<User> {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 'd3c8f7d2-1b55-46ad-bef6-dc5021234567',
  })
  id: string;

  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: '2025-04-19T14:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    example: '2025-04-19T14:45:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Name of the user',
    example: 'Pratik Gohil',
  })
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({
    description: 'ID of the user\'s role (e.g., Admin, Editor, Viewer)',
    example: 'd3c8f7d2-1b55-46ad-bef6-dc5021234567',
  })
  roleId: string;
}
