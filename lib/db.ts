const tasksPath = "lib/tasks.json"
const tasksFile = await Bun.file(tasksPath)

interface Task {
  task: string;
  status: "pending" | "in-progress" | "done";
}

const tasks: Task[] = await tasksFile.exists() ? await tasksFile.json() : []

export const get = () => {
  return tasks;
};

export const add = async (task: string) => {
  tasks.push({ task, status: "pending" });
  await saveTasks();
};

export const remove = async (id: number) => {
  tasks.splice(id, 1);
  await saveTasks();
};

export const updateStatus = async (
  id: number,
  status: "done" | "pending" | "in-progress"
) => {
  const task = tasks[id];
  task.status = status;
  await saveTasks();
};

export const update = async (id: number, task: string) => {
  if (tasks[id] == null) {
    throw new Error("Task not found");
  }
  tasks[id].task = task;
  await saveTasks();
};

const saveTasks = async () => {
  await Bun.write(tasksPath, JSON.stringify(tasks));
};