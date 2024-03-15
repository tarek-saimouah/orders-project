import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { GetOrderDto } from './dto';
import { SortingParam } from 'src/decorators';
import { OrderEntity } from './entities';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    filter?: GetOrderDto,
    sort?: SortingParam,
  ): Promise<OrderEntity[]> {
    const query: Prisma.OrderWhereInput = {
      ...filter,
    };

    const orderBy: Prisma.OrderOrderByWithRelationInput = {
      ...(sort ? { [sort.property]: sort.direction } : { createdAt: 'desc' }),
    };

    const orders = await this.prisma.order.findMany({
      where: query,
      orderBy,
    });

    return orders.map((order) => {
      return { ...order, totalFees: Number(order.totalFees) };
    });
  }
}
