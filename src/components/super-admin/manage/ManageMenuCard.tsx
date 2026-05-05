import styled from '@emotion/styled';
import { RiArrowRightSLine } from '@remixicon/react';
import { ManageMenuItem } from '@constants/data/superAdminMenu';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const Card = styled.div`
  background: ${Color.WHITE};
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
  gap: 12px;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 16px;
    border-radius: 10px;
    gap: 10px;
  }

  @media (hover: hover) {
    &:hover {
      border-color: ${Color.GREY};

      .arrow-icon {
        color: ${Color.BLACK};
        transform: translateX(2px);
      }
    }
  }
`;

const IconContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${Color.LIGHT_GREY};
  color: ${Color.GREY};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const CardContent = styled.div`
  gap: 4px;
  ${colFlex()}
`;

const CardTitle = styled.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${Color.BLACK};
  margin: 0;
  ${rowFlex({ align: 'center', justify: 'space-between' })}

  ${mobileMediaQuery} {
    font-size: 14px;
  }
`;

const CardDescription = styled.p`
  font-size: 13px;
  color: ${Color.GREY};
  margin: 0;
  line-height: 1.5;

  ${mobileMediaQuery} {
    font-size: 12px;
  }
`;

const Arrow = styled(RiArrowRightSLine)`
  transition: color 0.15s, transform 0.15s;
  flex-shrink: 0;
`;

interface ManageMenuCardProps {
  item: ManageMenuItem;
  onClick: () => void;
}

function ManageMenuCard({ item, onClick }: ManageMenuCardProps) {
  return (
    <Card onClick={onClick}>
      <IconContainer className="icon-container">{item.icon}</IconContainer>
      <CardContent>
        <CardTitle>
          {item.title}
          <Arrow size={18} color={Color.HEAVY_GREY} className="arrow-icon" />
        </CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default ManageMenuCard;
