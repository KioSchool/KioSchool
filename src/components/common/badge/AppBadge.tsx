import React from 'react';
import styled from '@emotion/styled';

interface AppBadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

const Container = styled.div`
  min-width: 90px;
  height: 30px;
  border: 1px solid black;
  border-radius: 1000px;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
`;
function AppBadge(props: AppBadgeProps) {
  return <Container {...props} />;
}

export default AppBadge;
