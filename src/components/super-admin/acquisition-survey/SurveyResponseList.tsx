import styled from '@emotion/styled';
import { AcquisitionSurveyResponse } from '@@types/acquisitionSurvey';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import SurveyResponseItem from './SurveyResponseItem';

const Card = styled.div`
  background: ${Color.WHITE};
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 4px 18px;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 4px 14px;
    border-radius: 10px;
  }
`;

const Empty = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
  text-align: center;
  padding: 40px 0;
`;

interface SurveyResponseListProps {
  responses: AcquisitionSurveyResponse[];
}

function SurveyResponseList({ responses }: SurveyResponseListProps) {
  return (
    <Card>
      {responses.length === 0 && <Empty>응답이 없습니다.</Empty>}
      {responses.map((response) => (
        <SurveyResponseItem key={response.id} response={response} />
      ))}
    </Card>
  );
}

export default SurveyResponseList;
