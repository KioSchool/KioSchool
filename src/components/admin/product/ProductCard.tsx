import { useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';

import useAdminProducts from '@hooks/admin/useAdminProducts';
import useConfirm from '@hooks/useConfirm';
import defaultProductImage from '@resources/image/defaultWorkspaceImage.png';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { AdminProduct, Product, ProductStatus, ProductType } from '@@types/index';

import SelectWithProductStatus from './SelectWithProductStatus';

const Container = styled.article<{ isSellable: boolean }>`
  width: 100%;
  min-height: 142px;
  padding: 15px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 16px;
  box-sizing: border-box;
  background: ${({ isSellable }) => (isSellable ? Color.WHITE : '#fbfbfb')};
  gap: 16px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
  ${rowFlex({ justify: 'space-between', align: 'center' })}

  &:hover {
    border-color: #d8dde1;
    box-shadow: 0 7px 20px rgba(92, 92, 92, 0.08);
  }
`;

const MenuPreview = styled.button`
  flex: 1;
  min-width: 0;
  padding: 0;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  gap: 16px;
  ${rowFlex({ align: 'center' })}
`;

const Image = styled.img<{ isSellable: boolean }>`
  width: 110px;
  height: 110px;
  flex-shrink: 0;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 12px;
  object-fit: cover;
  opacity: ${({ isSellable }) => (isSellable ? 1 : 0.55)};
`;

const Info = styled.div`
  min-width: 0;
  gap: 7px;
  ${colFlex({ justify: 'center' })}
`;

const BadgeRow = styled.div`
  min-height: 23px;
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

const TypeBadge = styled.span`
  padding: 4px 8px;
  border-radius: 999px;
  background: ${Color.KIO_ORANGE_FAINT};
  font-size: 11px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE_DARK};
`;

const StatusBadge = styled.span<{ warning: boolean }>`
  padding: 4px 8px;
  border-radius: 999px;
  background: ${({ warning }) => (warning ? Color.LIGHT_RED : Color.GREEN_FAINT)};
  font-size: 11px;
  font-weight: 700;
  color: ${({ warning }) => (warning ? Color.RED : Color.GREEN)};
  gap: 4px;
  ${rowFlex({ align: 'center' })}
`;

const ProductName = styled.div<{ isSellable: boolean }>`
  overflow: hidden;
  font-size: 18px;
  font-weight: 700;
  color: ${({ isSellable }) => (isSellable ? Color.TEXT_STRONG : Color.MUTED_GREY)};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Description = styled.div`
  overflow: hidden;
  font-size: 13px;
  line-height: 1.4;
  color: ${Color.MUTED_GREY};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PriceRow = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'baseline' })}
`;

const OriginalPrice = styled.span`
  font-size: 12px;
  color: ${Color.MUTED_GREY};
  text-decoration: line-through;
`;

const Discount = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE};
`;

const Price = styled.strong<{ isSellable: boolean }>`
  font-size: 17px;
  color: ${({ isSellable }) => (isSellable ? Color.TEXT_STRONG : Color.MUTED_GREY)};
`;

const StatusControl = styled.div`
  width: 124px;
  flex-shrink: 0;
  gap: 7px;
  ${colFlex({ align: 'center' })}
`;

const StatusControlLabel = styled.span`
  font-size: 11px;
  color: ${Color.MUTED_GREY};
