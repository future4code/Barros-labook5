import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { BaseDatabase } from "../data/BaseDatabase"
import { insertPostDTO } from "../models/insertPostDTO"


export class PostController extends BaseDatabase {

    createPost = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: insertPostDTO = {
                photo: req.body.photo,
                description: req.body.description,
                type: req.body.type,
                authorId: req.body.authorId
            }
            
            const postBusiness = new PostBusiness()
            await postBusiness.createPost(input)
        
            res.status(201).send("Success! The post has been posted.")
        
        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }


    getPostById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id
            const postBusiness = new PostBusiness()
            await postBusiness.getPostById(id)

            res.status(200).send()
     
        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }
}