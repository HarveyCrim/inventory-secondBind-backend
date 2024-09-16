import express from "express"
import { filterBooks, getGenres, insertBook } from "../controllers/bookcontroller"
const bookRouter = express.Router()
bookRouter.post("/add", insertBook)
bookRouter.get("/genres", getGenres)
bookRouter.post("/get-books", filterBooks)
export default bookRouter

