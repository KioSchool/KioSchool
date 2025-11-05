import InfoPC from '@pages/user/info/InfoPC';
import InfoMobile from '@pages/user/info/InfoMobile';
import { isMobile } from 'react-device-detect';

function Info() {
  return isMobile ? <InfoMobile /> : <InfoPC />;
}

export default Info;
