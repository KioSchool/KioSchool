import { isMobile } from 'react-device-detect';
import InfoMobile from './InfoMobile';
import InfoPC from './InfoPc';

function Info() {
  return isMobile ? <InfoMobile /> : <InfoPC />;
}

export default Info;
