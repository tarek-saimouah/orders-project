import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiNotAcceptableResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities';
import { GetUserDto } from './dto';
import { ApiSortingQuery, SortingParam, SortingParams } from 'src/decorators';

@ApiNotAcceptableResponse()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({ type: [UserEntity] })
  @ApiSortingQuery([
    'firstName',
    'lastName',
    'birthDate',
    'createdAt',
    'updatedAt',
  ])
  @Get()
  findAll(
    @Query() filter?: GetUserDto,
    @SortingParams([
      'firstName',
      'lastName',
      'birthDate',
      'createdAt',
      'updatedAt',
    ])
    sort?: SortingParam,
  ) {
    return this.usersService.findAll(filter, sort);
  }
}
