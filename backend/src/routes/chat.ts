import { Router, Request, Response } from 'express';
import { answerQuestion } from '../services/rag';
import { supabaseAdmin } from '../config/supabase';

const router = Router();

// POST /api/chat/message
router.post('/message', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, chatbotId, conversationId } = req.body;

    if (!message || !chatbotId) {
      res.status(400).json({ error: 'Both "message" and "chatbotId" are required.' });
      return;
    }

    // 1. Handle Conversation ID (Create if new)
    let currentConversationId = conversationId;

    if (!currentConversationId) {
      const { data: newConv, error: convError } = await supabaseAdmin
        .from('conversations')
        .insert({ chatbot_id: chatbotId })
        .select('id')
        .single();
      
      if (convError) throw new Error(`Failed to create conversation: ${convError.message}`);
      currentConversationId = newConv.id;
    }

    // 2. Save User Message (Async - don't await strictly if you want speed, but safer to await)
    await supabaseAdmin.from('messages').insert({
      conversation_id: currentConversationId,
      role: 'user',
      content: message
    });

    // 3. Get AI Response
    const aiResponse = await answerQuestion(message, chatbotId);

    // 4. Save AI Message
    await supabaseAdmin.from('messages').insert({
      conversation_id: currentConversationId,
      role: 'assistant',
      content: aiResponse.answer
    });

    // 5. Return Response + Conversation ID
    res.status(200).json({
      status: 'success',
      data: {
        ...aiResponse,
        conversationId: currentConversationId
      }
    });

  } catch (error: any) {
    console.error('Chat Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;