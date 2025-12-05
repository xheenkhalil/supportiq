import { Hero } from '@/app/marketing/Hero';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function LandingPage() {
  return (
    <>
      <Hero />
      
      {/* ... Social Proof Section (Keep as is) ... */}

      {/* Feature Section Preview */}
      <section id="demo" className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">See it in action</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-16">
            This demo is running in <strong>Offline Mode</strong>. Try asking about Pricing or Training to see how it responds!
          </p>
          
          {/* Mockup Container */}
          <div className="relative mx-auto max-w-4xl h-[600px] rounded-xl border border-white/10 bg-zinc-900/50 shadow-2xl overflow-hidden flex flex-col">
            <div className="h-10 bg-zinc-900 border-b border-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
              <div className="ml-4 h-6 w-64 bg-white/5 rounded-md" />
            </div>

            <div className="flex-1 bg-white relative">
               {/* DEMO MODE ACTIVATED */}
               <ChatInterface 
                 demoMode={true} 
                 initialMessage="Hi! I'm the SupportIQ Demo. I can teach you how this platform works. Try asking 'How much does it cost?' or 'How do I train a bot?'"
                 suggestions={[
                   "How much does it cost?", 
                   "How do I train a bot?", 
                   "How do I embed it?"
                 ]}
               />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}