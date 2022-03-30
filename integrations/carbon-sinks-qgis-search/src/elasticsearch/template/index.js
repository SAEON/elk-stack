import mappings from './_mappings.js'
import settings from './_settings.js'
import { ES_TEMPLATE } from '../../config/index.js'

export default async client =>
  await client.indices.putIndexTemplate({
    name: ES_TEMPLATE,
    create: false,
    body: {
      index_patterns: [`${ES_TEMPLATE}-*`],
      template: {
        settings,
        mappings,
      },
    },
  })
