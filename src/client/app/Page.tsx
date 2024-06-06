import { ElementType, ReactNode } from 'react'
import Layout from './layout'
import { useStoreContext } from '@/client/lib/store'

import Icon from '../components/RenderIcon'

const Page = ({
  title,
  icon,
  children,
}: {
  title?: string
  icon?: string
  children: ReactNode
}) => {
  const { state } = useStoreContext()

  if (!state) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <div className="flex items-center my-6">
        <Icon i={icon} size={48} className="mr-4" />
        <h1 className="text-2xl font-semibold">
          <span>{title}</span>
        </h1>
      </div>
      {children}
    </Layout>
  )
}

export default Page
