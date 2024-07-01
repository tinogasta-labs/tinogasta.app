import type { MetaFunction } from '@remix-run/cloudflare'

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
  return (
    <div className="p-4 font-sans">
      <h1 className="text-3xl">Tinogasta App</h1>
    </div>
  )
}
