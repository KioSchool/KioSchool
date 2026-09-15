import { useState } from 'react';
import { RiSearchLine } from '@remixicon/react';
import styled from '@emotion/styled';
import { AcquisitionSchoolStat } from '@@types/acquisitionSurvey';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatNumber } from '@utils/formatNumber';

const COLLAPSED_ROW_COUNT = 10;
const GRID_COLUMNS = 'minmax(0, 2fr) 1fr 1fr 1fr minmax(0, 2fr)';
const GRID_COLUMNS_MOBILE = 'minmax(0, 2fr) 1fr minmax(0, 2fr)';

const Wrapper = styled.div`
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 12px;
  overflow: hidden;
  background: ${Color.WHITE};
  ${colFlex()}
`;

const SearchBox = styled.label`
  padding: 10px 16px;
  gap: 8px;
  color: ${Color.GREY};
  border-bottom: 1px solid ${Color.HEAVY_GREY};
  ${rowFlex({ align: 'center' })}
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  font-size: 13px;
  color: ${Color.BLACK};
  background: transparent;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: ${GRID_COLUMNS};
  gap: 8px;
  align-items: center;
  padding: 10px 16px;
  background: ${Color.LIGHT_GREY};
  border-bottom: 1px solid ${Color.HEAVY_GREY};

  ${mobileMediaQuery} {
    grid-template-columns: ${GRID_COLUMNS_MOBILE};
  }
`;

const HeaderCell = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${Color.GREY};
  letter-spacing: 0.04em;
`;

const Row = styled.button<{ highlighted: boolean }>`
  display: grid;
  grid-template-columns: ${GRID_COLUMNS};
  gap: 8px;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
  font: inherit;
  cursor: pointer;
  background: ${({ highlighted }) => (highlighted ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  transition: background 0.15s;

  &:hover {
    background: ${({ highlighted }) => (highlighted ? Color.KIO_ORANGE_FAINT : Color.LIGHT_GREY)};
  }

  ${mobileMediaQuery} {
    grid-template-columns: ${GRID_COLUMNS_MOBILE};
  }
`;

const Cell = styled.div`
  font-size: 13px;
  color: ${Color.BLACK};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NameCell = styled(Cell)<{ highlighted: boolean }>`
  font-weight: ${({ highlighted }) => (highlighted ? 700 : 500)};
  color: ${({ highlighted }) => (highlighted ? Color.KIO_ORANGE_DARK : Color.BLACK)};
`;

const MutedCell = styled(Cell)`
  color: ${Color.GREY};
`;

const DesktopOnly = styled.div`
  min-width: 0;

  ${mobileMediaQuery} {
    display: none;
  }
`;

const ToggleButton = styled.button`
  padding: 12px 16px;
  border: none;
  background: ${Color.WHITE};
  font-size: 12px;
  font-weight: 600;
  color: ${Color.GREY};
  cursor: pointer;

  &:hover {
    color: ${Color.KIO_ORANGE};
  }
`;

const Empty = styled.div`
  padding: 32px 16px;
  text-align: center;
  font-size: 13px;
  color: ${Color.GREY};
`;

function formatTopChannel(school: AcquisitionSchoolStat): string {
  if (school.answeredCount === 0) return '-';

  const top = school.channels.reduce((best, stat) => (stat.count > best.count ? stat : best));
  return `${top.label} ${formatNumber(top.count)}명`;
}

interface SurveySchoolTableProps {
  schools: AcquisitionSchoolStat[];
  selected: string | null;
  onSelect: (schoolName: string | null) => void;
}

function SurveySchoolTable({ schools, selected, onSelect }: SurveySchoolTableProps) {
  const [keyword, setKeyword] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const trimmedKeyword = keyword.trim();
  const filtered = schools.filter((school) => school.schoolName.includes(trimmedKeyword));
  const isSearching = trimmedKeyword.length > 0;
  const visible = isExpanded || isSearching ? filtered : filtered.slice(0, COLLAPSED_ROW_COUNT);
  const hiddenCount = filtered.length - visible.length;

  const handleRowClick = (schoolName: string) => {
    onSelect(schoolName === selected ? null : schoolName);
  };

  return (
    <Wrapper>
      <SearchBox>
        <RiSearchLine size={14} />
        <SearchInput value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="학교 이름 검색" />
      </SearchBox>
      <TableHeader>
        <HeaderCell>학교</HeaderCell>
        <DesktopOnly>
          <HeaderCell>가입</HeaderCell>
        </DesktopOnly>
        <HeaderCell>응답</HeaderCell>
        <DesktopOnly>
          <HeaderCell>건너뜀</HeaderCell>
        </DesktopOnly>
        <HeaderCell>가장 많은 유입 경로</HeaderCell>
      </TableHeader>
      {visible.length === 0 && <Empty>{isSearching ? '검색 결과가 없습니다.' : '가입한 학교가 없습니다.'}</Empty>}
      {visible.map((school) => {
        const isSelected = school.schoolName === selected;
        return (
          <Row key={school.schoolName} type="button" highlighted={isSelected} onClick={() => handleRowClick(school.schoolName)}>
            <NameCell highlighted={isSelected} title={school.schoolName}>
              {school.schoolName}
            </NameCell>
            <DesktopOnly>
              <MutedCell>{formatNumber(school.totalUsers)}명</MutedCell>
            </DesktopOnly>
            <Cell>{formatNumber(school.answeredCount)}명</Cell>
            <DesktopOnly>
              <MutedCell>{formatNumber(school.skippedCount)}명</MutedCell>
            </DesktopOnly>
            <MutedCell title={formatTopChannel(school)}>{formatTopChannel(school)}</MutedCell>
          </Row>
        );
      })}
      {!isSearching && filtered.length > COLLAPSED_ROW_COUNT && (
        <ToggleButton type="button" onClick={() => setIsExpanded((prev) => !prev)}>
          {isExpanded ? '접기' : `${formatNumber(hiddenCount)}개 학교 더 보기`}
        </ToggleButton>
      )}
    </Wrapper>
  );
}

export default SurveySchoolTable;
