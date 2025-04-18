import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from 'generated/prisma';
import { Exclude } from 'class-transformer';

export class UserEntity implements Partial<User> {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  roleId: string;
}
