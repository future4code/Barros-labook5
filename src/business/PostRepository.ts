import { comment } from "../models/comment"
import { like, inputLikePostDTO } from "../models/like"
import { feedPaginationDTO, post } from "../models/post"


export interface PostRepository {
    createPost (newPost: post): Promise<void>
    getAllPosts (pagination: feedPaginationDTO): Promise<post[]>
    getPostById (id: string): Promise<post>
    likePost (newLike: like): Promise<void>
    deslikePost (input: inputLikePostDTO): Promise<void>
    getLikesByPostId (postId: string): Promise<like[]>
    getLikesByUserId (userId: string): Promise<any>
    commentOnPost (newComment: comment): Promise<void>
    getCommentsByPostId (postId: string): Promise<comment[]>
}