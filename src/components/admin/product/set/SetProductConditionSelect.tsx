import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { RiArrowDownSLine, RiSearchLine } from '@remixicon/react';

import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { AdminProduct, ProductType } from '@@types/index';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  min-height: 42px;
  padding: 0 12px;
  border: 1px solid ${({ isOpen }) => (isOpen ? Color.KIO_ORANGE : Color.BORDER_GREY)};
  border-radius: 10px;
  background: ${Color.WHITE};
  font-size: 13px;
  color: ${Color.TEXT_STRONG};
  cursor: pointer;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Placeholder = styled.span`
  color: ${Color.MUTED_GREY};
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  max-height: 270px;
  overflow: hidden;
  z-index: 20;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 12px;
  background: ${Color.WHITE};
  box-shadow: 0 10px 30px rgba(37, 40, 43, 0.14);
  ${colFlex()}
`;

const SearchBox = styled.div`
  padding: 10px 12px;
  gap: 8px;
  border-bottom: 1px solid ${Color.BORDER_GREY};
  ${rowFlex({ align: 'center' })}
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 13px;
`;

const Options = styled.div`
  overflow-y: auto;
  padding: 6px;
  ${colFlex()}
`;

const OptionButton = styled.button<{ selected?: boolean }>`
  width: 100%;
  padding: 9px 10px;
  border: none;
  border-radius: 8px;
  background: ${({ selected }) => (selected ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  color: ${Color.TEXT_STRONG};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${Color.LIGHT_GREY};
  }
`;

const CategoryLabel = styled.div`
  padding: 8px 10px 4px;
  font-size: 11px;
  font-weight: 700;
  color: ${Color.MUTED_GREY};
`;

const EmptyText = styled.div`
  padding: 20px 10px;
  font-size: 13px;
  text-align: center;
  color: ${Color.MUTED_GREY};
`;

interface SetProductConditionSelectProps {
  products: AdminProduct[];
  value: number | null;
  onChange: (productId: number | null) => void;
}

function SetProductConditionSelect({ products, value, onChange }: SetProductConditionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const singleProducts = products.filter((product) => product.type === ProductType.SINGLE);
  const selectedProduct = singleProducts.find((product) => product.id === value);

  const productGroups = useMemo(() => {
    const normalizedKeyword = searchKeyword.trim().toLowerCase();
    const filteredProducts = singleProducts.filter((product) => product.name.toLowerCase().includes(normalizedKeyword));

    return filteredProducts.reduce<Record<string, AdminProduct[]>>((groups, product) => {
      const categoryName = product.productCategory?.name || '기본메뉴';
      return { ...groups, [categoryName]: [...(groups[categoryName] || []), product] };
    }, {});
  }, [searchKeyword, singleProducts]);

  const handleSelect = (productId: number | null) => {
    onChange(productId);
    setIsOpen(false);
    setSearchKeyword('');
  };

  return (
    <Container onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setIsOpen(false)}>
      <SelectButton type="button" isOpen={isOpen} onClick={() => setIsOpen((previous) => !previous)}>
        {selectedProduct ? selectedProduct.name : <Placeholder>연결 상품 없음</Placeholder>}
        <RiArrowDownSLine size={18} />
      </SelectButton>

      {isOpen && (
        <Dropdown>
          <SearchBox>
            <RiSearchLine size={16} color={Color.MUTED_GREY} />
            <SearchInput autoFocus value={searchKeyword} placeholder="일반 메뉴 검색" onChange={(event) => setSearchKeyword(event.target.value)} />
          </SearchBox>
          <Options>
            <OptionButton type="button" selected={value === null} onClick={() => handleSelect(null)}>
              연결 상품 없음
            </OptionButton>
            {Object.entries(productGroups).map(([categoryName, categoryProducts]) => (
              <div key={categoryName}>
                <CategoryLabel>{categoryName}</CategoryLabel>
                {categoryProducts.map((product) => (
                  <OptionButton type="button" key={product.id} selected={product.id === value} onClick={() => handleSelect(product.id)}>
                    {product.name}
                  </OptionButton>
                ))}
              </div>
            ))}
            {Object.keys(productGroups).length === 0 && <EmptyText>검색 결과가 없습니다.</EmptyText>}
          </Options>
        </Dropdown>
      )}
    </Container>
  );
}

export default SetProductConditionSelect;
