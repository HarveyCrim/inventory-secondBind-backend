import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { Secret } from "jsonwebtoken"
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization!
        console.log(token)
        const test = token.split(" ")[1]
        const verified = jwt.verify(test, process.env.JWT_SECRET as Secret)
        res.locals.verified = verified
        next()
    }
    catch(err){
        res.status(500).json(err)
    }
}