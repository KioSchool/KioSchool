import { ClipboardEvent, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import NewCommonButton from '@components/common/button/NewCommonButton';
import NewAppInput from '@components/common/input/NewAppInput';
import CustomSelect from '@components/common/select/CustomSelect';
import SuperAdminFilterTabs from '@components/super-admin/SuperAdminFilterTabs';
import { MAIL_AUDIENCE_DEFAULT_MIN_ORDERS, MAIL_SENT_FILTER_OPTIONS } from '@constants/data/mailData';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { MailAudience, MailAudiencePeriod, MailAudienceRow, MailSentFilter } from '@@types/mail';
import { filterMailAudience, getUnmatchedMailSearchTerms, splitMailSearchTerms } from '@utils/mailCampaign';
import MailAudienceList from './MailAudienceList';

const Container = styled.div`
  width: 100%;
  gap: 12px;
  ${colFlex()}
`;

const FilterRow = styled.div<{ isDimmed?: boolean }>`
  width: 100%;
  gap: 8px 16px;
  flex-wrap: wrap;
  opacity: ${({ isDimmed }) => (isDimmed ? 0.4 : 1)};
  ${rowFlex({ align: 'center' })}
`;

const FilterLabel = styled.label`
  gap: 6px;
  color: ${Color.GREY};
  font-size: 13px;
  ${rowFlex({ align: 'center' })}
`;

const CompactInput = styled.input`
  height: 30px;
  box-sizing: border-box;
  padding: 0 8px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 8px;
  color: ${Color.BLACK};
  font-size: 13px;

  &:focus {
    border-color: ${Color.KIO_ORANGE};
    outline: none;
  }
`;

const NumberInput = styled(CompactInput)`
  width: 64px;
`;

const Summary = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border-radius: 8px;
  background: ${Color.LIGHT_GREY};
  gap: 8px;
  flex-wrap: wrap;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const SummaryText = styled.span`
  color: ${Color.BLACK};
  font-size: 14px;
`;

const PickedCount = styled.b`
  color: ${Color.KIO_ORANGE_DARK};
`;

const SummaryActions = styled.div`
  gap: 6px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const Hint = styled.span`
  color: ${Color.GREY};
  font-size: 13px;
`;

const UnmatchedText = styled.span`
  color: ${Color.RED};
  font-size: 13px;
  overflow-wrap: anywhere;
`;

const SEARCH_INPUT_HEIGHT = 44;

function getOnlyPickedText(isOnlyPicked: boolean): string {
  if (isOnlyPicked) return '전체 보기';
  return '담은 곳만 보기';
}

function getVisibleRows(isOnlyPicked: boolean, pickedRows: MailAudienceRow[], foundRows: MailAudienceRow[]): MailAudienceRow[] {
  if (isOnlyPicked) return pickedRows;
  return foundRows;
}

interface MailAudiencePickerProps {
  audience: MailAudience | null;
  isLoading: boolean;
  periods: MailAudiencePeriod[];
  from: string;
  to: string;
  pickedIds: Set<number>;
  onChangePeriod: (from: string, to: string) => void;
  onChangePicked: (pickedIds: Set<number>) => void;
}

function MailAudiencePicker({ audience, isLoading, periods, from, to, pickedIds, onChangePeriod, onChangePicked }: MailAudiencePickerProps) {
  const [keyword, setKeyword] = useState('');
  const [minOrders, setMinOrders] = useState(String(MAIL_AUDIENCE_DEFAULT_MIN_ORDERS));
  const [schoolName, setSchoolName] = useState('');
  const [sent, setSent] = useState<MailSentFilter>('ALL');
  const [isOnlyPicked, setIsOnlyPicked] = useState(false);
  const allRows = useMemo(() => audience?.rows ?? [], [audience]);
  const periodTabs = useMemo(() => periods.map(({ label }) => ({ label, value: label })), [periods]);
  const selectedPeriod = periods.find((period) => period.from === from && period.to === to)?.label ?? '';
  const schoolOptions = useMemo(() => {
    const names = Array.from(new Set(allRows.map((row) => row.schoolName))).sort((a, b) => a.localeCompare(b, 'ko'));
    return [{ value: '', label: '전체' }, ...names.map((name) => ({ value: name, label: name }))];
  }, [allRows]);
  const foundRows = useMemo(
    () => filterMailAudience(allRows, { keyword, minOrders: Number(minOrders) || 0, schoolName, sent }),
    [allRows, keyword, minOrders, schoolName, sent],
  );
  const unmatchedTerms = useMemo(() => getUnmatchedMailSearchTerms(allRows, keyword), [allRows, keyword]);
  const pickedRows = useMemo(() => allRows.filter((row) => pickedIds.has(row.workspaceId)), [allRows, pickedIds]);
  const visibleRows = getVisibleRows(isOnlyPicked, pickedRows, foundRows);
  const unreachableCount = (audience?.noEmailCount ?? 0) + (audience?.unsubscribedCount ?? 0) + (audience?.withdrawnCount ?? 0);

  const handleSelectPeriod = (label: string) => {
    const period = periods.find((item) => item.label === label);
    if (period) onChangePeriod(period.from, period.to);
  };

  // 시트에서 복사한 여러 줄을 입력칸이 한 줄로 합치기 전에 쉼표로 나눠 둔다
  const handlePasteKeyword = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData('text');
    if (!/[\r\n\t]/.test(pasted)) return;

    event.preventDefault();
    setIsOnlyPicked(false);
    setKeyword(splitMailSearchTerms(`${keyword},${pasted}`).join(', '));
  };

  const handleToggle = (workspaceId: number) => {
    const next = new Set(pickedIds);
    if (!next.delete(workspaceId)) next.add(workspaceId);
    onChangePicked(next);
  };

  const handlePickFound = () => {
    onChangePicked(new Set([...pickedIds, ...foundRows.map((row) => row.workspaceId)]));
  };

  const handleClear = () => {
    setIsOnlyPicked(false);
    onChangePicked(new Set());
  };

  return (
    <Container>
      <NewAppInput
        id="campaign-search"
        width="100%"
        height={SEARCH_INPUT_HEIGHT}
        value={keyword}
        placeholder="주점, 사장, 이메일, 학교로 찾기 (여러 곳은 쉼표로)"
        onPaste={handlePasteKeyword}
        onChange={(event) => {
          setIsOnlyPicked(false);
          setKeyword(event.target.value);
        }}
      />
      {audience && unmatchedTerms.length > 0 && <UnmatchedText role="status">못 찾은 곳: {unmatchedTerms.join(', ')}</UnmatchedText>}
      <FilterRow>
        <SuperAdminFilterTabs label="운영 기간" tabs={periodTabs} value={selectedPeriod} onChange={handleSelectPeriod} />
        <FilterLabel>
          <CompactInput type="date" aria-label="운영 기간 시작" value={from} onChange={(event) => onChangePeriod(event.target.value, to)} />~
          <CompactInput type="date" aria-label="운영 기간 끝" value={to} onChange={(event) => onChangePeriod(from, event.target.value)} />
        </FilterLabel>
      </FilterRow>
      <FilterRow isDimmed={splitMailSearchTerms(keyword).length > 0}>
        <FilterLabel>
          주문
          <NumberInput
            type="number"
            min={0}
            value={minOrders}
            onChange={(event) => {
              setIsOnlyPicked(false);
              setMinOrders(event.target.value);
            }}
          />
          건 이상
        </FilterLabel>
        <FilterLabel as="div">
          학교
          <CustomSelect
            width="120px"
            options={schoolOptions}
            value={schoolName}
            onChange={(value: string) => {
              setIsOnlyPicked(false);
              setSchoolName(value);
            }}
          />
        </FilterLabel>
        <FilterLabel as="div">
          지난 발송
          <CustomSelect
            width="150px"
            options={MAIL_SENT_FILTER_OPTIONS}
            value={sent}
            onChange={(value: MailSentFilter) => {
              setIsOnlyPicked(false);
              setSent(value);
            }}
          />
        </FilterLabel>
      </FilterRow>
      <Summary>
        <SummaryText>
          {foundRows.length}곳 찾음 · <PickedCount>{pickedIds.size}곳</PickedCount> 담음
        </SummaryText>
        <SummaryActions>
          <NewCommonButton type="button" size="xs" color="blue_gray" onClick={handlePickFound}>
            찾은 곳 모두 담기
          </NewCommonButton>
          <NewCommonButton type="button" size="xs" color="blue_gray" onClick={handleClear}>
            모두 빼기
          </NewCommonButton>
          <NewCommonButton type="button" size="xs" color="blue_gray" onClick={() => setIsOnlyPicked((current) => !current)}>
            {getOnlyPickedText(isOnlyPicked)}
          </NewCommonButton>
        </SummaryActions>
      </Summary>
      {isLoading && !audience && <Hint>주점을 불러오고 있어요.</Hint>}
      {audience && visibleRows.length === 0 && <Hint>찾는 주점이 없어요. 조건을 낮추거나 다른 말로 찾아 보세요.</Hint>}
      {visibleRows.length > 0 && <MailAudienceList rows={visibleRows} allRows={allRows} pickedIds={pickedIds} onToggle={handleToggle} />}
      {audience && unreachableCount > 0 && (
        <Hint>
          보낼 수 없어 목록에 없는 곳 {unreachableCount}곳: 이메일 없음 {audience.noEmailCount}곳, 수신 거부 {audience.unsubscribedCount}곳, 탈퇴{' '}
          {audience.withdrawnCount}곳
        </Hint>
      )}
    </Container>
  );
}

export default MailAudiencePicker;
