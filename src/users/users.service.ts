import { Injectable } from '@nestjs/common';
import { GetUserDto } from './dto';
import { UserEntity } from './entities';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { SortingParam } from 'src/decorators';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    filter?: GetUserDto,
    sort?: SortingParam,
  ): Promise<UserEntity[]> {
    const query: Prisma.UserWhereInput = {
      ...filter,
      ...(filter.email && {
        email: { contains: filter.email, mode: 'insensitive' },
      }),
      ...(filter.firstName && {
        firstName: { contains: filter.firstName, mode: 'insensitive' },
      }),
      ...(filter.lastName && {
        lastName: { contains: filter.lastName, mode: 'insensitive' },
      }),
    };

    const orderBy: Prisma.UserOrderByWithRelationInput = {
      ...(sort ? { [sort.property]: sort.direction } : { createdAt: 'desc' }),
    };

    const users = await this.prisma.user.findMany({
      where: query,
      orderBy,
    });

    return users;
  }
}
