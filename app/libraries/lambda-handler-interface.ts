import type { LambdaInterface } from '@aws-lambda-powertools/commons/types';

export type LambdaApiResponse = { status: number; body: unknown };

interface LambdaHandlerInterface extends LambdaInterface {
    handler(_event: unknown, _context: unknown): Promise<LambdaApiResponse>;
}

export default LambdaHandlerInterface;
