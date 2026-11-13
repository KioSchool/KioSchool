import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { RiBankLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { PaymentMethod } from '@@types/index';
import { PAY_METHOD_STYLE } from '@constants/data/payMethods';
import kioCheckSearch from '@resources/image/order/kioCheckSearch.png';
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
  color: #25282b;
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
  color: #25282b;
  font-size: 14px;
  ${rowFlex({ align: 'center' })}
`;

const ChipLogo = styled.img<{ bordered: boolean }>`
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: ${({ bordered }) => (bordered ? '1px solid #e8eef2' : 'none')};
`;

const ChipIcon = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: #ffffff;
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
  // 주문을 불러오기 전(0)에는 칩을 숨긴다
  amount: number;
}

// 대기 화면 맨 위: 돋보기 든 키오(움직이지 않음), 점만 깜빡이는 제목, 수단·금액 칩
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
          {style.logo ? (
            <ChipLogo src={style.logo} alt="" bordered={style.logoBordered} />
          ) : (
            <ChipIcon>
              <RiBankLine size={16} color="#5c5c5c" />
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