`;

interface ProductCardProps {
  product: Product | AdminProduct;
  onClick?: () => void;
  showStatusSelector?: boolean;
}

function isAdminProduct(product: Product | AdminProduct): product is AdminProduct {
  return 'effectiveStatus' in product;
}

function getSoldOutLabel(productNames: string[]): string {
  if (productNames.length === 0) return '판매 중지';
  if (productNames.length === 1) return `${productNames[0]} 품절`;
  return `${productNames[0]} 외 ${productNames.length - 1}개 품절`;
}

function ProductCard({ product, onClick, showStatusSelector = true }: ProductCardProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { editProductStatus } = useAdminProducts(workspaceId);
  const { ConfirmModal, confirm } = useConfirm({
    title: '연결된 세트도 함께 품절됩니다.',
    description: '',
    okText: '품절 처리',
    cancelText: '취소',
  });
  const [imageFailed, setImageFailed] = useState(false);
  const adminProduct = isAdminProduct(product) ? product : null;
  const effectiveStatus = adminProduct?.effectiveStatus ?? product.status;
  const isSellable = effectiveStatus === ProductStatus.SELLING;
  const isSetProduct = adminProduct?.type === ProductType.SET;
  const isAutomaticallySoldOut = isSetProduct && product.status === ProductStatus.SELLING && effectiveStatus === ProductStatus.SOLD_OUT;
  const soldOutConditionNames = adminProduct?.components
    .filter((component) => component.conditionProduct?.status === ProductStatus.SOLD_OUT)
    .map((component) => component.conditionProduct?.name)
    .filter((name): name is string => Boolean(name));
  const soldOutLabel = getSoldOutLabel(soldOutConditionNames ?? []);
  const originalPrice = adminProduct?.originalPrice;
  const discountPrice = adminProduct?.discountPrice ?? 0;

  const handleStatusChange = async (newStatus: ProductStatus) => {
    if (newStatus === product.status) return;

    const affectedSets = adminProduct?.linkedSets.filter((linkedSet) => linkedSet.effectiveStatus === ProductStatus.SELLING) ?? [];
    if (newStatus === ProductStatus.SOLD_OUT && affectedSets.length > 0) {
      const setNames = affectedSets.map((linkedSet) => linkedSet.name).join(', ');
      const userConfirmed = await confirm({
        title: `${product.name} 품절 시 세트 ${affectedSets.length}개도 멈춥니다.`,
        description: `${setNames}\n메뉴를 다시 판매하면 다른 조건이 충족된 세트는 자동으로 복구됩니다.`,
      });
      if (!userConfirmed) return;
    }

    editProductStatus(product.id, newStatus).catch(() => alert('판매 상태를 변경하지 못했습니다. 다시 시도해주세요.'));
  };

  return (
    <Container isSellable={isSellable} className="product-card-container">
      <MenuPreview type="button" onClick={onClick} className="content-container">
        <Image
          isSellable={isSellable}
          src={imageFailed || !product.imageUrl ? defaultProductImage : product.imageUrl}
          alt={product.name}
          onError={() => setImageFailed(true)}
        />
        <Info>
          <BadgeRow>
            {isSetProduct && <TypeBadge>세트</TypeBadge>}
            {isAutomaticallySoldOut && (
              <StatusBadge warning>
                <RiErrorWarningFill size={12} />
                {soldOutLabel}로 자동 품절
              </StatusBadge>
            )}
            {isSetProduct && isSellable && (
              <StatusBadge warning={false}>
                <RiCheckboxCircleFill size={12} />
                연결 상태 정상
              </StatusBadge>
            )}
          </BadgeRow>
          <ProductName isSellable={isSellable}>{product.name}</ProductName>
          <Description>{product.description}</Description>
          <PriceRow>
            {isSetProduct && discountPrice > 0 && originalPrice !== null && <OriginalPrice>{originalPrice?.toLocaleString()}원</OriginalPrice>}
            {isSetProduct && discountPrice > 0 && <Discount>{discountPrice.toLocaleString()}원 할인</Discount>}
            <Price isSellable={isSellable}>{product.price.toLocaleString()}원</Price>
          </PriceRow>
        </Info>
      </MenuPreview>

      {showStatusSelector && (
        <StatusControl onClick={(event) => event.stopPropagation()}>
          <StatusControlLabel>{isSetProduct ? '직접 판매 상태' : '판매 상태'}</StatusControlLabel>
          <SelectWithProductStatus currentStatus={product.status} onStatusChange={handleStatusChange} />
        </StatusControl>
      )}
      <ConfirmModal />
    </Container>
  );
}

export default ProductCard;
