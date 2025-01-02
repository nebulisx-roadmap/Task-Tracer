#!/usr/bin/env bun
import { parseArgs } from "util"
import { commands } from "./commands"

const args = process.argv.slice(2);
const options = {
  "task": {
    type: 'string'
  },

}

const { values, positionals } = parseArgs({
  args,
  options: {
    "task": {
      type: 'string',
    },
    "status": {
      type: 'string'
    },
    "id": {
      type: 'string'
    }
  },
  strict: true,
  allowPositionals: true
});

switch (positionals[0]) {
  case "add":
    commands.add(...positionals.slice(1))
    break;
  case "list":
    commands.list(positionals[1] as "done" | "pending" | "in-progress" | undefined)
    break;
  case "delete":
    commands.remove(...positionals.slice(1))
    break;
  case "update":
    commands.update(positionals[1], positionals[2])
    break;
  case "mark-done":
    commands["update-status"](positionals[1], "done")
    break;
  case "mark-pending":
    commands["update-status"](positionals[1], "pending")
    break;
  case "mark-in-progress":
    commands["update-status"](positionals[1], "in-progress")
    break;
  default:
    console.log("Invalid command");
}