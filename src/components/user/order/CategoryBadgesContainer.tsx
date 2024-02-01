import React from 'react';
import styled from '@emotion/styled';
import AppBadge from '@components/common/badge/AppBadge';
import { Product, Workspace } from '@@types/index';
import _ from 'lodash';

interface CategoryBadgesContainerProps {
  workspace: Workspace;
  productsByCategory: _.Dictionary<Product[]>;
}

const Container = styled.div`
  width: 100vw;
  height: 50px;
  padding-left: 35px;
  box-sizing: border-box;
  display: flex;
  gap: 8px;
  align-items: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function CategoryBadgesContainer({ workspace, productsByCategory }: CategoryBadgesContainerProps) {
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
    <Container>
      {workspace.productCategories.map(
        (category) =>
          productsByCategory[category.id] && (
            <AppBadge onClick={() => scrollToCategory(`product_category${category.id}`)} key={`category${category.id}`}>
              {category.name}
            </AppBadge>
          ),
      )}
      {productsByCategory.undefined && (
        <AppBadge onClick={() => scrollToCategory(`product_categoryundefined`)} key={`categorynull`}>
          기본 메뉴
        </AppBadge>
      )}
    </Container>
  );
}

export default CategoryBadgesContainer;
