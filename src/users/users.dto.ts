import { IsString, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  IDPEG: string;
  @IsString()
  @IsNotEmpty()
  CUSERAPP: string;
  CACTIVE: string | null;
  CPROFPIC: string | null;
  EXT: string | null;
  CEMAIL: string | null;
  CPROFPICOFFICIAL: string | null;
  CCHANGEPWD: string | null;
  CEMAIL_CORP: string | null;
  AD_USER: string | null;
}
