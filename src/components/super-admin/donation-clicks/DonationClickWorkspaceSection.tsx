import styled from '@emotion/styled';
import { DonationClickWorkspaceItem } from '@@types/donationClick';
import SectionTitle from '@components/super-admin/dashboard/SectionTitle';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatCurrency, formatNumber } from '@utils/formatNumber';

const DELETED_WORKSPACE_LABEL = '(삭제된 주점)';

const Section = styled.div``;

const Card = styled.div`
  background: ${Color.WHITE};
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 18px;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 14px;
    border-radius: 10px;
  }
`;

const Row = styled.div`
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #f7f7f7;
  gap: 8px;
  &:first-of-type {
    padding-top: 0;
  }
  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
  ${rowFlex({ align: 'center' })}
`;

const Rank = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${Color.GREY};
  width: 20px;
  flex-shrink: 0;
`;

const Name = styled.div`
  font-size: 13px;
  color: ${Color.BLACK};
  font-weight: 500;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Meta = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  flex-shrink: 0;

  ${mobileMediaQuery} {
    display: none;
  }
`;

const Clicks = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${Color.BLACK};
  flex-shrink: 0;
`;

const Empty = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
  text-align: center;
  padding: 12px 0;
`;

interface DonationClickWorkspaceSectionProps {
  items: DonationClickWorkspaceItem[];
}

function DonationClickWorkspaceSection({ items }: DonationClickWorkspaceSectionProps) {
  return (
    <Section>
      <SectionTitle>클릭 상위 주점</SectionTitle>
      <Card>
        {items.length === 0 && <Empty>데이터가 없습니다.</Empty>}
        {items.map((item, index) => (
          <Row key={item.workspaceId}>
            <Rank>{index + 1}</Rank>
            <Name>{item.workspaceName ?? DELETED_WORKSPACE_LABEL}</Name>
            <Meta>
              주문 {formatNumber(item.uniqueOrders)}건 · 토스 {formatCurrency(item.amountSum)}
            </Meta>
            <Clicks>{formatNumber(item.clicks)}회</Clicks>
          </Row>
        ))}
      </Card>
    </Section>
  );
}

export default DonationClickWorkspaceSection;
