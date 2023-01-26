import { UserRepository } from "../business/UserRepository"
import { BaseDatabase } from "../data/BaseDatabase"
import { user } from "../models/user"


export class UserDatabase extends BaseDatabase implements UserRepository {

    createUser = async (newUser: user): Promise<void> => {
        try {
            await BaseDatabase.connection('labook_users').insert(newUser)
     
        } catch (error:any) {
           throw new Error(error.message)
        }
    }
}