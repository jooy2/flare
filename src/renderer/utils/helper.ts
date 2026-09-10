export const openExternalLink = (ev, link: string): void => {
  if (ev) {
    ev.preventDefault();
  }
  window.mainApi.send('openExternalLink', link);
};

export const arrWithNumber = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => i + start);
