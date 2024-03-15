import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusEnum } from 'src/enums';

export class OrderEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  productId: string;

  @ApiProperty({ enum: OrderStatusEnum })
  status: string;

  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: Number })
  totalFees: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  approvedAt?: Date;

  @ApiProperty({ type: Date, nullable: true })
  rejectedAt?: Date;

  @ApiProperty({ type: Date, nullable: true })
  deliveredAt?: Date;
}
