import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { MailAudienceRow } from '@@types/mail';

const List = styled.div`
  width: 100%;
  max-height: 320px;
  overflow-y: auto;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 10px;
  ${colFlex()}
`;

const Row = styled.label`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border-bottom: 1px solid #f0f0f0;
  gap: 10px;
  color: ${Color.BLACK};
  cursor: pointer;
  font-size: 13px;
  ${rowFlex({ align: 'center' })}

  &:last-of-type {
    border-bottom: none;
  }
`;

const Name = styled.span`
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
`;

const Meta = styled.span`
  flex: 1;
  min-width: 0;
  color: ${Color.GREY};
  overflow-wrap: anywhere;
`;

const Receiver = styled(Meta)`
  flex: 2;
`;

interface MailAudienceListProps {
  rows: MailAudienceRow[];
  excludedIds: number[];
  onToggle: (workspaceId: number) => void;
}

function MailAudienceList({ rows, excludedIds, onToggle }: MailAudienceListProps) {
  return (
    <List>
      {rows.map((row) => (
        <Row key={row.workspaceId}>
          <input type="checkbox" checked={!excludedIds.includes(row.workspaceId)} onChange={() => onToggle(row.workspaceId)} />
          <Name>{row.workspaceName}</Name>
          <Meta>{row.schoolName}</Meta>
          <Receiver>
            {row.ownerName} · {row.ownerEmail}
          </Receiver>
        </Row>
      ))}
    </List>
  );
}

export default MailAudienceList;
