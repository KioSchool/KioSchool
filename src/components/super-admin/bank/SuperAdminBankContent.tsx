import styled from '@emotion/styled';
import { RiDeleteBinLine, RiEditLine, RiAddLine } from '@remixicon/react';
import { Bank } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useSuperAdminBank from '@hooks/super-admin/useSuperAdminBank';

const Row = styled.div`
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #f7f7f7;
  gap: 8px;
  ${rowFlex({ align: 'center' })}
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
  gap: 2px;
  ${colFlex()}
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

const SubText = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
`;

const TossRow = styled.div`
  gap: 4px;
  ${rowFlex({ align: 'center' })}
`;

const IconButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #f0f0f0;
  background: ${Color.WHITE};
  color: ${Color.GREY};
  cursor: pointer;
  flex-shrink: 0;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    color: ${Color.KIO_ORANGE};
    border-color: ${Color.KIO_ORANGE};
  }
`;

const DeleteButton = styled(IconButton)`
  width: 32px;
  height: 32px;

  &:hover {
    color: ${Color.RED};
    border-color: ${Color.RED};
  }
`;

function SuperAdminBankContent(bank: Bank) {
  const { deleteBank, updateBankTossName, deleteBankTossName, fetchAllBank } = useSuperAdminBank();

  const handleDelete = () => {
    if (window.confirm(`"${bank.name}" 은행을 삭제하시겠습니까?`)) {
      deleteBank(bank.id);
    }
  };

  const handleAddTossName = () => {
    const input = window.prompt('토스 딥링크용 명칭을 입력해주세요.\n예: KB국민은행, NH농협은행');
    if (input?.trim()) {
      updateBankTossName(bank.id, input.trim()).then(() => fetchAllBank(0, 6));
    }
  };

  const handleEditTossName = () => {
    const input = window.prompt('토스 딥링크용 명칭을 수정해주세요.', bank.tossName ?? '');
    if (input?.trim()) {
      updateBankTossName(bank.id, input.trim()).then(() => fetchAllBank(0, 6));
    }
  };

  const handleDeleteTossName = () => {
    if (window.confirm(`"${bank.name}"의 토스 명칭을 삭제하시겠습니까?`)) {
      deleteBankTossName(bank.id).then(() => fetchAllBank(0, 6));
    }
  };

  return (
    <Row>
      <Info>
        <Name>{bank.name}</Name>
        <SubText>코드: {bank.code}</SubText>
        {bank.tossName ? (
          <TossRow>
            <SubText>토스: {bank.tossName}</SubText>
            <IconButton onClick={handleEditTossName} aria-label="토스 명칭 수정">
              <RiEditLine size={12} />
            </IconButton>
            <IconButton onClick={handleDeleteTossName} aria-label="토스 명칭 삭제">
              <RiDeleteBinLine size={12} />
            </IconButton>
          </TossRow>
        ) : (
          <TossRow>
            <SubText style={{ color: '#ccc' }}>토스 명칭 없음</SubText>
            <IconButton onClick={handleAddTossName} aria-label="토스 명칭 추가">
              <RiAddLine size={12} />
            </IconButton>
          </TossRow>
        )}
      </Info>
      <DeleteButton onClick={handleDelete} aria-label="은행 삭제">
        <RiDeleteBinLine size={16} />
      </DeleteButton>
    </Row>
  );
}

export default SuperAdminBankContent;
