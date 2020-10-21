import { createConnection } from 'typeorm'

process.env.NODE_ENV ? createConnection({
  type: 'sqlite',
  database: './src/database/test.sqlite',
  dropSchema: true,
  migrationsRun: true,
  migrations: ['./src/database/migrations/*.ts'],
  cli: { migrationsDir: './src/database/migrations' }
}) : createConnection()
