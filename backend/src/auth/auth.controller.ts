import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    @ApiOperation({ summary: 'Sign up a new user' })
    @ApiBody({ type: SignUpDto })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post('signin')
    @ApiOperation({ summary: 'Sign in an existing user' })
    @ApiBody({ type: SignInDto })
    @ApiResponse({ status: 200, description: 'User signed in successfully' })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Access a protected route' })
    @ApiResponse({ status: 200, description: 'Access granted' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async protectedRoute() {
        return { message: 'This is a protected route' };
    }
}