import { useState } from 'react';
import styled from '@emotion/styled';
import { RiAddLine } from '@remixicon/react';
import { useAtomValue } from 'jotai';

import { DEFAULT_FOCAL_POINT } from '@constants/data/workspaceImageData';
import { adminWorkspaceAtom } from '@jotai/admin/atoms';
import { Color } from '@resources/colors';
import defaultWorkspaceImage from '@resources/image/defaultWorkspaceImage.png';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { AdminProduct, ProductStatus, ProductType } from '@@types/index';
import { toObjectPosition } from '@utils/imageFocalPoint';

const PREVIEW_IMAGE_SIZE = 92;

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

const Device = styled.div`
  overflow: hidden;
  width: 100%;
  height: 620px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 24px;
  box-sizing: border-box;
  background: ${Color.WHITE};
  box-shadow: 0 12px 32px rgba(37, 40, 43, 0.1);
`;

const CustomerScreen = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: ${Color.WHITE};
`;

const WorkspaceImage = styled.img<{ objectPosition: string }>`
  width: 100%;
  height: 150px;
  display: block;
  object-fit: cover;
  object-position: ${({ objectPosition }) => objectPosition};
`;

const WorkspaceHeader = styled.div`
  min-height: 100px;
  padding: 18px 20px;
  box-sizing: border-box;
  gap: 7px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const WorkspaceName = styled.strong`
  max-width: 100%;
  overflow: hidden;
  font-size: 19px;
  color: ${Color.TEXT_STRONG};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const WorkspaceDescription = styled.span`
  display: -webkit-box;
  overflow: hidden;
  font-size: 11px;
  line-height: 1.45;
  color: ${Color.TEXT_SUBTLE};
  text-align: center;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const CategoryTabs = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  overflow-x: auto;
  padding: 0 10px;
  border-top: 6px solid ${Color.LIGHT_GREY};
  border-bottom: 1px solid ${Color.LIGHT_GREY};
  box-sizing: border-box;
  background: ${Color.WHITE};
  gap: 3px;
  white-space: nowrap;
  ${rowFlex({ align: 'center' })}

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryButton = styled.button<{ isSelected: boolean }>`
  flex-shrink: 0;
  padding: 10px;
  border: none;
  border-bottom: 3px solid ${({ isSelected }) => (isSelected ? Color.KIO_ORANGE : 'transparent')};
  background: ${Color.WHITE};
  font-size: 12px;
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 500)};
  color: ${({ isSelected }) => (isSelected ? Color.KIO_ORANGE : Color.TEXT_DEFAULT)};
  cursor: pointer;
`;

const Notice = styled.div`
  margin: 14px 18px 4px;
  padding: 10px 12px;
  border-radius: 10px;
  background: ${Color.LIGHT_GREY};
  font-size: 11px;
  line-height: 1.45;
  color: ${Color.TEXT_DEFAULT};
`;

const CategorySection = styled.section`
  padding: 17px 18px 10px;
  border-bottom: 7px solid ${Color.LIGHT_GREY};
`;

const CategoryTitle = styled.h4`
  margin: 0;
  padding: 8px 0;
  font-size: 17px;
  color: ${Color.TEXT_STRONG};
`;

const ProductItem = styled.div`
  padding: 14px 0 20px;
  border-bottom: 1px solid ${Color.BORDER_GREY};
  gap: 12px;
  ${rowFlex({ justify: 'space-between' })}

  &:last-child {
    border-bottom: none;
  }
`;

const ProductInfo = styled.div`
  width: calc(100% - ${PREVIEW_IMAGE_SIZE + 12}px);
  gap: 3px;
  ${colFlex({ justify: 'center' })}
`;

const ProductNameRow = styled.div`
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

const ProductName = styled.strong<{ isSoldOut: boolean }>`
  overflow: hidden;
  font-size: 15px;
  line-height: 1.45;
  color: ${({ isSoldOut }) => (isSoldOut ? Color.DISABLED_GREY : Color.TEXT_STRONG)};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SetBadge = styled.span`
  flex-shrink: 0;
  padding: 3px 6px;
  border-radius: 999px;
  background: ${Color.KIO_ORANGE_FAINT};
  font-size: 9px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE_DARK};
`;

const ProductDescription = styled.span<{ isSoldOut: boolean }>`
  display: -webkit-box;
  overflow: hidden;
  font-size: 11px;
  line-height: 1.45;
  color: ${({ isSoldOut }) => (isSoldOut ? Color.DISABLED_GREY : Color.TEXT_SUBTLE)};
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const PriceArea = styled.div`
  padding-top: 3px;
  gap: 5px;
  ${rowFlex({ align: 'baseline' })}
`;

const OriginalPrice = styled.span`
  font-size: 10px;
  color: ${Color.TEXT_HINT};
  text-decoration: line-through;
`;

const ProductPrice = styled.strong<{ isSoldOut: boolean }>`
  font-size: 14px;
  color: ${({ isSoldOut }) => (isSoldOut ? Color.DISABLED_GREY : Color.TEXT_DEFAULT)};
`;

const ImageArea = styled.div`
  position: relative;
  width: ${PREVIEW_IMAGE_SIZE}px;
  height: ${PREVIEW_IMAGE_SIZE}px;
  flex-shrink: 0;
