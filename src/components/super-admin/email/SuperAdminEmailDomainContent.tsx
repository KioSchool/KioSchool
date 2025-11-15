import { EmailDomain } from '@@types/index';
import RoundedAppButton from '@components/common/button/RoundedAppButton';
import styled from '@emotion/styled';
import useSuperAdminEmail from '@hooks/super-admin/useSuperAdminEmail';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  height: 80px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

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

const ButtonContainer = styled.div`
  ${colFlex({ justify: 'center', align: 'center' })}
  height: 100%;
`;

function SuperAdminEmailDomainContent({ name, domain, id }: EmailDomain) {
  const { deleteEmailDomain } = useSuperAdminEmail();

  const onDeleteHandler = () => {
    deleteEmailDomain(id);
  };

  return (
    <Container>
      <LabelContainer>
        <EmailLabel className={'email-label'}>{name}</EmailLabel>
        <SubLabelContainer className={'sub-label-container'}>{domain}</SubLabelContainer>
      </LabelContainer>
      <ButtonContainer>
        <RoundedAppButton style={{ background: '#AEAEAE' }} onClick={onDeleteHandler}>
          삭제하기
        </RoundedAppButton>
      </ButtonContainer>
    </Container>
  );
}

export default SuperAdminEmailDomainContent;
