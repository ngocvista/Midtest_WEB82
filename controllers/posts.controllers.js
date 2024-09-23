import { createPostDB, findPostById } from "../models/posts.models.js"
import { getUserById } from "../models/users.models.js"
import { cloneDeep } from "../utils/funconstant.js"

export const createPost = async (req, res) => {
    const { userId } = req.params
    const { content } = req.body
    try {
        const findUser = await getUserById(userId)
        if (!findUser) throw new Error('Unauthorized')
        
        const newPost = { userId, content }
        const createNewPost = await createPostDB(newPost)
        res.status(201).send({
            message: 'Create success',
            post: createNewPost,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}


export const updatePost = async (req, res) => {
    const { postId } = req.params
    const { content } = req.body
    const { apiKey } = req.query
    const [title, userId1, email1, randomString1] = apiKey.split('-')
    const userId = userId1.replaceAll("$","")
    try {
        const findPost = await findPostById(postId)
        console.log(findPost)
        if (!findPost) throw new Error('No post found')
        const checkUser = userId === cloneDeep(findPost.userId)
        console.log(checkUser)
        if (!checkUser) throw new Error('User can not edit this post')
        findPost.content = content
        findPost.updatedAt = Date.now()
        findPost.save()
        res.status(200).send({
            message: 'Updated!',
            data: findPost,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}
