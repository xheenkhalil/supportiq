import { Router, Request, Response } from 'express';
import { processWebsite } from '../services/ingestion';

const router = Router();

// POST /api/scraper/ingest
router.post('/ingest', async (req: Request, res: Response): Promise<void> => {
  try {
    const { url, chatbotId } = req.body;

    // Strict Validation
    if (!url || !chatbotId) {
      res.status(400).json({ error: 'Both "url" and "chatbotId" are required.' });
      return;
    }

    console.log(`\n📥 Ingesting ${url} for Bot ${chatbotId}`);

    // Call the heavy ingestion process
    const stats = await processWebsite(url, chatbotId);

    res.status(200).json({
      status: 'success',
      message: 'Ingestion complete',
      data: stats
    });

  } catch (error: any) {
    console.error('❌ Ingestion Error:', error.message);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

export default router;