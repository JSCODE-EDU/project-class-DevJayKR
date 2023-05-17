import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validationSchema';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import appConfig from './config/app.config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema,
      load: [appConfig],
      envFilePath: `${process.cwd()}/src/config/env/${process.env.NODE_ENV}.env`,
    }),
    DatabaseModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
