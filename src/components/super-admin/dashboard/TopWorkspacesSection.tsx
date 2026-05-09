import styled from '@emotion/styled';
import { WorkspaceRankItem } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatCurrency, formatNumber } from '@utils/formatNumber';
import SectionTitle from './SectionTitle';

const Card = styled.div`
  background: ${Color.WHITE};
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 18px;
  gap: 0;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MetaWrap = styled.div`
  gap: 4px;
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    display: none;
  }
`;

const Meta = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
`;

const Revenue = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${Color.BLACK};
  flex-shrink: 0;
`;

interface TopWorkspacesSectionProps {
  items: WorkspaceRankItem[];
}

function TopWorkspacesSection({ items }: TopWorkspacesSectionProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <SectionTitle>매출 상위 워크스페이스 (최근 30일)</SectionTitle>
      <Card>
        {items.map((item, idx) => (
          <Row key={item.workspaceId}>
            <Rank>{idx + 1}</Rank>
            <Name>{item.workspaceName}</Name>
            <MetaWrap>
              <Meta>{formatNumber(item.orders)}건</Meta>
              <Meta>·</Meta>
            </MetaWrap>
            <Revenue>{formatCurrency(item.revenue)}</Revenue>
          </Row>
        ))}
      </Card>
    </div>
  );
}

export default TopWorkspacesSection;
