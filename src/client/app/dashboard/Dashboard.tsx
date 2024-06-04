import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/client/components/ui/card'
import { Separator } from '@/client/components/ui/separator'
import { ReactNode } from 'react'

const CardTemplate = ({
  title,
  icon,
  children,
}: {
  title: string
  icon: string
  children?: ReactNode
}) => {
  return (
    <Card className="flex items-center">
      {icon && <div className="pl-4">{icon}</div>}
      <div>
        <CardHeader className="pb-1">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </div>
    </Card>
  )
}

export const Dashboard = () => {
  return (
    <div>
      <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <CardTemplate title="SMH Price" icon="dollar">
            <p>Card Content</p>
            <p>Card Footer</p>
          </CardTemplate>
        </div>
        <div>
          <CardTemplate title="Network" icon="globe">
            <p>Card Content</p>
            <p>Card Footer</p>
          </CardTemplate>
        </div>
        <div>
          <CardTemplate title="Storage" icon="hardDrive">
            <p>Card Content</p>
            <p>Card Footer</p>
          </CardTemplate>
        </div>
        <div>
          <CardTemplate title="Next layer" icon="layers">
            <p>Card Content</p>
            <p>Card Footer</p>
          </CardTemplate>
        </div>
      </div>
      <Separator />
    </div>
  )
}
