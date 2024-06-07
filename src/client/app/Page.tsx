import { ElementType, ReactNode } from 'react'
import Layout from './layout'
import { useStoreContext } from '@/client/lib/store'

import Icon from '../components/Icon'

const Page = ({
  title,
  icon,
  children,
  Actions,
}: {
  title?: string
  icon?: string
  children: ReactNode
  Actions?: ElementType
}) => {
  const { state } = useStoreContext()

  if (!state) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <div className="flex items-center my-6">
        <Icon i={icon} size={48} className="mr-4" />
        <h1 className="text-2xl font-semibold grow">
          <span>{title}</span>
        </h1>
        {Actions && <Actions />}
      </div>
      {children}
    </Layout>
  )
}

export default Page
