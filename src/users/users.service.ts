import { Injectable } from '@nestjs/common';

import * as oracledb from 'oracledb';
import { UserDto } from './users.dto';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

@Injectable()
export class UsersService {
  async findAll(): Promise<UserDto[]> {
    const connection = await oracledb.getConnection();
    const result = await connection.execute('SELECT * FROM t_nr_user');
    await connection.close();
    return result.rows;
  }

  async findByIdpeg(idpeg: string): Promise<UserDto> {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT * FROM t_nr_user WHERE idpeg = :idpeg`,
      [idpeg],
    );
    await connection.close();
    return result.rows[0];
  }

  async findByFilter({
    cuserapp = '',
    cactive = '',
  }: {
    cuserapp: string;
    cactive: string;
  }): Promise<UserDto[]> {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT * FROM t_nr_user WHERE 1 = 1
      AND cuserapp LIKE '%${cuserapp.toUpperCase()}%'
      AND cactive LIKE '%${cactive.toUpperCase()}%'`,
    );
    await connection.close();
    return result.rows;
  }

  async;
}
