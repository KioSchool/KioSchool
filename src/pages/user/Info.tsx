import { colFlex } from '@styles/flexStyles';
import AppContainer from '@components/common/container/AppContainer';

function Info() {
  return (
    <AppContainer useFlex={colFlex({ align: 'center' })}>
      <div>Info</div>
    </AppContainer>
  );
}

export default Info;
