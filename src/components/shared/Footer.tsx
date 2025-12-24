import Link from "next/link";
import { TrendingUp, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold">Scaling SMB</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              Moving local businesses from digital invisibility to a Predictable Acquisition Machine.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/solutions/web-development" className="hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link href="/solutions/facebook-ads" className="hover:text-primary transition-colors">Facebook Ads</Link></li>
              <li><Link href="/solutions/google-ads" className="hover:text-primary transition-colors">Google Ads</Link></li>
              <li><Link href="/solutions/local-seo" className="hover:text-primary transition-colors">Local SEO</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/solutions" className="hover:text-primary transition-colors">Solutions Library</Link></li>
              <li><Link href="/success-stories" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog Insights</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>growth@scalingsmb.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+853 6275 0705</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Macau</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-muted">
          <p>© {new Date().getFullYear()} Scaling SMB. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
