import { PaginationResponse } from '@@types/index';
import SuperAdminWorkspaceContent from '@components/SuperAdmin/workspace/SuperAdminWorkspaceContent';
import styled from '@emotion/styled';

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
  target: string;
}

function SuperAdminSearchContents({ contents, target }: ContentsProps) {
  if (contents.numberOfElements === 0) {
    return <EmptyLabel className={'empty-label'}>{`찾고자 하는 ${target} 이/가 존재하지 않습니다.`}</EmptyLabel>;
  }

  return (
    <>
      {contents.content.map((item, index) => (
        <div key={item.id}>
          <SuperAdminWorkspaceContent {...item} />
          {index < contents.content.length - 1 && <HorizontalLine />}
        </div>
      ))}
    </>
  );
}

export default SuperAdminSearchContents;
