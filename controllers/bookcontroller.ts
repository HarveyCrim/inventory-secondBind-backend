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
                publication_date: new Date(date),
                userId : res.locals.verified.id
            }
        })
        await prisma.$disconnect()
        res.json({"message" : "added"})
    }
    catch(err){
        res.json(err)
    }
}

export const getMyBooks = async (req: Request, res: Response) => {
    try{
        const {offset} = req.query
        const books = await prisma.inventory.findMany({
            skip: Number(offset) * 12,
            take: 12,
            where : {
                userId : res.locals.verified.id
            }
        })
        res.json(books)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const getMyBooksCount = async(req: Request, res: Response) => {
    try{
        const books = await prisma.inventory.count({
            where: {
                userId: res.locals.verified.id
            }
        })
        res.json(books)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const filterBooks = async (req: Request, res: Response) => {
    try{
        const genreFilter = req.body.genres ?
        {
            genre : {
                in : req.body.genres
            }
        }
        :
        {
            genre : {
                notIn : []
            }
        }
        const data = await prisma.inventory.findMany({
            where: {
                AND: [
                    {
                        author: {
                            contains : req.body.author ? req.body.author : "",
                            mode: 'insensitive',
                        }
                    },
                    {
                        title : {
                            contains: req.body.title ? req.body.title : "",
                            mode: 'insensitive',
                        }
                    },
                    genreFilter,
                    {
                        publication_date : {
                            gte : req.body.afterDate ? new Date(req.body.afterDate) : new Date("1200-01-01"),
                            lte : req.body.beforeDate ? new Date(req.body.beforeDate) : new Date()
                        }
                    }

                ]
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



