import { Request, Response } from 'express'

import { UserCreateUseCase } from '@/domain/usecases/user/create/user-create.usecase'
import { userRepository } from '@/presentation/controllers/user/controller'

type UserRequest = {
  name: string
  email: string
  password: string
}

const userCreateUseCase = new UserCreateUseCase(userRepository)

class UserCreateController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password }: UserRequest = request.body

    const user = await userCreateUseCase.execute({ name, email, password })

    return response.status(201).json(user)
  }
}

export { UserCreateController }
