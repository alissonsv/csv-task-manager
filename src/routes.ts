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
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: async (req: http.IncomingMessage, res: http.ServerResponse) => {
      const { title, description } = req.body ?? {};

      const taskToBeUpdated = await taskRepository.searchTaskById(
        req.params.id,
      );
      if (!taskToBeUpdated) {
        return res.writeHead(404).end();
      }

      const updatedTask = await taskRepository.updateTask(
        taskToBeUpdated,
        title,
        description,
      );
      return res.end(JSON.stringify(updatedTask));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: async (req: http.IncomingMessage, res: http.ServerResponse) => {
      const taskToBeDeleted = await taskRepository.searchTaskById(
        req.params.id,
      );
      if (!taskToBeDeleted) {
        return res.writeHead(404).end();
      }

      await taskRepository.deleteTask(taskToBeDeleted);

      return res.writeHead(204).end();
    },
  },
];
