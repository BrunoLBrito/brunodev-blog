import { Router } from 'express'

import { userRoutes } from '@/presentation/routes/user.routes'

const router = Router()

router.use('/users', userRoutes)

export { router }
