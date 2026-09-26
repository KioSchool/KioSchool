import styled from '@emotion/styled';
import { Workspace } from '@@types/index';
import AddWorkspaceModalButton from '@components/common/workspace/modal/AddWorkspaceModalButton';
import { Color, OnboardingColor } from '@resources/colors';

export const MAX_WORKSPACE_NUMBER = 3;

const AddWorkspaceContainer = styled.div`
  box-sizing: border-box;
  min-width: 0;
  min-height: 320px;
  border: 1.5px dashed ${Color.HEAVY_GREY};
  border-radius: 16px;
  background: ${Color.LIGHT_GREY};
  overflow: hidden;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${Color.KIO_ORANGE};
    background: ${Color.KIO_ORANGE_FAINT};
  }
`;

const Label = styled.div`
  color: ${Color.TEXT_STRONG};
  font-size: 17px;
  font-weight: 700;
`;

const Caption = styled.div`
  color: ${OnboardingColor.SUBTLE_TEXT};
  font-size: 13px;
`;

interface AddWorkspaceProps {
  workspaces: Workspace[];
}

function AddWorkspace({ workspaces }: AddWorkspaceProps) {
  if (workspaces.length >= MAX_WORKSPACE_NUMBER) return null;

  return (
    <AddWorkspaceContainer className={'add-workspace-container'}>
      <AddWorkspaceModalButton>
        <Label>주점 추가하기</Label>
        <Caption>
          최대 {MAX_WORKSPACE_NUMBER}개까지 만들 수 있어요 ({workspaces.length}/{MAX_WORKSPACE_NUMBER})
        </Caption>
      </AddWorkspaceModalButton>
    </AddWorkspaceContainer>
  );
}

export default AddWorkspace;
