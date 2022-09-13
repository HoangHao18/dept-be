import User from './user.interface'
import UserModel from './user.model'

class UserService {
  private user = UserModel

  public async create(_id: string, name: string): Promise<User> {
    try {
      const user = await this.user.create({ _id, name })
      return user
    } catch (error) {
      throw new Error('Unable to create user')
    }
  }
}

export default UserService
