import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import InfoTitle from '@components/user/info/InfoTitle';
import AnimatedInfoLineGraphSvg from '@resources/svg/AnimatedInfoLineGraphSvg';
import { tabletMediaQuery } from '@styles/globalStyles';

const Container = styled.div`
  position: relative;
  width: 100%;
  ${colFlex({ align: 'center' })};
`;

const SubContainer = styled.div`
  width: 700px;
  padding-top: 120px;
  padding-bottom: 120px;
  z-index: 1;
  ${colFlex({ align: 'center' })};
  ${tabletMediaQuery} {
    width: 320px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  margin-top: 120px;
  gap: 100px;
  ${colFlex()};
  ${tabletMediaQuery} {
    margin-top: 20px;
  }
`;

const StatisticContainer = styled.div`
  width: 100%;
  gap: 20px;
  word-break: keep-all;
  ${colFlex()};
  ${tabletMediaQuery} {
    gap: 0;
  }
`;

const StatisticTitle = styled.div`
  width: 100%;
  line-height: 56px;
  font-size: 30px;
  font-weight: 700;
  ${tabletMediaQuery} {
    font-size: 15px;
  }
`;

const StatisticContent = styled.div`
  width: 700px;
  font-size: 18px;
  font-weight: 400;
  white-space: pre-wrap;
  ${tabletMediaQuery} {
    width: 320px;
    font-size: 12px;
  }
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 35%;
  box-sizing: border-box;
`;

const statisticContent =
  '2024년 5월 21일부터 23일까지, 건국대학교 녹색지대에서 진행된 키오스쿨 시범 운영은 하루 평균 500명, 총 1,200명의 이용자를 기록하며 기대 이상의 성과를 거두었습니다. 이는 키오스쿨의 편리성, 접근성, 그리고 실용성을 입증하는 결과로, 주점 운영의 새로운 기준이 될 가능성을 보여줍니다.\n\n' +
  '사용자들은 “QR 코드로 주문하니 직원을 기다릴 필요가 없어 편리했다”, “직관적인 인터페이스 덕분에 처음 사용해도 어렵지 않았다” 등의 긍정적인 평가를 남겼으며, 운영자들 또한 “주문을 실시간으로 확인할 수 있어 운영이 한결 수월해졌다”, “별도의 장비 없이도 손쉽게 관리할 수 있어 부담이 적었다”는 피드백을 전했습니다.\n\n' +
  '이러한 결과를 바탕으로 키오스쿨은 더욱 안정적이고 확장 가능한 서비스로 발전해 나갈 것입니다. 키오스쿨이 만들어갈 변화와 혁신에 많은 관심과 기대 부탁드립니다.';

function InfoStatisticAndReview() {
  return (
    <Container>
      <SubContainer>
        <InfoTitle text={'Statistics & Review'} />
        <ContentContainer>
          <StatisticContainer>
            <StatisticTitle>시범 이용자수 약 1천 2백명</StatisticTitle>
            <StatisticContent>{statisticContent}</StatisticContent>
          </StatisticContainer>
        </ContentContainer>
      </SubContainer>
      <BackgroundContainer>
        <AnimatedInfoLineGraphSvg />
      </BackgroundContainer>
    </Container>
  );
}

export default InfoStatisticAndReview;
