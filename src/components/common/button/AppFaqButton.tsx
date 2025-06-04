import { colFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import { RiQuestionFill } from '@remixicon/react';
import { Color } from '@resources/colors';

const FixedContainer = styled.div`
  z-index: 1001;
  bottom: 0;
  right: 0;
  position: fixed;
  padding: 25px 25px;
  box-sizing: border-box;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const QuestionIcon = styled(RiQuestionFill)`
  width: 50px;
  height: 50px;
  cursor: pointer;
  color: ${Color.GREY};
  &:hover {
    color: ${Color.KIO_ORANGE};
  }
`;

function AppFaqButton() {
  const handleButtonClick = () => {
    const notionUrl = 'https://ji-in.notion.site/FAQ-09eb07eac4a34ab4aa883727994e0b08?pvs=4';

    window.open(notionUrl, '_blank');
  };

  return (
    <FixedContainer className={'app-faq-button'}>
      <QuestionIcon onClick={handleButtonClick} />
    </FixedContainer>
  );
}

export default AppFaqButton;
