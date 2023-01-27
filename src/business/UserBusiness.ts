import { receiveDataToAddAfriendDTO } from "../models/receiveDataToAddAfriendDTO"
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


    addAfriend = async (input: receiveDataToAddAfriendDTO): Promise<void> => {
        try {
            if (!input.userIdThatAdded) {
                throw new Error ("Provide the user id that wants to add the new friend.")
            }

            if (!input.userIdThatWasAdded) {
                throw new Error ("Provide the user id that is being added.")
            }

            if (input.userIdThatAdded === input.userIdThatWasAdded) {
                throw new Error("The user cannot add himself/herself.")
            }

            const userThatAddedExists = await this.userDatabase.getUserById(input.userIdThatAdded)
            if (userThatAddedExists.length === 0) {
                throw new Error("The user id who wants to add a new friend does not exist.")
            }

            const userThatWasAddedExists = await this.userDatabase.getUserById(input.userIdThatWasAdded)
            if (userThatWasAddedExists.length === 0) {
                throw new Error("The user id who wants to add a new friend does not exist.")
            }

            //Fazer lógica para que não seja possível adicionar um mesmo usuário novamente
            /*const friendsOfTheUserThatAdded = await this.userDatabase.getFriendsByUserId("userThatAdded_id", input.userIdThatAdded)
            const filterFriedsOfTheUserThatAdded = friendsOfTheUserThatAdded.filter((item: insertAnewFriendDTO) => item.userThatWasAdded_id === input.userIdThatWasAdded)
            if (filterFriedsOfTheUserThatAdded.length > 0) {
                throw new Error("It is not possible to add a user who is already a friend.")
            }
            
            const friendsOfTheUserThatWasAdded = await this.userDatabase.getFriendsByUserId("userThatWasAdded_id", input.userIdThatWasAdded)
            const filterFriedsOfTheUserThatWasAdded = friendsOfTheUserThatWasAdded.filter((item: insertAnewFriendDTO) => item.userThatAdded_id === input.userIdThatAdded)
            if (filterFriedsOfTheUserThatWasAdded.length > 0) {
                throw new Error("It is not possible to add a user who is already a friend.")
            }*/

            const id = generateId()
            const newFriend: insertAnewFriendDTO = {
                id,
                userThatAdded_id: input.userIdThatAdded,
                userThatWasAdded_id: input.userIdThatWasAdded
            }

            await this.userDatabase.addAfriend(newFriend)
     
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}