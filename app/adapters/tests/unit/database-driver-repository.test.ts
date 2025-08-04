import type { DatabaseConfig } from '@libraries/orm/internals/database-config';
import { DatabaseDriverRepository } from '@adapters/database-driver-repository';

const databaseConfigMock: DatabaseConfig = {
    connect: jest.fn().mockImplementation(() => Promise.resolve()),
    query: jest.fn().mockResolvedValue([1, 2, 3]),
    disconnect: jest.fn().mockImplementation(() => Promise.resolve()),
    getConnection: jest.fn().mockImplementation(() => Promise.resolve()),
};

describe('database-driver-repository test suit', () => {
    const databaseDriver = new DatabaseDriverRepository(databaseConfigMock);
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call list method', async () => {
        const response = await databaseDriver.list();

        expect(response).toEqual([1, 2, 3]);
        expect(databaseConfigMock.connect).toHaveBeenCalled();
    });

    it('should call add method', async () => {
        await databaseDriver.add({
            id: '',
            name: '',
            description: '',
            create_date: '',
            last_update_date: '',
        });

        expect(databaseConfigMock.query).toHaveBeenCalled();
    });

    it('should call update method', async () => {
        await databaseDriver.updateAttributes({
            id: '',
            name: '',
            description: '',
            create_date: '',
            last_update_date: '',
        });

        expect(databaseConfigMock.query).toHaveBeenCalled();
    });

    it('should call update method', async () => {
        await databaseDriver.delete('1');

        expect(databaseConfigMock.query).toHaveBeenCalled();
    });

    it('should call get method', async () => {
        const response = await databaseDriver.get('1');

        expect(response).toEqual(1);
        expect(databaseConfigMock.connect).toHaveBeenCalled();
    });
});
