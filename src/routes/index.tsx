import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WebLayout from '@/components/layouts/WebLayout'
import Home from '@/pages/home'


const router = createBrowserRouter([
  {
    path: '/porto-app/',
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // Add more routes here
    ],
  },
])

export function Router() {
  return <RouterProvider router={router} />
}

export default Router