import * as db from "../lib/db";

export const commands = {
  add: (...descriptions: string[]) => {
    if (descriptions.length === 0) {
      console.log("No description provided");
      return;
    } else {
      descriptions.forEach((description) => {
        db.add(description)
          .then((id) => console.log(`The task with id ${id} is added`))
          .catch((error) => {
            console.error(error.message);
          });
      });
    }
  },
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
      if (db.get().length === 0) {
        console.log("No tasks found");
        return;
      }
      db.get().forEach((task) => {
        console.log(`${task.id}: ${task.description}`);
      });
    }
  },
  remove: (...ids: string[]) => {
    if (ids.length === 0) {
      console.log("No ids provided");
      return;
    }

    if (ids.length === 1 && ids[0] === "all") {
      db.get().map((task) =>
        db
          .remove(task.id)
          .then(() => console.log(`The task with id ${task.id} is removed`))
      );
    }

    ids.forEach((id) => {
      db.remove(id)
        .then(() => console.log(`The task with id ${id} is removed`))
        .catch((error) => {
          console.error(error.message);
        });
    });
  },
  update: (id: string, description: string) => {
    db.update(id, description).catch((error) => {
      console.error(error.message);
    });
  },
  "update-status": (id: string, status: "done" | "pending" | "in-progress") => {
    db.updateStatus(id, status)
      .then(() => console.log(`Marked task with id ${id} as ${status}`))
      .catch((error) => {
        console.error(error.message);
      });
  },
};
