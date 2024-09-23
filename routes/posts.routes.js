import { Router } from 'express'
import { createPost,updatePost } from '../controllers/posts.controllers.js'
import authMiddleware from "../middlewares/auth.middlewares.js"

const postRouter = Router()

postRouter.post('/create/:userId', authMiddleware.authentication, createPost)

postRouter.put('/update/:postId', authMiddleware.authentication, updatePost)

export default postRouter