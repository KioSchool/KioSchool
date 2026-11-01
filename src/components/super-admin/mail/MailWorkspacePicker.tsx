import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import NewCommonButton from '@components/common/button/NewCommonButton';
import NewAppInput from '@components/common/input/NewAppInput';
import useSuperAdminWorkspace from '@hooks/super-admin/useSuperAdminWorkspace';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { SuperAdminWorkspace } from '@@types/index';
import type { MailTargetWorkspace } from '@@types/mail';

const SEARCH_RESULT_SIZE = 8;
const SEARCH_DEBOUNCE_MS = 250;

const Container = styled.div`
  width: 100%;
  gap: 6px;
  ${colFlex()}
`;

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

const Results = styled.div`
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 8px;
  ${colFlex()}
`;

const ResultButton = styled.button`
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-bottom: 1px solid #f0f0f0;
  background: ${Color.WHITE};
  color: ${Color.BLACK};
  cursor: pointer;
  font-size: 14px;
  text-align: left;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background: #fcfcfc;
  }
`;

const EmptyText = styled.span`
  color: ${Color.GREY};
  font-size: 13px;
`;

function toTarget({ id, name, owner }: SuperAdminWorkspace): MailTargetWorkspace {
  return { id, name, ownerName: owner.name, ownerEmail: owner.email };
}

interface MailWorkspacePickerProps {
  selected: MailTargetWorkspace | null;
  onSelect: (workspace: MailTargetWorkspace | null) => void;
}

function MailWorkspacePicker({ selected, onSelect }: MailWorkspacePickerProps) {
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<SuperAdminWorkspace[]>([]);
  const trimmedKeyword = keyword.trim();

  useEffect(() => {
    if (selected || !trimmedKeyword) {
      setResults([]);
      return undefined;
    }

    const timer = setTimeout(() => {
      fetchAllWorkspaces(0, SEARCH_RESULT_SIZE, trimmedKeyword).then((page) => setResults(page.content));
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [fetchAllWorkspaces, selected, trimmedKeyword]);

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

  return (
    <Container>
      <NewAppInput
        id="mail-workspace"
        width="100%"
        value={keyword}
        placeholder="주점 이름으로 찾아 주세요"
        onChange={(event) => setKeyword(event.target.value)}
      />
      {results.length > 0 && (
        <Results>
          {results.map((workspace) => (
            <ResultButton key={workspace.id} type="button" onClick={() => onSelect(toTarget(workspace))}>
              {workspace.name} · {workspace.owner.name} · {workspace.schoolName}
            </ResultButton>
          ))}
        </Results>
      )}
      {trimmedKeyword && results.length === 0 && <EmptyText>찾는 주점이 없으면 이름을 바꿔 다시 찾아 주세요.</EmptyText>}
    </Container>
  );
}

export default MailWorkspacePicker;
