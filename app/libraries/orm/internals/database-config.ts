/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DatabaseConfig {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getConnection(): any;
}
