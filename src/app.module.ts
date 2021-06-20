import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { PresentModule } from './present/present.module';
import { AuthorModule } from './author/author.module';
import { SingerModule } from './singer/singer.module';
import { SongModule } from './song/song.module';
require('dotenv').config();


const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'remotemysql.com',
  port: Number(3306),
  username: 'J5uZeW8XVK',
  password: 'HKJ08LSPpW', //p@ssw0rd //
  database: 'J5uZeW8XVK',
  logging: true,
  autoLoadEntities: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,

}

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    CategoriesModule,
    PresentModule,
    AuthorModule,
    SingerModule,
    SongModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
