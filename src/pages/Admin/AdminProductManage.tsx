import AppButton from '@components/common/button/AppButton';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import SelectWithOptions from '@components/common/select/SelectWithOptions';
import useAdminUser from '@hooks/useAdminUser';
import { ChangeEvent, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

function AdminProductManage() {
  const { addProduct } = useAdminUser();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const productNameRef = useRef<HTMLInputElement>(null);
  const productDescriptionRef = useRef<HTMLInputElement>(null);
  const productPriceRef = useRef<HTMLInputElement>(null);
  const productCategoryRef = useRef<HTMLSelectElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const AddProduct = () => {
    const name = productNameRef.current?.value;
    const description = productDescriptionRef.current?.value;
    const price = productPriceRef.current?.value;
    const workspaceid = workspaceId;
    const cat = productCategoryRef.current?.value;

    const body = {
      name: name,
      description: description,
      price: price,
      workspaceId: workspaceid,
      productCategoryId: cat,
    };

    if (file) {
      addProduct(body, file);
    }
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      setFile(null);
      return;
    }

    setFile(event.target.files[0]);
  };

  return (
    <>
      <div>Product manage</div>
      <AppInputWithLabel titleLabel={'상품 이름'} ref={productNameRef} />
      <AppInputWithLabel titleLabel={'상품 설명'} ref={productDescriptionRef} />
      <AppInputWithLabel type={'number'} titleLabel={'상품 가격'} ref={productPriceRef} />
      <input type="file" id="img" accept="image/*" onChange={onImageChange} />
      <SelectWithOptions
        options={[
          { name: '기본', val: 'null' },
          { name: '인기', val: 1 },
        ]}
        ref={productCategoryRef}
      ></SelectWithOptions>
      <AppButton onClick={AddProduct}>추가하기</AppButton>
    </>
  );
}

export default AdminProductManage;
