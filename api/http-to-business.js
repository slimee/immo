module.exports = (plan) => plan
  .with(['addHTTPEndpoint', 'search'], ({ addHTTPEndpoint, search }) => {
    addHTTPEndpoint('GET', '/api/search', search);
  })
