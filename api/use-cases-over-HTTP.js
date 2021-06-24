module.exports = (plan) => plan
  .addStep('useCasesOverHTTP', planUseCasesOverHTTP => planUseCasesOverHTTP
    .with('fetcher', (fetcher) => fetcher
      .addFetcher('searchParameters', ({ request }) => {
        return {
          valeurFonciere: {
            min: request.query.prixmin ? Number(request.query.prixmin) : undefined,
            max: request.query.prixmax ? Number(request.query.prixmax) : undefined,
          },
          dateMutation: {
            min: request.query.dmmin ? new Date(request.query.dmmin) : undefined,
            max: request.query.dmmax ? new Date(request.query.dmmax) : undefined,
          },
          surfaceTerrain: {
            min: request.query.stmin ? Number(request.query.stmin) : undefined,
            max: request.query.stmax ? Number(request.query.stmax) : undefined,
          }
        }
      }, ['request']))
    .with(
      ['addHTTPEndpoint', 'search'],
      ({addHTTPEndpoint, search}) => addHTTPEndpoint('GET', '/api/search', search)
    ))
