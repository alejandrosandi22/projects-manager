export function getResolvers(allResolvers) {
  let Query = {};
  let Mutation = {};

  const res = allResolvers.map((resolver) => {
    Query = { ...Query, ...resolver.Query };
    Mutation = { ...Mutation, ...resolver.Mutation };
    return {
      Query,
      Mutation,
    };
  }).reduce((_, b) => b, {});

  return res;
}
