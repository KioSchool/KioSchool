import { RefObject, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ProductCategory } from '@@types/index';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

// 실제 메뉴 화면처럼 카테고리 머리가 상단 바·배지 줄 아래에 오도록 이만큼 덜 내린다
const SCROLL_OFFSET = 100;

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 0 10px;
  box-sizing: border-box;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  border-top: 6px solid ${Color.LIGHT_GREY};
  border-bottom: 1px solid ${Color.LIGHT_GREY};
  ${rowFlex({ align: 'center' })}

  &::-webkit-scrollbar {
    display: none;
  }
`;

const activeBadgeStyle = css`
  border-bottom: 3px solid ${Color.KIO_ORANGE};
  color: ${Color.KIO_ORANGE};
  font-weight: 600;
`;

const CategoryBadge = styled.button<{ isActive: boolean }>`
  width: auto;
  padding: 10px 10px;
  border: 0;
  border-bottom: 3px solid transparent;
  background: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  cursor: pointer;
  ${({ isActive }) => isActive && activeBadgeStyle}
`;

const getSection = (area: HTMLElement, categoryId: number) => area.querySelector<HTMLElement>(`[data-category-section="${categoryId}"]`);

function findActiveCategory(area: HTMLElement, categories: ProductCategory[]) {
  const passed = categories.filter((category) => {
    const section = getSection(area, category.id);
    return section !== null && section.offsetTop - SCROLL_OFFSET <= area.scrollTop + 1;
  });
  return passed[passed.length - 1]?.id ?? null;
}

interface DemoCategoryBadgesProps {
  categories: ProductCategory[];
  scrollRef: RefObject<HTMLDivElement | null>;
}

function DemoCategoryBadges({ categories, scrollRef }: DemoCategoryBadgesProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const area = scrollRef.current;
    if (!area) return undefined;

    const handleScroll = () => setActiveCategoryId(findActiveCategory(area, categories));
    area.addEventListener('scroll', handleScroll);
    return () => area.removeEventListener('scroll', handleScroll);
  }, [categories, scrollRef]);

  const handleClick = (categoryId: number) => {
    const area = scrollRef.current;
    const section = area && getSection(area, categoryId);
    if (!area || !section) return;
    area.scrollTo({ top: section.offsetTop - SCROLL_OFFSET, behavior: 'smooth' });
  };

  return (
    <Container>
      {categories.map((category) => (
        <CategoryBadge key={category.id} type="button" isActive={activeCategoryId === category.id} onClick={() => handleClick(category.id)}>
          {category.name}
        </CategoryBadge>
      ))}
    </Container>
  );
}

export default DemoCategoryBadges;
