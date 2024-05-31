import http from "node:http";

import { json } from "./middlewares/json";
import { formdata } from "./middlewares/formdata";
import { routes } from "./routes";
import { extractQueryParams } from "./utils/extract-query-params";

declare module "http" {
  interface IncomingMessage {
    body?: any;
    params?: any;
    query?: any;
    files?: any;
  }
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await formdata(req, res);
  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url!);
  });

  if (route) {
    const routeParams = req.url!.match(route.path);

    const params = routeParams?.groups;
    req.params = params;
    req.query = params?.query ? extractQueryParams(params.query) : {};
    delete req.params.query;

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333, () => {
  console.log("Listening on 3333");
});
