import { UserRepository } from "../business/UserRepository"
import { BaseDatabase } from "../data/BaseDatabase"
import { user } from "../models/user"


export class UserDatabase extends BaseDatabase implements UserRepository {
    TABLE = "labook_users"

    createUser = async (newUser: user): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE).insert(newUser)
     
        } catch (error:any) {
           throw new Error(error.message)
        }
    }


    getUserByEmail = async (email: string): Promise<any> => {
        try {
            return await BaseDatabase.connection(this.TABLE).select().where({email})
     
        } catch (error:any) {
           throw new Error(error.message)
        }
    }


    getUserById = async (id: string): Promise<any> => {
        try {
            return await BaseDatabase.connection(this.TABLE).select().where({id})
     
        } catch (error:any) {
           throw new Error(error.message)
        }
    }
}