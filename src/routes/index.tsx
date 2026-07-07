import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WebLayout from '@/components/layouts/WebLayout'
import Home from '@/pages/home'

const CaseStudyPage = lazy(() => import('@/components/organisms/porto/CaseStudyPage'))
const NotFoundPage = lazy(() => import('@/components/organisms/porto/NotFoundPage'))

const PageFallback = () => (
  <div className="container py-32 text-center">
    <p className="mono-caption">Loading</p>
  </div>
)

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <WebLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'projects/:slug',
          element: (
            <Suspense fallback={<PageFallback />}>
              <CaseStudyPage />
            </Suspense>
          ),
        },
        {
          path: '*',
          element: (
            <Suspense fallback={<PageFallback />}>
              <NotFoundPage />
            </Suspense>
          ),
        },
      ],
    },
  ],
  {
    basename: '/porto-app',
  },
)

export const Router = () => <RouterProvider router={router} />
export default Router