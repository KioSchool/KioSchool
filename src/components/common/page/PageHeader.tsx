import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const Container = styled.div`
  width: 100%;
  padding-bottom: 14px;
  border-bottom: 1px solid #f0f0f0;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })}

  ${mobileMediaQuery} {
    ${colFlex({ align: 'stretch' })}
    gap: 14px;
  }
`;

const TextBlock = styled.div`
  min-width: 0;
  gap: 4px;
  ${colFlex()}
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: ${Color.BLACK};
  margin: 0;
  letter-spacing: -0.01em;

  ${mobileMediaQuery} {
    font-size: 16px;
  }
`;

const Description = styled.p`
  font-size: 12px;
  color: ${Color.GREY};
  margin: 0;
  line-height: 1.5;
`;

const Actions = styled.div`
  flex-shrink: 0;
  gap: 8px;
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    width: 100%;
    & > * {
      flex: 1;
    }
  }
`;

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <Container>
      <TextBlock>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </TextBlock>
      {actions && <Actions>{actions}</Actions>}
    </Container>
  );
}

export default PageHeader;
