import { Link } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { RiArrowRightLine, RiShieldKeyholeLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 100%;
  height: 100%;
  gap: 40px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const MainTitle = styled.div`
  font-size: 56px;
  font-weight: 800;
  color: ${Color.BLACK};
  text-align: center;
  line-height: 1.3;

  span {
    color: ${Color.KIO_ORANGE};
  }
`;

const SubText = styled.p`
  font-size: 20px;
  color: ${Color.GREY};
  text-align: center;
  font-weight: 500;
`;

const LinkSuperAdminHome = styled(Link)`
  text-decoration: none;
  width: 320px;
  height: 72px;
  border-radius: 36px;
  background-color: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  gap: 12px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 12px rgba(255, 145, 66, 0.3);
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(255, 145, 66, 0.4);
    background-color: #f7842e;
  }
`;

const LinkText = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

function SuperAdminHome() {
  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })} useTitle={false}>
      <Container>
        <RiShieldKeyholeLine size={120} color={Color.KIO_ORANGE} />
        <div>
          <MainTitle>
            키오스쿨 <span>슈퍼 어드민</span>
          </MainTitle>
          <SubText>시스템 전체를 관리하고 모니터링하세요.</SubText>
        </div>
        <LinkSuperAdminHome to={SUPER_ADMIN_ROUTES.MANAGE}>
          <LinkText>운영 관리 시작하기</LinkText>
          <RiArrowRightLine size={28} />
        </LinkSuperAdminHome>
      </Container>
    </AppContainer>
  );
}

export default SuperAdminHome;
