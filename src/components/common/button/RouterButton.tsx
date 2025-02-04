import styled from '@emotion/styled';
import AppLabel from '../label/AppLabel';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { Color } from '@resources/colors';
import { expandButtonStyle } from '@styles/buttonStyles';

const Container = styled.div<{ src?: string }>`
  width: 230px;
  height: 100%;
  background: linear-gradient(180deg, rgba(169, 169, 169, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), url(${({ src }) => src}) lightgray 50% / cover no-repeat;
  border-radius: 10px;
  box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.06);
  ${colFlex({ justify: 'end' })}

  ${expandButtonStyle({ scaleSize: '1.03' })}
  
  & * {
    cursor: pointer;
  }
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
  imageSrc?: string;
}

function RouterButton({ name, path, imageSrc }: Props) {
  const { appendPath } = useCustomNavigate();

  return (
    <Container src={imageSrc} onClick={() => appendPath(path)}>
      <TitleContainer>
        <AppLabel color={Color.WHITE} size={20} style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', fontWeight: 600 }}>
          {name}
        </AppLabel>
      </TitleContainer>
    </Container>
  );
}

export default RouterButton;
