import type { LambdaInterface } from '@aws-lambda-powertools/commons/types'
import { LambdaApiResponse } from '@domain/Builders/ApiResponseBuilder'

interface LambdaHandlerInterface extends LambdaInterface {
  handler: (_event: unknown, _context: unknown) => Promise<LambdaApiResponse>
}

export default LambdaHandlerInterface
