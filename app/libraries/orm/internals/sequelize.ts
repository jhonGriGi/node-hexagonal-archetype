import { Sequelize } from "sequelize";
import { DatabaseConfig } from "./database-config";
import pg from "pg";
const USER_DB = process.env.USER_DB;
const PASSWORD_DB = process.env.PASSWORD_DB;
const HOST_DB = process.env.HOST_DB;
const PORT_DB = process.env.PORT_DB;
const DATABASE_DB = process.env.DATABASE_DB;
export class SequelizeConfig implements DatabaseConfig {
  private readonly sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(
      `postgres://${USER_DB}:${PASSWORD_DB}@${HOST_DB}:${PORT_DB}/${DATABASE_DB}`,
      {
        dialect: "postgres",
        dialectModule: pg,
      }
    );
  }

  public async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log("Sequelize connection established.");
    } catch (error) {
      console.error("Unable to connect to Sequelize:", error);
    }
  }

  public async disconnect(): Promise<void> {
    await this.sequelize.close();
  }

  public getConnection(): Sequelize {
    return this.sequelize;
  }
}
