import { Response, Request } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { BaseDatabase } from "../data/BaseDatabase"
import { insertUserDTO } from "../models/insertUserDTO"


export class UserController extends BaseDatabase {
    constructor(private userBusiness: UserBusiness) {
        super()
    }

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
}