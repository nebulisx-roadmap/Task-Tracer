const tasksPath = "lib/tasks.json";
const tasksFile = await Bun.file(tasksPath);

interface Task {
  id: string;
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
  const task = {
    id: `${tasks.length}`,
    description,
    status: "pending" as "pending" | "in-progress" | "done",
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  }
  tasks.push(task);
  await saveTasks();

  return task.id
};

export const remove = async (id: string) => {
  tasks = tasks.filter((task) => task.id !== id);
  resolveIds();
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

const resolveIds = () => {
  tasks.map((task, index) => task.id = index.toString());
};

const saveTasks = async () => {
  await Bun.write(tasksPath, JSON.stringify(tasks));
};
