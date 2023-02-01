import { insertAnewFriendDTO } from "../models/insertNewFriendDTO"
import { receiveFriendDataDTO } from "../models/receiveFriendDataDTO"
import { user } from "../models/user"

export interface UserRepository {
    createUser (newUser: user): Promise<void>
    addAfriend (input: insertAnewFriendDTO): Promise<void>
    deleteAfriend (input: receiveFriendDataDTO): Promise<void>
    getUserByEmail (email: string): Promise<any>
    getUserById (id: string): Promise<any>
    getFriendsByUserId (item: receiveFriendDataDTO): Promise<any>
}