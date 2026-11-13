import styled from '@emotion/styled';
import { RiDeleteBinLine } from '@remixicon/react';
import NewCommonButton from '@components/common/button/NewCommonButton';
import NewAppInput from '@components/common/input/NewAppInput';
import { MAIL_SIGNATURE_CONTACT_LABEL_MAX_LENGTH, MAIL_SIGNATURE_CONTACT_VALUE_MAX_LENGTH, MAIL_SIGNATURE_MAX_CONTACTS } from '@constants/data/mailData';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { MailSignatureContact } from '@@types/mail';

const LABEL_INPUT_WIDTH = 180;
const DELETE_ICON_SIZE = 20;

const List = styled.div`
  width: 100%;
  gap: 10px;
  ${colFlex({ align: 'flex-start' })}
`;

const Row = styled.div`
  width: 100%;
  gap: 10px;
  ${rowFlex({ align: 'center' })}
`;

const DeleteButton = styled.button`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: none;
  color: ${Color.MUTED_GREY};
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface MailSignatureContactListProps {
  contacts: MailSignatureContact[];
  onChange: (contacts: MailSignatureContact[]) => void;
}

function MailSignatureContactList({ contacts, onChange }: MailSignatureContactListProps) {
  const handleChange = (index: number, next: Partial<MailSignatureContact>) => {
    const updated = [...contacts];
    updated[index] = { ...contacts[index], ...next };
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    onChange(contacts.filter((_, current) => current !== index));
  };

  const handleAdd = () => {
    onChange([...contacts, { label: '', value: '' }]);
  };

  return (
    <List>
      {contacts.map((contact, index) => (
        <Row key={index}>
          <NewAppInput
            width={LABEL_INPUT_WIDTH}
            value={contact.label}
            maxLength={MAIL_SIGNATURE_CONTACT_LABEL_MAX_LENGTH}
            placeholder="이름표"
            aria-label="연락처 이름표"
            onChange={(event) => handleChange(index, { label: event.target.value })}
          />
          <NewAppInput
            width="100%"
            value={contact.value}
            maxLength={MAIL_SIGNATURE_CONTACT_VALUE_MAX_LENGTH}
            placeholder="값"
            aria-label="연락처 값"
            onChange={(event) => handleChange(index, { value: event.target.value })}
          />
          <DeleteButton type="button" aria-label="연락처 줄 삭제" onClick={() => handleRemove(index)}>
            <RiDeleteBinLine size={DELETE_ICON_SIZE} />
          </DeleteButton>
        </Row>
      ))}
      <NewCommonButton type="button" size="xs" color="blue_gray" disabled={contacts.length >= MAIL_SIGNATURE_MAX_CONTACTS} onClick={handleAdd}>
        줄 추가
      </NewCommonButton>
    </List>
  );
}

export default MailSignatureContactList;
