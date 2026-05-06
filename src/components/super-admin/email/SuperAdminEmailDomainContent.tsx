import styled from '@emotion/styled';
import { RiDeleteBinLine } from '@remixicon/react';
import { EmailDomain } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useSuperAdminEmail from '@hooks/super-admin/useSuperAdminEmail';

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

const Domain = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

const University = styled.div`
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

function SuperAdminEmailDomainContent(emailDomain: EmailDomain) {
  const { deleteEmailDomain } = useSuperAdminEmail();

  const handleDelete = () => {
    if (window.confirm(`"${emailDomain.domain}" 도메인을 삭제하시겠습니까?`)) {
      deleteEmailDomain(emailDomain.id);
    }
  };

  return (
    <Row>
      <Info>
        <Domain>{emailDomain.domain}</Domain>
        <University>{emailDomain.name}</University>
      </Info>
      <DeleteButton onClick={handleDelete} aria-label="도메인 삭제">
        <RiDeleteBinLine size={16} />
      </DeleteButton>
    </Row>
  );
}

export default SuperAdminEmailDomainContent;
