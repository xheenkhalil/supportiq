import Link from 'next/link';
import { Bot, Twitter, Github, Linkedin } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
<Link href="/dashboard" className="flex items-center gap-2">
  <Logo className="w-8 h-8" />
  <span className="font-bold text-xl text-white-900">SupportIQ</span>
</Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Empowering businesses with intelligent, automated support agents that understand your data.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Github size={18} />} href="#" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <FooterLink href="/features">Features</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/integrations">Integrations</FooterLink>
              <FooterLink href="/changelog">Changelog</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <FooterLink href="/docs">Documentation</FooterLink>
              <FooterLink href="/api">API Reference</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/community">Community</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/security">Security</FooterLink>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} SupportIQ Inc. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-zinc-500">
            <span>Made with ❤️ for the Web</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a href={href} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-all">
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-indigo-400 transition-colors">
        {children}
      </Link>
    </li>
  );
}