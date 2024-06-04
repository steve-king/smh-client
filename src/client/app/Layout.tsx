import { ReactNode } from 'react'

import { Separator } from '@/client/components/shadcn/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/client/components/shadcn/tabs'

import { Dashboard } from '@/client/app/dashboard/Dashboard'

import { Gauge } from 'lucide-react'

interface Props {
  children?: ReactNode
}

const Header = () => {
  return (
    <header className="bg-zinc-900 dark">
      <div className="container py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2 flex items-center">
            <img
              src="/logo-spacemesh.png"
              width="48"
              height="auto"
              className="rounded-xl border-4"
            />
            {/* SMH Client */}
          </div>
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="node">Node</TabsTrigger>
            <TabsTrigger value="ser">Services</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="peers">Peers</TabsTrigger>
          </TabsList>
        </div>

        <a href="#" className="link">
          Settings
        </a>
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
        {Icon && <Icon className="mr-2" />}
        <h1 className="text-2xl font-semibold">
          <span>{props.title}</span>
        </h1>
      </div>
      <Separator className="my-6" />
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
          <TabContent value="node" title="Node">
            Node content
          </TabContent>
          <TabContent value="services" title="Services">
            Services content
          </TabContent>
          <TabContent value="events" title="Events">
            Events content
          </TabContent>
          <TabContent value="peers" title="Peers">
            Peers content
          </TabContent>
          {children}
        </main>
        <Footer />
      </Tabs>
    </div>
  )
}
