import { UserRepositoryInMemory } from '@/infra/repositories/in-memory/user-repository.in-memory'

const userRepository = new UserRepositoryInMemory()

export { userRepository }
