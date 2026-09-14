import styled from '@emotion/styled';
import { AcquisitionSurveyResponse } from '@@types/acquisitionSurvey';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatNullableKoreanDateTime } from '@utils/formatNumber';

const Row = styled.div`
  width: 100%;
  padding: 14px 0;
  border-bottom: 1px solid #f7f7f7;
  gap: 8px;
  &:last-of-type {
    border-bottom: none;
  }
  ${colFlex()}
`;

const Header = styled.div`
  width: 100%;
  gap: 8px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const Email = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.BLACK};
  min-width: 0;
  word-break: break-all;
`;

const ChannelChip = styled.span<{ skipped: boolean }>`
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  background: ${({ skipped }) => (skipped ? Color.LIGHT_GREY : Color.KIO_ORANGE_FAINT)};
  color: ${({ skipped }) => (skipped ? Color.GREY : Color.KIO_ORANGE_DARK)};
`;

const ChannelEtc = styled.span`
  font-size: 12px;
  color: ${Color.BLACK};
`;

const AnsweredAt = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  margin-left: auto;

  ${mobileMediaQuery} {
    margin-left: 0;
    width: 100%;
  }
`;

const Context = styled.div`
  font-size: 13px;
  color: ${Color.BLACK};
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  background: ${Color.LIGHT_GREY};
  border-radius: 8px;
  padding: 10px 12px;
`;

const SKIPPED_LABEL = '건너뜀';

interface SurveyResponseItemProps {
  response: AcquisitionSurveyResponse;
}

function SurveyResponseItem({ response }: SurveyResponseItemProps) {
  const isSkipped = response.channelLabel === null;

  return (
    <Row>
      <Header>
        <Email>{response.userEmail}</Email>
        <ChannelChip skipped={isSkipped}>{isSkipped ? SKIPPED_LABEL : response.channelLabel}</ChannelChip>
        {response.channelEtc && <ChannelEtc>{response.channelEtc}</ChannelEtc>}
        <AnsweredAt>{formatNullableKoreanDateTime(response.answeredAt)}</AnsweredAt>
      </Header>
      {response.context && <Context>{response.context}</Context>}
    </Row>
  );
}

export default SurveyResponseItem;
