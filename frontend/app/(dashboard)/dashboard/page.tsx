'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, Bot } from 'lucide-react';
import { toast } from 'sonner';

interface Chatbot {
  id: string;
  name: string;
  created_at: string;
}

export default function DashboardHome() {
  const [bots, setBots] = useState<Chatbot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        // SECURE CALL: No ID needed in URL. 
        // The backend middleware reads the User ID from the Auth Token.
        const res = await api.get('/chatbots');
        setBots(res.data.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load chatbots');
      } finally {
        setLoading(false);
      }
    };

    fetchBots();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">My Chatbots</h1>
          <p className="text-zinc-500">Manage and train your AI support agents.</p>
        </div>
        <Link href="/create">
          <Button className="gap-2 shadow-sm bg-indigo-600 hover:bg-indigo-700">
            <Plus size={16} /> New Chatbot
          </Button>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Empty State */}
        {bots.length === 0 && (
          <Link href="/create" className="col-span-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 rounded-xl hover:bg-zinc-50 transition-colors">
            <div className="p-4 bg-white rounded-full shadow-sm mb-4">
              <Bot className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900">No chatbots yet</h3>
            <p className="text-zinc-500 mb-6">Create your first AI agent to get started.</p>
            <Button variant="outline">Create Chatbot</Button>
          </Link>
        )}

        {/* Bot Cards */}
        {bots.map((bot) => (
          <Link key={bot.id} href={`/dashboard/bot/${bot.id}`}>
            <Card className="h-full relative overflow-hidden border border-zinc-200 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group hover:border-indigo-300/50">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <div className="p-2.5 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100/50 rounded-xl shadow-sm group-hover:shadow-md group-hover:from-indigo-100 group-hover:to-white transition-all duration-300">
                  <Bot className="w-5 h-5 text-indigo-600" />
                </div>
              </CardHeader>
              
              <CardContent className="pt-4 relative z-10">
                <CardTitle className="text-xl font-semibold text-zinc-900 truncate">
                  {bot.name}
                </CardTitle>
                <p className="text-sm text-zinc-500 mt-1.5 font-medium">
                  Created {new Date(bot.created_at).toLocaleDateString()}
                </p>
              </CardContent>

              <CardFooter className="pt-2 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold px-2.5 py-1 bg-emerald-100/50 border border-emerald-200/50 rounded-full backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                  Active
                </div>
                <div className="text-xs font-medium text-zinc-400 group-hover:text-indigo-600 flex items-center gap-1 transition-colors duration-300">
                  Manage <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform duration-300">&rarr;</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}