import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { match } from 'ts-pattern';
import AppContainer from '@components/common/container/AppContainer';
import NewCommonButton from '@components/common/button/NewCommonButton';
import PageHeader from '@components/common/page/PageHeader';
import InquiryStatusBadge from '@components/super-admin/inquiry/InquiryStatusBadge';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import InquiryReplyComposer from '@components/super-admin/inquiry/InquiryReplyComposer';
import { API_ERROR_CODES } from '@constants/errorCodes';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import useSuperAdminInquiry from '@hooks/super-admin/useSuperAdminInquiry';
import useConfirm from '@hooks/useConfirm';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import type { InquiryDetail } from '@@types/inquiry';
import { getApiErrorMessage, isApiErrorCode } from '@utils/apiError';
import { formatKoreanDateTime, formatNullableKoreanDateTime } from '@utils/formatNumber';

const Content = styled.div`
  width: 100%;
  gap: 20px;
  ${colFlex()}
`;

const DetailCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 24px;
  border: 1px solid #e8eef2;
  border-radius: 10px;
  gap: 20px;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 16px;
  }
`;

const HeaderRow = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })}
`;

const Title = styled.h2`
  margin: 0;
  color: ${Color.BLACK};
  font-size: 20px;
`;

const InfoList = styled.dl`
  width: 100%;
  margin: 0;
  border-top: 1px solid #f0f0f0;
  ${colFlex()}
`;

const InfoRow = styled.div`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  gap: 16px;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })}
`;

const InfoLabel = styled.dt`
  flex-shrink: 0;
  color: ${Color.GREY};
  font-size: 13px;
`;

const InfoValue = styled.dd`
  min-width: 0;
  margin: 0;
  color: ${Color.BLACK};
  font-size: 14px;
  overflow-wrap: anywhere;
  text-align: right;
`;

const Section = styled.section`
  width: 100%;
  gap: 8px;
  ${colFlex()}
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: ${Color.GREY};
  font-size: 13px;
`;

const ContentText = styled.p`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 16px;
  border-radius: 8px;
  background: #f8f9fa;
  color: ${Color.BLACK};
  font-size: 14px;
  line-height: 1.7;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
`;

const ImageList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  width: 100%;
  gap: 10px;

  ${mobileMediaQuery} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ImageLink = styled.a`
  aspect-ratio: 1;
  overflow: hidden;
  border: 1px solid #e8eef2;
  border-radius: 8px;
`;

const InquiryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EmptyText = styled.span`
  color: ${Color.GREY};
  font-size: 14px;
`;

const ActionRow = styled.div`
  width: 100%;
  gap: 10px;
  ${rowFlex({ justify: 'flex-end' })}
`;

const MessageCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 40px 20px;
  border: 1px solid #e8eef2;
  border-radius: 10px;
  color: ${Color.GREY};
  text-align: center;
  gap: 16px;
  ${colFlex({ align: 'center' })}
