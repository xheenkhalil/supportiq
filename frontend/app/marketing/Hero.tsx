'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-black">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 rounded-[100%] blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-[100%] blur-[100px] opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-medium mb-8 hover:bg-white/10 transition-colors cursor-default"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            New: RAG Pipeline v2.0 is live
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6"
          >
            Turn Your Content Into <br />
            <span className="text-white">Intelligent Conversations</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed"
          >
            SupportIQ scrapes your website and documents to build a ChatGPT-style support agent in seconds. No coding required.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/create">
              <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-zinc-200 font-semibold rounded-full">
                Build My Chatbot
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/20 text-black hover:bg-zinc-200/10 rounded-full">
                View Live Demo
              </Button>
            </Link>
          </motion.div>

          {/* Features Grid (Mini) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20 text-left w-full max-w-4xl"
          >
            {[
              { title: "Instant Scraping", desc: "Just paste your URL", icon: Zap },
              { title: "Smart Retrieval", desc: "Powered by Gemini AI", icon: Bot },
              { title: "Easy Embed", desc: "Copy-paste 1 line of code", icon: CheckCircle2 },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
                <feature.icon className="w-8 h-8 text-indigo-400 mb-4" />
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-zinc-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}