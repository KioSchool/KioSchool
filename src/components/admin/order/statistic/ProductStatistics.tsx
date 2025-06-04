import { Order } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Text } from 'recharts';

const FallbackContainer = styled.div`
  width: 100%;
  height: 500px;
  ${colFlex({ justify: 'center', align: 'center' })};
  font-size: 20px;
  color: ${Color.GREY};
  font-weight: 600;
`;

const Container = styled.div`
  width: 100%;
  height: 500px;
`;

const CustomizedAxisTick = ({ x, y, payload, barSize }: { x: number; y: number; payload: { value: string }; barSize: number }) => {
  const name = payload.value;

  const maxChars = Math.floor(barSize / 8);
  const label = name.length > maxChars ? name.slice(0, maxChars) + '...' : name;

  return (
    <Text x={x} y={y + 10} textAnchor="middle" verticalAnchor="start" fontSize={10} fill={Color.GREY}>
      {label}
    </Text>
  );
};

interface ProductStatisticsProps {
  orders: Order[];
}

function ProductStatistics({ orders }: ProductStatisticsProps) {
  if (!orders || orders.length === 0) {
    return <FallbackContainer>주문 내역이 없습니다.</FallbackContainer>;
  }

  const productSalesMap = new Map<string, number>();
  orders.forEach((order) => {
    if (Array.isArray(order.orderProducts)) {
      order.orderProducts.forEach((product) => {
        const name = product.productName;
        const quantity = product.quantity || 0;
        const productQuantity = productSalesMap.get(name) || 0;
        productSalesMap.set(name, productQuantity + quantity);
      });
    }
  });

  const data = Array.from(productSalesMap.entries())
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity);

  const BAR_SIZE = 30;

  const YAxisFormatter = (value: number) => `${value}개`;
  const labelFormatter = (value: number) => [value, '판매량'];

  return (
    <Container>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap={20} barGap={10}>
          <XAxis dataKey="name" interval={0} tick={(props) => <CustomizedAxisTick {...props} barSize={BAR_SIZE} />} />
          <YAxis tickFormatter={YAxisFormatter} />
          <Tooltip formatter={labelFormatter} />
          <Bar dataKey="quantity" fill={Color.KIO_ORANGE} barSize={BAR_SIZE} />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}
export default ProductStatistics;
