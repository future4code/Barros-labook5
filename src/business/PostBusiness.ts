import { Request, Response } from "express"
import { BaseDatabase } from "../data/BaseDatabase"
import { PostDatabase } from "../data/PostDatabase"
import { insertPostDTO } from "../models/insertPostDTO"
import { post } from "../models/post"
import { generateId } from "../services/generateId"


export class PostBusiness extends BaseDatabase {

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

            const id: string = generateId()
            const newPost: post = {
                id,
                photo: input.photo,
                description: input.description,
                type: input.type,
                createdAt: new Date(),
                authorId: input.authorId
            }

            const postDatabase = new PostDatabase()
            await postDatabase.createPost(newPost)
        
        } catch (error:any) {
            throw new Error(error.message)
            
        }
    }


    getPostById = async (id: string): Promise<any> => {
        try {
            if (!id) {
                throw new Error("Provide the post id.")
            }
            
            const postDatabase = new PostDatabase()
            const result = await postDatabase.getPostById(id)
            
            if (result.length === 0) {
                throw new Error ("Id not found.")
            }
     
            return result

        } catch (error:any) {
           throw new Error(error.message)
        }
    }
}