import { ElementType, ReactNode } from 'react'
import { Separator } from '@/client/components/ui/separator'
import Layout from './layout'

const Page = ({
  title,
  Icon,
  children,
}: {
  title: string
  Icon?: ElementType
  children: ReactNode
}) => {
  return (
    <Layout>
      <div className="flex items-center my-6">
        {Icon && <Icon className="mr-2" size={32} />}
        <h1 className="text-2xl font-semibold">
          <span>{title}</span>
        </h1>
      </div>
      {/* <Separator className="my-4" /> */}
      {children}
    </Layout>
  )
}

export default Page
