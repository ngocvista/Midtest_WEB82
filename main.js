import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/users.routes.js'
import postRouter from './routes/posts.routes.js'
import authMiddleware from './middlewares/auth.middlewares.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

await mongoose.connect(process.env.MONGO_DB)
console.log('Database connected!')

app.use(express.json())
app.use('/users', userRouter)
app.use('/posts', postRouter)

//is update
app.listen(process.env.PORT_DEVELOP, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT_DEVELOP}`);

})