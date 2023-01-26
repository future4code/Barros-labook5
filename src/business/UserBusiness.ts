import { BaseDatabase } from "../data/BaseDatabase"
import { insertUserDTO } from "../models/insertUserDTO"
import { user } from "../models/user"
import { generateId } from "../services/generateId"
import { UserRepository } from "./UserRepository"


export class UserBusiness extends BaseDatabase {
    constructor(private userDatabase: UserRepository){
        super()
    }

    createUser = async (input: insertUserDTO): Promise<void> => {
        try {
            if (!input.name) {
                throw new Error("Name must be provided.")
            }

            if (!input.email) {
                throw new Error("Email must be provided.")
            }

            if (!input.password) {
                throw new Error("Password must be provided.")
            }
     
            const id = generateId()
            const newUser: user = {
                id,
                name: input.name,
                email: input.email,
                password: input.password
            }

            await this.userDatabase.createUser(newUser)
     
        } catch (error:any) {
           throw new Error(error.message)
        }
    }
}