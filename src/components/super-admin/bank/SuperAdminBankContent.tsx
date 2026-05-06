import styled from '@emotion/styled';
import { RiDeleteBinLine } from '@remixicon/react';
import { Bank } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useSuperAdminBank from '@hooks/super-admin/useSuperAdminBank';

const Row = styled.div`
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #f7f7f7;
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

const Code = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
`;

const DeleteButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #f0f0f0;
  background: ${Color.WHITE};
  color: ${Color.GREY};
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    color: ${Color.RED};
    border-color: ${Color.RED};
  }
`;

function SuperAdminBankContent(bank: Bank) {
  const { deleteBank } = useSuperAdminBank();

  const handleDelete = () => {
    if (window.confirm(`"${bank.name}" 은행을 삭제하시겠습니까?`)) {
      deleteBank(bank.id);
    }
  };

  return (
    <Row>
      <Info>
        <Name>{bank.name}</Name>
        <Code>코드: {bank.code}</Code>
      </Info>
      <DeleteButton onClick={handleDelete} aria-label="은행 삭제">
        <RiDeleteBinLine size={16} />
      </DeleteButton>
    </Row>
  );
}

export default SuperAdminBankContent;
