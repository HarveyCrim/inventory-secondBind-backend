import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { queryObjects } from 'v8'
const prisma = new PrismaClient()
type genre = {
    genre: String
}
export const insertBook = async (req: Request, res: Response) => {
    const date = req.body.date
    delete req.body["date"]
    try{
        await prisma.inventory.create({
            data : {
                ...req.body,
                publication_date: new Date(date)
            }
        })
        await prisma.$disconnect()
        res.json({"message" : "added"})
    }
    catch(err){
        res.json(err)
    }
}

export const filterBooks = async (req: Request, res: Response) => {
    try{
        let queryParams = []
        if(req.body.title){
            queryParams.push({
                title : {
                    contains: req.body.title
                }
            })
        }
        if(req.body.author){
            queryParams.push({
                author: {
                    contains : req.body.author
                }
            })
        }
        if(req.body.genres){
            queryParams.push({
                genre : {
                    in : req.body.genres
                }
            })
        }
        if(req.body.beforeDate && req.body.afterDate){
            queryParams.push({
                publication_date : {
                    gte : new Date(req.body.afterDate),
                    lte : new Date(req.body.beforeDate)
                }
            })
        }
        else if(req.body.beforeDate){
            queryParams.push({
                publication_date : {
                    lte : new Date(req.body.beforeDate)
                }
            })
        }
        else if(req.body.afterDate){
            queryParams.push({
                publication_date : {
                    gte : new Date(req.body.afterDate)
                }
            })
        }
        const data = await prisma.inventory.findMany({
            where: {
                AND: queryParams
            }
        })
        await prisma.$disconnect()
        res.json(data)
        
    }
    catch(err){
        res.json(err)
    }
}


export const getGenres = async(req: Request, res: Response) => {
    try{
        const resp:genre[]  = await prisma.$queryRaw `SELECT DISTINCT genre FROM "public"."Inventory"`
        let genres: String[] = []
        resp.forEach(element => {
            genres.push(element.genre)
        });
        await prisma.$disconnect()
        res.json(genres)
    }
    catch(err){
        res.json(err)
    }
}



