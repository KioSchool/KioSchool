import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { useNavigate } from 'react-router-dom';
import RoundedAppButton from '@components/common/button/RoundedAppButton';
import { lineSeedKrFont } from '@styles/fonts';
import { tabletMediaQuery } from '@styles/globalStyles';
import { isMobile } from 'react-device-detect';

const Container = styled.div`
  width: 100%;
  height: 100%;
  gap: 20px;
  ${colFlex({ justify: 'end' })};
`;

const ButtonContainer = styled.div`
  width: 100%;
`;

const TextContainer = styled.div`
  width: 100%;
  font-size: 18px;
  white-space: pre-line;
  word-break: keep-all;
  font-family: 'LINESeedKR-Rg', 'sans-serif';
  font-weight: 400;
  ${lineSeedKrFont};
  ${tabletMediaQuery} {
    font-size: 13px;
  }
`;

const HighlightText = styled.mark`
  font-family: 'LINESeedKR-Rg', 'sans-serif';
  font-weight: 700;
  background: linear-gradient(to top, rgba(235, 109, 9, 0.2) 50%, transparent 50%);
  border-radius: 10px;
  ${lineSeedKrFont};
  ${tabletMediaQuery} {
    font-size: 13px;
  }
`;

const descriptionTexts = [
  { text: '키오스쿨', useHighlight: true },
  { text: '은 ', useHighlight: false },
  { text: 'QR 코드', useHighlight: true },
  { text: '로 ', useHighlight: false },
  { text: '간편하게 주문', useHighlight: true },
  { text: ' 받고, ', useHighlight: false },
  { text: '효율적으로 관리', useHighlight: true },
  { text: '할 수 있는 시스템을 제공합니다. ', useHighlight: false },
  { text: '빠르고 정확한 주문 처리', useHighlight: true },
  { text: '를 통해 주점 운영을 더 편리하게 만들며, ', useHighlight: false },
  { text: '부담 없이 스마트한 주문 시스템을 도입', useHighlight: true },
  { text: '할 수 있도록 돕습니다. 복잡한 주문 관리에서 벗어나 운영에 집중해 보세요.', useHighlight: false },
];

function InfoMainDescription() {
  const navigate = useNavigate();

  const onClickSignIn = () => {
    navigate('/login');
  };

  return (
    <Container>
      {!isMobile && (
        <ButtonContainer>
          <RoundedAppButton onClick={onClickSignIn}>SIGN IN</RoundedAppButton>
        </ButtonContainer>
      )}
      <TextContainer>
        {descriptionTexts.map((descriptionText) =>
          descriptionText.useHighlight ? <HighlightText key={descriptionText.text}>{descriptionText.text}</HighlightText> : descriptionText.text,
        )}
      </TextContainer>
    </Container>
  );
}

export default InfoMainDescription;
