import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatusEnum } from 'src/enums';

export class GetOrderDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  id: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  userId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  productId: string;

  @ApiPropertyOptional({ enum: OrderStatusEnum })
  @IsEnum(OrderStatusEnum)
  @IsOptional()
  status: OrderStatusEnum;
}
