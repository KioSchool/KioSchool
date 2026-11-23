import styled from '@emotion/styled';
import ProductShot from '@components/user/landing/ProductShot';
import tableLayout from '@resources/image/landing/table-layout.webp';
import tableList from '@resources/image/landing/table-list.webp';
import { mobileMediaQuery } from '@styles/globalStyles';

const TABLE_LAYOUT_RATIO = 2460 / 1540;
const TABLE_LIST_RATIO = 1680 / 688;

const Container = styled.div`
  position: relative;
  height: 640px;

  ${mobileMediaQuery} {
    height: auto;
    padding-bottom: 96px;
  }
`;

const Layout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 740px;
  max-width: 100%;

  ${mobileMediaQuery} {
    position: static;
    width: 100%;
  }
`;

const List = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 560px;
  max-width: 80%;

  ${mobileMediaQuery} {
    width: 90%;
  }
`;

function TableVisual() {
  return (
    <Container>
      <Layout>
        <ProductShot src={tableLayout} alt="테이블 배치 보기 화면" ratio={TABLE_LAYOUT_RATIO} />
      </Layout>
      <List>
        <ProductShot src={tableList} alt="테이블 목록 보기 화면" ratio={TABLE_LIST_RATIO} />
      </List>
    </Container>
  );
}

export default TableVisual;
