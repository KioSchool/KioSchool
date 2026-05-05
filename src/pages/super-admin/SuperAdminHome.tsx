import { Link } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { RiArrowRightLine, RiShieldKeyholeLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import { Color } from '@resources/colors';
import { mobileMediaQuery } from '@styles/globalStyles';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 72px 24px 40px;
  box-sizing: border-box;
  gap: 28px;
  ${colFlex({ justify: 'center', align: 'center' })}

  ${mobileMediaQuery} {
    padding: 56px 16px 24px;
    gap: 20px;
  }
`;

const MainTitle = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: ${Color.BLACK};
  text-align: center;
  line-height: 1.2;
  letter-spacing: -0.02em;

  span {
    color: ${Color.KIO_ORANGE};
  }

  ${mobileMediaQuery} {
    font-size: 26px;
  }
`;

const SubText = styled.p`
  font-size: 14px;
  color: ${Color.GREY};
  text-align: center;
  font-weight: 400;
  margin: 8px 0 0;

  ${mobileMediaQuery} {
    font-size: 13px;
  }
`;

const LinkSuperAdminHome = styled(Link)`
  text-decoration: none;
  height: 44px;
  padding: 0 24px;
  border-radius: 8px;
  background-color: ${Color.BLACK};
  color: ${Color.WHITE};
  gap: 8px;
  transition: background-color 0.15s;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    background-color: ${Color.GREY};
  }
`;

const LinkText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

function SuperAdminHome() {
  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })} useTitle={false} disableLayoutScale>
      <Container>
        <RiShieldKeyholeLine size={48} color={Color.GREY} />
        <div>
          <MainTitle>
            키오스쿨 <span>슈퍼 어드민</span>
          </MainTitle>
          <SubText>시스템 전체를 관리하고 모니터링하세요.</SubText>
        </div>
        <LinkSuperAdminHome to={SUPER_ADMIN_ROUTES.MANAGE}>
          <LinkText>운영 관리 시작하기</LinkText>
          <RiArrowRightLine size={16} />
        </LinkSuperAdminHome>
      </Container>
    </AppContainer>
  );
}

export default SuperAdminHome;
