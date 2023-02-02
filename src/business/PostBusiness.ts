import { post, inputPostDTO, inputGetAllPostsDTO, feedPaginationDTO } from "../models/post"
import { generateId } from "../services/generateId"
import { PostRepository } from "./PostRepository"
import { UserRepository } from "./UserRepository"
import { inputLikePostDTO, like } from "../models/like"
import { comment, inputCommentDTO } from "../models/comment"


export class PostBusiness {
    constructor(private postDatabase: PostRepository, private userDatabase: UserRepository) {}

    createPost = async (input: inputPostDTO): Promise<void> => {
        try {
            if (!input.authorId) {
                throw new Error("Provide the author id.")
            }

            if (!input.description) {
                throw new Error("Provide the post description.")
            }

            if (!input.photo) {
                throw new Error("Provide the photo url.")
            }

            if (!input.type) {
                throw new Error("Provide the post type.")
            }

            if (input.type !== "normal" && input.type !== "event") {
                throw new Error("The post type must be either 'normal' or 'event'.")
            }

            const userIdExists = await this.userDatabase.getUserById(input.authorId)
            if (userIdExists.length === 0) {
                throw new Error("User id not found.")
            }

            const id: string = generateId()
            const newPost: post = {
                id,
                photo: input.photo,
                description: input.description,
                type: input.type,
                created_at: new Date(),
                author_id: input.authorId
            }

            await this.postDatabase.createPost(newPost)
        
        } catch (error:any) {
            throw new Error(error.message)
            
        }
    }


    getPostById = async (id: string): Promise<post> => {
        try {
            if (!id) {
                throw new Error("Provide the post id.")
            }
            
            const result = await this.postDatabase.getPostById(id)

            if (!result) {
                throw new Error ("Id not found.")
            }
     
            return result

        } catch (error:any) {
           throw new Error(error.message)
        }
    }


    getAllPosts = async (input: inputGetAllPostsDTO): Promise<post[]> => {
        try {
            if (!input.page) {
                input.page = 1
            }
            if (!input.size) {
                input.page = 5
            }

            const offset = input.size * (input.page - 1)
            
            const inputAllPosts: feedPaginationDTO = {
                size: input.size,
                offset
            }

            return await this.postDatabase.getAllPosts(inputAllPosts)
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }


    likePost = async (input: inputLikePostDTO): Promise<void> => {
        try {
            if (!input.userId) {
                throw new Error("Provide the user id.")
            }
            if (!input.postId) {
                throw new Error("Provide the post id.")
            }
            
            const userIdExists = await this.userDatabase.getUserById(input.userId)
            if (!userIdExists) {
                throw new Error ("User not found.")
            }

            const postIdExists = await this.postDatabase.getPostById(input.postId)
            if (!postIdExists) {
                throw new Error ("Post not found.")
            }

            const duplicateLike = await this.postDatabase.getLikesByUserId(input.userId)
            const filterDuplicatLike = duplicateLike.filter((item: like) => item.post_id === input.postId)
            if (filterDuplicatLike.length > 0) {
                throw new Error("The user can't like the same post twice.")
            }

            const id = generateId()
            const newLike: like = {
                id,
                user_id: input.userId,
                post_id: input.postId
            }

            await this.postDatabase.likePost(newLike)

        } catch (error:any) {
           throw new Error(error.message)
        }
    }


    deslikePost = async (input: inputLikePostDTO): Promise<void> => {
        try {
            if (!input.userId) {
                throw new Error("Provide the user id.")
            }
            if (!input.postId) {
                throw new Error("Provide the post id.")
            }
            
            const userIdExists = await this.userDatabase.getUserById(input.userId)
            if (!userIdExists) {
                throw new Error ("User not found.")
            }

            const postIdExists = await this.postDatabase.getPostById(input.postId)
            if (!postIdExists) {
                throw new Error ("Post not found.")
            }

            const getLikesByUserId = await this.postDatabase.getLikesByUserId(input.userId)
            const filterLikes = getLikesByUserId.filter((item: like) => item.post_id === input.postId)
            if (filterLikes.length === 0) {
                throw new Error("It is not possible to dislike a post that has not been previously liked.")
            }

            await this.postDatabase.deslikePost(input)

        } catch (error:any) {
           throw new Error(error.message)
        }
    }


    getLikesByPostId = async (postId: string): Promise<like[]> => {
        try {
            if (!postId) {
                throw new Error("Provide the post id.")
            }

            const postIdExists = await this.postDatabase.getPostById(postId)
            if (!postIdExists) {
                throw new Error ("Post not found.")
            }

            const result = await this.postDatabase.getLikesByPostId(postId)
            if (result.length === 0) {
                throw new Error("This post does not have any likes yet.")
            }

            return result

        } catch (error:any) {
           throw new Error(error.message)
        }
    }


    commentOnPost = async (input: inputCommentDTO): Promise<void> => {
        try {
            if (!input.comment) {
                throw new Error("Provide the comment.")
            }
            if (!input.userId) {
                throw new Error("Provide the user id.")
            }
            if (!input.postId) {
                throw new Error("Provide the post id.")
            }
            
            const userIdExists = await this.userDatabase.getUserById(input.userId)
            if (!userIdExists) {
                throw new Error ("User not found.")
            }

            const postIdExists = await this.postDatabase.getPostById(input.postId)
            if (!postIdExists) {
                throw new Error ("Post not found.")
            }

            const id = generateId()
            const newComment: comment = {
                id,
                comment: input.comment,
                user_id: input.userId,
                post_id: input.postId
            }

            await this.postDatabase.commentOnPost(newComment)

        } catch (error:any) {
           throw new Error(error.message)
        }
    }


    getCommentsByPostId = async (postId: string): Promise<comment[]> => {
        try {
            if (!postId) {
                throw new Error("Provide the post id.")
            }

            const postIdExists = await this.postDatabase.getPostById(postId)
            if (!postIdExists) {
                throw new Error ("Post not found.")
            }

            const result = await this.postDatabase.getCommentsByPostId(postId)
            if (result.length === 0) {
                throw new Error("This post does not have any comments yet.")
            }

            return result

        } catch (error:any) {
           throw new Error(error.message)
        }
    }
}