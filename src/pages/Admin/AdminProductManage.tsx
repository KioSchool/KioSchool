import AppButton from '@components/common/button/AppButton';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import useAdminUser from '@hooks/useAdminUser';
import { ChangeEvent, useRef, useState } from 'react';

function AdminProductManage() {
  const { addProduct } = useAdminUser();
  const productNameRef = useRef<HTMLInputElement>(null);
  const productDescriptionRef = useRef<HTMLInputElement>(null);
  const productPriceRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  const AddProduct = () => {};
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      setFile(undefined);
      return;
    }

    setFile(event.target.files[0]);
  };

  return (
    <>
      <div>Product manage</div>
      <AppInputWithLabel titleLabel={'상품 이름'} ref={productNameRef} />
      <AppInputWithLabel titleLabel={'상품 설명'} ref={productDescriptionRef} />
      <AppInputWithLabel titleLabel={'상품 가격'} ref={productPriceRef} />
      <input type="file" id="img" accept="image/*" onChange={onImageChange} />
      <AppButton onClick={AddProduct}>추가하기</AppButton>
    </>
  );
}

export default AdminProductManage;
