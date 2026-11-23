import { useState } from 'react';
import styled from '@emotion/styled';
import { RiAddLine } from '@remixicon/react';

import defaultProductImage from '@resources/image/defaultWorkspaceImage.png';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { AdminProduct, ProductStatus, ProductType } from '@@types/index';

const Container = styled.aside`
  gap: 14px;
  ${colFlex()}
`;

const Heading = styled.div`
  gap: 3px;
  ${colFlex()}
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  color: ${Color.TEXT_STRONG};
`;

const Description = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: ${Color.TEXT_SUBTLE};
`;

const Screen = styled.div`
  overflow: hidden;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 20px;
  background: ${Color.WHITE};
  box-shadow: 0 12px 32px rgba(37, 40, 43, 0.08);
  ${colFlex()}
`;

const ScreenTitle = styled.div`
  padding: 18px 18px 12px;
  font-size: 17px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

const CategoryTabs = styled.div`
  overflow-x: auto;
  padding: 0 18px 12px;
  border-bottom: 1px solid ${Color.BORDER_GREY};
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

const CategoryButton = styled.button<{ isSelected: boolean }>`
  flex-shrink: 0;
  padding: 7px 11px;
  border: 1px solid ${({ isSelected }) => (isSelected ? Color.KIO_ORANGE : Color.BORDER_GREY)};
  border-radius: 999px;
  background: ${({ isSelected }) => (isSelected ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  font-size: 11px;
  font-weight: 700;
  color: ${({ isSelected }) => (isSelected ? Color.KIO_ORANGE_DARK : Color.TEXT_SUBTLE)};
  cursor: pointer;
`;

const ProductList = styled.div`
  max-height: 476px;
  overflow-y: auto;
  padding: 4px 18px 18px;
  ${colFlex()}
`;

const ProductItem = styled.div`
  padding: 14px 0 18px;
  border-bottom: 1px solid ${Color.BORDER_GREY};
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}

  &:last-of-type {
    border-bottom: none;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
  gap: 4px;
  ${colFlex()}
`;

const Badge = styled.span`
  width: fit-content;
  padding: 3px 6px;
  border-radius: 999px;
  background: ${Color.KIO_ORANGE_FAINT};
  font-size: 9px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE_DARK};
`;

const ProductName = styled.strong<{ isSoldOut: boolean }>`
  overflow: hidden;
  font-size: 14px;
  color: ${({ isSoldOut }) => (isSoldOut ? Color.TEXT_HINT : Color.TEXT_STRONG)};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductDescription = styled.span`
  display: -webkit-box;
  overflow: hidden;
  font-size: 11px;
  line-height: 1.45;
  color: ${Color.TEXT_SUBTLE};
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const PriceArea = styled.div`
  padding-top: 2px;
  gap: 5px;
  ${rowFlex({ align: 'baseline' })}
`;

const OriginalPrice = styled.span`
  font-size: 10px;
  color: ${Color.TEXT_HINT};
  text-decoration: line-through;
`;

const Price = styled.strong`
  font-size: 13px;
  color: ${Color.TEXT_DEFAULT};
`;

const ImageArea = styled.div`
  position: relative;
  width: 88px;
  height: 88px;
  flex-shrink: 0;
`;

const ProductImage = styled.img<{ isSoldOut: boolean }>`
  width: 88px;
  height: 88px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 11px;
  box-sizing: border-box;
  object-fit: cover;
  opacity: ${({ isSoldOut }) => (isSoldOut ? 0.5 : 1)};
`;

const AddButton = styled.div`
  position: absolute;
  right: 0;
  bottom: -8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${Color.WHITE};
  box-shadow: 0 3px 8px rgba(37, 40, 43, 0.2);
  color: ${Color.KIO_ORANGE};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const SoldOut = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 11px;
  background: rgba(37, 40, 43, 0.42);
  font-size: 12px;
  font-weight: 700;
  color: ${Color.WHITE};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Empty = styled.div`
  min-height: 180px;
  font-size: 12px;
  color: ${Color.TEXT_SUBTLE};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface ProductListPreviewProps {
  categories: Array<{ id: number | null; name: string }>;
  products: AdminProduct[];
}

function ProductListPreview({ categories, products }: ProductListPreviewProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const hasSelectedCategory = categories.some((category) => category.id === selectedCategoryId);
  const firstCategoryId = categories[0]?.id ?? null;
  const activeCategoryId = hasSelectedCategory ? selectedCategoryId : firstCategoryId;
  const visibleProducts = products.filter((product) => (product.productCategory?.id ?? null) === activeCategoryId);

  return (
    <Container>
      <Heading>
        <Title>손님 주문 화면 미리보기</Title>
        <Description>등록한 카테고리와 메뉴가 손님에게 보이는 모습을 확인할 수 있어요.</Description>
      </Heading>
      <Screen>
        <ScreenTitle>메뉴를 선택해주세요</ScreenTitle>
        <CategoryTabs>
          {categories.map((category) => (
            <CategoryButton
              type="button"
              key={category.id ?? 'default'}
              isSelected={category.id === activeCategoryId}
              onClick={() => setSelectedCategoryId(category.id)}
            >
              {category.name}
            </CategoryButton>
          ))}
        </CategoryTabs>
        <ProductList>
          {visibleProducts.map((product) => {
            const isSet = product.type === ProductType.SET;
            const isSoldOut = product.effectiveStatus !== ProductStatus.SELLING;
            const hasDiscount = isSet && Boolean(product.discountPrice) && product.originalPrice !== null;

            return (
              <ProductItem key={product.id}>
                <ProductInfo>
                  {isSet && <Badge>세트</Badge>}
                  <ProductName isSoldOut={isSoldOut}>{product.name}</ProductName>
                  <ProductDescription>{product.description}</ProductDescription>
                  <PriceArea>
                    {hasDiscount && <OriginalPrice>{product.originalPrice?.toLocaleString()}원</OriginalPrice>}
                    <Price>{product.price.toLocaleString()}원</Price>
                  </PriceArea>
                </ProductInfo>
                <ImageArea>
                  <ProductImage isSoldOut={isSoldOut} src={product.imageUrl || defaultProductImage} alt="" />
                  {isSoldOut ? (
                    <SoldOut>품절</SoldOut>
                  ) : (
                    <AddButton aria-hidden="true">
                      <RiAddLine size={18} />
                    </AddButton>
                  )}
                </ImageArea>
              </ProductItem>
            );
          })}
          {visibleProducts.length === 0 && <Empty>이 카테고리에 등록된 메뉴가 없습니다.</Empty>}
        </ProductList>
      </Screen>
    </Container>
  );
}

export default ProductListPreview;
