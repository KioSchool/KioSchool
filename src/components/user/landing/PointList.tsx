import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { landingBodyTypography } from '@styles/landingStyles';

type PointListLayout = 'horizontal' | 'vertical';

const LAYOUT_STYLE: Record<PointListLayout, ReturnType<typeof css>> = {
  horizontal: css`
    margin-top: 40px;
    gap: 40px;
    ${rowFlex({ align: 'flex-start' })}
  `,
  vertical: css`
    margin-top: 32px;
    gap: 20px;
    ${colFlex({ align: 'stretch' })}
  `,
};

const List = styled.div<{ layout: PointListLayout }>`
  ${({ layout }) => LAYOUT_STYLE[layout]}

  ${mobileMediaQuery} {
    gap: 24px;
    ${colFlex({ align: 'stretch' })}
  }
`;

const ITEM_STAGGER_SECONDS = 0.1;

const Item = styled(motion.div)`
  flex: 1;
  padding-top: 20px;
  border-top: 2px solid ${LandingColor.TEXT};
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
`;

const ItemDescription = styled.p`
  ${landingBodyTypography}
`;

export interface LandingPoint {
  title: string;
  description: string;
}

interface PointListProps {
  points: LandingPoint[];
  layout?: PointListLayout;
}

function PointList({ points, layout = 'horizontal' }: PointListProps) {
  return (
    <List layout={layout}>
      {points.map((point, index) => (
        <Item
          key={point.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: index * ITEM_STAGGER_SECONDS }}
        >
          <ItemTitle>{point.title}</ItemTitle>
          <ItemDescription>{point.description}</ItemDescription>
        </Item>
      ))}
    </List>
  );
}

export default PointList;
