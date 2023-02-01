import { Response, Request } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { receiveFriendDataDTO } from "../models/receiveFriendDataDTO"
import { insertUserDTO } from "../models/insertUserDTO"


export class UserController {
    constructor(private userBusiness: UserBusiness) {}

    createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: insertUserDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
     
            await this.userBusiness.createUser(input)
            
            res.status(201).send("Success! The user has been registered.")
     
        } catch (error:any) {
           res.status(400).send(error.message)
        }
    }


    addAfriend = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: receiveFriendDataDTO = {
                userId: req.body.userId,
                friendId: req.body.friendId
            }
     
            await this.userBusiness.addAfriend(input)
            
            res.status(201).send("Success! The user has been added.")
     
        } catch (error:any) {
           res.status(400).send(error.message)
        }
    }


    deleteAfriend = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: receiveFriendDataDTO = {
                userId: req.params.userId,
                friendId: req.body.friendId
            }

            await this.userBusiness.deleteAfriend(input)
            
            res.status(201).send("Success! The user has been deleted.")
     
        } catch (error:any) {
           res.status(400).send(error.message)
        }
    }

    getFriendsByUserId = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id
            const result = await this.userBusiness.getFriendsByUserId(id)
            
            res.status(200).send(result)
     
        } catch (error:any) {
           res.status(400).send(error.message)
        }
    }

}