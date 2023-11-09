import { UserModel } from '../../../domain/models/user.model'
import { IUserDTO } from '../../dtos/iuser.dto'
import { IUserRepository } from '../iuser.repository'

class UserRepositoryPrisma implements IUserRepository {
  async create({ name, email, password }: IUserDTO): Promise<UserModel | any> {}
}

export { UserRepositoryPrisma }
