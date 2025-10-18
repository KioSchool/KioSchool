import styled from '@emotion/styled';
import AppFooter from '@components/common/footer/AppFooter';
import { rowFlex, colFlex } from '@styles/flexStyles';
import { User, UserRole } from '@@types/index';
import { myInfoCardsData } from '@resources/data/myInfoData';
import { useMyInfoActions } from '@hooks/admin/useMyInfoActions';
import MyInfoCard from './MyInfoCard';

const Container = styled.div`
  gap: 40px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const CardsContainer = styled.div`
  width: 100%;
  gap: 20px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface MyInfoContentProps {
  user: User;
}

function MyInfoContent({ user }: MyInfoContentProps) {
  const { handleCardAction, DeleteUserConfirmModal, LogoutConfirmModal } = useMyInfoActions();

  const visibleCards = myInfoCardsData.filter((card) => !card.requiresSuperAdmin || user.role === UserRole.SUPER_ADMIN);

  return (
    <Container>
      <CardsContainer>
        {visibleCards.map((card) => (
          <MyInfoCard key={card.id} icon={card.icon} label={card.label} onClick={() => handleCardAction(card)} />
        ))}
      </CardsContainer>
      <DeleteUserConfirmModal />
      <LogoutConfirmModal />
      <AppFooter />
    </Container>
  );
}

export default MyInfoContent;
