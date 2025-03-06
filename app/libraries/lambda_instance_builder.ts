import LambdaHandlerInterface from "@libraries/lambda-handler-interface";

type Constructor<T> = new (...args: any[]) => T;

const createHandler = <C, R>(
	CommandHandlerClass: Constructor<C>,
	HandlerClass: Constructor<LambdaHandlerInterface>,
	repository: R
) => {
	const commandHandler = new CommandHandlerClass(repository);
	const handlerInstance = new HandlerClass(commandHandler);
	return handlerInstance.handler.bind(handlerInstance);
};

export default createHandler;
