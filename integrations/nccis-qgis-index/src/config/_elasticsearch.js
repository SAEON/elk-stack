import { config } from 'dotenv'
config()

export const ES_ADDRESS = process.env.ES_ADDRESS || 'http://localhost:9200'
export const ES_TEMPLATE = 'nccis-qgis'
export const ES_INDEX = `${ES_TEMPLATE}-index`
