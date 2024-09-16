import express from "express"
import cors from "cors"
import bookRouter from "./routers/bookrouter"
const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/books", bookRouter)
app.listen(process.env.PORT, () => {
    console.log("listening")
})