import http from "node:http";
import fs from "node:fs/promises";

import { parse } from "csv-parse";

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
    method: "POST",
    path: buildRoutePath("/tasks/csv"),
    handler: async (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (!req.files.file[0]) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ error: "Missing file" }));
      }

      const content = await fs.readFile(req.files.file[0].filepath);
      const parser = parse(content, { columns: true });

      for await (const record of parser) {
        const { title, description } = record;
        await taskRepository.createTask(title, description);
      }
      await fs.unlink(req.files.file[0].filepath);

      return res.end();
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
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: async (req: http.IncomingMessage, res: http.ServerResponse) => {
      const taskToToggleComplete = await taskRepository.searchTaskById(
        req.params.id,
      );
      if (!taskToToggleComplete) {
        return res.writeHead(404).end();
      }

      await taskRepository.toggleCompleteTask(taskToToggleComplete);

      return res.writeHead(204).end();
    },
  },
];
