import makeIterator from './extract/index.js'
import insertToEs from './load/index.js'

export default async () => {
  const result = {
    updated: 0,
    created: 0,
    errors: false,
  }

  let iterator = await makeIterator()
  while (!iterator.done) {
    const { data } = iterator
    const res = await insertToEs(data)
    console.info(`Processed ${data.length} records.`, `Response code`, res.statusCode)

    res.items?.forEach(({ index }) => {
      if (index.status === 201) {
        result[index.result]++
      } else {
        result.errors++
      }
    })

    iterator = await iterator.next()
  }

  return result
}
