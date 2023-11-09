import { Router } from 'express'

import { UserCreateController } from '@/presentation/controllers/user/create/user-create.controller'
import { FindAllUsersController } from '../controllers/user/find-all/find-all-users.controller'

const userRoutes = Router()

userRoutes.get('/', FindAllUsersController.handle)
userRoutes.post('/', UserCreateController.handle)

export { userRoutes }
