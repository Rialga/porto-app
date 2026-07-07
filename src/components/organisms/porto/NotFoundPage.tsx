import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui'

export const NotFoundPage = () => (
  <section className="container py-32 md:py-44 text-center">
    <p className="mono-caption">404</p>
    <h1 className="display-1 mt-4">Not here.</h1>
    <p className="mt-6 text-lg text-muted max-w-xl mx-auto">
      The page you’re looking for doesn’t exist — or it was moved. Try the home page instead.
    </p>
    <div className="mt-10">
      <Button asChild variant="primary" size="lg">
        <Link to="/">
          <ArrowLeft size={14} aria-hidden />
          Back home
        </Link>
      </Button>
    </div>
  </section>
)

export default NotFoundPage