import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { ItemBaseStyle } from '@styles/selectItemStyles';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { STATUS_OPTIONS } from '@constants/data/productData';
import { ProductStatus } from '@@types/index';

const Container = styled.div`
  position: relative;
  width: 100px;
  font-size: 12px;
`;

const SelectorButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  background-color: ${Color.WHITE};
  border: 1px solid #e8eef2;
  border-radius: 6px;
  ${ItemBaseStyle};
`;

const DropdownList = styled.div`
  position: absolute;
  top: 28px;
  left: 0;
  width: 100%;
  background-color: ${Color.WHITE};
  border: 1px solid #e8eef2;
  border-radius: 6px;
  box-sizing: border-box;
  z-index: 10;
  overflow: hidden;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const OptionItem = styled.div`
  width: 100%;
  background-color: ${Color.WHITE};
  ${ItemBaseStyle};

  &:not(:first-of-type) {
    border-top: 1px solid #e8eef2;
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

const Dot = styled.div<{ color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  flex-shrink: 0;
`;

const Label = styled.span`
  line-height: 24px;
  font-weight: 700;
  white-space: nowrap;
`;

interface SelectWithStatusProps {
  currentStatus: ProductStatus;
  onStatusChange: (status: ProductStatus) => void;
}

function SelectWithStatus({ currentStatus, onStatusChange }: SelectWithStatusProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = STATUS_OPTIONS.find((opt) => opt.value === currentStatus) || STATUS_OPTIONS[0];

  const handleSelect = (value: ProductStatus) => {
    onStatusChange(value);
    setIsOpen(false);
  };

  return (
    <Container ref={containerRef}>
      <SelectorButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        <Dot color={currentOption.color} />
        <Label>{currentOption.label}</Label>
      </SelectorButton>

      {isOpen && (
        <DropdownList>
          {STATUS_OPTIONS.map((option) => (
            <OptionItem key={option.value} onClick={() => handleSelect(option.value)}>
              <Dot color={option.color} />
              <Label>{option.label}</Label>
            </OptionItem>
          ))}
        </DropdownList>
      )}
    </Container>
  );
}

export default SelectWithStatus;
