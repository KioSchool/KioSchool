import styled from '@emotion/styled';
import { useRef } from 'react';
import { colFlex } from '@styles/flexStyles';
import NewAppInput from '@components/common/input/NewAppInput';
import NewCommonButton from '@components/common/button/NewCommonButton';
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
  font-size: 24px;
  font-weight: 700;
`;

const Description = styled.div`
  text-align: center;
  word-break: keep-all;
  font-size: 16px;
  font-weight: 400;
  opacity: 0.56;
  white-space: pre-wrap;
`;

function PopupContent1() {
  const { sendAdminPopupResult, closePopupForever } = usePopup();

  const title = '키오스쿨 사용 인터뷰에 참여해주세요!';
  const description =
    '입력하신 번호로 안내 문자를 보내드립니다.\n' +
    '감사의 마음을 담아 소정의 선물도 준비했으니,\n' +
    '키오스쿨의 발전을 위한 소중한 의견을 꼭 남겨주세요.\n' +
    '감사합니다.';

  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = () => {
    const inputValue = inputRef.current?.value;
    const phoneRegex = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;
    if (!inputValue || !phoneRegex.test(inputValue)) {
      alert('전화번호를 정확히 입력해주세요.');
      return;
    }

    const result = `
    ### 1번 팝업에 대한 피드백이 제출되었습니다.
    - 입력한 전화번호: ${inputValue}
    `;

    sendAdminPopupResult(result);

    closePopupForever(1);
  };

  return (
    <Container>
      <Icon>👍🏻</Icon>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <NewAppInput type="text" placeholder="010-1234-5678" ref={inputRef} />
      <NewCommonButton onClick={submitHandler}>제출하기</NewCommonButton>
    </Container>
  );
}

export default PopupContent1;
