import RoundedAppButton from '@components/common/button/RoundedAppButton';
import styled from '@emotion/styled';
import { RiAddFill, RiSubtractFill } from '@remixicon/react';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { adminWorkspaceAtom } from 'src/jotai/admin/atoms';

const Container = styled.div`
  width: 100%;
  height: 150px;
  border: 1px solid #ececec;
  border-radius: 10px;
  overflow: hidden;
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  color: ${Color.GREY};
  background-color: ${Color.LIGHT_GREY};
  font-size: 15px;
  font-weight: 400;
  border-bottom: 1px solid #ececec;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
  gap: 10px;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const InputContainer = styled.div`
  box-sizing: border-box;
  padding: 7px 5px;
  border-radius: 50px;
  background-color: #f8f8f8;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const Input = styled.input`
  width: 140px;
  text-align: center;
  background: none;
  border: none;
  &:focus {
    outline: none;
  }
`;

const MinusButton = styled(RiSubtractFill)`
  width: 20px;
  height: 20px;
  color: ${Color.KIO_ORANGE};
  background-color: ${Color.WHITE};
  border-radius: 50%;
  cursor: pointer;
`;

const PlusButton = styled(RiAddFill)`
  width: 20px;
  height: 20px;
  color: ${Color.WHITE};
  background-color: ${Color.KIO_ORANGE};
  border-radius: 50%;
  cursor: pointer;
`;

function TableCount() {
  const workspace = useAtomValue(adminWorkspaceAtom);
  const [tableCount, setTableCount] = useState(workspace.tableCount || 1);

  const handleMinusClick = () => {
    setTableCount((prev) => Math.max(1, prev - 1));
  };

  const handlePlusClick = () => {
    setTableCount((prev) => prev + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^0-9]/g, '');

    setTableCount(parseInt(sanitizedValue, 10));
  };

  return (
    <Container>
      <Header>테이블 수</Header>
      <Content>
        <InputContainer>
          <MinusButton onClick={handleMinusClick} />
          <Input type="number" min="1" value={tableCount} onChange={handleInputChange} />
          <PlusButton onClick={handlePlusClick} />
        </InputContainer>
        <RoundedAppButton fontSize={'16px'} onClick={() => console.log('테이블 수 변경:', tableCount)}>
          확인
        </RoundedAppButton>
      </Content>
    </Container>
  );
}

export default TableCount;
