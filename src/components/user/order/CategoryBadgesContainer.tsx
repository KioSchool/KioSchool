import React from 'react';
import styled from '@emotion/styled';
import AppBadge from '@components/common/badge/AppBadge';
import { Product, ProductCategory } from '@@types/index';
import _ from 'lodash';
import { rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

interface CategoryBadgesContainerProps {
  productCategories: ProductCategory[];
  productsByCategory: _.Dictionary<Product[]>;
  categoryRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}

const Container = styled.div`
  width: 100%;
  height: 50px;
  padding-left: 35px;
  box-sizing: border-box;
  gap: 8px;
  overflow: scroll;
  ${rowFlex({ align: 'center' })}
  border-top: 10px solid ${Color.LIGHT_GREY};

  &::-webkit-scrollbar {
    display: none;
  }
`;

function CategoryBadgesContainer({ productCategories, productsByCategory, categoryRefs }: CategoryBadgesContainerProps) {
  const scrollToCategory = (categoryId: string) => {
    const categoryElement = categoryRefs.current[categoryId];

    if (categoryElement) {
      const elementPosition = categoryElement.getBoundingClientRect().top;
      const headerHeight = 110;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Container className={'category-badges-container'}>
      {productCategories.map(
        (category) =>
          productsByCategory[category.id] && (
            <AppBadge onClick={() => scrollToCategory(String(category.id))} key={`category_${category.id}`}>
              {category.name}
            </AppBadge>
          ),
      )}
      {productsByCategory.undefined && (
        <AppBadge onClick={() => scrollToCategory('.')} key={`category_null`}>
          기본 메뉴
        </AppBadge>
      )}
    </Container>
  );
}

export default CategoryBadgesContainer;
