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
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Link href="/create" className="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-1">
              <ArrowLeft size={14} /> Back to Create
            </Link>
            <h1 className="text-3xl font-bold text-zinc-900">{bot.name}</h1>
            <p className="text-zinc-500">Status: <span className="text-green-600 font-medium">Active & Trained</span></p>
          </div>
          <Button onClick={copyEmbedCode} variant="outline" className="gap-2">
            <Copy size={16} /> Copy Embed Code
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Embed & Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Installation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-500 mb-4">
                  Copy and paste this code into the <code>&lt;head&gt;</code> of your website.
                </p>
                <div className="bg-zinc-950 p-4 rounded-md overflow-x-auto group relative">
                  <code className="text-sm text-green-400 font-mono whitespace-nowrap">
                    &lt;script <br/>
                    &nbsp;&nbsp;src="{window.location.origin}/widget.js" <br/>
                    &nbsp;&nbsp;data-chat-id="{bot.id}"<br/>
                    &gt;&lt;/script&gt;
                  </code>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={copyEmbedCode}
                  >
                    <Copy size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* ... existing Cards ... */}
                </div>
                {/* NEW: Chat History Section */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-zinc-900">Conversation History</h2>
                  <ChatLogs chatbotId={bot.id} />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-500">Welcome Message</label>
                  <p className="text-sm">{bot.welcome_message}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-500">Suggested Questions</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {bot.suggested_questions?.map((q, i) => (
                      <span key={i} className="px-2 py-1 bg-zinc-100 rounded text-xs border">{q}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Live Preview */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">Live Preview</h2>
            <div className="flex justify-center bg-white p-8 rounded-xl border shadow-sm">
              {/* Render the Chat Component with Real Data */}
              <ChatInterface 
                chatbotId={bot.id}
                initialMessage={bot.welcome_message}
                suggestions={bot.suggested_questions}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}