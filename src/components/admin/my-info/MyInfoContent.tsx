import styled from '@emotion/styled';
import { rowFlex, colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { User, UserRole } from '@@types/index';
import { myInfoCardsData } from '@constants/data/myInfoData';
import { useMyInfoActions } from '@hooks/admin/useMyInfoActions';
import MyInfoCard from './MyInfoCard';

const Container = styled.div`
  width: 100%;
  gap: 40px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const CardsContainer = styled.div`
  width: 95%;
  gap: 10px;
  flex-wrap: wrap;
  ${rowFlex({ justify: 'center', align: 'center' })}

  ${mobileMediaQuery} {
    width: 100%;
  }
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
    </Container>
  );
}

export default MyInfoContent;
