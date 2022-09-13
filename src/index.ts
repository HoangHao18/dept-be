import 'dotenv/config'
import 'module-alias/register'
import { PORT } from './config'
import validateEnv from '@utils/validateEnv'
import App from './app'
import PostController from '@resources/post/post.controller'
import UserController from '@resources/user/user.controller'

validateEnv()

const postController = new PostController()
const userController = new UserController()

const app = new App([postController, userController], Number(PORT))
app.listen()
