import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { ProductStatus, STATUS_OPTIONS } from '@constants/data/productData';

const Container = styled.div`
  position: relative;
  width: 100%;
  font-size: 12px;
  color: #464a4d;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const SelectorButton = styled.button<{ isOpen: boolean }>`
  width: 100px;
  height: 24px;
  background-color: ${Color.WHITE};
  border: 1px solid #e8eef2;
  border-radius: 6px;
  padding-left: 24px;
  gap: 8px;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  ${rowFlex({ justify: 'flex-start', align: 'center' })}
`;

const DropdownList = styled.div`
  position: absolute;
  top: 24px;
  left: 24;
  width: 100px;
  background-color: ${Color.WHITE};
  border: 1px solid #e8eef2;
  border-top: none;
  border-radius: 6px;
  box-sizing: border-box;
  z-index: 10;
  overflow: hidden;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const OptionItem = styled.div`
  height: 24px;
  width: 100%;
  cursor: pointer;
  border-top: 1px solid #e8eef2;
  background-color: ${Color.WHITE};
  padding-left: 48px;
  gap: 12px;
  ${rowFlex({ justify: 'flex-start', align: 'center' })};

  &:hover {
    background-color: #f9f9f9;
  }
`;

const Dot = styled.div<{ color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const Label = styled.span`
  line-height: 24px;
  font-weight: 700;
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
