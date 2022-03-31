import { ES_INDEX } from '../../config/index.js'

export default async data =>
  await client.bulk({
    index: ES_INDEX,
    refresh: true,
    body: data.map(doc => `{ "index": {"_id": "${doc.id}"} }\n${JSON.stringify(doc)}\n`).join(''),
  })
