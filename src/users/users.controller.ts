import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';
import { JwtGuard } from '../auth/guard';
import { User } from 'src/common/decorator/user.decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }

  @Get('filter')
  async findByFilter(
    @Query('cuserapp') cuserapp: string,
    @Query('cactive') cactive: string,
  ): Promise<UserDto[]> {
    return await this.usersService.findByFilter({ cuserapp, cactive });
  }

  @Get('decorator')
  decorator(@User() user: any) {
    return user;
  }

  @Get(':id')
  async findByIdpeg(@Param('id') id: string): Promise<UserDto> {
    return await this.usersService.findByIdpeg(id);
  }
}
