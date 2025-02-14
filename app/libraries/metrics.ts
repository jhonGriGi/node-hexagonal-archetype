import { Metrics } from '@aws-lambda-powertools/metrics'
import type { MetricResolution, MetricUnit } from '@aws-lambda-powertools/metrics/lib/cjs/types'
import { POWERTOOLS_METRICS_NAMESPACE, POWERTOOLS_SERVICE_NAME } from '@domain/constants/constants'

export const metrics = new Metrics({
  namespace: POWERTOOLS_METRICS_NAMESPACE,
  serviceName: POWERTOOLS_SERVICE_NAME
})

export class LambdaMetrics {
  /**
   *
   * Params:
   *     @Param name – The metric name
   *   @Param unit – The metric unit, see | MetricUnit
   *   @Param value – The metric value
   *   @Param resolution – The metric resolution, see | MetricResolution
   */
  static addMetric (name: string, unit: MetricUnit, value: number, resolution?: MetricResolution): void {
    return metrics.addMetric(name, unit, value, resolution)
  }
}
