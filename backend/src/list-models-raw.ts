import dotenv from 'dotenv';
dotenv.config();

const key = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

async function run() {
  console.log('Fetching models from:', url.replace(key || '', 'HIDDEN_KEY'));
  try {
    const res = await fetch(url);
    if (!res.ok) {
        console.error(`Error: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.error(text);
        return;
    }
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}
run();
