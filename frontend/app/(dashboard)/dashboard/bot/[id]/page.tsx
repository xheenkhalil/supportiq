'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ChatLogs } from '@/components/dashboard/ChatLogs';

interface Chatbot {
  id: string;
  name: string;
  welcome_message: string;
  suggested_questions: string[];
}

export default function BotDashboard() {
  const params = useParams();
  const [bot, setBot] = useState<Chatbot | null>(null);
  const [loading, setLoading] = useState(true);

  // Use the ID from the URL to fetch bot details
  // Note: We need a backend route to GET single bot details.
  // Since we only made "List All", we can reuse that for now and filter, 
  // or just pass dummy data until we update the backend.
  
  useEffect(() => {
    const fetchBot = async () => {
      try {
        // Direct secure fetch by ID
        const res = await api.get(`/chatbots/${params.id}`);
        
        if (res.data.data) {
          setBot(res.data.data);
        } else {
          toast.error('Bot not found');
        }
        
        // (Logic moved up)
      } catch (error) {
        console.error(error);
        toast.error('Failed to load bot');
      } finally {
        setLoading(false);
      }
    };

    fetchBot();
  }, [params.id]);

  const copyEmbedCode = () => {
    const code = `<script src="${window.location.origin}/widget.js" data-chat-id="${bot?.id}"></script>`;
    navigator.clipboard.writeText(code);
    toast.success('Embed code copied!');
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!bot) return <div className="p-8 text-center">Bot not found</div>;

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200/50">
          <div className="space-y-2">
            <Link href="/dashboard" className="text-sm font-medium text-zinc-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">{bot.name}</h1>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold px-2.5 py-1 bg-emerald-100/50 border border-emerald-200/50 rounded-full backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                Active & Trained
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Embed & Settings */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* INSTALLATION CARD */}
            <Card className="border border-zinc-200 bg-white/80 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="border-b border-zinc-100/50 pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Copy size={18} />
                  </span>
                  Installation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-zinc-500 mb-4">
                  Copy and paste this code into the <code>&lt;head&gt;</code> of your website to instantly deploy the widget.
                </p>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-zinc-950 p-6 rounded-lg overflow-x-auto shadow-inner border border-zinc-800">
                     <code className="text-sm font-mono leading-relaxed">
                      <span className="text-purple-400">&lt;script</span><br/>
                      &nbsp;&nbsp;<span className="text-blue-400">src</span>=<span className="text-green-400">"{window.location.origin}/widget.js"</span><br/>
                      &nbsp;&nbsp;<span className="text-blue-400">data-chat-id</span>=<span className="text-green-400">"{bot.id}"</span><br/>
                      <span className="text-purple-400">&gt;&lt;/script&gt;</span>
                    </code>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                      onClick={copyEmbedCode}
                    >
                      <Copy size={14} className="mr-2" /> Copy to Clipboard
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CONFIGURATION CARD */}
            <Card className="border border-zinc-200 bg-white/80 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="border-b border-zinc-100/50 pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                   <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Loader2 size={18} /> {/* Using Loader2 as generic settings icon for now, fix imports if needed */}
                  </span>
                  Configuration & History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                
                {/* Bot Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-zinc-50/50 rounded-xl border border-zinc-100">
                   <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 block">Welcome Message</label>
                    <p className="text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-md p-3 shadow-sm">{bot.welcome_message}</p>
                  </div>
                   <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 block">Suggested Questions</label>
                    <div className="flex flex-wrap gap-2">
                       {bot.suggested_questions?.map((q, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-xs font-medium text-zinc-700 shadow-sm">{q}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chat History Section */}
                <div className="pt-4 border-t border-zinc-100">
                  <h2 className="text-base font-semibold text-zinc-900 mb-4">Recent Conversations</h2>
                  <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
                     <ChatLogs chatbotId={bot.id} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Live Preview (Sticky) */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg text-zinc-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" /> Live Preview
            </h2>
            <div className="sticky top-8">
               <div className="flex justify-center bg-white p-6 rounded-2xl border border-zinc-200 shadow-lg shadow-zinc-200/50 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                {/* Render the Chat Component with Real Data */}
                <ChatInterface 
                  chatbotId={bot.id}
                  initialMessage={bot.welcome_message}
                  suggestions={bot.suggested_questions}
                />
              </div>
               <p className="text-xs text-center text-zinc-400 mt-4">
                This is how your bot looks to visitors.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}