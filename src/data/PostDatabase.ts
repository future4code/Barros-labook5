import { BaseDatabase } from "../data/BaseDatabase"
import { post } from "../models/post"


export class PostDatabase extends BaseDatabase {

    createPost = async (newPost: post): Promise<void> => {
        try {
            await BaseDatabase.connection("labook_posts").insert(newPost)
        
        } catch (error:any) {
            throw new Error(error.message)
            
        }
    }


    getPostById = async (id: string): Promise<any> => {
        try {
            const result = await BaseDatabase.connection("labook_posts").select("*").where({ id })
            return result
     
        } catch (error:any) {
           throw new Error(error.message)
        }
    }
}