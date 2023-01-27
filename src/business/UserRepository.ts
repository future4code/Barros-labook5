import { insertAnewFriendDTO } from "../models/insertNewFriendDTO"
import { user } from "../models/user"

export interface UserRepository {
    createUser (newUser: user): Promise<void>
    addAfriend (input: insertAnewFriendDTO): Promise<void>
    getUserByEmail (email: string): Promise<any>
    getUserById (id: string): Promise<any>
    getFriendsByUserId (column: string, id: string): Promise<any>
}