import {Request, Response} from "express"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const createOrGetUser = async (req: Request, res: Response) => {
    try{
        let user = await prisma.user.findUnique({
            where : {
                email : req.body.email
            },
            
        })
        if(user){
           res.json(user)
        }
        else{
            const newUser = await prisma.user.create({
                data : {
                    email : req.body.email,
                    name : req.body.name
                }
            })
            return res.json(newUser)
        }
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
}