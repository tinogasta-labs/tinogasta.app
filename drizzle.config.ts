import type { Config } from 'drizzle-kit'
import { config } from 'dotenv'

config({
  path: '.dev.vars',
})

export default {
  schema: './app/database/schema',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.AUTH_TOKEN,
  },
  out: './drizzle',
} satisfies Config
