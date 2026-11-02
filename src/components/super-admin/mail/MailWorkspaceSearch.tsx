import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import NewAppInput from '@components/common/input/NewAppInput';
import useSuperAdminWorkspace from '@hooks/super-admin/useSuperAdminWorkspace';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import type { SuperAdminWorkspace } from '@@types/index';
import type { MailTargetWorkspace } from '@@types/mail';

const SEARCH_RESULT_SIZE = 8;
const SEARCH_DEBOUNCE_MS = 250;

const Container = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()}
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

interface MailWorkspaceSearchProps {
  inputId: string;
  pickedIds?: number[];
  onPick: (workspace: MailTargetWorkspace) => void;
}

function MailWorkspaceSearch({ inputId, pickedIds = [], onPick }: MailWorkspaceSearchProps) {
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<SuperAdminWorkspace[]>([]);
  const trimmedKeyword = keyword.trim();
  const visibleResults = results.filter((workspace) => !pickedIds.includes(workspace.id));

  useEffect(() => {
    if (!trimmedKeyword) {
      setResults([]);
      return undefined;
    }

    const timer = setTimeout(() => {
      fetchAllWorkspaces(0, SEARCH_RESULT_SIZE, trimmedKeyword).then((page) => setResults(page.content));
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [fetchAllWorkspaces, trimmedKeyword]);

  const handlePick = (workspace: SuperAdminWorkspace) => {
    setKeyword('');
    onPick(toTarget(workspace));
    inputRef.current?.focus();
  };

  return (
    <Container>
      <NewAppInput
        ref={inputRef}
        id={inputId}
        width="100%"
        value={keyword}
        placeholder="주점 이름으로 찾아 주세요"
        onChange={(event) => setKeyword(event.target.value)}
      />
      {visibleResults.length > 0 && (
        <Results>
          {visibleResults.map((workspace) => (
            <ResultButton key={workspace.id} type="button" onClick={() => handlePick(workspace)}>
              {workspace.name} · {workspace.owner.name} · {workspace.schoolName}
            </ResultButton>
          ))}
        </Results>
      )}
      {trimmedKeyword && visibleResults.length === 0 && <EmptyText>찾는 주점이 없으면 이름을 바꿔 다시 찾아 주세요.</EmptyText>}
    </Container>
  );
}

export default MailWorkspaceSearch;
