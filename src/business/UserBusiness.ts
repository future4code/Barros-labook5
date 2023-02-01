import { receiveFriendDataDTO } from "../models/receiveFriendDataDTO"
import { insertUserDTO } from "../models/insertUserDTO"
import { user } from "../models/user"
import { generateId } from "../services/generateId"
import { UserRepository } from "./UserRepository"
import { insertAnewFriendDTO } from "../models/insertNewFriendDTO"


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


    addAfriend = async (input: receiveFriendDataDTO): Promise<void> => {
        try {
            if (!input.userId) {
                throw new Error ("Provide the user id that wants to add the new friend.")
            }

            if (!input.friendId) {
                throw new Error ("Provide the user id that is being added.")
            }

            if (input.userId === input.friendId) {
                throw new Error("The user cannot add himself/herself.")
            }

            const userIdExists = await this.userDatabase.getUserById(input.userId)
            if (userIdExists.length === 0) {
                throw new Error("The user id who wants to add a new friend does not exist.")
            }

            const friendIdExists = await this.userDatabase.getUserById(input.friendId)
            if (friendIdExists.length === 0) {
                throw new Error("The user id who is about to be added does not exist.")
            }

            const userFriends = await this.userDatabase.getFriendsByUserId({user_id: input.userId, friend_id: input.friendId})
            const friendFriends = await this.userDatabase.getFriendsByUserId({user_id: input.friendId, friend_id: input.userId})
            
            if (userFriends.length > 0 || friendFriends.length > 0) {
                throw new Error("It is not possible to add a user who is already a friend.")
            }

            const id = generateId()
            const newFriend: insertAnewFriendDTO = {
                id,
                user_id: input.userId,
                friend_id: input.friendId
            }

            await this.userDatabase.addAfriend(newFriend)
     
        } catch (error:any) {
            throw new Error(error.message)
        }
    }


    deleteAfriend = async (input: receiveFriendDataDTO): Promise<void> => {
        try {
            if (!input.userId) {
                throw new Error ("Provide the user id that wants to add the new friend.")
            }

            if (!input.friendId) {
                throw new Error ("Provide the user id that is being added.")
            }

            if (input.userId === input.friendId) {
                throw new Error("The user cannot delete himself/herself.")
            }

            const userIdExists = await this.userDatabase.getUserById(input.userId)
            if (userIdExists.length === 0) {
                throw new Error("The user id who wants to delete the friend does not exist.")
            }

            const friendIdExists = await this.userDatabase.getUserById(input.friendId)
            if (friendIdExists.length === 0) {
                throw new Error("The user id who is about to be deleted does not exist.")
            }

            const userFriends = await this.userDatabase.getFriendsByUserId({user_id: input.userId, friend_id: input.friendId})
            const friendFriends = await this.userDatabase.getFriendsByUserId({user_id: input.friendId, friend_id: input.userId})
       
            if (userFriends.length === 0 && friendFriends.length === 0) {
                throw new Error("The friend id is not included in the friend's list of the user id.")
            }

            await this.userDatabase.deleteAfriend(input)
     
        } catch (error:any) {
            throw new Error(error.message)
        }
    }


    getFriendsByUserId = async (id: string): Promise<user[]> => {
        try {
            if (!id) {
                throw new Error ("Provide the user id.")
            }

            const userIdExists = await this.userDatabase.getUserById(id)
            if (userIdExists.length === 0) {
                throw new Error("The user id does not exist.")
            }

            const result: user[] = []
            let userFriends = await this.userDatabase.getFriendsByUserId({user_id: id})
            userFriends.length !== 0? result.push(userFriends) : result.push()
            
            userFriends = await this.userDatabase.getFriendsByUserId({friend_id: id})
            userFriends.length !== 0? result.push(userFriends) : result.push()

            if (result.length === 0) {
                throw new Error("The user has no friends yet.")
            }

            return result
     
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}