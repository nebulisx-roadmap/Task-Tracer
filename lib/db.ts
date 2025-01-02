const tasksPath = "lib/tasks.json";
const tasksFile = await Bun.file(tasksPath);

interface Task {
  id: string; // This should be a number, but it's a string in the JSON file. It Should be day + minutes + seconds
  description: string;
  status: "pending" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
}

let tasks: Task[] = (await tasksFile.exists()) ? await tasksFile.json() : [];

export const get = () => {
  return tasks;
};

export const add = async (description: string) => {
  tasks.push({
    id: `${new Date().getDay()}${new Date().getMinutes()}${new Date().getSeconds()}`,
    description,
    status: "pending",
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  });
  await saveTasks();
};

export const remove = async (id: string) => {
  tasks = tasks.filter((task) => task.id !== id);
  await saveTasks();
};

export const updateStatus = async (
  id: string,
  status: "done" | "pending" | "in-progress"
) => {
  const task = tasks.filter((task) => task.id === id)[0];
  if (task === undefined) {
    throw new Error("Task not found");
  }

  task.status = status;
  task.updatedAt = new Date().toUTCString();
  await saveTasks();
};

export const update = async (id: string, description: string) => {
  const task = tasks.filter((task) => task.id === id)[0];
  if (task === undefined) {
    throw new Error("Task not found");
  }

  task.description = description;
  task.updatedAt = new Date().toUTCString();
  await saveTasks();
};

const saveTasks = async () => {
  await Bun.write(tasksPath, JSON.stringify(tasks));
};
