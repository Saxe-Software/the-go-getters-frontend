export function caseInsensitiveIncludes(search: string, substr: string) {
  const strip = (str: string) => {
    [',', '"', "'", '.', '!', '?', ' '].forEach(char => str.replace(char, ''));
    return str.toUpperCase();
  };

  return strip(search).includes(strip(substr));
}

export function validateEmail(email: string) {
  return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
