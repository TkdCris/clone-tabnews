const { exec } = require("node:child_process");

function checkPostgres() {
  exec('docker exec tabnews-db pg_isready --host localhost', handleReturn);

  function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    } else {
      console.log("\n🟢 Aceitando conexões! \n");
    }
  }
}

process.stdout.write("🔴 Aguardando Postgres aceitar conexões");

checkPostgres();
