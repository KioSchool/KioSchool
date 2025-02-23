import InfoPc from '@pages/user/info/InfoPc';
import InfoMobile from '@pages/user/info/InfoMobile';
import { isMobile } from 'react-device-detect';

function Info() {
  return isMobile ? <InfoMobile /> : <InfoPc />;
}

export default Info;
