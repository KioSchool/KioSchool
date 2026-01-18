import { Workspace } from '@@types/index';
import styled from '@emotion/styled';
import useAdminUser from '@hooks/admin/useAdminUser';
import useConfirm from '@hooks/useConfirm';
import { RiArrowRightSLine, RiDeleteBinFill } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { expandButtonStyle } from '@styles/buttonStyles';
import { useNavigate } from 'react-router-dom';
import { getAdminWorkspacePath } from '@constants/routes';
import { formatDate } from '@utils/formatDate';
import NewCommonButton from '@components/common/button/NewCommonButton';

const Container = styled.div`
  gap: 29px;
  ${rowFlex()}
`;

const WorkspaceContainer = styled.div`
  box-sizing: border-box;
  width: 380px;
  height: 350px;
  border-radius: 16px;
  padding: 24px 20px;
  background: ${Color.KIO_ORANGE};
  box-shadow: 0px 4px 20px rgba(92, 92, 92, 0.25);
  ${colFlex({ justify: 'space-between', align: 'flex-start' })}

  /* TODO: 디자이너와 색상 결정 필요 */
  /* 
  &:hover {
    background: linear-gradient(140deg, #ffe3cc -165.17%, ${Color.KIO_ORANGE} 92.63%);
  } */

  &:active {
    background: ${Color.KIO_ORANGE};
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()}
`;

const MainTitleContainer = styled.div`
  width: 100%;
  flex-wrap: wrap;
  word-break: keep-all;
  ${rowFlex({ justify: 'space-between' })}
`;

const DeleteButton = styled(RiDeleteBinFill)`
  color: ${Color.WHITE};
  width: 20px;
  height: 20px;
  ${expandButtonStyle}
`;

const Title = styled.div`
  color: ${Color.WHITE};
  font-size: 20px;
  font-weight: 700;
  ${rowFlex()}
`;

const DescriptionContainer = styled.ul`
  gap: 8px;
  padding-left: 20px;
  margin: 0;
  ${colFlex()}
`;

const Description = styled.li`
  color: ${Color.WHITE};
  font-size: 16px;
  font-weight: 500;
  list-style-type: disc;
  line-height: 1.8;
`;

interface Props {
  workspaces: Workspace[];
}

function WorkspaceContent({ workspaces }: Props) {
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

  return (
    <Container>
      {workspaces.map((it) => (
        <WorkspaceContainer key={it.id} className={'workspace-container'}>
          <ContentContainer>
            <MainTitleContainer className={'main-title-container'}>
              <Title className={'title'}>{it.name}</Title>
              <DeleteButton
                onClick={(e: React.FormEvent) => {
                  leaveHandler(e, it.id);
                }}
              />
            </MainTitleContainer>
            <DescriptionContainer>
              <Description className={'menu-title'}>메뉴 개수 : {it.products.length} 개</Description>
              <Description className={'table-title'}>테이블 개수 : {it.tableCount} 개</Description>
              <Description className={'date-title'}>만든 날짜 : {formatDate(it.createdAt)}</Description>
            </DescriptionContainer>
          </ContentContainer>

          <NewCommonButton
            customSize={{ width: 92, height: 36, font: 14, borderRadius: 8, padding: 10 }}
            onClick={() => navigate(getAdminWorkspacePath(it.id))}
            customColors={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: Color.WHITE,
              border: '1px solid #fff',
              /* TODO: 디자이너와 색상 결정 필요 */
              hoverBackground: '#FFF5EB',
              hoverColor: Color.KIO_ORANGE,
            }}
            icon={<RiArrowRightSLine size={16} />}
          >
            입장하기
          </NewCommonButton>
        </WorkspaceContainer>
      ))}
      <ConfirmModal />
    </Container>
  );
}

export default WorkspaceContent;
