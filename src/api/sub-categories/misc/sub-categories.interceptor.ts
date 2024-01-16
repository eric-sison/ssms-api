import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { SubCategory } from '../data/sub-categories.entity';
import { Paginated } from 'nestjs-paginate';

@Injectable()
export class TransformSubCategoryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((subCategories: Paginated<SubCategory>) => {
        if (request.query.flatten === 'yes') {
          const data = subCategories.data.map((item) => ({
            id: item.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
            name: item.name,
            description: item.description,
            categoryId: item.category.id,
            category: item.category.name,
          }));

          return { ...subCategories, data };
        }

        return subCategories;
      }),
    );
  }
}
