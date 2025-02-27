const createHandler = (CommandHandlerClass: any, HandlerClass: any, repository: any) => {
	const commandHandler = new CommandHandlerClass(repository);
	const handlerInstance = new HandlerClass(commandHandler);
	return handlerInstance.handler.bind(handlerInstance);
};

export default createHandler;
