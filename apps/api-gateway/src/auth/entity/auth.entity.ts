import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty({
    description: 'JWT access token issued after successful login',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Sk3-3gg2j14BvgjxoSoGsKnLv_0noFM2Q-MC8lU5QdU',
    format: 'jwt',
  })
  accessToken: string;
}
