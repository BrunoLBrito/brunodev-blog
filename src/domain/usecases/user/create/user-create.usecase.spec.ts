import { AppError } from '@/domain/errors/AppError'
import { UserCreateUseCase } from '@/domain/usecases/user/create/user-create.usecase'
import { IUserRepository } from '@/infra/repositories/iuser.repository'

const makeSut = () => {
  const userRepository: IUserRepository = {
    create: jest.fn().mockResolvedValueOnce({
      id: '94a5c618-7db0-11ee-b962-0242ac120002',
      name: 'Jonh Doe',
      email: 'jonhdoe@mail.com',
      password: 'any_password',
      updated_at: '023-11-04T01:52:03.861Z',
      created_at: '023-11-04T01:52:03.861Z'
    }),
    findByEmail: jest.fn(),
    findAll: jest.fn()
  }

  const userCreateUseCase = new UserCreateUseCase(userRepository)

  return {
    userRepository,
    userCreateUseCase
  }
}

describe('UserCreateUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create a user', async () => {
    const { userCreateUseCase } = makeSut()

    const userData = {
      name: 'Jonh Doe',
      email: 'jonhdoe@mail.com',
      password: '1023030'
    }

    const user = await userCreateUseCase.execute(userData)

    expect(user).toHaveProperty('id')
  })

  it('should return an error if there is already a registered email', async () => {
    const { userRepository, userCreateUseCase } = makeSut()

    userRepository.findByEmail = jest.fn().mockResolvedValueOnce({
      id: '94a5c618-7db0-11ee-b962-0242ac120002',
      name: 'Jonh Doe',
      email: 'jonhdoe@mail.com',
      password: 'any_password',
      updated_at: '023-11-04T01:52:03.861Z',
      created_at: '023-11-04T01:52:03.861Z'
    })

    const userData = {
      name: 'Jonh Doe',
      email: 'jonhdoe@mail.com',
      password: '1023030'
    }

    // await userCreateUseCase.execute(userData)

    await expect(userCreateUseCase.execute(userData)).rejects.toEqual(
      new AppError('User already exists', 400)
    )
  })

  it('should return an error if the name field is empty', async () => {
    const { userCreateUseCase } = makeSut()

    const userData = {
      name: '',
      email: 'jonhdoe@mail.com',
      password: '1023030'
    }

    await expect(userCreateUseCase.execute(userData)).rejects.toEqual(
      new AppError('Invalid data', 400)
    )
  })

  it('should return an invalid email error', async () => {
    const { userCreateUseCase } = makeSut()

    const userData = {
      name: 'Jonh Doe',
      email: 'invalid_email',
      password: '1023030'
    }

    await expect(userCreateUseCase.execute(userData)).rejects.toEqual(
      new AppError('Invalid data', 400)
    )
  })

  it('should return a password error with at least 6 characters', async () => {
    const { userCreateUseCase } = makeSut()

    const userData = {
      name: 'Jonh Doe',
      email: 'jonhdoe@mail.com',
      password: '12345'
    }

    await expect(userCreateUseCase.execute(userData)).rejects.toEqual(
      new AppError('Invalid data', 400)
    )
  })
})
