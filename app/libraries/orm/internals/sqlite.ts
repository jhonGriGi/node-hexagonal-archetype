import RepositoryException from '@domain/exceptions/repository-exception';
import LambdaLogger from '@libraries/logger';
import { DatabaseConfig } from '@libraries/orm/internals/database-config';
import sqlite3 from 'sqlite3';

sqlite3.verbose();

export class SQLiteDatabase implements DatabaseConfig {
  private db!: sqlite3.Database;

  // Método para conectar la base de datos
  async getConnection() {
    return this.db;
  }

  async connect(): Promise<void> {
    try {
      this.db = new sqlite3.Database('products.db');
      LambdaLogger.info(`Conectado a la base de datos SQLite en products.db`);
    } catch (error) {
      if (error instanceof Error) {
        LambdaLogger.error(error.message);
        throw new RepositoryException(error.message);
      } else {
        LambdaLogger.error('Error desconocido al cerrar la base de datos', {
          error,
        });
        throw new RepositoryException(
          'Error desconocido al cerrar la base de datos'
        );
      }
    }
  }

  // Método para ejecutar una consulta (INSERT, UPDATE, DELETE)
  async query(query: string, params: unknown[] = []): Promise<unknown> {
    try {
      return await this.db.run(query, params);
    } catch (error) {
      if (error instanceof Error) {
        LambdaLogger.error(error.message);
        throw new RepositoryException(error.message);
      } else {
        LambdaLogger.error('Error desconocido al cerrar la base de datos', {
          error,
        });
        throw new RepositoryException(
          'Error desconocido al cerrar la base de datos'
        );
      }
    }
  }

  // Método para cerrar la conexión a la base de datos
  async disconnect(): Promise<void> {
    try {
      this.db.close();
      LambdaLogger.info('Conexión a la base de datos cerrada');
    } catch (error) {
      if (error instanceof Error) {
        LambdaLogger.error(error.message);
        throw new RepositoryException(error.message);
      } else {
        LambdaLogger.error('Error desconocido al cerrar la base de datos', {
          error,
        });
        throw new RepositoryException(
          'Error desconocido al cerrar la base de datos'
        );
      }
    }
  }
}
