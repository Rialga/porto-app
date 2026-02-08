export const Footer = () => {
  return (
    <footer className="border-t border-black/10 bg-white/30 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-black mb-4">Porto App</h3>
            <p className="text-sm text-black/70">
              Building amazing web experiences with modern technologies.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-black mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-black mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-black mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-black/10 text-center text-sm text-black/60">
          © {new Date().getFullYear()} Porto App. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
