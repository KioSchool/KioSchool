import { ReactNode } from 'react';
import { PaginationResponse } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div<{ justifyCenter?: boolean }>`
  width: 100%;
  height: 550px;
  ${(props) =>
    colFlex({
      justify: props.justifyCenter ? 'center' : 'flex-start',
      align: 'center',
    })}
`;

const ListItem = styled.div`
  width: 100%;
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 550px;
  gap: 24px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const EmptyLabel = styled.div`
  font-size: 30px;
  color: ${Color.GREY};
`;

interface ContentsProps {
  contents: PaginationResponse<any>;
  target: string;
  ContentComponent: React.ElementType;
  emptyAction?: ReactNode;
}

function PaginationSearchContents({ contents, target, ContentComponent, emptyAction }: ContentsProps) {
  if (contents.empty) {
    return (
      <EmptyContainer>
        <EmptyLabel className={'empty-label'}>{`찾고자 하는 ${target} 이/가 존재하지 않습니다.`}</EmptyLabel>
        {emptyAction}
      </EmptyContainer>
    );
  }

  return (
    <Container justifyCenter={contents.empty}>
      {contents.content.map((item) => (
        <ListItem key={item.id}>
          <ContentComponent {...item} />
        </ListItem>
      ))}
    </Container>
  );
}

export default PaginationSearchContents;
