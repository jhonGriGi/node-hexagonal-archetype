import { DatabaseDriverRepository } from "@adapters/database-driver-repository";
import { CreateProductCommandHandler } from "@domain/command/create_product/command_handler";
import { DeleteProductCommandHandler } from "@domain/command/delete_product/command_handler";
import { SearchProductCommandHandler } from "@domain/command/search_product/command_handler";
import { UpdateProductCommandHandler } from "@domain/command/update_product/command_handler";
import { CreateProductHandler } from "@lambda/product/create_handler";
import { DeleteProductHandler } from "@lambda/product/delete_handler";
import { SearchProductHandler } from "@lambda/product/search_handler";
import { UpdateProductHandler } from "@lambda/product/update_handler";
import createHandler from "@libraries/lambda_instance_builder";
import { SequelizeConfig } from "@libraries/orm/internals/sequelize";

const databaseConfig = new SequelizeConfig();
const repository = new DatabaseDriverRepository(databaseConfig);

// Export Lambda handlers
export const postProductsHandler = createHandler(
	CreateProductCommandHandler,
	CreateProductHandler,
	repository
);

export const deleteProductsHandler = createHandler(
	DeleteProductCommandHandler,
	DeleteProductHandler,
	repository
);

export const putProductsHandler = createHandler(
	UpdateProductCommandHandler,
	UpdateProductHandler,
	repository
);

export const getProductsHandler = createHandler(
	SearchProductCommandHandler,
	SearchProductHandler,
	repository
);
