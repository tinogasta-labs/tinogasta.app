import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

type DatabaseProps = {
  url: string
  authToken: string
}

export function buildDatabase({ url, authToken }: DatabaseProps) {
  const client = createClient({ url, authToken })
  return drizzle(client)
}
