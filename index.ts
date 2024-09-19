import express from "express"
import cors from "cors"
import bookRouter from "./routers/bookrouter"
import userRouter from "./routers/userrouter"
import "dotenv/config"
const app = express()

//cors policy override
const corsConfig = {
    credentials:true,       
   
}
app.use(cors(
    corsConfig
))
app.use(express.json())
app.use("/api/user", userRouter)
app.use("/api/books", bookRouter)
app.listen(process.env.PORT, () => {
    console.log("listening")
})