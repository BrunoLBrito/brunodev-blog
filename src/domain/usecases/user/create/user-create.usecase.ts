import { IUserDTO } from '@/infra/dtos/iuser.dto'
import { IUserRepository } from '@/infra/repositories/iuser.repository'
import { UserModel } from '@/domain/models/user.model'
import { UserValidator } from '@/domain/validation/user.validator'
import { AppError } from '@/domain/errors/app-error'

class UserCreateUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ name, email, password }: IUserDTO): Promise<UserModel> {
    const userValidation = await UserValidator.validate({ name, email, password })

    if (!userValidation) {
      throw new AppError('Invalid data', 400)
    }

    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists', 400)
    }

    const user = await this.userRepository.create({ name, email, password })

    return user
  }
}

export { UserCreateUseCase }
