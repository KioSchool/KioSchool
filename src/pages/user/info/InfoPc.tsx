import AppContainer from '@components/common/container/AppContainer';
import { colFlex } from '@styles/flexStyles';
import InfoMain from '@components/user/info/info-main/InfoMain';
import InfoBenefit from '@components/user/info/info-benefit/InfoBenefit';
import InfoStatisticAndReview from '@components/user/info/info-statistic-and-review/InfoStatisticAndReview';
import InfoOurService from '@components/user/info/info-our-service/InfoOurService';
import InfoCreatorsWords from '@components/user/info/info-creators-word/InfoCreatorsWords';
import InfoFooter from '@components/user/info/info-footer/InfoFooter';
import styled from '@emotion/styled';
import infoBackground from '@resources/image/info/infoBackground.png';

const SubContainer = styled.div`
  width: 100%;
  background-image: url(${infoBackground});
  background-repeat: repeat-y;
  background-size: 100% 100%;
  background-position: center;
`;

function InfoPc() {
  return (
    <AppContainer useFlex={colFlex()} customWidth={'100%'} useScroll={true} useNavBackground={true}>
      <SubContainer>
        <InfoMain />
        <InfoBenefit />
        <InfoStatisticAndReview />
        <InfoOurService />
        <InfoCreatorsWords />
        <InfoFooter />
      </SubContainer>
    </AppContainer>
  );
}

export default InfoPc;
