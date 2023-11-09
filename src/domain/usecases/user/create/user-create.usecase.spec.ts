import { AppError } from '@/domain/errors/AppError'
import { UserCreateUseCase } from '@/domain/usecases/user/create/user-create.usecase'

const makeSut = () => {
  const userRepository = {
    create: jest.fn()
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
    const { userRepository, userCreateUseCase } = makeSut()

    userRepository.create.mockReturnValue({
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

    const user = await userCreateUseCase.execute(userData)

    expect(user).toHaveProperty('id')
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
