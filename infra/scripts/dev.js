const { spawn } = require("node:child_process");

const run = (cmd, args) => spawn(cmd, args, { stdio: "inherit", shell: true });

run("npm", ["run", "services:up"]);
run("npm", ["run", "services:wait:database"]);
run("npm", ["run", "migrations:up"]);

run("next", ["dev"]);

const shutdown = () => {
  console.log("\n🧹 Encerrando serviços...");
  run("npm", ["run", "services:stop"]);
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
