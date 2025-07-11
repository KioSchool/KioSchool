import styled from '@emotion/styled';
import { Color } from '@resources/colors';

interface AppBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: string;
  noBorder?: boolean;
}

const Container = styled.div`
  width: auto;
  padding: 0 10px;
  height: 30px;
  border: ${(props: AppBadgeProps) => (props.noBorder ? 'none' : '1px solid black')};
  border-radius: 1000px;
  box-sizing: border-box;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
  background: ${(props: AppBadgeProps) => props.background || Color.WHITE};
  user-select: none;
  white-space: nowrap;

  :active {
    background-color: gray;
  }

  :not(:active) {
    transition: background-color 600ms ease;
  }
`;
function AppBadge(props: AppBadgeProps) {
  return <Container {...props} className={'app-badge'} />;
}

export default AppBadge;
