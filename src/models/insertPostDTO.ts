import { POST_TYPES } from "./post"

export interface insertPostDTO {
    photo: string,
    description: string,
    type: POST_TYPES,
    authorId: string
}