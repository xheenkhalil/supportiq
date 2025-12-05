'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, MessageSquare, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  created_at: string;
  messages: { content: string }[];
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export function ChatLogs({ chatbotId }: { chatbotId: string }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Load Conversations List
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await api.get(`/chatbots/${chatbotId}/conversations`);
        setConversations(res.data.data);
        if (res.data.data.length > 0) {
          setSelectedConvId(res.data.data[0].id); // Select first one automatically
        }
      } catch (error) {
        console.error('Failed to load conversations', error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [chatbotId]);

  // 2. Load Messages for Selected Conversation
  useEffect(() => {
    if (!selectedConvId) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/chatbots/${chatbotId}/conversations/${selectedConvId}`);
        setMessages(res.data.data);
      } catch (error) {
        console.error('Failed to load messages', error);
      }
    };
    fetchMessages();
  }, [selectedConvId, chatbotId]);

  if (loading) return <div className="text-zinc-500 text-sm">Loading history...</div>;
  if (conversations.length === 0) return <div className="text-zinc-500 text-sm">No conversations yet.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px]">
      
      {/* Sidebar: Conversation List */}
      <Card className="col-span-1 border-r md:rounded-r-none h-full flex flex-col">
        <CardHeader className="p-4 border-b">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Recent Sessions
          </CardTitle>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg text-sm transition-colors border",
                  selectedConvId === conv.id 
                    ? "bg-zinc-100 border-zinc-200 font-medium" 
                    : "bg-white border-transparent hover:bg-zinc-50"
                )}
              >
                <div className="truncate text-zinc-900">
                  {conv.messages?.[0]?.content || "New Conversation"}
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-400 mt-1">
                  <Clock className="w-3 h-3" />
                  {new Date(conv.created_at).toLocaleDateString()} at {new Date(conv.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Main Area: Transcript */}
      <Card className="col-span-1 md:col-span-2 md:rounded-l-none h-full border-l-0 flex flex-col">
        <CardHeader className="p-4 border-b bg-zinc-50/50">
          <CardTitle className="text-sm font-medium">Transcript</CardTitle>
        </CardHeader>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  msg.role === 'assistant' ? "bg-indigo-100 text-indigo-600" : "bg-zinc-200 text-zinc-600"
                )}>
                  {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-zinc-500 uppercase">
                    {msg.role}
                  </div>
                  <div className="text-sm text-zinc-800 leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}