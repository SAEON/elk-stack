import { ES_TEMPLATE, ES_INDEX } from './config/index.js'
import { client } from './elasticsearch/index.js'
import configureTemplate from './elasticsearch/template/index.js'
import testOdpStatus from './odp/test-connection.js'
import metadata from './metadata/index.js'

// Keep track of script progress (result)
const result = {
  updated: 0,
  created: 0,
  errors: false,
}

// Start the timer
const t0 = performance.now()

console.info('== Configuring ES index template', `"${ES_TEMPLATE}"`)
await configureTemplate(client)

// top the timer
const t1 = performance.now()

// Test that the ODP is up
console.info('== Testing that ODP is available before recreating the index')
await testOdpStatus()

// Delete the existing index
await client.indices
  .delete({ index: ES_INDEX })
  .catch(error =>
    console.error(
      'Error deleting Elasticsearch index',
      ES_INDEX,
      "This probably means it didn't exist and you can ignore this message",
      error
    )
  )

// Recreate the index
console.info('== Creating index', ES_INDEX)
await client.indices.create({ index: ES_INDEX })

// Load metadata
await metadata(result)

// Flush the index
await client.indices.flush({
  index: ES_INDEX,
  wait_if_ongoing: false,
})

// Log the result
const runtime = `${Math.round((t1 - t0) / 1000, 2)} seconds.`
console.info(
  '== Index integration completed in',
  runtime,
  'Result:',
  result,
  "\n== If you don't see this message there was a problem"
)
