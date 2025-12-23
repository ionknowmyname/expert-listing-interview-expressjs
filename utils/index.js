export const normalize = (input) => {
  return input
    .toLowerCase()
    .trim()
    .replace(/[,.-]/g, ' ')        // Remove punctuation
    .replace(/\s+/g, ' ')          // Collapse whitespace
    .split(' ')
    .filter(word => word.length > 2) // Remove short words
    .join(' ')
}
