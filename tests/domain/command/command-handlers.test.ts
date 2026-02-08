import { CreateProductCommandHandler } from '@domain/command/create-product/command-handler';
import { UpdateProductCommandHandler } from '@domain/command/update-product/command-handler';
import { DeleteProductCommandHandler } from '@domain/command/delete-product/command-handler';
import { SearchProductQueryHandler } from '@domain/queries/search-product/query-handler';
import type ProductRepository from '@domain/ports/product-repository';

const repositoryMock: ProductRepository = {
    add: jest.fn(),
    updateAttributes: jest.fn(),
    get: jest.fn().mockResolvedValue({
        id: '1',
        name: 'test',
        description: 'test',
        create_date: '123',
        last_update_date: '123',
    }),
    list: jest.fn().mockResolvedValue([]),
    delete: jest.fn(),
};

describe('Command Handlers test suite', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('CreateProductCommandHandler', () => {
        it('should handle repository error', async () => {
            const handler = new CreateProductCommandHandler(repositoryMock);
            jest.spyOn(repositoryMock, 'add').mockRejectedValue(new Error('DB error'));

            await expect(
                handler.execute({ name: 'test', description: 'test' }),
            ).rejects.toThrow();
        });
    });

    describe('UpdateProductCommandHandler', () => {
        it('should handle repository error', async () => {
            const handler = new UpdateProductCommandHandler(repositoryMock);
            jest.spyOn(repositoryMock, 'updateAttributes').mockRejectedValue(new Error('DB error'));

            await expect(
                handler.execute({ id: '1', name: 'test', description: 'test' }),
            ).rejects.toThrow();
        });
    });

    describe('DeleteProductCommandHandler', () => {
        it('should handle repository error', async () => {
            const handler = new DeleteProductCommandHandler(repositoryMock);
            jest.spyOn(repositoryMock, 'delete').mockRejectedValue(new Error('DB error'));

            await expect(handler.execute({ id: '1' })).rejects.toThrow();
        });
    });

    describe('SearchProductQueryHandler', () => {
        it('should handle repository error', async () => {
            const handler = new SearchProductQueryHandler(repositoryMock);
            jest.spyOn(repositoryMock, 'get').mockRejectedValue(new Error('DB error'));

            await expect(handler.execute({ id: '1' })).rejects.toThrow();
        });
    });
});
