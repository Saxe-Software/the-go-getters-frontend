export function caseInsensitiveIncludes(search: string, substr: string) {
  const strip = (str: string) => {
    [',', '"', "'", '.', '!', '?', ' '].forEach(char => str.replace(char, ''));
    return str.toUpperCase();
  };

  return strip(search).includes(strip(substr));
}
