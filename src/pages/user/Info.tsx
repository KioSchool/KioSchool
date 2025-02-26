import { colFlex } from '@styles/flexStyles';
import AppContainer from '@components/common/container/AppContainer';
import InfoMain from '@components/user/info/info-main/InfoMain';
import InfoBenefit from '@components/user/info/info-benefit/InfoBenefit';
import InfoStatisticAndReview from '@components/user/info/info-statistic-and-review/InfoStatisticAndReview';
import InfoOurService from '@components/user/info/info-our-service/InfoOurService';
import InfoCreatorsWords from '@components/user/info/info-creators-word/InfoCreatorsWords';
import InfoFooter from '@components/user/info/info-footer/InfoFooter';

function Info() {
  return (
    <AppContainer useFlex={colFlex()} customWidth={'100%'} useScroll={true} useNavBackground={true}>
      <>
        <InfoMain />
        <InfoBenefit />
        <InfoStatisticAndReview />
        <InfoOurService />
        <InfoCreatorsWords />
        <InfoFooter />
      </>
    </AppContainer>
  );
}

export default Info;
