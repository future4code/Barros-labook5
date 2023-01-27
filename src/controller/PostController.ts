import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { insertPostDTO } from "../models/insertPostDTO"


export class PostController {
    constructor(private postBusiness: PostBusiness) {}

    createPost = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: insertPostDTO = {
                photo: req.body.photo,
                description: req.body.description,
                type: req.body.type,
                authorId: req.body.authorId
            }
            
            await this.postBusiness.createPost(input)
        
            res.status(201).send("Success! The post has been posted.")
        
        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }


    getPostById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id
            const result = await this.postBusiness.getPostById(id)

            res.status(200).send(result)
     
        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }


    getAllPosts = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.postBusiness.getAllPosts()
            res.status(200).send(result)
     
        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }
}