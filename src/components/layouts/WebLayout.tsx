import { Outlet } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Footer } from '@/components/organisms/porto/Footer'
import { Navigation } from '@/components/layouts/Navigation'

interface WebLayoutProps {
  children?: ReactNode
}

export const WebLayout = ({ children }: WebLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F7EDE2] flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">{children || <Outlet />}</main>
      <Footer />
    </div>
  )
}

export default WebLayout
