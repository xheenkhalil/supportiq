/**
 * Splits long text into smaller chunks suitable for Vector Databases.
 * Target chunk size: 1000 characters
 * Overlap: 200 characters (helps maintain context between chunks)
 */
export const splitTextIntoChunks = (text: string, chunkSize: number = 1000): string[] => {
  if (!text) return [];

  const chunks: string[] = [];
  let currentChunk = '';

  // 1. Split by newlines (Paragraphs)
  const paragraphs = text.split(/\n\s*\n/); 

  for (const paragraph of paragraphs) {
    const cleanParagraph = paragraph.trim();
    
    if (!cleanParagraph) continue;

    if ((currentChunk.length + cleanParagraph.length) > chunkSize) {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = cleanParagraph;
    } else {
      currentChunk = currentChunk ? `${currentChunk}\n\n${cleanParagraph}` : cleanParagraph;
    }
  }

  if (currentChunk) chunks.push(currentChunk);

  return chunks;
};