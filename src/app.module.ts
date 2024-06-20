import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { IamModule } from './iam/iam.module';
import { UsersModule } from './users/users.module';
import { FaqsModule } from './faqs/faqs.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { BookingsModule } from './bookings/bookings.module';
import { CountriesModule } from './countries/countries.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      autoLoadEntities: true,
      synchronize: true,
    }),
    IamModule,
    UsersModule,
    FaqsModule,
    CategoriesModule,
    SubcategoriesModule,
    TransactionsModule,
    BookingsModule,
    CountriesModule,
    SettingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
