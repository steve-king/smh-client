import { ReactNode } from 'react'

import { Separator } from '@/client/components/shadcn/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/client/components/shadcn/tabs'

import { Dashboard } from '@/client/app/dashboard/Dashboard'

import {
  Cog,
  Gauge,
  RadioTower,
  HardDrive,
  MessageSquareCode,
  Network,
} from 'lucide-react'

interface Props {
  children?: ReactNode
}

const Header = () => {
  return (
    <header className="bg-white dark">
      <div className="container py-2 flex items-center justify-between">
        <div className="flex items-center shrink-0">
          <div className="-ml-2 -mr-2 flex items-center">
            <img src="/logo-spacemesh-light.png" width="48" height="auto" />
            <h1 className="font-medium">SMH Client</h1>
          </div>
        </div>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="node">Node</TabsTrigger>
          <TabsTrigger value="services">Post Services</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="peers">Peers</TabsTrigger>
          <TabsTrigger value="config">Config</TabsTrigger>
        </TabsList>
        {/* <div>
          <a href="#" className="link">
            Settings
          </a>
        </div> */}
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <footer>
      <div className="py-4 container text-center text-muted-foreground text-xs">
        Server is connected...
      </div>
    </footer>
  )
}

const TabContent = (props: {
  title: string
  value: string
  Icon?: React.ElementType
  children?: ReactNode
}) => {
  const { Icon } = props
  return (
    <TabsContent value={props.value}>
      <div className="flex items-center">
        {Icon && <Icon className="mr-2" size={32} />}
        <h1 className="text-2xl font-semibold">
          <span>{props.title}</span>
        </h1>
      </div>
      <Separator className="my-4" />
      {props.children}
    </TabsContent>
  )
}

export const Layout = ({ children }: Props) => {
  return (
    <div>
      <Tabs defaultValue="dashboard">
        <Header />
        <Separator />
        <main className="container py-4">
          <TabContent value="dashboard" title="Dashboard" Icon={Gauge}>
            <Dashboard />
          </TabContent>
          <TabContent value="node" title="Node" Icon={RadioTower}>
            Node content
          </TabContent>
          <TabContent value="services" title="Post Services" Icon={HardDrive}>
            Services content
          </TabContent>
          <TabContent value="events" title="Events" Icon={MessageSquareCode}>
            Events content
          </TabContent>
          <TabContent value="peers" title="Peers" Icon={Network}>
            Peers content
          </TabContent>
          <TabContent value="config" title="Configuration" Icon={Cog}>
            Configuration content
          </TabContent>
          {children}
        </main>
        <Footer />
      </Tabs>
    </div>
  )
}
