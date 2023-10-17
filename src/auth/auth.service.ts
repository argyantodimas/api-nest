import { ForbiddenException, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as oracledb from 'oracledb';
import { AuthDto } from './auth.dto';
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signIn(dto: AuthDto) {
    let connection;
    try {
      connection = await oracledb.getConnection({
        user: dto.username,
        password: dto.password,
        connectionString: `(DESCRIPTION =
            (ADDRESS = (PROTOCOL = TCP)(HOST = ${process.env.DB_HOST})(PORT = ${process.env.DB_PORT}))
            (CONNECT_DATA=
              (SERVER=DEDICATED)
              (SERVICE_NAME = ${process.env.DB_SERVICE_NAME})
            )
          )`,
      });

      //change parameter here if you want to add more payload to jwt
      return this.signToken(dto.username);
    } catch (error) {
      throw new ForbiddenException('Credentials incorrect');
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  async signToken(username: string): Promise<{ access_token: string }> {
    const payload = {
      username: username,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
