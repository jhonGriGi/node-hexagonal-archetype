import ProductRepository from "@domain/ports/product-repository";

export const repositoryMock: ProductRepository = {
	add: jest.fn().mockImplementation(() => Promise.resolve()),
	updateAttributes: jest.fn().mockImplementation(() => Promise.resolve()),
	get: jest.fn().mockResolvedValue(1),
	list: jest.fn().mockResolvedValue([1, 2, 3]),
	delete: jest.fn().mockImplementation(() => Promise.resolve()),
};
