import mongoose from "mongoose"
import { COLLECTIONS } from "../utils/collections.js"

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        required: true,
    }
})

const PostModel = new mongoose.model(COLLECTIONS.POSTS, postSchema)

export const createPostDB = (data) => {
    return PostModel.create(data)
}
export const findPostById = (id) => {
    return PostModel.findById(id)
}

export default PostModel