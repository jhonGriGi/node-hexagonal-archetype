import { Metrics } from '@aws-lambda-powertools/metrics'

const metrics = new Metrics({
  namespace: 'serverlessAirline',
  serviceName: 'products'
})

export default metrics
