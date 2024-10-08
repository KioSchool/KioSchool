import { PaginationResponse } from '@@types/index';
import styled from '@emotion/styled';
import React from 'react';

const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.3px solid #eeecec;
`;

const EmptyLabel = styled.div`
  font-size: 40px;
  color: #d8d8d8;
`;

interface ContentsProps {
  contents: PaginationResponse<any>;
  ContentComponent: React.ElementType;
}

function AdminOrderSearchContents({ contents, ContentComponent }: ContentsProps) {
  if (contents.empty) {
    return <EmptyLabel className={'empty-label'}>{`찾고자 하는 주문이 존재하지 않습니다.`}</EmptyLabel>;
  }

  return (
    <>
      {contents.content.map((item, index) => (
        <div key={item.id}>
          <ContentComponent {...item} />
          {index < contents.content.length - 1 && <HorizontalLine />}
        </div>
      ))}
    </>
  );
}

export default AdminOrderSearchContents;
