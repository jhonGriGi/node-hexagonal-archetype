/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DatabaseConfig {
  connect: () => Promise<void>;
  query(query: string, params: any[]): Promise<any>;
  disconnect: () => Promise<void>;
  getConnection: () => any;
}