`;

const ProductImage = styled.img<{ isSoldOut: boolean }>`
  width: ${PREVIEW_IMAGE_SIZE}px;
  height: ${PREVIEW_IMAGE_SIZE}px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 12px;
  box-sizing: border-box;
  object-fit: cover;
  opacity: ${({ isSoldOut }) => (isSoldOut ? 0.55 : 1)};
`;

const AddButton = styled.div`
  position: absolute;
  right: 0;
  bottom: -9px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${Color.WHITE};
  box-shadow: 0 3px 7px rgba(37, 40, 43, 0.22);
  color: ${Color.KIO_ORANGE};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const SoldOutOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: rgba(37, 40, 43, 0.42);
  font-size: 14px;
  font-weight: 700;
  color: ${Color.WHITE};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Empty = styled.div`
  min-height: 180px;
  padding: 20px;
  box-sizing: border-box;
  font-size: 12px;
  color: ${Color.TEXT_SUBTLE};
  text-align: center;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface ProductListPreviewProps {
  categories: Array<{ id: number | null; name: string }>;
  products: AdminProduct[];
}

function ProductListPreview({ categories, products }: ProductListPreviewProps) {
  const workspace = useAtomValue(adminWorkspaceAtom);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const customerProducts = products.filter((product) => product.status !== ProductStatus.HIDDEN);
  const hasDefaultProducts = customerProducts.some((product) => product.productCategory === null);
  const hasDefaultCategory = categories.some((category) => category.id === null);
  const previewCategories = hasDefaultProducts && !hasDefaultCategory ? [...categories, { id: null, name: '기본메뉴' }] : categories;
  const categoriesWithProducts = previewCategories
    .map((category) => ({
      category,
      products: customerProducts.filter((product) => (product.productCategory?.id ?? null) === category.id),
    }))
    .filter(({ products: categoryProducts }) => categoryProducts.length > 0);
  const hasSelectedCategory = categoriesWithProducts.some(({ category }) => category.id === selectedCategoryId);
  const firstCategoryId = categoriesWithProducts[0]?.category.id ?? null;
  const activeCategoryId = hasSelectedCategory ? selectedCategoryId : firstCategoryId;
  const workspaceImage = workspace.images[0];
  const imageUrl = workspaceImage?.url || defaultWorkspaceImage;
  const imagePosition = toObjectPosition(workspaceImage?.focalPoint ?? DEFAULT_FOCAL_POINT);

  return (
    <Container>
      <Heading>
        <Title>손님 주문 화면 미리보기</Title>
        <Description>실제 주문 화면과 같은 순서와 판매 상태로 보여요.</Description>
      </Heading>
      <Device>
        <CustomerScreen>
          <WorkspaceImage src={imageUrl} alt="" objectPosition={imagePosition} />
          <WorkspaceHeader>
            <WorkspaceName>{workspace.name || '주점 이름'}</WorkspaceName>
            <WorkspaceDescription>{workspace.description || '주점 소개가 여기에 표시됩니다.'}</WorkspaceDescription>
          </WorkspaceHeader>
          <CategoryTabs>
            {categoriesWithProducts.map(({ category }) => (
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
          {workspace.notice && <Notice>{workspace.notice}</Notice>}

          {categoriesWithProducts.map(({ category, products: categoryProducts }) => (
            <CategorySection key={category.id ?? 'default'}>
              <CategoryTitle>{category.name}</CategoryTitle>
              {categoryProducts.map((product) => {
                const isSoldOut = product.effectiveStatus !== ProductStatus.SELLING;
                const isSet = product.type === ProductType.SET;
                const hasDiscount = isSet && Boolean(product.discountPrice) && product.originalPrice !== null;

                return (
                  <ProductItem key={product.id}>
                    <ProductInfo>
                      <ProductNameRow>
                        <ProductName isSoldOut={isSoldOut}>{product.name}</ProductName>
                        {isSet && <SetBadge>세트</SetBadge>}
                      </ProductNameRow>
                      <ProductDescription isSoldOut={isSoldOut}>{product.description}</ProductDescription>
                      <PriceArea>
                        {hasDiscount && <OriginalPrice>{product.originalPrice?.toLocaleString()}원</OriginalPrice>}
                        <ProductPrice isSoldOut={isSoldOut}>{product.price.toLocaleString()}원</ProductPrice>
                      </PriceArea>
                    </ProductInfo>
                    <ImageArea>
                      <ProductImage isSoldOut={isSoldOut} src={product.imageUrl || defaultWorkspaceImage} alt={product.name} />
                      {isSoldOut ? (
                        <SoldOutOverlay>품절</SoldOutOverlay>
                      ) : (
                        <AddButton aria-hidden="true">
                          <RiAddLine size={20} />
                        </AddButton>
                      )}
                    </ImageArea>
                  </ProductItem>
                );
              })}
            </CategorySection>
          ))}

          {categoriesWithProducts.length === 0 && <Empty>현재 손님에게 표시할 상품이 없습니다.</Empty>}
        </CustomerScreen>
      </Device>
    </Container>
  );
}

export default ProductListPreview;
