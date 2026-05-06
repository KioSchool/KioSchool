import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { mobileMediaQuery } from '@styles/globalStyles';

const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.GREY};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 12px 0;

  ${mobileMediaQuery} {
    font-size: 12px;
    margin: 0 0 10px 0;
  }
`;

export default SectionTitle;
