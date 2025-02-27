export const scrollToCategory = (categoryId: string, categoryRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>) => {
  const categoryElement = categoryRefs.current[categoryId];

  if (!categoryElement) return;

  const elementPosition = categoryElement.getBoundingClientRect().top;
  const headerHeight = 110;
  const offsetPosition = elementPosition + window.scrollY - headerHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};

export const scrollToCategoryBadge = (categoryId: string, containerRef: React.RefObject<HTMLDivElement>) => {
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
