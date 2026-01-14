/**
 * Converts a string to capital case, where the first letter of each word is capitalized
 * Used when displaying course names to user
 */
export function capitalCase(string) {
  return string.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());
}
