import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const key = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

async function run() {
  console.log('Fetching models with axios...');
  try {
    const response = await axios.get(url);
    const data = response.data;
    
    if (!data.models) {
        console.log('No models found in response:', data);
        return;
    }

    const supportedModels = data.models.filter((m: any) => 
        m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')
    );

    console.log('✅ Models supporting generateContent:');
    supportedModels.forEach((m: any) => {
        console.log(`- ${m.name} (Version: ${m.version})`);
    });

  } catch (e: any) {
    console.error('Error fetching models:');
    if (e.response) {
        console.error(`Status: ${e.response.status}`);
        console.error('Data:', JSON.stringify(e.response.data, null, 2));
    } else {
        console.error(e.message);
    }
  }
}
run();
