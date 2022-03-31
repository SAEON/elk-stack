import { Client } from 'es7.14'
import { ES_ADDRESS } from '../config/index.js'

export const client = new Client({ node: ES_ADDRESS })
