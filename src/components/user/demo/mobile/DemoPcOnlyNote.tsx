import styled from '@emotion/styled';
import { RiMacbookLine } from '@remixicon/react';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  background: #f2f4f6;
  text-align: left;
  ${rowFlex({ align: 'flex-start' })}
`;

const IconBox = styled.div`
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #ffffff;
  color: ${LandingColor.SUB_TEXT};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Texts = styled.div`
  flex: 1;
  min-width: 0;
  gap: 4px;
  ${colFlex()}
`;

const Title = styled.strong`
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
  color: ${LandingColor.TEXT};
`;

const Description = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: ${LandingColor.SUB_TEXT};
`;

function DemoPcOnlyNote() {
  return (
    <Container>
      <IconBox aria-hidden="true">
        <RiMacbookLine size={20} />
      </IconBox>
      <Texts>
        <Title>운영진 화면은 PC·태블릿에서 써요</Title>
        <Description>폰에서는 체험만 할 수 있습니다. 가입과 주점 관리는 PC나 태블릿에서 합니다.</Description>
      </Texts>
    </Container>
  );
}

export default DemoPcOnlyNote;
