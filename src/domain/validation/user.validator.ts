import { z } from 'zod'
// import * as yup from 'yup'

interface IUserInput {
  name: string
  email: string
  password: string
}

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6)
})

// const userSchema = yup.object().shape({
//   name: yup.string().required(),
//   email: yup.string().email().required(),
//   password: yup.string().min(6).required()
// })

class UserValidator {
  static async validate({ name, email, password }: IUserInput) {
    try {
      userSchema.parse({ name, email, password })

      // await userSchema.validate({ name, email, password })

      return true
    } catch (error) {
      return false
    }
  }
}

export { UserValidator }
