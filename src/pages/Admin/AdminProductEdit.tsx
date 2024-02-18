import { useSearchParams } from 'react-router-dom';

function AdminProductEdit() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');

  return (
    <>
      <h1>Edit Page</h1>
      {productId}
    </>
  );
}

export default AdminProductEdit;
