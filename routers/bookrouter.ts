import express from "express"
import { filterBooks, getFilterBooksCount, getGenres, getMyBooks, getMyBooksCount, insertBook } from "../controllers/bookcontroller"
import { authMiddleware } from "../middlewares/auth"
const bookRouter = express.Router()
bookRouter.post("/add", authMiddleware, insertBook)
bookRouter.get("/genres", authMiddleware, getGenres)
bookRouter.post("/getfilteredbooks", authMiddleware, filterBooks)
bookRouter.get("/getmybooks", authMiddleware, getMyBooks)
bookRouter.get("/mybookscount", authMiddleware, getMyBooksCount)
bookRouter.get("/all-genres", authMiddleware, getGenres)
bookRouter.post("/filteredbookscount", authMiddleware, getFilterBooksCount)
export default bookRouter

