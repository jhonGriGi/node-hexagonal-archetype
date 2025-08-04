import type { DatabaseConfig } from './database-config';
import {
    DATABASE_DB,
    HOST_DB,
    PASSWORD_DB,
    PORT_DB,
    USER_DB,
} from '@domain/constants/constants';
import LambdaLogger from '@libraries/logger';
import pg from 'pg';

import { Sequelize } from 'sequelize';

export class SequelizeConfig implements DatabaseConfig {
    private readonly sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize(
            `postgres://${USER_DB}:${PASSWORD_DB}@${HOST_DB}:${PORT_DB}/${DATABASE_DB}`,
            {
                dialect: 'postgres',
                dialectModule: pg,
            },
        );
    }

    public async query(
        query: string,
        params: unknown[],
    ): Promise<[unknown[], unknown]> {
        return await this.sequelize.query(query, { replacements: params });
    }

    public async connect(): Promise<void> {
        try {
            await this.sequelize.authenticate();
            LambdaLogger.info('Sequelize connection established.');
        }
        catch (error) {
            LambdaLogger.error('Unable to connect to Sequelize:', error as Error);
        }
    }

    public async disconnect(): Promise<void> {
        await this.sequelize.close();
    }

    public getConnection(): Sequelize {
        return this.sequelize;
    }
}
