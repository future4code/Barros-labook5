import { PostRepository } from "../business/PostRepository"
import { BaseDatabase } from "../data/BaseDatabase"
import { post } from "../models/post"


export class PostDatabase extends BaseDatabase implements PostRepository {
    TABLE = "labook_posts"

    createPost = async (newPost: post): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE).insert(newPost)
        
        } catch (error:any) {
            throw new Error(error.message)
            
        }
    }


    getPostById = async (id: string): Promise<any> => {
        try {
            const result = await BaseDatabase.connection(this.TABLE).select().where({ id })
            return result[0]

        } catch (error:any) {
           throw new Error(error.message)
        }
    }


    getAllPosts = async (): Promise<post[]> => {
        try {
            return await BaseDatabase.connection(this.TABLE).select()
     
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}