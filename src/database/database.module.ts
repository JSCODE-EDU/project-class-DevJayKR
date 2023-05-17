import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: process.env.RDS_HOSTNAME || configService.get('MYSQL_HOST'),
        port: Number(process.env.RDS_PORT) || configService.get('MYSQL_PORT'),
        username: process.env.RDS_USERNAME || configService.get('MYSQL_USER'),
        password: process.env.RDS_PASSWORD || configService.get('MYSQL_PASSWORD'),
        database: process.env.RDS_DB_NAME || configService.get('MYSQL_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        timezone: 'Z',
      }),
    }),
  ],
})
export class DatabaseModule {}
