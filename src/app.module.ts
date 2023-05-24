import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validationSchema';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import appConfig from './config/app.config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { CommentModule } from './comment/comment.module';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema,
      load: [appConfig, jwtConfig],
      envFilePath: `${process.cwd()}/src/config/env/${process.env.NODE_ENV}.env`,
    }),
    DatabaseModule,
    PostsModule,
    AuthModule,
    UsersModule,
    JwtModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
