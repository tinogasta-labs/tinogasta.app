import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const services = sqliteTable('services', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
})
