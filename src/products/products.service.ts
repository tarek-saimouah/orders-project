import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { GetProductDto } from './dto';
import { SortingParam } from 'src/decorators';
import { ProductEntity } from './entities';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    filter?: GetProductDto,
    sort?: SortingParam,
  ): Promise<ProductEntity[]> {
    const query: Prisma.ProductWhereInput = {
      ...filter,
      ...(filter.name && {
        name: { contains: filter.name, mode: 'insensitive' },
      }),
      ...(filter.description && {
        description: { contains: filter.description, mode: 'insensitive' },
      }),
    };

    const orderBy: Prisma.ProductOrderByWithRelationInput = {
      ...(sort ? { [sort.property]: sort.direction } : { createdAt: 'desc' }),
    };

    const products = await this.prisma.product.findMany({
      where: query,
      orderBy,
    });

    return products.map((product) => {
      return { ...product, price: Number(product.price) };
    });
  }
}
