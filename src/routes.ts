import http from "node:http";

import { TaskRepository } from "./repositories/task-repository";
import { buildRoutePath } from "./utils/build-route-path";

const taskRepository = new TaskRepository();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: async (req: http.IncomingMessage, res: http.ServerResponse) => {
      const { title, description } = req.body;

      if (!title) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ error: "Missing param: title" }));
      }

      if (!description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ error: "Missing param: description" }));
      }

      await taskRepository.createTask(title, description);

      return res.writeHead(201).end();
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: async (req: http.IncomingMessage, res: http.ServerResponse) => {
      const { title, description } = req.query;
      const tasks = await taskRepository.readTasks(title, description);

      return res.end(JSON.stringify(tasks));
    },
  },
];
