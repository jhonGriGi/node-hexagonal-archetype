import { Sequelize } from 'sequelize'
import { DatabaseConfig } from './database-config'

export class SequelizeConfig implements DatabaseConfig {
  private readonly sequelize: Sequelize

  constructor () {
    this.sequelize = new Sequelize({
      database: 'test_db',
      username: 'root',
      password: 'password',
      host: 'localhost',
      dialect: 'mysql'
    })
  }

  public async connect (): Promise<void> {
    try {
      await this.sequelize.authenticate()
      console.log('Sequelize connection established.')
    } catch (error) {
      console.error('Unable to connect to Sequelize:', error)
    }
  }

  public async disconnect (): Promise<void> {
    await this.sequelize.close()
  }

  public getConnection (): Sequelize {
    return this.sequelize
  }
}
