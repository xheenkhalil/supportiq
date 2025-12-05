import { generateEmbedding } from './ai';
import { supabaseAdmin } from '../config/supabase';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const answerQuestion = async (question: string, chatbotId: string) => {
  
  // 1. Convert Question to Vector
  const questionEmbedding = await generateEmbedding(question);

  // 2. Search Database for Matching Chunks
  const { data: chunks, error } = await supabaseAdmin.rpc('match_documents', {
    query_embedding: questionEmbedding,
    match_threshold: 0.3, 
    match_count: 8, // Increased from 5 to 8 to give the AI more reading material
    filter_chatbot_id: chatbotId
  });

  if (error) {
    throw new Error(`Vector Search Failed: ${error.message}`);
  }

  // 3. Construct Context
  const contextText = chunks?.map((c: any) => c.content).join('\n\n---\n\n') || '';
  
  if (!contextText) {
    return { 
      answer: "I checked my knowledge base but couldn't find relevant information to answer that.", 
      sources: [] 
    };
  }

  // 4. Configure Model with "Link-Aware" Persona
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash', 
    systemInstruction: {
      role: 'system',
      parts: [{ text: `
        You are an intelligent and detailed AI Support Agent.
        
        YOUR GOAL:
        Answer the user's question accurately using ONLY the provided context.
        
        GUIDELINES:
        1. Be Comprehensive: Do not give one-sentence answers unless the context is very thin. Explain the "Why" and "How".
        2. Analyze: If the user asks "Is X good for Y?", look for evidence in the context to support a "Yes" or "No".
        3. LINKS ARE CRITICAL: If the context contains Markdown links (e.g. [Sign Up](/signup) or [Pricing](https://example.com)), you MUST include them in your answer so the user can click them. Convert relative links to absolute URLs if the base domain is obvious, otherwise keep them as is.
        4. Tone: Professional, helpful, and convincing.
        5. Fallback: If the answer is strictly not in the context, say "I don't have enough information in my knowledge base to answer that."
      `}]
    }
  });

  const prompt = `
    CONTEXT INFORMATION:
    ${contextText}

    USER QUESTION: 
    ${question}
  `;

  // 5. Generate Answer
  const result = await model.generateContent(prompt);
  const answer = result.response.text();

  return {
    answer,
    sources: chunks.map((c: any) => c.id)
  };
};