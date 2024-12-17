import { hash } from '@node-rs/argon2'
import { PrismaClient, type User } from '@prisma/client'

declare global {
  var __prisma: import('@prisma/client').PrismaClient
}

const prisma =
  globalThis.__prisma ||
  new PrismaClient().$extends({
    query: {
      user: {
        async $allOperations({ operation, args, query }) {
          if (
            ['create', 'update'].includes(operation) &&
            'data' in args &&
            (args.data as User)['password']
          ) {
            if ('password' in (args.data as User)) {
              if (typeof (args.data as User).password === 'string') {
                ;(args.data as User)['password'] = await hash(
                  (args.data as { password: string }).password,
                  { algorithm: 2 }
                )
              }
            }
          }
          return await query(args)
        }
      }
    }
  })

if (process.env.NODE_ENV === 'development') {
  globalThis.__prisma = prisma
}

export default prisma
