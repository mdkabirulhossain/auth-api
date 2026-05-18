/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    findAll(){
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });
    }

    findById(id: string){
        return this.prisma.user.findUnique({
            where: {id},
        })
    }

    findByEmail(email: string){
        return this.prisma.user.findUnique({
            where: {email},
        })
    }

    create(data: any){
        return this.prisma.user.create({
            data,
        })
    }

    update(id: string, data: any){
        return this.prisma.user.update({
            where: {id},
            data,
        })
    }

    delete(id: string){
        return this.prisma.user.delete({
            where: {id},
        })
    }

}
