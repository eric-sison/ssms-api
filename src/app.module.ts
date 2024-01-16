import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportType } from './api/support-types/data/support-types.entity';
import { SupportTypesModule } from './api/support-types/core/support-types.module';
import { Category } from './api/categories/data/categories.entity';
import { CategoriesModule } from './api/categories/core/categories.module';
import { SubCategory } from './api/sub-categories/data/sub-categories.entity';
import { SubCategoriesModule } from './api/sub-categories/core/sub-categories.module';

@Module({
  imports: [
    // application configuration modules
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: parseInt(configService.getOrThrow('DB_PORT')),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASS'),
        database: configService.getOrThrow('DB_NAME'),
        entities: [SupportType, Category, SubCategory],
        logging: true,
        synchronize: true,
      }),
    }),

    // application api route modules
    SupportTypesModule,
    CategoriesModule,
    SubCategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
