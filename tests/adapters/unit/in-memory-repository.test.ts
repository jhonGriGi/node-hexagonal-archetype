import { InMemoryRepository } from '@adapters/in-memory-repository';

describe('in-memory-repository test suit', () => {
    const repository = new InMemoryRepository();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call list method', async () => {
        const response = await repository.list();
        expect(response).toEqual([]);
    });

    it('should call add method', async () => {
        await repository.add({
            id: '1',
            name: 'test',
            description: 'test',
            create_date: '123',
            last_update_date: '123',
        });

        const products = await repository.list();
        expect(products).toHaveLength(1);
    });

    it('should call update method', async () => {
        await repository.updateAttributes({
            id: '1',
            name: 'updated',
            description: 'updated',
            create_date: '123',
            last_update_date: '456',
        });

        const product = await repository.get('1');
        expect(product.name).toBe('updated');
    });

    it('should call get method', async () => {
        const response = await repository.get('1');
        expect(response.id).toBe('1');
    });

    it('should call delete method', async () => {
        await repository.delete('1');
        const products = await repository.list();
        expect(products).toHaveLength(0);
    });
});
