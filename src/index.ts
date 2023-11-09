import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'

import { router } from '@/presentation/routes'
import { AppError } from '@/domain/errors/AppError'

const app = express()

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500)
  res.render('error', { error: err })
}

app.use(express.json())
app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  })
})

app.listen(3000, () => console.log('server is running on http://localhost:3000'))
