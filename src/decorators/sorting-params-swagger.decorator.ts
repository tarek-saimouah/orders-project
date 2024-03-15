import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const ApiSortingQuery = (params: string[]) => {
  return applyDecorators(
    ApiQuery({
      name: 'sort',
      required: false,
      explode: false,
      type: String,
      description: `param to sort in format: ?sort=property:(asc|desc), allowed: ${JSON.stringify(
        params,
      )}`,
    }),
  );
};
