import { ES_TEMPLATE } from './config/index.js'
import { client } from './elasticsearch/index.js'
import configureTemplate from './elasticsearch/template/index.js'
import { testConnection as testOdpStatus } from './odp/index.js'

// Start the timer
const t0 = performance.now()

console.info('Configuring ES index template', `"${ES_TEMPLATE}"`)
await configureTemplate(client)

// top the timer
const t1 = performance.now()

// Test that the ODP is up
await testOdpStatus()

// Log the result
const runtime = `${Math.round((t1 - t0) / 1000, 2)} seconds.`
console.info(
  'Index integration completed in',
  runtime,
  "If you don't see this message there was a problem"
)
