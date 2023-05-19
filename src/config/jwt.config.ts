import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  access: {
    key: process.env.ACCESS_SECRET_KEY,
    expireTime: process.env.ACCESS_EXPIRE_TIME,
  },
}));
