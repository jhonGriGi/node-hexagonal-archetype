import { Loggerfy } from 'loggerfy';

const logger = new Loggerfy();

export interface LOGGER_PARAMS {
  code: string;
  message: string;
  detail?: string;
  metadata?: Record<string, string>;
}

class LambdaLogger {
  static info({ code, message, metadata, detail }: LOGGER_PARAMS): void {
    logger
      .info()
      .setCode(code)
      .setDetail(detail ?? 'lambda_logger')
      .setMessage(message)
      .setMetadata(metadata ?? {})
      .write();
  }

  static warn({ code, message, metadata, detail }: LOGGER_PARAMS): void {
    logger
      .warn()
      .setCode(code)
      .setDetail(detail ?? 'lambda_logger')
      .setMessage(message)
      .setMetadata(metadata ?? {})
      .write();
  }

  static error({ code, message, metadata, detail }: LOGGER_PARAMS): void {
    logger
      .error()
      .setCode(code)
      .setDetail(detail ?? 'lambda_logger')
      .setMessage(message)
      .setMetadata(metadata ?? {})
      .write();
  }
}

export default LambdaLogger

