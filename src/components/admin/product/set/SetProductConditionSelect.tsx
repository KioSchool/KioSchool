import { createPortal } from 'react-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { RiArrowDownSLine, RiCheckLine, RiSearchLine } from '@remixicon/react';

import { DROPDOWN_EVENT_KEY } from '@constants/data/productData';
import defaultProductImage from '@resources/image/defaultWorkspaceImage.png';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { AdminProduct, ProductStatus, ProductType } from '@@types/index';

const MIN_DROPDOWN_WIDTH = 360;
const DROPDOWN_Z_INDEX = 1400;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  min-height: 42px;
  padding: 0 10px;
  border: 1px solid ${({ isOpen }) => (isOpen ? Color.KIO_ORANGE : Color.BORDER_GREY)};
  border-radius: 10px;
  background: ${Color.WHITE};
  font-size: 13px;
  color: ${Color.TEXT_STRONG};
  cursor: pointer;
  gap: 8px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const SelectedProduct = styled.span`
  overflow: hidden;
  min-width: 0;
  gap: 7px;
  ${rowFlex({ align: 'center' })}
`;

const SelectedImage = styled.img`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 7px;
  box-sizing: border-box;
  object-fit: cover;
`;

const SelectedName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Placeholder = styled.span`
  overflow: hidden;
  color: ${Color.TEXT_SUBTLE};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Dropdown = styled.div<{ coords: { top: number; left: number; width: number } }>`
  position: absolute;
  top: ${({ coords }) => coords.top}px;
  left: ${({ coords }) => coords.left}px;
  z-index: ${DROPDOWN_Z_INDEX};
  width: ${({ coords }) => coords.width}px;
  max-height: 390px;
  overflow: hidden;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 16px;
  box-sizing: border-box;
  background: ${Color.WHITE};
  box-shadow: 0 16px 44px rgba(37, 40, 43, 0.18);
  ${colFlex()}
`;

const SearchBox = styled.div`
  margin: 12px 12px 6px;
  padding: 0 13px;
  min-height: 44px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 12px;
  gap: 8px;
  ${rowFlex({ align: 'center' })}
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 13px;
  color: ${Color.TEXT_DEFAULT};

  &::placeholder {
    color: ${Color.TEXT_HINT};
  }
`;

const Options = styled.div`
  overflow-y: auto;
  padding: 0 8px 8px;
  ${colFlex()}
`;

const CategoryGroup = styled.div`
  ${colFlex()}
`;

const CategoryLabel = styled.div`
  padding: 12px 10px 5px;
  font-size: 11px;
  font-weight: 700;
  color: ${Color.TEXT_SUBTLE};
`;

const OptionButton = styled.button<{ isSelected?: boolean }>`
  width: 100%;
  min-height: 56px;
  padding: 7px 10px;
  border: none;
  border-radius: 10px;
  background: ${({ isSelected }) => (isSelected ? Color.GREY_FAINT : Color.WHITE)};
  color: ${Color.TEXT_STRONG};
  text-align: left;
  cursor: pointer;
  gap: 10px;
  ${rowFlex({ align: 'center' })}

  &:hover {
    background: ${Color.LIGHT_GREY};
  }
`;

const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 9px;
  box-sizing: border-box;
  object-fit: cover;
`;

const ProductInfo = styled.span`
  min-width: 0;
  flex: 1;
  gap: 3px;
  ${colFlex()}
`;

const ProductNameRow = styled.span`
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

const ProductName = styled.span`
  overflow: hidden;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SoldOutBadge = styled.span`
  flex-shrink: 0;
  padding: 3px 6px;
  border-radius: 999px;
  background: ${Color.LIGHT_GREY};
  font-size: 10px;
  font-weight: 700;
  color: ${Color.TEXT_SUBTLE};
`;

const ProductPrice = styled.span`
  flex-shrink: 0;
  font-size: 12px;
  color: ${Color.TEXT_SUBTLE};
`;

const SelectedIcon = styled(RiCheckLine)`
  flex-shrink: 0;
  color: ${Color.KIO_ORANGE};
`;

const EmptyText = styled.div`
  padding: 28px 10px;
  font-size: 13px;
  text-align: center;
  color: ${Color.TEXT_SUBTLE};
`;

interface SetProductConditionSelectProps {
  products: AdminProduct[];
  value: number | null;
  onChange: (productId: number | null) => void;
}

