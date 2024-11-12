import RoundedAppButton from '@components/common/button/RoundedAppButton';
import styled from '@emotion/styled';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { rowFlex } from '@styles/flexStyles';

const ManageButtonContainer = styled.div`
  gap: 20px;
  ${rowFlex({ align: 'center' })}
`;

function AdminProductTitleNavBarChildren() {
  const { appendPath } = useCustomNavigate();

  return (
    <ManageButtonContainer className={'manage-button-container'}>
      <RoundedAppButton
        size={'160px'}
        onClick={() => {
          appendPath('/categories');
        }}
      >
        카테고리 관리
      </RoundedAppButton>
      <RoundedAppButton
        size={'130px'}
        onClick={() => {
          appendPath('/add-product');
        }}
      >
        상품 추가
      </RoundedAppButton>
    </ManageButtonContainer>
  );
}

export default AdminProductTitleNavBarChildren;
