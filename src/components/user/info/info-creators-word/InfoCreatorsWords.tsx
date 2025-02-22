import React from 'react';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import InfoTitle from '@components/user/info/InfoTitle';
import InfoCreatorsContent from '@components/user/info/info-creators-word/InfoCreatorsContent';
import jin from '@resources/image/jin.jpeg';
import sungjong from '@resources/image/sungjong.jpg';
import ahyoung from '@resources/image/ahyoung.jpeg';

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
          <InfoCreatorsContent
            imageUrl={jin}
            description={
              '키오스쿨은 학교 주점을 운영하면서 느꼈던 관리의 어려움을 해결하기 위해 시작되었습니다. 이전 학생회 분들이 만든 비트페이에서 영감을 받아, 모든 주점 운영자들이 쉽게 사용할 수 있는 프로그램을 만들고자 했습니다. 주점은 일회성 이벤트가 많기 때문에, 간편하고 편리한 시스템을 통해 운영의 부담을 덜어주는 것을 최우선으로 생각했습니다.'
            }
            creatorName={'JI-IN PARK'}
            creatorDescription={'키오스쿨 대장님'}
          />
          <InfoCreatorsContent
            imageUrl={sungjong}
            description={
              '키오스쿨은 학교 주점을 운영하면서 느꼈던 관리의 어려움을 해결하기 위해 시작되었습니다. 이전 학생회 분들이 만든 비트페이에서 영감을 받아, 모든 주점 운영자들이 쉽게 사용할 수 있는 프로그램을 만들고자 했습니다. 주점은 일회성 이벤트가 많기 때문에, 간편하고 편리한 시스템을 통해 운영의 부담을 덜어주는 것을 최우선으로 생각했습니다.'
            }
            creatorName={'SUNGJONG LEE'}
            creatorDescription={'키오스쿨 ???'}
          />
          <InfoCreatorsContent
            imageUrl={ahyoung}
            description={
              '키오스쿨은 학교 주점을 운영하면서 느꼈던 관리의 어려움을 해결하기 위해 시작되었습니다. 이전 학생회 분들이 만든 비트페이에서 영감을 받아, 모든 주점 운영자들이 쉽게 사용할 수 있는 프로그램을 만들고자 했습니다. 주점은 일회성 이벤트가 많기 때문에, 간편하고 편리한 시스템을 통해 운영의 부담을 덜어주는 것을 최우선으로 생각했습니다.'
            }
            creatorName={'AHYOUNG SEO'}
            creatorDescription={'키오스쿨 ???'}
          />
        </ContentContainer>
      </SubContainer>
    </Container>
  );
}

export default InfoCreatorsWords;
