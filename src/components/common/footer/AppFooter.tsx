import React from 'react';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';

const Container = styled.div`
  z-index: 1001;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  padding: 15px 24px;
  box-sizing: border-box;
`;

function AppFooter() {
  return (
    <Container>
      <AppLabel size={16}>©건국대학교 컴퓨터공학부 학생회 ITZI</AppLabel>
      <AppLabel size={16}>All rights reserved.</AppLabel>
    </Container>
  );
}

export default AppFooter;