function SetProductConditionSelect({ products, value, onChange }: SetProductConditionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [coords, setCoords] = useState({ top: 0, left: 0, width: MIN_DROPDOWN_WIDTH });
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const singleProducts = useMemo(() => products.filter((product) => product.type === ProductType.SINGLE), [products]);
  const selectedProduct = singleProducts.find((product) => product.id === value);

  const productGroups = useMemo(() => {
    const normalizedKeyword = searchKeyword.trim().toLowerCase();
    const filteredProducts = singleProducts.filter((product) => product.name.toLowerCase().includes(normalizedKeyword));

    return filteredProducts.reduce<Record<string, AdminProduct[]>>((groups, product) => {
      const categoryName = product.productCategory?.name || '기본메뉴';
      return { ...groups, [categoryName]: [...(groups[categoryName] || []), product] };
    }, {});
  }, [searchKeyword, singleProducts]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideContainer = !containerRef.current?.contains(target);
      const isOutsideDropdown = !dropdownRef.current?.contains(target);
      if (isOutsideContainer && isOutsideDropdown) setIsOpen(false);
    };
    const handleScroll = () => setIsOpen(false);
    const handleOtherDropdownOpen = () => setIsOpen(false);

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScroll, true);
    window.addEventListener(DROPDOWN_EVENT_KEY, handleOtherDropdownOpen);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener(DROPDOWN_EVENT_KEY, handleOtherDropdownOpen);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!isOpen && containerRef.current) {
      window.dispatchEvent(new Event(DROPDOWN_EVENT_KEY));
      const rect = containerRef.current.getBoundingClientRect();
      const width = Math.max(rect.width, MIN_DROPDOWN_WIDTH);
      setCoords({
        top: rect.bottom + window.scrollY + 6,
        left: Math.max(16, rect.right + window.scrollX - width),
        width,
      });
    }
    setIsOpen((previous) => !previous);
  };

  const handleSelect = (productId: number | null) => {
    onChange(productId);
    setIsOpen(false);
    setSearchKeyword('');
  };

  return (
    <Container ref={containerRef}>
      <SelectButton type="button" isOpen={isOpen} onClick={handleToggle}>
        {selectedProduct ? (
          <SelectedProduct>
            <SelectedImage src={selectedProduct.imageUrl || defaultProductImage} alt="" />
            <SelectedName>{selectedProduct.name}</SelectedName>
          </SelectedProduct>
        ) : (
          <Placeholder>연결 안 함</Placeholder>
        )}
        <RiArrowDownSLine size={18} />
      </SelectButton>

      {isOpen &&
        createPortal(
          <Dropdown ref={dropdownRef} coords={coords}>
            <SearchBox>
              <RiSearchLine size={18} color={Color.TEXT_HINT} />
              <SearchInput autoFocus value={searchKeyword} placeholder="메뉴 이름으로 찾기" onChange={(event) => setSearchKeyword(event.target.value)} />
            </SearchBox>
            <Options>
              <OptionButton type="button" isSelected={value === null} onClick={() => handleSelect(null)}>
                <ProductInfo>
                  <ProductName>연결 안 함</ProductName>
                </ProductInfo>
                {value === null && <SelectedIcon size={18} />}
              </OptionButton>
              {Object.entries(productGroups).map(([categoryName, categoryProducts]) => (
                <CategoryGroup key={categoryName}>
                  <CategoryLabel>{categoryName}</CategoryLabel>
                  {categoryProducts.map((product) => {
                    const isSelected = product.id === value;
                    const isSoldOut = product.status === ProductStatus.SOLD_OUT;

                    return (
                      <OptionButton type="button" key={product.id} isSelected={isSelected} onClick={() => handleSelect(product.id)}>
                        <ProductImage src={product.imageUrl || defaultProductImage} alt="" />
                        <ProductInfo>
                          <ProductNameRow>
                            <ProductName>{product.name}</ProductName>
                            {isSoldOut && <SoldOutBadge>품절</SoldOutBadge>}
                          </ProductNameRow>
                        </ProductInfo>
                        <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
                        {isSelected && <SelectedIcon size={18} />}
                      </OptionButton>
                    );
                  })}
                </CategoryGroup>
              ))}
              {Object.keys(productGroups).length === 0 && <EmptyText>검색 결과가 없습니다.</EmptyText>}
            </Options>
          </Dropdown>,
          document.body,
        )}
    </Container>
  );
}

export default SetProductConditionSelect;
