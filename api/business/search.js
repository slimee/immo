module.exports = ({ assertPresent, fetchSearchParameters, immoCollection }) => {
  assertPresent({ fetchSearchParameters, immoCollection });
  return async () => {
    const searchParameters = await fetchSearchParameters();
    const filter = {};
    if(searchParameters.valeurFonciere.min) filter.valeur_fonciere = { $gte: searchParameters.valeurFonciere.min,...filter.valeur_fonciere};
    if(searchParameters.valeurFonciere.max) filter.valeur_fonciere = { $lte: searchParameters.valeurFonciere.max,...filter.valeur_fonciere};
    if(searchParameters.dateMutation.min) filter.date_mutation = { $gte: searchParameters.dateMutation.min,...filter.date_mutation};
    if(searchParameters.dateMutation.max) filter.date_mutation = { $lte: searchParameters.dateMutation.max,...filter.date_mutation};
    if(searchParameters.surfaceTerrain.max) filter.surface_terrain = { $gte: searchParameters.surface_terrain.min,...filter.surface_terrain};
    if(searchParameters.surfaceTerrain.max) filter.surface_terrain = { $lte: searchParameters.surface_terrain.max,...filter.surface_terrain};

    return immoCollection()
      .find(filter)
      .limit(30)
      .toArray();
  }
}
