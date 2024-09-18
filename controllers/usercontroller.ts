import {Request, Response} from "express"
import { PrismaClient } from '@prisma/client'
import jwt from "jsonwebtoken"
import { Secret } from "jsonwebtoken"
const prisma = new PrismaClient()
export const createOrGetUser = async (req: Request, res: Response) => {
    try{
        let user = await prisma.user.findUnique({
            where : {
                email : req.body.email
            },
            
        })
        if(user){
           const token = jwt.sign({id : user.id}, process.env.JWT_SECRET as Secret)
           return res.json({token : "Bearer "+token})
        }
        else{
            const newUser = await prisma.user.create({
                data : {
                    email : req.body.email,
                    name : req.body.name
                }
            })
            
            const token = jwt.sign({id : newUser.id}, process.env.JWT_SECRET as Secret)
            return res.json({token : "Bearer "+token})
        }
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
}