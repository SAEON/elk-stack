import mappings from './_mappings.js'
import settings from './_settings.js'
import { ES_TEMPLATE, ES_INDEX } from '../../config/index.js'

export default async client =>
  await client.indices.putIndexTemplate({
    name: ES_TEMPLATE,
    create: false,
    body: {
      index_patterns: [ES_INDEX],
      template: {
        settings,
        mappings,
      },
    },
  })
