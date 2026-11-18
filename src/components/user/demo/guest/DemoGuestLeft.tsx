import styled from '@emotion/styled';
import { demoEmptyPhoneStyle } from '@styles/demoStyles';

const Empty = styled.div`
  ${demoEmptyPhoneStyle}
`;

function DemoGuestLeft() {
  return <Empty>손님이 모두 나갔어요</Empty>;
}

export default DemoGuestLeft;
