import makeIterator from './odp-iterator/index.js'
import insertToEs from './es-insert/index.js'

export default async result => {
  let iterator = await makeIterator()
  while (!iterator.done) {
    const { data } = iterator

    const res = await insertToEs(iterator.data)
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
}
