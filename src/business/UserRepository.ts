import { user } from "../models/user"

export interface UserRepository {
    createUser (newUser: user): Promise<void>
}