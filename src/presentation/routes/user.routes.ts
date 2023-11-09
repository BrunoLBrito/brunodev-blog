import { Router } from 'express'

import { UserCreateController } from '@/presentation/controllers/user/create/user-create.controller'

const userRoutes = Router()

userRoutes.post('/', UserCreateController.handle)

export { userRoutes }
