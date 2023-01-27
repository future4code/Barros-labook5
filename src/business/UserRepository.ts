import { user } from "../models/user"

export interface UserRepository {
    createUser (newUser: user): Promise<void>
    getUserByEmail (email: string): Promise<any>
    getUserById (id: string): Promise<any>
}