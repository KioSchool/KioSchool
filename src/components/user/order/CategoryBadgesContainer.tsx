import React from 'react';
import styled from '@emotion/styled';
import AppBadge from '@components/common/badge/AppBadge';
import { Product, ProductCategory } from '@@types/index';
import _ from 'lodash';
import { rowFlex } from '@styles/flexStyles';

interface CategoryBadgesContainerProps {
  productCategories: ProductCategory[];
  productsByCategory: _.Dictionary<Product[]>;
}

const Container = styled.div`
  width: 100vw;
  height: 50px;
  padding-left: 35px;
  box-sizing: border-box;
  gap: 8px;
  overflow: scroll;
  ${rowFlex({ align: 'center' })}

  &::-webkit-scrollbar {
    display: none;
  }
`;

function CategoryBadgesContainer({ productCategories, productsByCategory }: CategoryBadgesContainerProps) {
  const scrollToCategory = (categoryId: string) => {
    const categoryElement = document.getElementById(categoryId);
    const elementPosition = categoryElement?.getBoundingClientRect().top;
    const headerHeight = 110;
    const offsetPosition = elementPosition ? elementPosition + window.scrollY - headerHeight : 0;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <Container className={'category-badges-container'}>
      {productCategories.map(
        (category) =>
          productsByCategory[category.id] && (
            <AppBadge onClick={() => scrollToCategory(`product_category_${category.id}`)} key={`category_${category.id}`}>
              {category.name}
            </AppBadge>
          ),
      )}
      {productsByCategory.undefined && (
        <AppBadge onClick={() => scrollToCategory(`product_category_undefined`)} key={`category_null`}>
          기본 메뉴
        </AppBadge>
      )}
    </Container>
  );
}

export default CategoryBadgesContainer;
