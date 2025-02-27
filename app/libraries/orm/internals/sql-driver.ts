import mysql, { Connection } from 'mysql2/promise'
import { DatabaseConfig } from './database-config'
const USER_DB = process.env.USER_DB;
const PASSWORD_DB = process.env.PASSWORD_DB;
const HOST_DB = process.env.HOST_DB;
const PORT_DB = process.env.PORT_DB;
const DATABASE_DB = process.env.DATABASE_DB;
export class MySQL2Config implements DatabaseConfig {
  private connection: Connection | null = null

  public async connect (): Promise<void> {
    try {
      this.connection = await mysql.createConnection({
        host: HOST_DB,
        user: USER_DB,
        database: DATABASE_DB,
        password: PASSWORD_DB,
        port: Number(PORT_DB)
      })
      console.log('MySQL connection established.')
    } catch (error) {
      console.error('Unable to connect to MySQL:', error)
    }
  }

  public async disconnect (): Promise<void> {
    if (this.connection != null) {
      await this.connection.end()
    }
  }

  public getConnection (): Connection | null {
    return this.connection
  }


}
