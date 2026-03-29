import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Sign Up */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl mb-4 font-semibold uppercase tracking-wider">Sign Up for Emails</h3>
            <p className="text-sm mb-4 text-brand-sand">Receive early access to new arrivals, sales, events + more.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-3 bg-transparent border border-brand-sand text-white placeholder-brand-sand focus:outline-none focus:border-white transition-colors"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-white text-brand-charcoal font-semibold hover:bg-brand-sand transition-colors uppercase text-sm"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-lg font-serif mb-4 uppercase tracking-wider">Help</h4>
            <ul className="space-y-3 text-sm text-brand-sand">
              <li><Link href="#" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Start A Return Or Exchange</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Customer Service</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-lg font-serif mb-4 uppercase tracking-wider">About Aura</h4>
            <ul className="space-y-3 text-sm text-brand-sand">
              <li><Link href="#" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">A&Co. Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Store Locator</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-serif mb-4 uppercase tracking-wider">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <Link href="#" className="text-brand-sand hover:text-white transition-colors">
                <FaInstagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-brand-sand hover:text-white transition-colors">
                <FaPinterest className="h-6 w-6" />
                <span className="sr-only">Pinterest</span>
              </Link>
              <Link href="#" className="text-brand-sand hover:text-white transition-colors">
                <FaFacebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-brand-sand hover:text-white transition-colors">
                <FaTwitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
            <p className="text-xs text-brand-sand">&copy; {new Date().getFullYear()} Aura LLC. All Rights Reserved.</p>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
