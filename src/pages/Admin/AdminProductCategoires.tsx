import NavBar from '@components/common/nav/NavBar';
import TitleNavBar from '@components/common/nav/TitleNavBar';

function AdminProductCategories() {
  return (
    <>
      <NavBar useBackground={true} />
      <TitleNavBar title={'카테고리 관리'}></TitleNavBar>
    </>
  );
}

export default AdminProductCategories;
