import * as db from "../lib/db";

export const commands = {
  add: db.add,
  list: (status?: "done" | "pending" | "in-progress") => {
    if (status) {
      const tasks = db.get().filter((task) => task.status === status);
      if (tasks.length === 0) {
        console.log(`No tasks with status ${status}`);
        return;
      }

      tasks.forEach((task) => {
        console.log(`${task.id}: ${task.description}`);
      });
    } else {
      db.get().forEach((task) => {
        console.log(`${task.id}: ${task.description}`);
      });
    }
  },
  remove: db.remove,
  update: (id: string, description: string) => {
    db.update(id, description).catch((error) => {
      console.error(error.message);
    });
  },
  "update-status": (id: string, status: "done" | "pending" | "in-progress") => {
    db.updateStatus(id, status).catch((error) => {
      console.error(error.message);
    });
  },
};
