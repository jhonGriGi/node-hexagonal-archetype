import type { LambdaInterface } from "@aws-lambda-powertools/commons/types";
import { LambdaApiResponse } from "@domain/builders/ApiResponseBuilder";

interface LambdaHandlerInterface extends LambdaInterface {
  handler(
    _event: unknown,
    _context: AWSLambda.Context
  ): Promise<LambdaApiResponse>;
}

export default LambdaHandlerInterface;
