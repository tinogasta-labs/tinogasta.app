import { LoaderFunctionArgs, MetaFunction, defer } from '@remix-run/cloudflare'
import { Await, Form, Link, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import { Input } from '~/components/ui/input'
import { clearEmptyParams, useIsPending } from '~/utils/misc'
import { search } from '~/utils/search.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'Buscar | Tinogasta App' },
    {
      name: 'description',
      content: 'Bienvenido a Tinogasta App',
    },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  await clearEmptyParams(url)
  const query = url.searchParams.get('q')
  const services = search({ query })
  return defer(
    {
      query,
      services,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    },
  )
}

export default function SearchRoute() {
  const { services, query } = useLoaderData<typeof loader>()
  const isSubmitting = useIsPending({
    formMethod: 'GET',
    formAction: '/search',
  })

  return (
    <div className="container py-8">
      <Form role="search" action="/search">
        <Input
          type="search"
          name={'q'}
          placeholder="¿Qué estás buscando?"
          defaultValue={query ?? ''}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
        />
        {query && query.length > 1 ? (
          <Link to="/search" prefetch="intent">
            Clear
          </Link>
        ) : null}
      </Form>

      {query && query.length > 1 ? (
        <div className="search-details">
          <span>Servicios que coinciden con “{query}”</span>
          <Link to="/search" prefetch="intent">
            &times; clear search
          </Link>
        </div>
      ) : null}
      {isSubmitting ? (
        <p>Loading...</p>
      ) : (
        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={services}>
            {services => <pre>{JSON.stringify(services, null, 2)}</pre>}
          </Await>
        </Suspense>
      )}
    </div>
  )
}
