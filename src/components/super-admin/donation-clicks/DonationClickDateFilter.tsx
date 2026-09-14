import { useEffect, useRef, useState } from 'react';
import { RiCalendarLine } from '@remixicon/react';
import styled from '@emotion/styled';
import CustomDatePicker from '@components/common/date-picker/CustomDatePicker';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatDateToYmd } from '@utils/formatDate';

const Bar = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: ${Color.WHITE};
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 12px;
  gap: 10px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const PopoverWrap = styled.div`
  position: relative;

  ${mobileMediaQuery} {
    width: 100%;
  }
`;

const DateTrigger = styled.button`
  height: 36px;
  padding: 0 12px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 6px;
  font-size: 13px;
  color: ${Color.BLACK};
  background: ${Color.WHITE};
  cursor: pointer;
  box-sizing: border-box;
  gap: 6px;
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    width: 100%;
    justify-content: flex-start;
  }
`;

const Popover = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
  z-index: 50;
`;

const Hint = styled.span`
  font-size: 12px;
  color: ${Color.GREY};
`;

interface DonationClickDateFilterProps {
  startDate: Date;
  endDate: Date;
  onChange: (startDate: Date, endDate: Date) => void;
}

function DonationClickDateFilter({ startDate, endDate, onChange }: DonationClickDateFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draftStart, setDraftStart] = useState<Date | null>(startDate);
  const [draftEnd, setDraftEnd] = useState<Date | null>(endDate);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!draftStart || !draftEnd) return;
    if (formatDateToYmd(draftStart) === formatDateToYmd(startDate) && formatDateToYmd(draftEnd) === formatDateToYmd(endDate)) return;
    onChange(draftStart, draftEnd);
    setIsOpen(false);
  }, [draftStart, draftEnd, startDate, endDate, onChange]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  const handleTriggerClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Bar>
      <PopoverWrap ref={popoverRef}>
        <DateTrigger type="button" onClick={handleTriggerClick}>
          <RiCalendarLine size={16} color={Color.GREY} />
          {formatDateToYmd(startDate)} ~ {formatDateToYmd(endDate)}
        </DateTrigger>
        {isOpen && (
          <Popover>
            <CustomDatePicker mode="range" startDate={draftStart} endDate={draftEnd} setStartDate={setDraftStart} setEndDate={setDraftEnd} />
          </Popover>
        )}
      </PopoverWrap>
      <Hint>날짜는 영업일 기준(09:00 ~ 익일 08:59)입니다.</Hint>
    </Bar>
  );
}

export default DonationClickDateFilter;
