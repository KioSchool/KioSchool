import { colFlex } from '@styles/flexStyles';
import AppContainer from '@components/common/container/AppContainer';
import InfoMain from '@components/user/info/InfoMain';
import InfoBenefit from '@components/user/info/InfoBenefit';
import InfoStatisticAndReview from '@components/user/info/InfoStatisticAndReview';
import InfoOurService from '@components/user/info/InfoOurService';
import InfoCreatorsWords from '@components/user/info/InfoCreatorsWords';

function Info() {
  return (
    <AppContainer useFlex={colFlex()} customWidth={'100vw'} useScroll={true}>
      <>
        <InfoMain />
        <InfoBenefit />
        <InfoStatisticAndReview />
        <InfoOurService />
        <InfoCreatorsWords />
      </>
    </AppContainer>
  );
}

export default Info;
