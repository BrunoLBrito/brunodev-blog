import { IUserRepository } from '@/infra/repositories/iuser.repository'

class FindAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute() {
    const users = await this.userRepository.findAll()

    return users
  }
}

export { FindAllUsersUseCase }
