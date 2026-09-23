import "dotenv/config"
import { defineConfig } from "prisma/config"

// Migrations need the session pooler (DIRECT_URL, port 5432).
// Runtime queries use the transaction pooler (DATABASE_URL) in lib/prisma.ts.
const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL

if (!url) {
  throw new Error(
    "Set DIRECT_URL to the Supabase session pooler on port 5432. DATABASE_URL is the pooled runtime connection.",
  )
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url,
  },
})
