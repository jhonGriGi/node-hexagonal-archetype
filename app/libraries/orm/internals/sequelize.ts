import { Sequelize } from "sequelize";
import { DatabaseConfig } from "./database-config";
import pg from "pg";
import { DATABASE_DB, HOST_DB, PASSWORD_DB, PORT_DB, USER_DB } from "@domain/constants/constants";
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
	public async query(query: string, params: any[]): Promise<[unknown[], unknown]> {
		return await this.sequelize.query(query, { replacements: params });
	}

	public async connect(): Promise<void> {
		try {
			await this.sequelize.authenticate();
			LambdaLogger.log("Sequelize connection established.");
		} catch (error) {
			LambdaLogger.error("Unable to connect to Sequelize:", error);
		}
	}

	public async disconnect(): Promise<void> {
		await this.sequelize.close();
	}

	public getConnection(): Sequelize {
		return this.sequelize;
	}
}
