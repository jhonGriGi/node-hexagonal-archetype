import { PrismaClient } from '@prisma/client'
import { DatabaseConfig } from './database-config'

export class PrismaConfig implements DatabaseConfig {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  public async connect (): Promise<void> {
    try {
      await this.prisma.$connect()
      console.log('Prisma connection established.')
    } catch (error) {
      console.error('Unable to connect to Prisma:', error)
    }
  }

  public async disconnect (): Promise<void> {
    await this.prisma.$disconnect()
  }

  public getConnection (): PrismaClient {
    return this.prisma
  }
}
