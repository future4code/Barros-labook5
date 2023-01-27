import { insertUserDTO } from "../models/insertUserDTO"
import { user } from "../models/user"
import { generateId } from "../services/generateId"
import { UserRepository } from "./UserRepository"


export class UserBusiness {
    constructor(private userDatabase: UserRepository){}

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
     
            const duplicateEmail = await this.userDatabase.getUserByEmail(input.email)
            if (duplicateEmail.length > 0) {
                throw new Error("This e-mail is already in use.")
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