import styled from '@emotion/styled';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  padding-bottom: 12px;
  gap: 8px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const TitleBlock = styled.div`
  gap: 3px;
  ${colFlex()};
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${Color.GREY};
`;

const Caption = styled.div`
  font-size: 12px;
  color: ${Color.MUTED_GREY};
`;

const Actions = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'center' })};
`;

interface EditorToolbarProps {
  changeCount: number;
  isSaving: boolean;
  onSave: () => void;
  onResetAll: () => void;
  onExit: () => void;
}

function EditorToolbar({ changeCount, isSaving, onSave, onResetAll, onExit }: EditorToolbarProps) {
  return (
    <Container>
      <TitleBlock>
        <Title>배치 편집</Title>
        <Caption>빈 칸에 끌어 놓으세요</Caption>
      </TitleBlock>
      <Actions>
        <NewCommonButton size="sm" color="blue_gray" disabled={isSaving} onClick={onResetAll}>
          전체 초기화
        </NewCommonButton>
        <NewCommonButton size="sm" color="kio_orange" disabled={changeCount === 0 || isSaving} onClick={onSave}>
          {changeCount > 0 ? `저장 (${changeCount})` : '저장'}
        </NewCommonButton>
        <NewCommonButton size="sm" color="blue_gray" disabled={isSaving} onClick={onExit}>
          나가기
        </NewCommonButton>
      </Actions>
    </Container>
  );
}

export default EditorToolbar;
