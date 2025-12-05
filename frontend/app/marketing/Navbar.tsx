'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { Bot, ChevronDown, BarChart, Globe, Shield, Sparkles } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-xl text-white-900">SupportIQ</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-zinc-300 hover:text-white focus:bg-white/10 data-[active]:bg-white/10 data-[state=open]:bg-white/10">Product</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-zinc-950 border border-zinc-800">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-indigo-500/20 to-indigo-900/50 p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Bot className="h-6 w-6 text-indigo-400" />
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            AI Agent
                          </div>
                          <p className="text-sm leading-tight text-zinc-400">
                            Train a custom chatbot on your website data in seconds.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/features/analytics" title="Analytics" icon={<BarChart className="w-4 h-4 text-indigo-400" />}>
                      See what your customers are asking in real-time.
                    </ListItem>
                    <ListItem href="/features/global" title="Global" icon={<Globe className="w-4 h-4 text-emerald-400" />}>
                      Deploy widgets to any website with one script tag.
                    </ListItem>
                    <ListItem href="/features/security" title="Security" icon={<Shield className="w-4 h-4 text-amber-400" />}>
                      Enterprise-grade encryption and data isolation.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/pricing" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-zinc-300 hover:text-white hover:bg-white/10")}>
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/docs" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-zinc-300 hover:text-white hover:bg-white/10")}>
                    Documentation
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/login">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-lg shadow-indigo-500/25">
              Get Started <Sparkles className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5 hover:text-accent-foreground focus:bg-white/5 focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-100 leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-xs leading-snug text-zinc-500 mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";