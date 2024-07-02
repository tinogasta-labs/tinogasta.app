import { AppLoadContext } from '@remix-run/cloudflare'
import { type PlatformProxy } from 'wrangler'
import { z } from 'zod'
import { buildDatabase } from './app/database/db.server'

const AppEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DATABASE_AUTH_TOKEN: z.string().min(1),
})

type Env = z.infer<typeof AppEnvSchema>

type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'>

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    cloudflare: Cloudflare
    db: ReturnType<typeof buildDatabase>
  }
}

type GetLoadContext = (args: {
  request: Request
  context: { cloudflare: Cloudflare }
}) => AppLoadContext

export const getLoadContext: GetLoadContext = ({ context }) => {
  const result = AppEnvSchema.safeParse(context.cloudflare.env)
  if (!result.success) {
    console.error(result.error.flatten())
    throw new Error('Environment variables must be set.')
  }
  return {
    ...context,
    db: buildDatabase({
      url: context.cloudflare.env.DATABASE_URL,
      authToken: context.cloudflare.env.DATABASE_URL,
    }),
  }
}
