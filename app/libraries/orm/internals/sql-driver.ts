import mysql, { Connection } from 'mysql2/promise'
import { DatabaseConfig } from './database-config'

export class MySQL2Config implements DatabaseConfig {
  private connection: Connection | null = null

  public async connect (): Promise<void> {
    try {
      this.connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'test_db',
        password: 'password'
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
