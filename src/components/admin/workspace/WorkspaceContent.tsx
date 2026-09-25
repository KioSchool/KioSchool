import { Workspace } from '@@types/index';
import styled from '@emotion/styled';
import useAdminUser from '@hooks/admin/useAdminUser';
import useConfirm from '@hooks/useConfirm';
import { RiArrowRightSLine, RiDeleteBinLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color, OnboardingColor } from '@resources/colors';
import { mobileMediaQuery } from '@styles/globalStyles';
import { useNavigate } from 'react-router-dom';
import { getAdminWorkspacePath } from '@constants/routes';
import { format } from 'date-fns';
import { DEFAULT_FOCAL_POINT } from '@constants/data/workspaceImageData';
import { toObjectPosition } from '@utils/imageFocalPoint';
import defaultWorkspaceImage from '@resources/image/defaultWorkspaceImage.png';

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  ${mobileMediaQuery} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const WorkspaceCard = styled.div`
  box-sizing: border-box;
  min-width: 0;
  overflow: hidden;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 16px;
  background: ${Color.WHITE};
  box-shadow: 0px 4px 20px rgba(92, 92, 92, 0.08);
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    border-color: ${Color.KIO_ORANGE};
    box-shadow: 0px 8px 24px rgba(255, 145, 66, 0.18);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${Color.KIO_ORANGE};
    outline-offset: 2px;
  }

  ${colFlex()}
`;

const Cover = styled.div`
  width: 100%;
  height: 120px;
  flex-shrink: 0;
  background: ${Color.KIO_ORANGE_FAINT};
`;

const CoverImage = styled.img<{ objectPosition: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ objectPosition }) => objectPosition};
  display: block;
`;

const Body = styled.div`
  padding: 20px;
  gap: 12px;
  flex-grow: 1;
  ${colFlex()}
`;

const MainTitleContainer = styled.div`
  width: 100%;
  gap: 8px;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })}
`;

const Title = styled.div`
  min-width: 0;
  color: ${Color.TEXT_STRONG};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.35;
  word-break: keep-all;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DeleteButton = styled(RiDeleteBinLine)`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  padding: 4px;
  margin: -4px -4px 0 0;
  border-radius: 6px;
  color: ${OnboardingColor.MUTED_TEXT};
  transition: color 0.15s ease, background 0.15s ease;

  &:hover {
    color: ${Color.RED};
    background: ${Color.LIGHT_RED};
  }
`;

const StatusBadge = styled.div<{ isOnboarding: boolean }>`
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ isOnboarding }) => (isOnboarding ? Color.KIO_ORANGE_DARK : Color.GREEN)};
  background: ${({ isOnboarding }) => (isOnboarding ? Color.KIO_ORANGE_FAINT : Color.GREEN_FAINT)};
`;

const Stats = styled.div`
  color: ${OnboardingColor.BODY_TEXT};
  font-size: 15px;
  font-weight: 500;
`;

const Footer = styled.div`
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid ${Color.BORDER_GREY};
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const CreatedAt = styled.div`
  color: ${OnboardingColor.SUBTLE_TEXT};
  font-size: 13px;
`;

const EnterLabel = styled.div`
  color: ${Color.KIO_ORANGE};
  font-size: 14px;
  font-weight: 700;
  ${rowFlex({ align: 'center' })}
`;

interface Props {
  workspaces: Workspace[];
  children?: React.ReactNode;
}

function WorkspaceContent({ workspaces, children }: Props) {
  const navigate = useNavigate();
  const { leaveWorkspace } = useAdminUser();
  const { ConfirmModal, confirm } = useConfirm({
    title: '해당 워크스페이스를 삭제하시겠습니까?',
    description: '확인 후 되돌릴 수 없습니다.',
    okText: '확인',
    cancelText: '취소',
  });

  const leaveHandler = async (e: React.FormEvent, id: number) => {
    e.stopPropagation();
    const userInput = await confirm();
    if (userInput) leaveWorkspace(id);
  };

  const handleEnter = (id: number) => navigate(getAdminWorkspacePath(id));

  return (
    <Container>
      {workspaces.map((it) => {
        const coverImage = it.images.find((image) => Boolean(image.url));
        const coverUrl = coverImage?.url ?? defaultWorkspaceImage;
        const coverFocalPoint = coverImage?.focalPoint ?? DEFAULT_FOCAL_POINT;

        return (
          <WorkspaceCard
            key={it.id}
            className={'workspace-container'}
            role="link"
            tabIndex={0}
            aria-label={`${it.name} 입장하기`}
            onClick={() => handleEnter(it.id)}
            onKeyDown={(e) => {
              if (e.target !== e.currentTarget) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleEnter(it.id);
              }
            }}
          >
            <Cover>
              <CoverImage src={coverUrl} alt="" objectPosition={toObjectPosition(coverFocalPoint)} />
            </Cover>
            <Body>
              <MainTitleContainer className={'main-title-container'}>
                <Title className={'title'} title={it.name}>
                  {it.name}
                </Title>
                <DeleteButton
                  aria-label="워크스페이스 삭제"
                  onClick={(e: React.FormEvent) => {
                    leaveHandler(e, it.id);
                  }}
                />
              </MainTitleContainer>
              <StatusBadge isOnboarding={it.isOnboarding}>{it.isOnboarding ? '온보딩 진행 중' : '온보딩 완료'}</StatusBadge>
              <Stats>
                메뉴 {it.products.length}개 · 테이블 {it.tableCount}개
              </Stats>
              <Footer>
                <CreatedAt>{format(new Date(it.createdAt), 'yyyy.MM.dd')} 생성</CreatedAt>
                <EnterLabel>
                  입장하기
                  <RiArrowRightSLine size={18} />
                </EnterLabel>
              </Footer>
            </Body>
          </WorkspaceCard>
        );
      })}
      {children}
      <ConfirmModal />
    </Container>
  );
}

export default WorkspaceContent;
