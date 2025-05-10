import styled from '@emotion/styled';
import React from 'react';
import { colFlex } from '@styles/flexStyles';
import { lineSeedKrFont } from '@styles/fonts';
import NewAppInput from '@components/common/input/NewAppInput';
import NewRoundedButton from '@components/common/button/NewRoundedButton';
import usePopup from '@hooks/usePopup';

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  gap: 32px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Icon = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 60px;
  background: #fff3c9;
  font-size: 45px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Title = styled.div`
  font-family: 'LINE Seed Sans KR', 'sans-serif';
  font-size: 24px;
  font-weight: 700;
  ${lineSeedKrFont}
`;

const Description = styled.div`
  font-family: 'LINE Seed Sans KR', 'sans-serif';
  font-size: 16px;
  font-weight: 400;
  opacity: 0.56;
  white-space: pre-wrap;
  text-align: center;
  ${lineSeedKrFont}
`;

function PopupContent1() {
  const { sendPopupResult, closePopupForever } = usePopup();

  const title = '키오스쿨 사용 인터뷰에 참여해주세요!';
  const description =
    '입력하신 번호로 안내 문자를 보내드립니다.\n' +
    '감사의 마음을 담아 소정의 선물도 준비했으니,\n' +
    '키오스쿨의 발전을 위한 소중한 의견을 꼭 남겨주세요.\n' +
    '감사합니다.';

  const inputRef = React.useRef<HTMLInputElement>(null);

  const submitHandler = () => {
    const inputValue = inputRef.current?.value;

    const result = `
    ### 1번 팝업에 대한 피드백이 제출되었습니다.
    - 입력한 전화번호: ${inputValue}
    `;

    sendPopupResult(result);

    closePopupForever(1);
  };

  return (
    <Container>
      <Icon>👍🏻</Icon>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <NewAppInput type="text" placeholder="010-1234-5678" ref={inputRef} />
      <NewRoundedButton onClick={submitHandler}>제출하기</NewRoundedButton>
    </Container>
  );
}

export default PopupContent1;
