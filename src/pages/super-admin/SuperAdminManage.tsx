import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import ManageMenuGroupSection from '@components/super-admin/manage/ManageMenuGroupSection';
import { MANAGE_MENU_GROUPS } from '@constants/data/superAdminMenu';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  padding: 72px 24px 40px;
  gap: 28px;
  min-width: 0;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 56px 14px 24px;
    gap: 20px;
  }
`;

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${Color.BLACK};
  margin: 0;
  letter-spacing: -0.01em;

  ${mobileMediaQuery} {
    font-size: 18px;
  }
`;

function SuperAdminManage() {
  return (
    <AppContainer useFlex={colFlex({ align: 'center', justify: 'center' })} backgroundColor={Color.LIGHT_GREY} useTitle={false} disableLayoutScale>
      <Container>
        <PageTitle>운영 관리</PageTitle>
        {MANAGE_MENU_GROUPS.map((group) => (
          <ManageMenuGroupSection key={group.title} group={group} />
        ))}
      </Container>
    </AppContainer>
  );
}

export default SuperAdminManage;
