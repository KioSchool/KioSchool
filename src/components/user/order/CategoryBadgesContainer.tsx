import { useRef } from 'react';
import styled from '@emotion/styled';
import { Product, ProductCategory } from '@@types/index';
import { rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { scrollToCategoryBadge } from '@utils/CategoryTracking';
import { Link } from 'react-scroll';

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 0 10px;
  box-sizing: border-box;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  ${rowFlex({ align: 'center' })}
  border-top: 6px solid ${Color.LIGHT_GREY};
  border-bottom: 1px solid ${Color.LIGHT_GREY};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryLink = styled(Link)`
  width: auto;
  padding: 10px 10px;
  border-bottom: 3px solid transparent;

  &.active {
    border-bottom: 3px solid black;
    font-weight: 600;
  }
`;

interface CategoryBadgesContainerProps {
  productCategories: ProductCategory[];
  productsByCategory: _.Dictionary<Product[]>;
}

function CategoryBadgesContainer({ productCategories, productsByCategory }: CategoryBadgesContainerProps) {
  const duration = 400;
  const isScrolling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const categoryClick = (categoryId: number) => {
    if (isScrolling.current) return;

    scrollToCategoryBadge(categoryId, containerRef);
  };

  const blockSpy = (categoryId: number) => {
    isScrolling.current = true;
    scrollToCategoryBadge(categoryId, containerRef);
    setTimeout(() => {
      isScrolling.current = false;
    }, duration);
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
              duration={duration}
              onSetActive={() => {
                categoryClick(category.id);
              }}
              onClick={() => blockSpy(category.id)}
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
          duration={duration}
          onSetActive={() => {
            categoryClick(-1);
          }}
          onClick={() => blockSpy(-1)}
        >
          기본 메뉴
        </CategoryLink>
      )}
    </Container>
  );
}

export default CategoryBadgesContainer;
