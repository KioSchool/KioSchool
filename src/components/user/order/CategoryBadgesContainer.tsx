import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Product, ProductCategory } from '@@types/index';
import _ from 'lodash';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

interface CategoryBadgesContainerProps {
  productCategories: ProductCategory[];
  productsByCategory: _.Dictionary<Product[]>;
  categoryRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}

const Container = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  gap: 8px;
  overflow: scroll;
  ${rowFlex({ align: 'center' })}
  border-top: 10px solid ${Color.LIGHT_GREY};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryLabel = styled.div<{ isSelected?: boolean }>`
  width: auto;
  padding: 0 10px;
  border-bottom: ${({ isSelected }) => (isSelected ? '3px solid black' : 'none')};
  ${colFlex({ justify: 'center' })}
`;

function CategoryBadgesContainer({ productCategories, productsByCategory, categoryRefs }: CategoryBadgesContainerProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const scrollToCategory = (categoryId: string) => {
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

  const updateActiveCategory = () => {
    const headerHeight = 110;
    const scrollPosition = window.scrollY + headerHeight;

    let newActiveCategory: string | null = null;

    Object.entries(categoryRefs.current).forEach(([key, element]) => {
      if (!element) {
        return;
      }

      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const isInSectionBounds = scrollPosition >= elementTop && scrollPosition < elementTop + elementHeight;

      if (isInSectionBounds) {
        newActiveCategory = key;
        return;
      }
    });

    setActiveCategory(newActiveCategory);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateActiveCategory);

    return () => {
      window.removeEventListener('scroll', updateActiveCategory);
    };
  }, []);

  return (
    <Container className="category-badges-container">
      {productCategories.map(
        (category) =>
          productsByCategory[category.id] && (
            <CategoryLabel
              onClick={() => scrollToCategory(String(category.id))}
              key={`category_${category.id}`}
              isSelected={activeCategory === String(category.id)}
            >
              {category.name}
            </CategoryLabel>
          ),
      )}
      {productsByCategory.undefined && (
        <CategoryLabel onClick={() => scrollToCategory('.')} key={`category_null`} isSelected={activeCategory === '.'}>
          기본 메뉴
        </CategoryLabel>
      )}
    </Container>
  );
}

export default CategoryBadgesContainer;
