export const testConnection = () =>
  authenticateWithOdp({ useCachedToken: false })
    .then(({ token_type, access_token }) =>
      fetch(`${ODP_API_CATALOGUE_ENDPOINT}?limit=1`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: [token_type, access_token].join(' '),
        },
      })
    )
    .catch(error => {
      throw new Error(`Cannot connect to the ODP. ${error}`)
    })
