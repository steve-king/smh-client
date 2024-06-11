import { ElementType, ReactNode } from 'react'
import Layout from './layout'

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
  return (
    <Layout>
      <div className="flex items-end my-6">
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
