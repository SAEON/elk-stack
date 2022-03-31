import { client } from '../../elasticsearch/index.js'
import { ES_INDEX } from '../../config/index.js'

export default data =>
  client.bulk({
    index: ES_INDEX,
    refresh: true,
    body: data.map(doc => `{ "index": {"_id": "${doc.id}"} }\n${JSON.stringify(doc)}\n`).join(''),
  })
