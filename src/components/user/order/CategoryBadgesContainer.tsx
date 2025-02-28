import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Product, ProductCategory } from '@@types/index';
import _ from 'lodash';
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

const CategoryLabel = styled.div<{ isSelected?: boolean }>`
  width: auto;
  padding: 5px 10px;
  border-bottom: 3px solid ${({ isSelected }) => (isSelected ? 'black' : 'transparent')};
`;

interface CategoryBadgesContainerProps {
  productCategories: ProductCategory[];
  productsByCategory: _.Dictionary<Product[]>;
}

function CategoryBadgesContainer({ productCategories, productsByCategory }: CategoryBadgesContainerProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (categoryId: number) => {
    scrollToCategoryBadge(categoryId, containerRef);
    setActiveCategory(categoryId);
  };

  return (
    <Container className="category-badges-container" ref={containerRef}>
      {productCategories.map(
        (category) =>
          productsByCategory[category.id] && (
            <Link
              key={`category_${category.id}`}
              activeClass="active"
              to={`category_${category.id}`}
              spy={true}
              smooth={true}
              offset={-350}
              duration={400}
              onSetActive={() => {
                handleCategoryClick(category.id);
              }}
            >
              <CategoryLabel id={`categoryBadge_${category.id}`} onClick={() => handleCategoryClick(category.id)} isSelected={activeCategory === category.id}>
                {category.name}
              </CategoryLabel>
            </Link>
          ),
      )}
      {productsByCategory.undefined && (
        <Link
          key="category_default"
          activeClass="active"
          to="category_default"
          spy={true}
          smooth={true}
          offset={-350}
          duration={400}
          onSetActive={() => {
            handleCategoryClick(-1);
          }}
        >
          <CategoryLabel id="categoryBadge_-1" onClick={() => handleCategoryClick(-1)} isSelected={activeCategory === -1}>
            기본 메뉴
          </CategoryLabel>
        </Link>
      )}
    </Container>
  );
}

export default CategoryBadgesContainer;
