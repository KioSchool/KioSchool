import { EmailDomain } from '@@types/index';
import { SubContainer } from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const SubLabelContainer = styled.div`
  color: ${Color.HEAVY_GREY};
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

const LabelContainer = styled.div`
  ${colFlex({ justify: 'center', align: 'start' })}
  height: 100%;
`;

function EmailContent({ name, domain }: EmailDomain) {
  return (
    <SubContainer useFlex={rowFlex({ justify: 'space-between', align: 'start' })} customWidth={'1000px'} customHeight={'80px'} customGap={'5px'}>
      <LabelContainer>
        <EmailLabel className={'email-label'}>{name}</EmailLabel>
        <SubLabelContainer className={'sub-label-container'}>{domain}</SubLabelContainer>
      </LabelContainer>
    </SubContainer>
  );
}

export default EmailContent;
