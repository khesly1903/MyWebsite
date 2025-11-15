export function getHeadings(markdownText) {
  const matches = markdownText.match(/^##\s+(.+)$/gm);
  if (!matches) return [];
  return matches.map(h => {
    const title = h.replace(/^##\s+/, "");
    const id = title.toLowerCase().replace(/[^\w]+/g, "-");
    // console.log(title)
    return { title, id };
  });
}

