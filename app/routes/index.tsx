import type { MetaFunction } from '@remix-run/cloudflare'
import { Form } from '@remix-run/react'
import { useState } from 'react'
import { Input } from '~/components/ui/input'

export const meta: MetaFunction = () => {
  return [
    { title: 'Tinogasta App' },
    {
      name: 'description',
      content: 'Bienvenido a Tinogasta App',
    },
  ]
}

export default function Index() {
  const [q, setQ] = useState<string>('')

  return (
    <div className="container py-8">
      <h1 className="font-muted text-3xl">Tinogasta App</h1>
      <p className="text-lg text-muted-foreground">This is a description</p>
      <Form method="GET" action="/search">
        <div className="py-4">
          <Input
            type="search"
            placeholder="¿Qué estás buscando?"
            name={q ? 'q' : undefined}
            value={q ?? undefined}
            onChange={e => setQ(e.target.value)}
          />
        </div>
      </Form>
    </div>
  )
}
