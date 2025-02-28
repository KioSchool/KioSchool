import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Product, ProductCategory } from '@@types/index';
import _ from 'lodash';
import { rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { scrollToCategory, scrollToCategoryBadge } from '@utils/CategoryTracking';

const Container = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  ${rowFlex({ align: 'center' })}
  border-top: 10px solid ${Color.LIGHT_GREY};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryLabel = styled.div<{ isSelected?: boolean }>`
  width: auto;
  padding: 5px 10px;
  border-bottom: 3px solid ${({ isSelected }) => (isSelected ? 'black' : 'transparent')};
`;

interface CategoryBadgesContainerProps {
  productCategories: ProductCategory[];
  productsByCategory: _.Dictionary<Product[]>;
  categoryRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}

function CategoryBadgesContainer({ productCategories, productsByCategory, categoryRefs }: CategoryBadgesContainerProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isManualScrollRef = useRef(false);

  const handleCategoryClick = (categoryId: string) => {
    isManualScrollRef.current = true;

    scrollToCategoryBadge(categoryId, containerRef);
    scrollToCategory(categoryId, categoryRefs, () => {
      setActiveCategory(categoryId);
      isManualScrollRef.current = false;
    });
  };

  const updateActiveCategory = () => {
    if (isManualScrollRef.current) return;

    const headerHeight = 110;
    const scrollPosition = window.scrollY + headerHeight;

    for (const [categoryId, element] of Object.entries(categoryRefs.current)) {
      if (!element) continue;

      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const isInSectionBounds = scrollPosition >= elementTop && scrollPosition < elementTop + elementHeight;

      if (isInSectionBounds) {
        setActiveCategory(categoryId);
        break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', updateActiveCategory);

    return () => {
      window.removeEventListener('scroll', updateActiveCategory);
    };
  }, []);

  useEffect(() => {
    if (activeCategory) {
      scrollToCategoryBadge(activeCategory, containerRef);
    }
  }, [activeCategory]);

  return (
    <Container className="category-badges-container" ref={containerRef}>
      {productCategories.map(
        (category) =>
          productsByCategory[category.id] && (
            <CategoryLabel
              id={`categoryBadge_${category.id}`}
              onClick={() => handleCategoryClick(String(category.id))}
              key={`category_${category.id}`}
              isSelected={activeCategory === String(category.id)}
            >
              {category.name}
            </CategoryLabel>
          ),
      )}
      {productsByCategory.undefined && (
        <CategoryLabel id={`categoryBadge_.`} onClick={() => handleCategoryClick('.')} key={`category_null`} isSelected={activeCategory === '.'}>
          기본 메뉴
        </CategoryLabel>
      )}
    </Container>
  );
}

export default CategoryBadgesContainer;
