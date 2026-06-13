import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-800 border-t border-dark-700 mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-accent font-bold mb-4">ABD Freelance</h3>
            <p className="text-secondary text-sm">
              A modern marketplace connecting clients with talented freelancers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/browse" className="text-secondary hover:text-accent transition">
                  Browse Gigs
                </Link>
              </li>
              <li>
                <Link to="/sellers" className="text-secondary hover:text-accent transition">
                  Find Sellers
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-secondary hover:text-accent transition">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-primary font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-secondary hover:text-accent transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary hover:text-accent transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-secondary hover:text-accent transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-primary font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-secondary hover:text-accent transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-secondary hover:text-accent transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-secondary hover:text-accent transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary text-sm mb-4 md:mb-0">
              © {currentYear} ABD Freelance. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-secondary hover:text-accent transition">
                Facebook
              </a>
              <a href="#" className="text-secondary hover:text-accent transition">
                Twitter
              </a>
              <a href="#" className="text-secondary hover:text-accent transition">
                LinkedIn
              </a>
              <a href="#" className="text-secondary hover:text-accent transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
