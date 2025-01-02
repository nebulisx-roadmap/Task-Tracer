import * as db from '../lib/db';

export const commands = {
  add: db.add,
  list: (status?: "done" | "pending" | "in-progress") => {
    if (status) {
      const tasks = db.get().filter((task) => task.status === status);
      tasks.forEach(task => {
        console.log(task.task);
      });
    } else {
      db.get().forEach((task, index) => {
        console.log(`${index}: ${task.task}`);
      });
    }
  },
  remove: db.remove,
  update: db.update,
  "update-status": db.updateStatus,
};
