import { Email } from '@@types/index';
import { SubContainer } from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const SubLabelContainer = styled.div`
  color: #d8d8d8;
  ${rowFlex()}
`;

const EmailLabel = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  text-decoration: none;
  color: ${Color.GREY};
  cursor: pointer;
  transition: ease-in 0.1s;
  &:hover {
    color: ${Color.KIO_ORANGE};
    text-decoration: underline;
  }
`;

function SuperAdminEmailContent({ name, domain }: Email) {
  return (
    <SubContainer useFlex={colFlex({ justify: 'center', align: 'start' })} customWidth={'1000px'} customHeight={'80px'} customGap={'5px'}>
      <EmailLabel className={'email-label'}>{name}</EmailLabel>
      <SubLabelContainer className={'sub-label-container'}>
        {name} | {domain}
      </SubLabelContainer>
    </SubContainer>
  );
}

export default SuperAdminEmailContent;
