import { MetricUnit } from "@aws-lambda-powertools/metrics";
import ApiResponseBuilder, {
  LambdaApiResponse,
} from "@domain/Builders/ApiResponseBuilder";
import LambdaHandlerInterface from "@libraries/lambda-handler-interface";
import LambdaLogger, { logger } from "@libraries/logger";
import { LambdaMetrics } from "@libraries/metrics";
import { LambdaTracer, tracer } from "@libraries/tracer";
import express, { Request, Response } from "express";
import serverless from "aws-serverless-express";

import { SqlDriverRepository } from "@adapters/sql-driver-repository";

import { CreateProductCommand } from "@domain/command/create_product/command";

import { CreateProductCommandHandler } from "@domain/command/create_product/command_handler";
import { PrismaConfig } from "@libraries/orm/internals/prisma";
import DomainException from "@domain/exceptions/domain-exception";
import { SequelizeConfig } from "@libraries/orm/internals/sequelize";

class Lambda implements LambdaHandlerInterface {
  private app = express();
  private sequelizeConfig = new SequelizeConfig();
  private db = new SqlDriverRepository(this.sequelizeConfig);
  private createProductHandler = new CreateProductCommandHandler(this.db);

  constructor() {
    this.app.use(express.json());
    this.setRoutes();
  }

  private setRoutes() {
    this.app.post("/products", (req, res) => {
      this.createProduct(req, res).catch((error) => {
        res.status(500).json(
          ApiResponseBuilder.empty()
            .withStatusCode(500)
            .withBody({ error: error.message })
            .build()
        );
      });
    });
  }

  private async createProduct(req: Request, res: Response) {
    try {
      const parsedBody = CreateProductCommand.safeParse(req.body);
      if (!parsedBody.success)
        return res.json(
          ApiResponseBuilder.empty()
            .withStatusCode(400)
            .withBody({ errors: parsedBody.error.errors })
            .build()
        );
      const id = await this.createProductHandler.execute(parsedBody.data);
      res.json(
        ApiResponseBuilder.empty()
          .withStatusCode(200)
          .withHeaders({ "Content-Type": "application/json" })
          .withBody({ id })
          .build()
      );
    } catch (error) {
      res.json(
        ApiResponseBuilder.empty()
          .withStatusCode(400)
          .withBody({ error: error instanceof Error ? error.message : "Error" })
      );
    }
  }

  @tracer.captureLambdaHandler()
  @logger.injectLambdaContext({ logEvent: false })
  public async handler(
    _event: AWSLambda.APIGatewayProxyEvent,
    _context: AWSLambda.Context
  ): Promise<LambdaApiResponse> {
    LambdaMetrics.addMetric("successfulBooking", MetricUnit.Count, 1);
    LambdaLogger.info("this is an example of static logger", {
      event: _event,
      context: _context,
    });
    LambdaTracer.getSegment();
    return new Promise((resolve, reject) => {
      const server = serverless.createServer(this.app);
      serverless.proxy(
        server,
        _event,
        _context,
        "CALLBACK",
        (error, response) => {
          if (error) {
            reject(
              ApiResponseBuilder.empty()
                .withStatusCode(500)
                .withBody({ error: error.message })
                .build()
            );
          } else {
            resolve(
              ApiResponseBuilder.empty()
                .withStatusCode(200)
                .withBody(response.body)
                .build()
            );
          }
        }
      );
    });
  }
}

export const handlerClass = new Lambda();
