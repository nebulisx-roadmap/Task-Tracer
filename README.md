
# Nx Task Tracer

A Simple task tracer cli for Roadmap.sh [Task Tracer](https://roadmap.sh/projects/task-tracker)

## Installation

Clone this repo into your device then run this commands inside it.

```bash
$ bun run build
$ bun link
```

> **Note:** This app uses Bun.

## Getting Started

To use the task tracer CLI, simply run the command `nx-tasker` followed by the desired action.

## Actions

### Add Task

Add a new task to the list.

```bash
$ nx-tasker add <task_description>
```

Example:

```bash
$ nx-tasker add "Buy milk"
# The task with id 0 is added
```

You can also add multiple tasks at once:

```bash
$ nx-tasker add 'Buy milk' 'Walk the dog' 'Do laundry'
# The task with id 0 is added
# The task with id 1 is added
# The task with id 2 is added
```

### List Tasks

List all tasks or tasks with a specific status.

```bash
$ nx-tasker list [status]
```

Example:

```bash
$ nx-tasker list
# Lists all tasks

$ nx-tasker list pending
# Lists only tasks with pending status
```

### Update Task

Update the description of a task.

```bash
$ nx-tasker update <task_id> <new_description>
```

Example:

```bash
$ nx-tasker update 0 'Buy almond milk'
# Updates the task with id 0
```

### Delete Task

Delete a task by its ID.

```bash
$ nx-tasker delete <task_id>
```

Example:

```bash
$ nx-tasker delete 0
# Deletes the task with id 0
```
You can also delete multiple tasks at once:

```bash
$ nx-tasker delete 0 1 2
# Deletes the task with id 0, 1 and 2
```

### Mark Task as Done/Pending/In-Progress

Update the status of a task.

```bash
$ nx-tasker mark-done <task_id>
$ nx-tasker mark-pending <task_id>
$ nx-tasker mark-in-progress <task_id>
```

Example:

```bash
$ nx-tasker mark-done 0
# Marks the task with id 0 as done
```

## Authors

- [Nebulisx](https://www.github.com/nebulisx)


## License

[MIT](https://github.com/nebulisx-roadmap/Task-Tracer/blob/main/LICENSE)
