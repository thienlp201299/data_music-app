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
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'p@ssw0rd',
  database: 'music',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  //logging: true,

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
