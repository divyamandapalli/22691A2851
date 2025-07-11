const { Log } = require("./logMiddleware");

async function run() {
  await Log("backend", "error", "handler", "received string, expected bool");
  await Log("backend", "fatal", "db", "Critical database connection failure.");
  await Log("frontend", "warn", "api", "Slow response from API endpoint.");
}

run();