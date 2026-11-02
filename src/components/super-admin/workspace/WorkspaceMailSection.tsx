import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import NewCommonButton from '@components/common/button/NewCommonButton';
import DetailSection from '@components/super-admin/detail/DetailSection';
import MailThreadList from '@components/super-admin/mail/MailThreadList';
import { getSuperAdminMailNewPath } from '@constants/routes';
import useSuperAdminMail from '@hooks/super-admin/useSuperAdminMail';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import type { MailThreadListItem } from '@@types/mail';
import { getApiErrorMessage } from '@utils/apiError';

const RECENT_THREAD_COUNT = 5;

const StateText = styled.div`
  font-size: 12px;
  color: ${Color.HEAVY_GREY};
`;

const NoEmailText = styled.span`
  font-size: 12px;
  color: ${Color.GREY};
`;

const ThreadListWrap = styled.div`
  width: 100%;
`;

const ButtonRow = styled.div`
  width: 100%;
  gap: 8px;
  margin-top: 4px;
  ${rowFlex({ justify: 'flex-end', align: 'center' })}
`;

interface WorkspaceMailSectionProps {
  workspaceId: number;
  ownerEmail: string | null | undefined;
  onNavigate: () => void;
}

function WorkspaceMailSection({ workspaceId, ownerEmail, onNavigate }: WorkspaceMailSectionProps) {
  const navigate = useNavigate();
  const { fetchThreads } = useSuperAdminMail();
  const [threads, setThreads] = useState<MailThreadListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setErrorMessage('');

    fetchThreads({ page: 0, size: RECENT_THREAD_COUNT, workspaceId })
      .then((page) => {
        if (!cancelled) setThreads(page.content);
      })
      .catch((error: unknown) => {
        if (!cancelled) setErrorMessage(getApiErrorMessage(error, '메일을 불러오지 못했습니다.'));
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fetchThreads, workspaceId]);

  const handleSendMail = () => {
    navigate(getSuperAdminMailNewPath(workspaceId));
    onNavigate();
  };

  return (
    <DetailSection title="메일">
      {isLoading && <StateText>메일 불러오는 중...</StateText>}
      {errorMessage && <StateText role="alert">{errorMessage}</StateText>}
      {!isLoading && !errorMessage && threads.length === 0 && <StateText>주고받은 메일이 없어요.</StateText>}
      {threads.length > 0 && (
        <ThreadListWrap onClick={onNavigate}>
          <MailThreadList threads={threads} hideWorkspace />
        </ThreadListWrap>
      )}
      <ButtonRow>
        {!ownerEmail && <NoEmailText>이메일이 없어 보낼 수 없어요</NoEmailText>}
        <NewCommonButton type="button" size="xs" color="blue_gray" disabled={!ownerEmail} onClick={handleSendMail}>
          메일 보내기
        </NewCommonButton>
      </ButtonRow>
    </DetailSection>
  );
}

export default WorkspaceMailSection;
