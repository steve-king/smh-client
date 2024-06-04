import { ReactNode } from 'react'

import { Separator } from '@/client/components/ui/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/client/components/ui/tabs'

import { Dashboard } from '@/client/app/dashboard/Dashboard'

interface Props {
  children?: ReactNode
}

const Header = () => {
  return (
    <header>
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="node">Node</TabsTrigger>
            <TabsTrigger value="ser">Services</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="peers">Peers</TabsTrigger>
          </TabsList>
          {/* <div className="mr-4">SMH Client</div> */}
        </div>
        <div>Settings</div>
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
  children?: ReactNode
}) => {
  return (
    <TabsContent value={props.value}>
      <h1 className="text-2xl font-semibold">{props.title}</h1>
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
          <TabContent value="dashboard" title="Dashboard">
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
