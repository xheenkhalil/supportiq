'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Loader2, AlertCircle } from 'lucide-react';

interface PublicBotData {
  id: string;
  name: string;
  welcome_message: string;
  suggested_questions: string[];
  brand_color?: string;
}

export default function WidgetPage() {
  const params = useParams();
  const [bot, setBot] = useState<PublicBotData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPublicBot = async () => {
      try {
        // Call the NEW Public Endpoint
        const res = await api.get(`/chatbots/public/${params.id}`);
        setBot(res.data.data);
      } catch (err) {
        console.error('Widget Load Error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchPublicBot();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-transparent">
        <Loader2 className="animate-spin text-zinc-400 h-8 w-8" />
      </div>
    );
  }

  if (error || !bot) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white p-4 text-center">
        <div className="flex flex-col items-center gap-2 text-red-500">
          <AlertCircle size={32} />
          <p className="text-sm font-medium">Chatbot Unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-white">
      <ChatInterface 
        chatbotId={bot.id}
        initialMessage={bot.welcome_message}
        suggestions={bot.suggested_questions}
        // Future: Pass bot.brand_color here
      />
    </div>
  );
}