import type ProductRepository from '@domain/ports/product-repository';

export const repositoryMock: ProductRepository = {
    add: jest.fn().mockImplementation(() => Promise.resolve('1')),
    updateAttributes: jest.fn().mockImplementation(() => Promise.resolve('1')),
    get: jest.fn().mockResolvedValue({
        id: '1',
        name: 'mock name',
        description: 'mock description',
        createDate: 'mock date',
        lastUpdateDate: 'mock update date',
    }),
    list: jest.fn().mockResolvedValue([
        {
            id: '1',
            name: 'mock name',
            description: 'mock description',
            createDate: 'mock date',
            lastUpdateDate: 'mock update date',
        },
        {
            id: '1',
            name: 'mock name',
            description: 'mock description',
            createDate: 'mock date',
            lastUpdateDate: 'mock update date',
        },
        {
            id: '1',
            name: 'mock name',
            description: 'mock description',
            createDate: 'mock date',
            lastUpdateDate: 'mock update date',
        },
    ]),
    delete: jest.fn().mockImplementation(() => Promise.resolve('1')),
};
