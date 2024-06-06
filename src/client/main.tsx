import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

import '@fontsource-variable/inter'
import '@fontsource/source-sans-pro'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/source-code-pro'
import './index.css'
import { App } from '@/client/app'
import { Dashboard, Nodes, Node, Error } from './pages'

import { SocketProvider } from '@/client/lib/socket'
import { StoreProvider } from '@/client/lib/store'
import { ThemeProvider } from '@/client/app/providers/theme-provider'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/nodes" element={<Nodes />} />
      <Route path="/nodes/:name" element={<Node />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketProvider>
      <StoreProvider>
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </StoreProvider>
    </SocketProvider>
  </React.StrictMode>
)
