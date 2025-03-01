import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { Product, ProductCategory } from '@@types/index';
import { rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { scrollToCategoryBadge } from '@utils/CategoryTracking';
import { Link } from 'react-scroll';

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

const CategoryLink = styled(Link)`
  width: auto;
  padding: 5px 10px;
  border-bottom: 3px solid transparent;

  &.active {
    border-bottom: 3px solid black;
  }
`;

interface CategoryBadgesContainerProps {
  productCategories: ProductCategory[];
  productsByCategory: _.Dictionary<Product[]>;
}

function CategoryBadgesContainer({ productCategories, productsByCategory }: CategoryBadgesContainerProps) {
  const isScrolling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const categoryClick = (categoryId: number) => {
    if (isScrolling.current) return;

    scrollToCategoryBadge(categoryId, containerRef);
  };

  const blockScroll = (categoryId: number) => {
    isScrolling.current = true;
    scrollToCategoryBadge(categoryId, containerRef);
    setTimeout(() => {
      isScrolling.current = false;
    }, 400);
  };

  return (
    <Container className="category-badges-container" ref={containerRef}>
      {productCategories.map(
        (category) =>
          productsByCategory[category.id] && (
            <CategoryLink
              id={`categoryBadge_${category.id}`}
              key={`category_${category.id}`}
              activeClass="active"
              to={`category_${category.id}`}
              spy={true}
              smooth={true}
              offset={-350}
              duration={400}
              onSetActive={() => {
                categoryClick(category.id);
              }}
              onClick={() => blockScroll(category.id)}
            >
              {category.name}
            </CategoryLink>
          ),
      )}
      {productsByCategory.undefined && (
        <CategoryLink
          id={`categoryBadge_-1`}
          key="category_default"
          activeClass="active"
          to="category_default"
          spy={true}
          smooth={true}
          offset={-350}
          duration={400}
          onSetActive={() => {
            categoryClick(-1);
          }}
          onClick={() => blockScroll(-1)}
        >
          기본 메뉴
        </CategoryLink>
      )}
    </Container>
  );
}

export default CategoryBadgesContainer;
