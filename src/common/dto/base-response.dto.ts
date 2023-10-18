import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiProperty({
    description: '고유 ID',
    type: 'integer',
    minimum: 1,
  })
  id: number;

  @ApiProperty({
    description: '생성일자',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일자',
  })
  updatedAt: Date;
}
