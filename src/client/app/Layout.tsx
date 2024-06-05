import { ReactNode } from 'react'

import { Separator } from '@/client/components/ui/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/client/components/ui/tabs'
import { Button } from '@/client/components/ui/button'

import { Dashboard } from '@/client/app/dashboard/Dashboard'

import {
  Cog as SettingsIcon,
  Gauge as DashboardIcon,
  RadioTower as NodeIcon,
  HardDrive as PostIcon,
  MessageSquareCode as EventsIcon,
  Network as PeersIcon,
} from 'lucide-react'

interface Props {
  children?: ReactNode
}

const Header = () => {
  const iconSize = 20
  return (
    <header>
      <div className="container py-2 flex items-center justify-between">
        <div className="flex items-center shrink-0">
          <div className="-ml-2 -mr-2 flex items-center">
            <img src="/logo-spacemesh-light.png" width="48" height="auto" />
            <h1 className="font-medium">SMH Client</h1>
          </div>
        </div>
        <nav>
          <ul className="flex flex-wrap">
            <li>
              <Button>
                <DashboardIcon className="mr-2" size={iconSize} />
                Dashboard
              </Button>
            </li>
            <li>
              <Button variant="ghost">
                <NodeIcon className="mr-2" size={iconSize} />
                Node
              </Button>
            </li>
            <li>
              <Button variant="ghost">
                <PostIcon className="mr-2" size={iconSize} />
                Post Services
              </Button>
            </li>
            <li>
              <Button variant="ghost">
                <EventsIcon className="mr-2" size={iconSize} />
                Events
              </Button>
            </li>
            <li>
              <Button variant="ghost">
                <PeersIcon className="mr-2" size={iconSize} />
                Peers
              </Button>
            </li>
            <li>
              <Button variant="ghost">
                <SettingsIcon className="mr-2" size={iconSize} />
                Settings
              </Button>
            </li>
          </ul>
        </nav>
        {/* <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="node">Node</TabsTrigger>
          <TabsTrigger value="services">Post Services</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="peers">Peers</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList> */}
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

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Tabs defaultValue="dashboard">
        <Header />
        <Separator />
        <main className="container py-4">
          <TabContent value="dashboard" title="Dashboard" Icon={DashboardIcon}>
            <Dashboard />
          </TabContent>
          <TabContent value="node" title="Node" Icon={NodeIcon}>
            Node content
          </TabContent>
          <TabContent value="services" title="Post Services" Icon={PostIcon}>
            Services content
          </TabContent>
          <TabContent value="events" title="Events" Icon={EventsIcon}>
            Events content
          </TabContent>
          <TabContent value="peers" title="Peers" Icon={PeersIcon}>
            Peers content
          </TabContent>
          <TabContent value="settings" title="Settings" Icon={SettingsIcon}>
            Configuration content
          </TabContent>
          {children}
        </main>
        <Footer />
      </Tabs>
    </div>
  )
}
