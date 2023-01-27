import express from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { PostController } from '../controller/PostController'
import { PostDatabase } from '../data/PostDatabase'
import { UserDatabase } from '../data/UserDatabase'

export const postRouter = express.Router()

const postDatabase = new PostDatabase()
const userDatabase = new UserDatabase()
const postBusiness = new PostBusiness(postDatabase, userDatabase)
const postController = new PostController(postBusiness)

postRouter.post("/", (req, res) => postController.createPost(req, res))
postRouter.get("/:id", (req, res) => postController.getPostById(req, res))
postRouter.get("/", (req, res) => postController.getAllPosts(req, res))