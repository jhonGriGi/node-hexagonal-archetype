import { Tracer } from "@aws-lambda-powertools/tracer";
import { POWERTOOLS_SERVICE_NAME } from "@domain/constants/constants";

const tracer = new Tracer({ serviceName: POWERTOOLS_SERVICE_NAME });

export default tracer;
