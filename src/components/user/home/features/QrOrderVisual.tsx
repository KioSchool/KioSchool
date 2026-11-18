import styled from '@emotion/styled';
import ProductShot from '@components/user/landing/ProductShot';
import ProductVideo from '@components/user/landing/ProductVideo';
import phoneMenu from '@resources/image/landing/phone-menu.webp';
import phonePay from '@resources/image/landing/phone-pay.webp';
import qrOrderVideo from '@resources/video/qr-order.mp4';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const PHONE_RATIO = 780 / 1688;

const Phones = styled.div`
  gap: 24px;
  ${rowFlex({ justify: 'flex-end', align: 'flex-start' })}

  ${mobileMediaQuery} {
    gap: 12px;
    ${rowFlex({ justify: 'center', align: 'flex-start' })}
  }
`;

const Phone = styled.div`
  width: 320px;

  ${mobileMediaQuery} {
    width: 50%;
  }
`;

function QrOrderVisual() {
  return (
    <Phones>
      <Phone>
        <ProductVideo src={qrOrderVideo} poster={phoneMenu} label="손님이 메뉴를 담는 장면" ratio={PHONE_RATIO} shape="phone" />
      </Phone>
      <Phone>
        <ProductShot src={phonePay} alt="토스·카카오페이·계좌이체 송금 화면" ratio={PHONE_RATIO} shape="phone" />
      </Phone>
    </Phones>
  );
}

export default QrOrderVisual;
