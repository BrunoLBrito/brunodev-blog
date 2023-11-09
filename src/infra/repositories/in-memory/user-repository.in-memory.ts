import { UserModel } from '@/domain/models/user.model'
import { IUserDTO } from '@/infra/dtos/iuser.dto'
import { IUserRepository } from '@/infra/repositories/iuser.repository'

class UserRepositoryInMemory implements IUserRepository {
  users: UserModel[]

  constructor() {
    this.users = []
  }

  async create({ name, email, password }: IUserDTO): Promise<UserModel> {
    const id = '34224746-7dd6-11ee-b962-0242ac120002'

    const userData = {
      id,
      name,
      email,
      password,
      created_at: String(new Date()),
      updated_at: String(new Date())
    }

    this.users.push(userData)

    return this.users[this.users.length - 1]
  }

  async findByEmail(email: string): Promise<UserModel> {
    const user = this.users.find(user => user.email === email)

    return user
  }

  async findAll(): Promise<UserModel[]> {
    return this.users
  }
}

export { UserRepositoryInMemory }
