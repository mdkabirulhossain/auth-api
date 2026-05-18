/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService,
    ){}

    async register(dto: any) {
        const existUser = await this.userService.findByEmail(dto.email);

        if(existUser){
            throw new Error('User already exist');
        }
        
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.userService.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword
        })

        return this.generateToken(user);
    }

    async login(dto: any) {
        const user = await this.userService.findByEmail(dto.email);

        if(!user){
            throw new UnauthorizedException('User not found');
        }

        const isPasswordMatch = await bcrypt.compare(dto.password, user.password);

        if(!isPasswordMatch){
            throw new UnauthorizedException('Invalid password');
        }

        return this.generateToken(user);
    }

    generateToken(user: any) {
        const payload = {
            sub: user.id, 
            email: user.email,
            role: user.role
        };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }


}
