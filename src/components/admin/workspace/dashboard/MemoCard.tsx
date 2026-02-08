import styled from '@emotion/styled';
import DashboardCard from './DashboardCard';
import { useState, useEffect, useMemo, ChangeEvent, useRef } from 'react';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { match } from 'ts-pattern';

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
  const { workspaceId: workspaceIdStr } = useParams<{ workspaceId: string }>();
  const workspaceId = useMemo(() => (workspaceIdStr ? _.toNumber(workspaceIdStr) : undefined), [workspaceIdStr]);

  const { updateWorkspaceMemo } = useAdminWorkspace();
  const [memo, setMemo] = useState(initialMemo);
  const [isSaving, setIsSaving] = useState(false);

  const debouncedSave = useRef(
    _.debounce(async (id: number, newMemo: string) => {
      setIsSaving(true);
      updateWorkspaceMemo(id, newMemo)
        .then(() => {
          setIsSaving(false);
        })
        .catch(() => {
          setIsSaving(false);
        });
    }, 1000),
  ).current;

  useEffect(() => {
    return () => debouncedSave.cancel();
  }, [debouncedSave]);

  useEffect(() => {
    setMemo(initialMemo);
  }, [initialMemo]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMemo(newValue);

    if (_.isNumber(workspaceId) && !_.isNaN(workspaceId)) {
      debouncedSave(workspaceId, newValue);
    }
  };

  return (
    <DashboardCard title="메모" height={120}>
      <MemoTextArea value={memo} onChange={handleChange} placeholder="메모를 입력하세요..." />
      <SaveStatus>
        {match(isSaving)
          .with(true, () => '저장 중...')
          .otherwise(() => '')}
      </SaveStatus>
    </DashboardCard>
  );
}

export default MemoCard;
