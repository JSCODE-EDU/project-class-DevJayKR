import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validationSchema';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema,
      load: [appConfig],
    }),
    DatabaseModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
