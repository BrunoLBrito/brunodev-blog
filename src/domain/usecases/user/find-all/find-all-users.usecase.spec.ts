import { FindAllUsersUseCase } from '@/domain/usecases/user/find-all/find-all-users.usecase'
import { IUserRepository } from '@/infra/repositories/iuser.repository'

const makeSut = () => {
  const userRepository: IUserRepository = {
    create: jest.fn(),
    findByEmail: jest.fn(),
    findAll: jest.fn().mockReturnValueOnce([])
  }

  const findAllUsersUseCase = new FindAllUsersUseCase(userRepository)

  return {
    userRepository,
    findAllUsersUseCase
  }
}
describe('FindAllUsersUseCase', () => {
  it('should be able must return all users (an array)', async () => {
    const { findAllUsersUseCase } = makeSut()

    await expect(findAllUsersUseCase.execute()).resolves.toEqual([])
  })
})
