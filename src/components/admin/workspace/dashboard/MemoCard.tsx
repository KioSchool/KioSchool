import styled from '@emotion/styled';
import { useState, useEffect, useMemo, ChangeEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import ContentCard from '@components/common/card/ContentCard';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { Color } from '@resources/colors';
import { notifyActionFailure } from '@utils/actionFailure';

const MemoTextArea = styled.textarea`
  width: 100%;
  height: 60px;
  border: none;
  resize: none;
  font-size: 12px;
  color: ${Color.TEXT_DEFAULT};
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

interface MemoCardProps {
  initialMemo: string;
}

function MemoCard({ initialMemo }: MemoCardProps) {
  const { workspaceId: workspaceIdStr } = useParams<{ workspaceId: string }>();
  const workspaceId = useMemo(() => (workspaceIdStr ? _.toNumber(workspaceIdStr) : undefined), [workspaceIdStr]);

  const { updateWorkspaceMemo } = useAdminWorkspace();
  const [memo, setMemo] = useState(initialMemo);

  const debouncedSave = useRef(
    _.debounce(async (id: number, newMemo: string) => {
      try {
        await updateWorkspaceMemo(id, newMemo);
      } catch (error) {
        notifyActionFailure(error, '메모를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      }
    }, 1000),
  );

  useEffect(() => {
    return () => debouncedSave.current.cancel();
  }, [debouncedSave]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMemo(newValue);

    if (_.isNumber(workspaceId) && !_.isNaN(workspaceId)) {
      debouncedSave.current(workspaceId, newValue);
    }
  };

  return (
    <ContentCard title="메모" height={200}>
      <MemoTextArea value={memo} onChange={handleChange} placeholder="메모를 입력하세요..." />
    </ContentCard>
  );
}

export default MemoCard;
