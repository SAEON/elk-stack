import fetch from 'node-fetch'
import btoa from 'btoa'
import { FormData } from 'formdata-node'
import { ODP_CLIENT_ID, ODP_CLIENT_SECRET, ODP_AUTH, ODP_AUTH_SCOPES } from '../config/index.js'
import { addSeconds, differenceInSeconds } from 'date-fns'

const ACCESS_TOKEN = btoa(`${ODP_CLIENT_ID}:${ODP_CLIENT_SECRET}`)

var access_token_
var expires_at
var expires_in_
var scope_
var token_type_

export default async ({ useCachedToken = true } = {}) => {
  if (useCachedToken && differenceInSeconds(expires_at, new Date()) > 3600) {
    return {
      access_token: access_token_,
      expires_in: expires_in_,
      scope: scope_,
      token_type: token_type_,
    }
  }

  const form = new FormData()
  form.append('grant_type', 'client_credentials')
  form.append('scope', ODP_AUTH_SCOPES)

  const res = await fetch(`${ODP_AUTH}/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${ACCESS_TOKEN}`,
    },
    body: form,
  })

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  const { access_token, expires_in, scope, token_type } = await res.json()

  expires_at = addSeconds(new Date(), expires_in)
  access_token_ = access_token
  expires_in_ = expires_in
  scope_ = scope
  token_type_ = token_type

  return {
    access_token,
    expires_in,
    scope,
    token_type,
  }
}
