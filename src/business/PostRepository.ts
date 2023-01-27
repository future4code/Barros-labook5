import { post } from "../models/post"


export interface PostRepository {
    createPost (newPost: post): Promise<void>
    getAllPosts (): Promise<post[]>
    getPostById (id: string): Promise<post>
}