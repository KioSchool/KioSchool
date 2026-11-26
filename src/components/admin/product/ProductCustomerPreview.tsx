import styled from '@emotion/styled';
import { RiAddLine } from '@remixicon/react';

import defaultProductImage from '@resources/image/defaultWorkspaceImage.png';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.aside`
  width: 320px;
  gap: 14px;
  ${colFlex()}
`;

const Heading = styled.div`
  gap: 3px;
  ${colFlex()}
`;

const Title = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

const Description = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: ${Color.TEXT_SUBTLE};
`;

const Screen = styled.div`
  width: 100%;
  padding: 18px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 20px;
  box-sizing: border-box;
  background: ${Color.WHITE};
  box-shadow: 0 12px 32px rgba(37, 40, 43, 0.08);
  gap: 16px;
  ${colFlex()}
`;

const ScreenHeader = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid ${Color.BORDER_GREY};
  gap: 6px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const CategoryName = styled.span`
  overflow: hidden;
  font-size: 13px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SetBadge = styled.span`
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 999px;
  background: ${Color.KIO_ORANGE_FAINT};
  font-size: 10px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE_DARK};
`;

const Menu = styled.div`
  gap: 14px;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })}
`;

const MenuText = styled.div`
  flex: 1;
  min-width: 0;
  gap: 5px;
  ${colFlex()}
`;

const MenuName = styled.strong`
  overflow: hidden;
  font-size: 16px;
  line-height: 1.4;
  color: ${Color.TEXT_STRONG};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MenuDescription = styled.span`
  display: -webkit-box;
  overflow: hidden;
  min-height: 38px;
  font-size: 12px;
  line-height: 1.55;
  color: ${Color.TEXT_SUBTLE};
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const ComponentList = styled.div`
  gap: 3px;
  ${colFlex()}
`;

const Component = styled.span`
  overflow: hidden;
  font-size: 11px;
  color: ${Color.TEXT_SUBTLE};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PriceArea = styled.div`
  padding-top: 3px;
  gap: 4px;
  ${colFlex()}
`;

const DiscountRow = styled.div`
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

const OriginalPrice = styled.span`
  font-size: 11px;
  color: ${Color.TEXT_HINT};
  text-decoration: line-through;
`;

const Discount = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE_DARK};
`;

const SalePrice = styled.strong`
  font-size: 15px;
  color: ${Color.TEXT_DEFAULT};
`;

const ImageArea = styled.div`
  position: relative;
  width: 104px;
  height: 104px;
  flex-shrink: 0;
`;

const ProductImage = styled.img`
  width: 104px;
  height: 104px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 12px;
  box-sizing: border-box;
  object-fit: cover;
`;

const AddButton = styled.div`
  position: absolute;
  right: 0;
  bottom: -10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${Color.WHITE};
  box-shadow: 0 3px 8px rgba(37, 40, 43, 0.2);
  color: ${Color.KIO_ORANGE};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface PreviewComponent {
  name: string;
  quantity: number;
}

interface ProductCustomerPreviewProps {
  name: string;
  description: string;
  categoryName: string;
  imageUrl?: string;
  salePrice: number;
  originalPrice?: number;
  discountPrice?: number;
  components?: PreviewComponent[];
  isSet?: boolean;
}

function ProductCustomerPreview({
  name,
  description,
  categoryName,
  imageUrl,
  salePrice,
  originalPrice = 0,
  discountPrice = 0,
  components = [],
  isSet = false,
}: ProductCustomerPreviewProps) {
  const visibleComponents = components.filter((component) => component.name.trim());

  return (
    <Container>
      <Heading>
        <Title>손님 메뉴에 이렇게 보여요</Title>
        <Description>입력한 내용이 주문 화면에 실시간으로 반영됩니다.</Description>
      </Heading>
      <Screen>
        <ScreenHeader>
          <CategoryName>{categoryName || '기본메뉴'}</CategoryName>
          {isSet && <SetBadge>세트</SetBadge>}
        </ScreenHeader>
        <Menu>
          <MenuText>
            <MenuName>{name || '메뉴 이름'}</MenuName>
            <MenuDescription>{description || '메뉴 설명을 입력해주세요.'}</MenuDescription>
            {visibleComponents.length > 0 && (
              <ComponentList>
                {visibleComponents.map((component, index) => (
                  <Component key={`${component.name}-${index}`}>
                    {component.name} × {component.quantity}
                  </Component>
                ))}
              </ComponentList>
            )}
            <PriceArea>
              {discountPrice > 0 && (
                <DiscountRow>
                  <OriginalPrice>{originalPrice.toLocaleString()}원</OriginalPrice>
                  <Discount>{discountPrice.toLocaleString()}원 할인</Discount>
                </DiscountRow>
              )}
              <SalePrice>{salePrice.toLocaleString()}원</SalePrice>
            </PriceArea>
          </MenuText>
          <ImageArea>
            <ProductImage src={imageUrl || defaultProductImage} alt="메뉴 미리보기" />
            <AddButton aria-hidden="true">
              <RiAddLine size={21} />
            </AddButton>
          </ImageArea>
        </Menu>
      </Screen>
    </Container>
  );
}

export default ProductCustomerPreview;
