import styled from '@emotion/styled';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  padding-bottom: 12px;
  gap: 8px;

  ${rowFlex({ justify: 'end', align: 'center' })};
`;

interface EditorToolbarProps {
  changeCount: number;
  isSaving: boolean;
  onSave: () => void;
  onResetAll: () => void;
  onExit: () => void;
}

function EditorToolbar({ changeCount, isSaving, onSave, onResetAll, onExit }: EditorToolbarProps) {
  const handleResetAll = () => {
    if (!window.confirm('모든 테이블의 배치를 취소합니다. 저장해야 반영됩니다.')) return;
    onResetAll();
  };

  return (
    <Container>
      <NewCommonButton size="sm" color="blue_gray" onClick={handleResetAll}>
        전체 초기화
      </NewCommonButton>
      <NewCommonButton size="sm" color="kio_orange" disabled={changeCount === 0 || isSaving} onClick={onSave}>
        {changeCount > 0 ? `저장 (${changeCount})` : '저장'}
      </NewCommonButton>
      <NewCommonButton size="sm" color="blue_gray" onClick={onExit}>
        나가기
      </NewCommonButton>
    </Container>
  );
}

export default EditorToolbar;
