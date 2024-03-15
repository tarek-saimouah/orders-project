import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiNotAcceptableResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductEntity } from './entities';
import { GetProductDto } from './dto';
import { ApiSortingQuery, SortingParam, SortingParams } from 'src/decorators';
import { ProductsService } from './products.service';

@ApiNotAcceptableResponse()
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: 'Get all products',
  })
  @ApiResponse({ type: [ProductEntity] })
  @ApiSortingQuery(['name', 'price', 'createdAt', 'updatedAt'])
  @Get()
  findAll(
    @Query() filter?: GetProductDto,
    @SortingParams(['name', 'price', 'createdAt', 'updatedAt'])
    sort?: SortingParam,
  ) {
    return this.productsService.findAll(filter, sort);
  }
}
