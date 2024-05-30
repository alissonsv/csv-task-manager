import { UUID } from "node:crypto";

export type Task = {
  id: UUID;
  title: string;
  description: string;
  completed_at: Date | null;
  created_at: Date;
  updated_at: Date;
};
