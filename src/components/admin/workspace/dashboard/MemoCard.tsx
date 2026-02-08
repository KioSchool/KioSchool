import styled from '@emotion/styled';
import DashboardCard from './DashboardCard';
import { useState, useEffect, useCallback } from 'react';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

const MemoTextArea = styled.textarea`
  width: 100%;
  height: 60px;
  border: none;
  resize: none;
  font-size: 12px;
  color: #464a4d;
  line-height: 20px;
  font-family: inherit;
  background: transparent;
  padding: 0;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #939393;
  }
`;

const SaveStatus = styled.div`
  font-size: 10px;
  color: #939393;
  text-align: right;
  height: 12px;
`;

interface MemoCardProps {
  initialMemo: string;
}

function MemoCard({ initialMemo }: MemoCardProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { updateWorkspaceMemo } = useAdminWorkspace();
  const [memo, setMemo] = useState(initialMemo);
  const [isSaving, setIsSaving] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    _.debounce((workspaceId: string, newMemo: string) => {
      setIsSaving(true);
      updateWorkspaceMemo(workspaceId, newMemo)
        .then(() => {
          setIsSaving(false);
        })
        .catch(() => {
          setIsSaving(false);
        });
    }, 1000),
    [],
  );

  useEffect(() => {
    setMemo(initialMemo);
  }, [initialMemo]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMemo(newValue);
    if (workspaceId) {
      debouncedSave(workspaceId, newValue);
    }
  };

  return (
    <DashboardCard title="메모" height={120}>
      <MemoTextArea 
        value={memo} 
        onChange={handleChange} 
        placeholder="오후 주방3 근무자 결근, 테이블 30번 교수님 테이블, 20번 테이블 🐶진상"
      />
      <SaveStatus>{isSaving ? '저장 중...' : ''}</SaveStatus>
    </DashboardCard>
  );
}

export default MemoCard;
