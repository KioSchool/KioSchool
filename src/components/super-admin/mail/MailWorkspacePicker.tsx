import styled from '@emotion/styled';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import type { MailTargetWorkspace } from '@@types/mail';
import MailWorkspaceSearch from './MailWorkspaceSearch';

const SelectedRow = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 8px;
  gap: 12px;
  color: ${Color.BLACK};
  font-size: 14px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const SelectedText = styled.span`
  min-width: 0;
  overflow-wrap: anywhere;
`;

interface MailWorkspacePickerProps {
  selected: MailTargetWorkspace | null;
  onSelect: (workspace: MailTargetWorkspace | null) => void;
}

function MailWorkspacePicker({ selected, onSelect }: MailWorkspacePickerProps) {
  if (selected) {
    return (
      <SelectedRow>
        <SelectedText>
          {selected.name} · {selected.ownerName}
        </SelectedText>
        <NewCommonButton type="button" size="xs" color="blue_gray" onClick={() => onSelect(null)}>
          바꾸기
        </NewCommonButton>
      </SelectedRow>
    );
  }

  return <MailWorkspaceSearch inputId="mail-workspace" onPick={onSelect} />;
}

export default MailWorkspacePicker;
