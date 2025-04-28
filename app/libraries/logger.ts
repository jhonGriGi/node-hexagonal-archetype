import { Logger } from '@aws-lambda-powertools/logger';
import { LogItemExtraInput } from '@aws-lambda-powertools/logger/lib/cjs/types/Logger';

export const logger = new Logger();

class LambdaLogger {
  /**
   *
   *you can use multiple objects for logs like the example below
   * logger.info(
   *   'This is a log with 3 extra objects',
   *    { data: myImportantVariable },
   *    { correlationIds: { myCustomCorrelationId: 'foo-bar-baz' } },
   *    { lambdaEvent: event }
   * );
   *
   */
  static info(title: string, ...extraInput: LogItemExtraInput) {
    logger.info(title, ...extraInput);
  }

  /**
   *
   * you can use multiple objects for logs like the example below
   *           logger.info(
   *             'This is a log with 3 extra objects',
   *             { data: myImportantVariable },
   *             { correlationIds: { myCustomCorrelationId: 'foo-bar-baz' } },
   *             { lambdaEvent: event }
   *         );
   *
   */
  static error(title: string, ...extraInput: LogItemExtraInput) {
    logger.error(title, ...extraInput);
  }
}

export default LambdaLogger;
