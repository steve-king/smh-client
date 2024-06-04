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
            <p>$2.50</p>
            <p>Source: Coingecko</p>
          </CardTemplate>
        </div>
        <div>
          <CardTemplate title="Network" icon="globe">
            <p>Epoch: 23 Layer: 93972</p>
            <p>Progress bar</p>
          </CardTemplate>
        </div>
        <div>
          <CardTemplate title="Storage" icon="hardDrive">
            <p>120 SUs / 7.5 TiB</p>
            <p>Services: 4</p>
          </CardTemplate>
        </div>
        <div>
          <CardTemplate title="Next layer" icon="layers">
            <p>14 hrs, 23 min</p>
            <p>Node: Homelab</p>
          </CardTemplate>
        </div>
      </div>
      <Separator />
    </div>
  )
}
