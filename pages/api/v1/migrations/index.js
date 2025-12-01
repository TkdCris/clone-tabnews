import migrationRunner from 'node-pg-migrate';
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const allowedMethods = ["POST", "GET"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({ error: `Method ${request.method} not allowed` });
  }

  const dbClient =await database.getNewClient();

  try {
    const defaultMigrationOptions = {
      dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    }

    if(request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions)
      return response.status(200).json(pendingMigrations);
    }

    if(request.method === "POST") {
      const migratedMigrations = await migrationRunner({...defaultMigrationOptions, dryRun: false})
      
      const statusCode = (migratedMigrations.length > 0) ? 201 : 200;
      return response.status(statusCode).json(migratedMigrations);
    }
    
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
