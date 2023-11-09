import { UserModel } from '@/domain/models/user.model'
import { IUserDTO } from '@/infra/dtos/iuser.dto'
import { IUserRepository } from '@/infra/repositories/iuser.repository'

class UserRepositoryInMemory implements IUserRepository {
  users: UserModel[] = [
    {
      id: '34224746-7dd6-11ee-b962-0242ac120002',
      name: 'Ana',
      email: 'aninha@mail.com',
      password: '123456',
      created_at: 'Wed Nov 08 2023 22:50:13 GMT-0300 (Brasilia Standard Time)',
      updated_at: 'Wed Nov 08 2023 22:50:13 GMT-0300 (Brasilia Standard Time)'
    }
  ]

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
