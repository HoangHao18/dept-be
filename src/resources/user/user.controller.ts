import { Router, Request, Response, NextFunction } from 'express'
import Controller from '@utils/interfaces/controller.interface'
import HttpException from '@utils/exceptions/http.exception'
import validationMiddleware from '@middleware/validation.middleware'
import validate from './user.validation'
import UserService from './user.services'
import users from '../../utils/users.example'

class UserController implements Controller {
  public path = '/users'
  public router = Router()
  private UserService = new UserService()

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
      res.send(users)
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

      const post = await this.UserService.create(title, body)

      res.status(201).json({ post })
    } catch (error) {
      next(new HttpException(400, 'Cannot create post'))
    }
  }
}

export default UserController
