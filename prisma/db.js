import { PrismaClient } from '../src/generated/prisma'

const db = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

export default db