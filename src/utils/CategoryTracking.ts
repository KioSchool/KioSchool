export const scrollToCategory = (categoryId: string, categoryRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>) => {
  const categoryElement = categoryRefs.current[categoryId];

  if (!categoryElement) {
    return;
  }

  const elementPosition = categoryElement.getBoundingClientRect().top;
  const headerHeight = 110;
  const offsetPosition = elementPosition + window.scrollY - headerHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};
