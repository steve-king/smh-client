import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

import '@fontsource-variable/jetbrains-mono'
import './index.css'
import { App } from '@/client/app'
import { Dashboard, Nodes, Node, Services, Error } from './pages'
// import { StoreProvider } from '@/client/lib/store'
import { ThemeProvider } from '@/client/app/providers/theme-provider'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/nodes" element={<Nodes />} />
      <Route path="/node/:name" element={<Node />} />
      <Route path="/services" element={<Services />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <StoreProvider> */}
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
    {/* </StoreProvider> */}
  </React.StrictMode>
)
