import { Controller, Get, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  ApiNotAcceptableResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderEntity } from './entities';
import { ApiSortingQuery, SortingParam, SortingParams } from 'src/decorators';
import { GetOrderDto } from './dto';

@ApiNotAcceptableResponse()
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @ApiOperation({
    summary: 'Get all orders',
  })
  @ApiResponse({ type: [OrderEntity] })
  @ApiSortingQuery([
    'userId',
    'productId',
    'status',
    'totalFees',
    'createdAt',
    'updatedAt',
    'approvedAt',
    'rejectedAt',
    'deliveredAt',
  ])
  @Get()
  findAll(
    @Query() filter?: GetOrderDto,
    @SortingParams([
      'userId',
      'productId',
      'status',
      'totalFees',
      'createdAt',
      'updatedAt',
      'approvedAt',
      'rejectedAt',
      'deliveredAt',
    ])
    sort?: SortingParam,
  ) {
    return this.ordersService.findAll(filter, sort);
  }
}
