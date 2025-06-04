import RouterButton from '@components/common/button/RouterButton';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import workspaceEditImage from '@resources/image/admin/workspace/workspaceEditImage.png';
import tableCountImage from '@resources/image/admin/workspace/tableCountImage.png';
import { Color } from '@resources/colors';
import { tabletMediaQuery } from '@styles/globalStyles';

const Container = styled.div`
  width: 90%;
  height: 200px;
  ${colFlex({ justify: 'center' })}
`;

const TitleContainer = styled.div`
  width: 300px;
  height: 35px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 130px;
  gap: 15px;
  ${rowFlex({ justify: 'start', align: 'center' })}

  ${tabletMediaQuery} {
    height: 110px;
  }
`;

function WorkspaceManageContent() {
  const buttonContents = [
    { name: '주점 정보 관리', path: '/edit', imageSrc: workspaceEditImage },
    { name: '테이블 관리', path: '/table-count', imageSrc: tableCountImage },
  ];

  return (
    <Container>
      <TitleContainer>
        <AppLabel size={19} color={Color.GREY} style={{ fontWeight: 600 }}>
          주점 관리
        </AppLabel>
      </TitleContainer>
      <ButtonContainer>
        {buttonContents.map((content, index) => (
          <RouterButton key={index} {...content} />
        ))}
      </ButtonContainer>
    </Container>
  );
}

export default WorkspaceManageContent;
