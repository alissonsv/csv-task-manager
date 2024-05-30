interface QueryParams {
  [key: string]: string;
}

export function extractQueryParams(query: string): QueryParams {
  return query
    .substring(1)
    .split("&")
    .reduce((queryParams: QueryParams, param: string) => {
      const [key, value] = param.split("=");

      queryParams[key] = value;

      return queryParams;
    }, {});
}
