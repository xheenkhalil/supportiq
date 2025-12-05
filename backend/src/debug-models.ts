import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || '');
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        await model.generateContent('Hi');
        console.log('✅ SUCCESS');
        console.log(`\n🎉 USE THIS MODEL NAME: "${modelName}"\n`);
        return; // Stop after finding the first working one
      } catch (e: any) {
        if (e.message.includes('404')) {
          console.log('❌ Not Found (404)');
        } else {
          console.log(`❌ Error: ${e.message}`);
        }
      }
    }
    
    console.log('\n❌ All common model names failed. Check your API Key permissions.');

  } catch (error) {
    console.error('Error:', error);
  }
}

listModels();