import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from "@nestjs/common";
import { HttpExceptionFilter } from "src/common/exceptions/http-exception.filter";
import { SuccessInterceptor } from "src/common/interceptors/success.interceptor";
import { CatsService } from "./cats.service";
import { CatRequestDto } from "./dto/cats.request.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ReadOnlyCatDto } from "./dto/cat.dto";
import { AuthService } from "../auth/auth.service";
import { LoginRequestDto } from "../auth/dto/login.request.dto";

@Controller("cats")
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService
  ) {}

  @Get()
  getCurrentCat() {
    return "current cat";
  }

  @ApiResponse({
    status: 201,
    description: "회원가입 성공",
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: "회원가입" })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    console.log(body);
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: "로그인" })
  @Post("login")
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @Post("logout")
  logOut() {
    return "logout";
  }

  @Post("upload/cats")
  uploadCatImg() {
    return "uploadImg";
  }
}
