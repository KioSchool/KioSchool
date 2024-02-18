import UseProducts from '@hooks/useProducts';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function AdminProductEdit() {
  const { fetchProduct } = UseProducts(undefined);

  const [searchParams] = useSearchParams();
  const productId = Number(searchParams.get('productId'));

  useEffect(() => {
    (async () => {
      const ret = await fetchProduct(productId);
      console.log(ret);
    })();
  }, []);

  return (
    <>
      <h1>Edit Page</h1>
      {productId}
    </>
  );
}

export default AdminProductEdit;
