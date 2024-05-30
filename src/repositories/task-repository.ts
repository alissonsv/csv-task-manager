import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { Task } from "../models/Task";

const databasePath = path.join(__dirname, "../db.json");

export class TaskRepository {
  private taskDatabase: Task[] = [];

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.taskDatabase = JSON.parse(data);
      })
      .catch(() => this.persist());
  }

  private async persist() {
    await fs.writeFile(databasePath, JSON.stringify(this.taskDatabase));
  }

  async createTask(title: string, description: string): Promise<void> {
    while (true) {
      const uuid = randomUUID();

      const uuidExists = this.taskDatabase.some((task) => task.id === uuid);

      if (!uuidExists) {
        const task: Task = {
          id: uuid,
          title,
          description,
          completed_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        };
        this.taskDatabase.push(task);
        break;
      }
    }

    await this.persist();
  }

  async readTasks(title?: string, description?: string): Promise<Task[]> {
    let data: Task[] = this.taskDatabase;

    if (title || description) {
      data = data.filter((task) => {
        const titleMatch =
          title && task.title.toLowerCase().includes(title?.toLowerCase());
        const descriptionMatch =
          description &&
          task.description.toLowerCase().includes(description.toLowerCase());

        return titleMatch || descriptionMatch;
      });
    }

    return data;
  }
}
