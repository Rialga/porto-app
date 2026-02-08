export const Navigation = () => {
  return (
    <header className="border-b border-black/10 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-black">Porto App</h1>
          <nav className="hidden md:flex gap-6">
            <a
              href="/"
              className="text-sm font-medium text-black/80 hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-sm font-medium text-black/80 hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="/services"
              className="text-sm font-medium text-black/80 hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="/contact"
              className="text-sm font-medium text-black/80 hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-black/80 hover:text-primary transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}
