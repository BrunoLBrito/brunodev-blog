import { UserModel } from '@/domain/models/user.model'
import { IUserDTO } from '@/infra/dtos/iuser.dto'

interface IUserRepository {
  create({ name, email, password }: IUserDTO): Promise<UserModel>
}

export { IUserRepository }
