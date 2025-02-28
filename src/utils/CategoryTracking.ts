export const scrollToCategory = (categoryId: string, categoryRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>, callback: () => void) => {
  const categoryElement = categoryRefs.current[categoryId];
  if (!categoryElement) return;

  const elementPosition = categoryElement.getBoundingClientRect().top;
  const headerHeight = 100;
  const offset = elementPosition + window.scrollY - headerHeight;
  const marginPixel = 2;

  const onScroll = () => {
    if (Math.abs(window.scrollY - offset) < marginPixel) {
      window.removeEventListener('scroll', onScroll);
      callback();
    }
  };

  window.addEventListener('scroll', onScroll);

  window.scrollTo({
    top: offset,
    behavior: 'smooth',
  });
};

export const scrollToCategoryBadge = (categoryId: number, containerRef: React.RefObject<HTMLDivElement>) => {
  if (!containerRef.current) return;

  const escapedId = CSS.escape(`categoryBadge_${categoryId}`);
  const badgeElement = containerRef.current.querySelector(`#${escapedId}`) as HTMLElement | null;
  if (badgeElement) {
    badgeElement.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }
};
