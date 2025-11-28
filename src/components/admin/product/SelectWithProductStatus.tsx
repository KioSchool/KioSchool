import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { ItemBaseStyle } from '@styles/selectItemStyles';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { DROPDOWN_EVENT_KEY, STATUS_OPTIONS } from '@constants/data/productData';
import { ProductStatus } from '@@types/index';
import { createPortal } from 'react-dom';

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
  background-color: ${Color.WHITE};
  border: 1px solid #e8eef2;
  border-radius: 6px;
  box-sizing: border-box;
  z-index: 9999;
  overflow: hidden;
  font-size: 12px;
  color: #464a4d;
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

interface SelectWithProductStatusProps {
  currentStatus: ProductStatus;
  onStatusChange: (status: ProductStatus) => void;
}

function SelectWithProductStatus({ currentStatus, onStatusChange }: SelectWithProductStatusProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateDropdownPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const isOutsideContainer = containerRef.current && !containerRef.current.contains(target);
      const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(target);

      if (isOutsideContainer && isOutsideDropdown) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    const handleOtherDropdownOpen = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleScroll, true);
      window.addEventListener(DROPDOWN_EVENT_KEY, handleOtherDropdownOpen);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener(DROPDOWN_EVENT_KEY, handleOtherDropdownOpen);
    };
  }, [isOpen]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isOpen) {
      window.dispatchEvent(new Event(DROPDOWN_EVENT_KEY));
      updateDropdownPosition();
    }
    setIsOpen(!isOpen);
  };

  const currentOption = STATUS_OPTIONS.find((opt) => opt.value === currentStatus) || STATUS_OPTIONS[0];

  const handleSelect = (value: ProductStatus) => {
    onStatusChange(value);
    setIsOpen(false);
  };

  return (
    <Container ref={containerRef}>
      <SelectorButton onClick={toggleDropdown} isOpen={isOpen}>
        <Dot color={currentOption.color} />
        <Label>{currentOption.label}</Label>
      </SelectorButton>

      {isOpen &&
        createPortal(
          <DropdownList ref={dropdownRef} style={{ top: coords.top, left: coords.left, width: coords.width }}>
            {STATUS_OPTIONS.map((option) => (
              <OptionItem key={option.value} onMouseDown={(e) => e.stopPropagation()} onClick={() => handleSelect(option.value)}>
                <Dot color={option.color} />
                <Label>{option.label}</Label>
              </OptionItem>
            ))}
          </DropdownList>,
          document.body,
        )}
    </Container>
  );
}

export default SelectWithProductStatus;
