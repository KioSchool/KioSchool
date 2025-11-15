import { PaginationResponse } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';

const ListItem = styled.div`
  width: 100%;
`;

const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.3px solid #eeecec;
`;

const EmptyLabel = styled.div`
  font-size: 40px;
  color: ${Color.LIGHT_GREY};
`;

interface ContentsProps {
  contents: PaginationResponse<any>;
  target: string;
  ContentComponent: React.ElementType;
}

function PaginationSearchContents({ contents, target, ContentComponent }: ContentsProps) {
  if (contents.empty) {
    return <EmptyLabel className={'empty-label'}>{`찾고자 하는 ${target} 이/가 존재하지 않습니다.`}</EmptyLabel>;
  }

  return (
    <>
      {contents.content.map((item, index) => (
        <ListItem key={item.id}>
          <ContentComponent {...item} />
          {index < contents.content.length - 1 && <HorizontalLine />}
        </ListItem>
      ))}
    </>
  );
}

export default PaginationSearchContents;