`;

function getCloseButtonText(isClosing: boolean): string {
  return match(isClosing)
    .with(true, () => '종결 중...')
    .otherwise(() => '문의 종결');
}

function SuperAdminInquiryDetail() {
  const { inquiryId } = useParams();
  const navigate = useNavigate();
  const { fetchInquiry, closeInquiry } = useSuperAdminInquiry();
  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { ConfirmModal, confirm } = useConfirm({
    title: '문의를 종결할까요?',
    description: '종결한 문의에는 답변 이메일을 발송할 수 없습니다.',
    okText: '종결하기',
    cancelText: '취소',
  });
  const numericInquiryId = Number(inquiryId);

  const loadInquiry = useCallback(async () => {
    if (!Number.isInteger(numericInquiryId) || numericInquiryId <= 0) {
      setErrorMessage('올바르지 않은 문의 번호입니다.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetchInquiry(numericInquiryId);
      setInquiry(response);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '문의 상세를 불러오지 못했습니다.'));
    } finally {
      setIsLoading(false);
    }
  }, [fetchInquiry, numericInquiryId]);

  useEffect(() => {
    loadInquiry();
  }, [loadInquiry]);

  const handleClose = async () => {
    const isConfirmed = await confirm();
    if (!isConfirmed || !inquiry) return;

    setIsClosing(true);
    setErrorMessage('');

    try {
      const response = await closeInquiry(inquiry.id);
      setInquiry(response);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '문의를 종결하지 못했습니다.'));
      if (isApiErrorCode(error, API_ERROR_CODES.INQUIRY_ALREADY_ANSWERED, API_ERROR_CODES.INQUIRY_ALREADY_CLOSED)) {
        loadInquiry();
      }
    } finally {
      setIsClosing(false);
    }
  };

  const handleBackToList = () => {
    navigate(SUPER_ADMIN_ROUTES.INQUIRIES);
  };

  if (isLoading) {
    return (
      <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
        <SuperAdminPageContainer>
          <MessageCard>문의 상세를 불러오는 중입니다.</MessageCard>
        </SuperAdminPageContainer>
      </AppContainer>
    );
  }

  if (!inquiry) {
    return (
      <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
        <SuperAdminPageContainer>
          <MessageCard role="alert">
            {errorMessage || '문의 정보를 찾을 수 없습니다.'}
            <NewCommonButton type="button" size="xs" color="blue_gray" onClick={handleBackToList}>
              목록으로 돌아가기
            </NewCommonButton>
          </MessageCard>
        </SuperAdminPageContainer>
      </AppContainer>
    );
  }

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <ConfirmModal />
        <PageHeader title={`문의 #${inquiry.id}`} description="문의 내용을 확인하고 처리 상태를 관리합니다." />
        <Content>
          {errorMessage && <MessageCard role="alert">{errorMessage}</MessageCard>}
          <DetailCard>
            <HeaderRow>
              <Title>{inquiry.title}</Title>
              <InquiryStatusBadge status={inquiry.status} />
            </HeaderRow>
            <InfoList>
              <InfoRow>
                <InfoLabel>답변 이메일</InfoLabel>
                <InfoValue>{inquiry.replyEmail}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>접수 일시</InfoLabel>
                <InfoValue>{formatNullableKoreanDateTime(inquiry.createdAt)}</InfoValue>
              </InfoRow>
            </InfoList>
            <Section>
              <SectionTitle>문의 내용</SectionTitle>
              <ContentText>{inquiry.content}</ContentText>
            </Section>
            <Section>
              <SectionTitle>첨부 이미지 ({inquiry.imageCount})</SectionTitle>
              {inquiry.images.length === 0 && <EmptyText>첨부된 이미지가 없습니다.</EmptyText>}
              {inquiry.images.length > 0 && (
                <ImageList>
                  {inquiry.images.map((image) => (
                    <ImageLink key={image.id} href={image.accessUrl} target="_blank" rel="noreferrer" aria-label={`${image.originalFileName} 원본 열기`}>
                      <InquiryImage src={image.accessUrl} alt={image.originalFileName} />
                    </ImageLink>
                  ))}
                </ImageList>
              )}
            </Section>
            {inquiry.status === 'ANSWERED' && inquiry.reply && (
              <Section>
                <SectionTitle>발송한 답변 · {formatKoreanDateTime(inquiry.reply.sentAt)}</SectionTitle>
                <ContentText>{inquiry.reply.content}</ContentText>
              </Section>
            )}
            {inquiry.status === 'CLOSED' && <EmptyText>답변 없이 종결된 문의입니다.</EmptyText>}
            {inquiry.status === 'PENDING' && (
              <>
                <InquiryReplyComposer inquiry={inquiry} onReplyComplete={setInquiry} onConflict={loadInquiry} />
                <ActionRow>
                  <NewCommonButton type="button" size="xs" color="blue_gray" disabled={isClosing} onClick={handleClose}>
                    {getCloseButtonText(isClosing)}
                  </NewCommonButton>
                </ActionRow>
              </>
            )}
          </DetailCard>
        </Content>
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminInquiryDetail;
