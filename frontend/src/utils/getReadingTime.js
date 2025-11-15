export function getReadingTime(text) {
  if (!text) return "—";

  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = wordCount / wordsPerMinute;

  const time = minutes < 1 ? "<1 min" : `${Math.ceil(minutes)} min`;

  return `⏱ ${time} read`;
}
