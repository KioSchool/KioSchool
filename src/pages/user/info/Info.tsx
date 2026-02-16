import InfoPC from '@pages/user/info/infoPc';
import InfoMobile from '@pages/user/info/InfoMobile';
import { isMobile } from 'react-device-detect';

function Info() {
  return isMobile ? <InfoMobile /> : <InfoPC />;
}

export default Info;
