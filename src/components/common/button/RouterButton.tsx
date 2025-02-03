import styled from '@emotion/styled';
import AppLabel from '../label/AppLabel';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 230px;
  height: 100%;
  background: ${Color.WHITE};
  border-radius: 10px;
  box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.06);
  ${colFlex({ justify: 'end' })}
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 35px;
  padding-bottom: 10px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface Props {
  name: string;
  path: string;
}

function RouterButton({ name, path }: Props) {
  const { appendPath } = useCustomNavigate();

  return (
    <Container>
      <TitleContainer>
        <AppLabel size={18} style={{ fontWeight: 600 }} onClick={() => appendPath(path)}>
          {name}
        </AppLabel>
      </TitleContainer>
    </Container>
  );
}

export default RouterButton;
