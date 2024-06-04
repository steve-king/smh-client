import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/client/components/shadcn/card'
import { Separator } from '@/client/components/shadcn/separator'
import { Component, ReactNode } from 'react'

import { DollarSign, Globe, HardDrive, Layers3 } from 'lucide-react'

const CardTemplate = ({
  title,
  Icon,
  children,
}: {
  title: string
  Icon: React.ElementType
  children?: ReactNode
}) => {
  return (
    <Card className="flex items-center">
      {Icon && (
        <div className="pl-4">
          <Icon className="relative" style={{ top: '2px' }} />
        </div>
      )}
      <div>
        <CardHeader className="pb-0">
          <h2 className="text-bold">{title}</h2>
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
        {/* <div> */}
        <CardTemplate title="SMH Price" Icon={DollarSign}>
          <p className="text-2xl">2.50</p>
          <p>Source: Coingecko</p>
        </CardTemplate>
        {/* </div> */}
        {/* <div> */}
        <CardTemplate title="Network" Icon={Globe}>
          <p>Epoch: 23 Layer: 93972</p>
          <p>Progress bar</p>
        </CardTemplate>
        {/* </div> */}
        {/* <div> */}
        <CardTemplate title="Storage" Icon={HardDrive}>
          <p>120 SUs / 7.5 TiB</p>
          <p>Services: 4</p>
        </CardTemplate>
        {/* </div> */}
        {/* <div> */}
        <CardTemplate title="Next layer" Icon={Layers3}>
          <p>14 hrs, 23 min</p>
          <p>Node: Homelab</p>
        </CardTemplate>
        {/* </div> */}
      </div>
      <Separator />
    </div>
  )
}
