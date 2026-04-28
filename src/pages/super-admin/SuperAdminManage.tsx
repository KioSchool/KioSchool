import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import { Color } from '@resources/colors';
import { RiArrowRightSLine, RiBankCardLine, RiMailSendLine, RiStore3Line, RiUser3Line } from '@remixicon/react';

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 40px 20px;
  gap: 40px;
  ${colFlex()};
`;

const SectionTitle = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: ${Color.BLACK};
  margin: 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
`;

const MenuCard = styled.div`
  background: ${Color.WHITE};
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 20px;
  padding: 32px;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 16px;
  ${colFlex()}

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
    border-color: ${Color.KIO_ORANGE};

    .arrow-icon {
      color: ${Color.KIO_ORANGE};
      transform: translateX(4px);
    }

    .icon-container {
      background: ${Color.KIO_ORANGE}15;
      color: ${Color.KIO_ORANGE};
    }
  }
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: ${Color.LIGHT_GREY};
  color: ${Color.GREY};
  transition: all 0.2s ease;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const CardContent = styled.div`
  gap: 8px;
  ${colFlex()}
`;

const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${Color.BLACK};
  margin: 0;
  ${rowFlex({ align: 'center', justify: 'space-between' })}
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: ${Color.GREY};
  margin: 0;
  line-height: 1.5;
`;

function SuperAdminManage() {
  const { navigateWithPage } = useCustomNavigate();

  const MENU_ITEMS = [
    {
      title: '워크스페이스 관리',
      description: '주점(워크스페이스) 목록 조회 및 상태 관리',
      icon: <RiStore3Line size={32} />,
      route: SUPER_ADMIN_ROUTES.WORKSPACE,
    },
    {
      title: '사용자 관리',
      description: '서비스 가입 사용자 목록 조회 및 권한 관리',
      icon: <RiUser3Line size={32} />,
      route: SUPER_ADMIN_ROUTES.USER,
    },
    {
      title: '이메일 도메인 관리',
      description: '대학별 허용 이메일 도메인 추가 및 삭제',
      icon: <RiMailSendLine size={32} />,
      route: SUPER_ADMIN_ROUTES.EMAIL,
    },
    {
      title: '은행 정보 관리',
      description: '결제 계좌에 사용될 은행 목록 관리',
      icon: <RiBankCardLine size={32} />,
      route: SUPER_ADMIN_ROUTES.BANK,
    },
  ];

  return (
    <AppContainer useFlex={colFlex({ align: 'center', justify: 'center' })} backgroundColor={Color.LIGHT_GREY} useTitle={false}>
      <Container>
        <SectionTitle>운영 관리</SectionTitle>
        <GridContainer>
          {MENU_ITEMS.map((item, index) => (
            <MenuCard key={index} onClick={() => navigateWithPage(item.route)}>
              <IconContainer className="icon-container">{item.icon}</IconContainer>
              <CardContent>
                <CardTitle>
                  {item.title}
                  <RiArrowRightSLine size={28} color={Color.HEAVY_GREY} className="arrow-icon" style={{ transition: 'all 0.2s' }} />
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </MenuCard>
          ))}
        </GridContainer>
      </Container>
    </AppContainer>
  );
}

export default SuperAdminManage;
