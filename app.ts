import { handlerClass } from './app/entrypoints/lambda/products-handler';

export const productHandler = handlerClass.handler.bind(handlerClass);
