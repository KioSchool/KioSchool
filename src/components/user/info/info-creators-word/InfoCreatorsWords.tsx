import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import InfoTitle from '@components/user/info/InfoTitle';
import InfoCreatorsContent from '@components/user/info/info-creators-word/InfoCreatorsContent';
import { infoCreatorData } from '@resources/data/infoData';

const Container = styled.div`
  width: 100%;
  ${colFlex({ align: 'center' })};
`;

const SubContainer = styled.div`
  width: 1000px;
  padding-top: 120px;
  padding-bottom: 120px;
  ${colFlex({ align: 'center' })};
`;

const ContentContainer = styled.div`
  width: 100%;
  padding-top: 60px;
  gap: 60px;
  ${colFlex({ align: 'center' })};
`;

function InfoCreatorsWords() {
  return (
    <Container>
      <SubContainer>
        <InfoTitle text={'Creator’s words'} />
        <ContentContainer>
          {infoCreatorData.map((data) => (
            <InfoCreatorsContent
              imageUrl={data.imageUrl}
              description={data.description}
              creatorName={data.creatorName}
              creatorDescription={data.creatorDescription}
              key={data.creatorName}
            />
          ))}
        </ContentContainer>
      </SubContainer>
    </Container>
  );
}

export default InfoCreatorsWords;
