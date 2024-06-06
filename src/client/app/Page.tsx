import { ElementType, ReactNode } from 'react'
import Layout from './layout'
import { useStoreContext } from '@/client/lib/store'

const Page = ({
  title,
  Icon,
  children,
}: {
  title?: string
  Icon?: ElementType
  children: ReactNode
}) => {
  const { state } = useStoreContext()

  if (!state) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <div className="flex items-center my-6">
        {Icon && (
          <Icon
            className="mr-2"
            size={48}
            strokeWidth={1}
            // absoluteStrokeWidth
          />
        )}
        <h1 className="text-2xl font-semibold">
          <span>{title}</span>
        </h1>
      </div>
      {children}
    </Layout>
  )
}

export default Page
