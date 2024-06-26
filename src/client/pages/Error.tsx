import { useRouteError } from 'react-router-dom'
import Page from '@/client/components/Page'

export default function Error() {
  const error = useRouteError() as any
  console.error(error)

  return (
    <Page title="Error">
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </Page>
  )
}
