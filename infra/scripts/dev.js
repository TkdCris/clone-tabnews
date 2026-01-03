const { spawn } = require("node:child_process");

function run(cmd, args) {
  return new Promise((resolve) => {
    const process = spawn(cmd, args, { stdio: "inherit", shell: true });
    process.on("close", (code) => {
      resolve(code);
    });
  });
}

const runAsync = async () => {
  await run("npm", ["run", "services:up"]);
  await run("npm", ["run", "services:wait:database"]);
  await run("npm", ["run", "migrations:up"]);
  run("next", ["dev"]);
};

const shutdown = () => {
  console.log("\n🧹 Encerrando serviços...");
  run("npm", ["run", "services:stop"]);
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

runAsync();
