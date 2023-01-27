import { insertPostDTO } from "../models/insertPostDTO"
import { post } from "../models/post"
import { generateId } from "../services/generateId"
import { PostRepository } from "./PostRepository"
import { UserRepository } from "./UserRepository"


export class PostBusiness {
    constructor(private postDatabase: PostRepository, private userDatabase: UserRepository) {}

    createPost = async (input: insertPostDTO): Promise<void> => {
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


    getAllPosts = async (): Promise<post[]> => {
        try {
            return await this.postDatabase.getAllPosts()
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}