import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { RiBankLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { PaymentMethod } from '@@types/index';
import { PAY_METHOD_STYLE } from '@constants/data/payMethods';
import kioCheckSearch from '@resources/image/order/kioCheckSearch.png';
import { getLogoBorder } from '@utils/payMethodStyles';
import { WaitCard } from './waitStyles';

const loadingDots = keyframes`
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60% { content: '...'; }
  80%, 100% { content: ''; }
`;

const Card = styled(WaitCard)`
  padding: 24px 20px 22px;
  gap: 4px;
  align-items: center;
`;

const Kio = styled.img`
  width: 87px;
  height: 140px;
  margin-bottom: 8px;
  object-fit: contain;
`;

const Title = styled.h1`
  margin: 0;
  color: ${Color.TEXT_STRONG};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.45;

  &::after {
    display: inline-block;
    width: 20px;
    content: '...';
    text-align: left;
    animation: ${loadingDots} 1.5s infinite;
  }
`;

const Sub = styled.p`
  margin: 0 0 12px;
  color: #697278;
  font-size: 13px;
  line-height: 1.45;
`;

const Chip = styled.div<{ background: string }>`
  padding: 6px 14px 6px 8px;
  gap: 8px;
  border-radius: 20px;
  background: ${({ background }) => background};
  color: ${Color.TEXT_STRONG};
  font-size: 14px;
  ${rowFlex({ align: 'center' })}
`;

const ChipLogo = styled.img<{ bordered: boolean }>`
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: ${({ bordered }) => getLogoBorder(bordered)};
`;

const ChipIcon = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: ${Color.WHITE};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Amount = styled.strong`
  font-weight: 700;
`;

const Content = styled.div`
  ${colFlex({ align: 'center' })}
`;

interface OrderWaitHeaderProps {
  method: PaymentMethod;
  // 주문을 불러오기 전에 '0원'이 잠깐 보이지 않게 한다
  amount: number;
}

function OrderWaitHeader({ method, amount }: OrderWaitHeaderProps) {
  const style = PAY_METHOD_STYLE[method];

  return (
    <Card>
      <Content>
        <Kio src={kioCheckSearch} alt="" />
        <Title>송금을 확인하고 있어요</Title>
        <Sub>확인되면 주문 내역으로 넘어가요</Sub>
      </Content>
      {amount > 0 && (
        <Chip background={style.background}>
          {style.logo && <ChipLogo src={style.logo} alt="" bordered={style.logoBordered} />}
          {!style.logo && (
            <ChipIcon>
              <RiBankLine size={16} color={Color.GREY} />
            </ChipIcon>
          )}
          <span>
            {style.label}로 <Amount>{amount.toLocaleString()}원</Amount>
          </span>
        </Chip>
      )}
    </Card>
  );
}

export default OrderWaitHeader;
