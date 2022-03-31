import { config } from 'dotenv'
config()

export const ODP_ADDRESS = process.env.ODP_ADDRESS || 'https://odp.saeon.ac.za'
export const ODP_API = `${ODP_ADDRESS}/api`
export const ODP_AUTH = `${ODP_ADDRESS}/auth`
export const ODP_API_CATALOGUE_ENDPOINT = `${ODP_API}/catalogue`
export const ODP_CLIENT_ID = process.env.ODP_CLIENT_ID || ''
export const ODP_CLIENT_SECRET = process.env.ODP_CLIENT_SECRET || ''
export const ODP_AUTH_SCOPES = process.env.ODP_AUTH_SCOPES || ''
