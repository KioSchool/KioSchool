import styled from '@emotion/styled';

export const AddWorkspaceContainer = styled.form`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 321px;
  height: 332px;
  border-radius: 25px;
  border: 1px solid #000;
`;

export const DummyWorkspaceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 321px;
  height: 332px;
  border-radius: 25px;
  border: 1px solid #000;
`;

export const WorkspaceContainer = styled.div`
  cursor: pointer;
  width: 321px;
  height: 332px;
  border-radius: 25px;
  background: #eb6d09;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  &:hover {
    background: linear-gradient(140deg, #ffe3cc -165.17%, #eb6d09 92.63%);
  }

  &:active {
    border-radius: 25px;
    background: #eb6d09;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;
