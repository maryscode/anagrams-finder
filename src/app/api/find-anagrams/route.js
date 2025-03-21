// src/app/api/find-anagrams/route.js

export async function POST(req) {
    const body = await req.json();
    const { sentence } = body;
  
    if (!sentence || sentence.trim().length === 0) {
      return Response.json({ error: 'Text is required' }, { status: 400 });
    }
  
    const sanitizedWords = sentence.toLowerCase().match(/[a-z]+/g) || [];
    const uniqueWords = new Set(sanitizedWords);
    const wordMap = new Map();
  
    sanitizedWords.forEach((word) => {
      const sorted = word.split('').sort().join('');
      if (!wordMap.has(sorted)) wordMap.set(sorted, new Set());
      wordMap.get(sorted).add(word);
    });
  
    const anagrams = Array.from(wordMap.values())
      .map((set) => Array.from(set))
      .filter((group) => group.length > 1);
  
    return Response.json({
      uniqueWords: [...uniqueWords],
      anagrams,
    });
  }
  