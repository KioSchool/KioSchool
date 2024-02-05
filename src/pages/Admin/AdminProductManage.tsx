import AppButton from '@components/common/button/AppButton';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import { useRef } from 'react';

function AdminProductManage() {
  const productNameRef = useRef<HTMLInputElement>(null);
  const productDescriptionRef = useRef<HTMLInputElement>(null);
  const productPriceRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div>Product manage</div>
      <AppInputWithLabel titleLabel={'상품 이름'} ref={productNameRef} />
      <AppInputWithLabel titleLabel={'상품 설명'} ref={productDescriptionRef} />
      <AppInputWithLabel titleLabel={'상품 가격'} ref={productPriceRef} />
      <AppButton>추가하기</AppButton>
    </>
  );
}

export default AdminProductManage;
