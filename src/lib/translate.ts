// src/lib/translate.ts
// Utilize a API Fetch global do Next.js / Node 18+ para não precisar de node-fetch

export async function translate(text: string, target: string) {
  const response = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "pt",
      target,
      format: "text",
    }),
  });

  if (!response.ok) {
    throw new Error(`Translation API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as { translatedText: string };
  return data.translatedText;
}
