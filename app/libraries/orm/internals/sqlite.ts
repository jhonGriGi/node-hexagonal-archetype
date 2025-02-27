import { DatabaseConfig } from "@libraries/orm/internals/database-config";
import sqlite3 from "sqlite3";

sqlite3.verbose();

export class SQLiteDatabase implements DatabaseConfig {
	private db!: sqlite3.Database;

	// Método para conectar la base de datos
	async getConnection() {
		this.db;
	}

	async connect(): Promise<void> {
		this.db = new sqlite3.Database("products.db");
		console.log(`Conectado a la base de datos SQLite en products.db`);
	}

	// Método para ejecutar una consulta (INSERT, UPDATE, DELETE)
	async query(query: string, params: any[] = []): Promise<void> {
		try {
			await this.db.run(query, params);
			console.log("Consulta ejecutada correctamente");
		} catch (error) {
			console.error("Error al ejecutar la consulta", error);
		}
	}

	// Método para cerrar la conexión a la base de datos
	async disconnect(): Promise<void> {
		try {
			await this.db.close();
			console.log("Conexión a la base de datos cerrada");
		} catch (error) {
			console.error("Error al cerrar la base de datos", error);
		}
	}
}
