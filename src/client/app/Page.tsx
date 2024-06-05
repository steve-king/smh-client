import { ElementType, ReactNode } from 'react'
import { Separator } from '../components/ui/separator'

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
    <>
      <div className="flex items-center">
        {Icon && <Icon className="mr-2" size={32} />}
        <h1 className="text-2xl font-semibold">
          <span>{title}</span>
        </h1>
      </div>
      <Separator className="my-4" />
      {children}
    </>
  )
}

export default Page
