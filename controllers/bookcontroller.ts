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

export const getFilterBooksCount = async(req: Request, res: Response) => {
    try{
        const genreFilter = req.body.genres.length > 0 ?
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
        const data = await prisma.inventory.count({
            where: {
                AND: [
                    {
                        author: {
                            contains : req.body.author,
                            mode: 'insensitive',
                        }
                    },
                    {
                        title : {
                            contains: req.body.title,
                            mode: 'insensitive',
                        }
                    },
                    {
                        isbn : {
                            contains: req.body.isbn,
                            mode: 'insensitive',
                        }
                    },
                    genreFilter,
                    {
                        publication_date : {
                            gte : new Date(req.body.afterDate),
                            lte : new Date(req.body.beforeDate)
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

export const filterBooks = async (req: Request, res: Response) => {
    console.log(req.body)
    const page = Number(req.query.page)
    try{
        const genreFilter = req.body.genres.length > 0 ?
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
            skip: page * 13,
            take: 13,
            where: {
                AND: [
                    {
                        author: {
                            contains : req.body.author,
                            mode: 'insensitive',
                        }
                    },
                    {
                        title : {
                            contains: req.body.title,
                            mode: 'insensitive',
                        }
                    },
                    {
                        isbn : {
                            contains: req.body.isbn,
                            mode: 'insensitive',
                        }
                    },
                    genreFilter,
                    {
                        publication_date : {
                            gte : new Date(req.body.afterDate),
                            lte : new Date(req.body.beforeDate)
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



