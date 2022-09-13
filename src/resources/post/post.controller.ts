import { Router, Request, Response, NextFunction } from 'express'
import Controller from '@utils/interfaces/controller.interface'
import HttpException from '@utils/exceptions/http.exception'
import validationMiddleware from '@middleware/validation.middleware'
import validate from './post.validation'
import PostService from './post.services'

class PostController implements Controller {
  public path = '/posts'
  public router = Router()
  private PostService = new PostService()

  constructor() {
    this.intialiseRoutes()
  }

  private intialiseRoutes = (): void => {
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.create
    )
    this.router.get(`${this.path}`, this.get)
  }

  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      res.send('Hello world')
    } catch (error) {
      next(new HttpException(400, 'Cannot create post'))
    }
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { title, body } = req.body

      const post = await this.PostService.create(title, body)

      res.status(201).json({ post })
    } catch (error) {
      next(new HttpException(400, 'Cannot create post'))
    }
  }
}

export default PostController
