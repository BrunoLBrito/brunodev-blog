import { Request, Response } from 'express'

import { userRepository } from '@/presentation/controllers/user/controller'
import { FindAllUsersUseCase } from '@/domain/usecases/user/find-all/find-all-users.usecase'

const findAllUsersUseCase = new FindAllUsersUseCase(userRepository)

class FindAllUsersController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const users = await findAllUsersUseCase.execute()

    return response.status(200).json(users)
  }
}

export { FindAllUsersController }
