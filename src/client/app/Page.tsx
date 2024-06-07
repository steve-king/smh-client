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
      <div className="flex items-end my-6">
        {/* <div></div> */}
        <h1 className="flex items-center text-2xl font-semibold grow">
          <Icon i={icon} size={48} className="mr-4" />
          <span>{title}</span>
        </h1>
        {Actions && <Actions />}
      </div>
      {children}
    </Layout>
  )
}

export default Page
