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
