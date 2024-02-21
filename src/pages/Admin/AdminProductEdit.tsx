import { Product, ProductActionType } from '@@types/index';
import AppButton from '@components/common/button/AppButton';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import SelectWithOptions from '@components/common/select/SelectWithOptions';
import styled from '@emotion/styled';
import UseProducts from '@hooks/useProducts';
import uploadPreview from '@resources/image/uploadPreview.png';
import { userWorkspaceAtom } from '@recoils/atoms';
import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const ErrorMessage = styled.div`
  padding: 0 0 5px;
  color: #ff0000;
`;

interface ProductEdit extends Product {
  image: {};
}

const initState: ProductEdit = {
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  id: 0,
  createdAt: '',
  updatedAt: '',
  image: {
    url: '',
    file: null,
  },
  productCategory: {
    id: 0,
    name: '',
    createdAt: '',
    updatedAt: '',
  },
};
function reducer(state: ProductEdit, action: ProductActionType) {
  switch (action.type) {
    case 'PRODUCT_NAME_INPUT':
      return { ...state, name: action.payload };
    case 'PRODUCT_DESCRIPTION_INPUT':
      return { ...state, description: action.payload };
    case 'PRODUCT_PRICE_INPUT':
      return { ...state, price: action.payload };
    case 'PRODUCT_CATEGORY_INPUT':
      return { ...state, productCategory: action.payload };
    case 'PRODUCT_IMAGE_INPUT':
      return { ...state, image: action.payload };
    default:
      throw new Error('Unhandled action');
  }
}

function AdminProductEdit() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchProduct, fetchCategories } = UseProducts(workspaceId);
  const workspace = useRecoilValue(userWorkspaceAtom);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [searchParams] = useSearchParams();
  const productId = Number(searchParams.get('productId'));

  const [product, setProduct] = useState<Product>();
  const [productState, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    (async () => {
      const data = await fetchProduct(productId);
      setProduct(data);

      dispatch({ type: 'PRODUCT_NAME_INPUT', payload: data.name });
      dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: data.description });
      dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: data.price });
      dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: data.productCategory });
      dispatch({ type: 'PRODUCT_IMAGE_INPUT', payload: { url: data.imageUrl } });
    })();
    fetchCategories();
  }, []);

  const EditProduct = () => {
    if (!productState.name || !productState.description) {
      setErrorMessage('상품 이름 및 설명을 입력해주세요');
      return;
    }
    if (productState.price < 0) {
      setErrorMessage('가격은 음수가 될 수 없습니다.');
      return;
    }
    if (!productState.image.url) {
      setErrorMessage('파일을 선택해주세요');
      return;
    }
    setErrorMessage('');

    const body: any = {
      name: productState.name,
      description: productState.description,
      price: productState.price,
      workspaceId: workspaceId,
      productCategoryId: productState.productCategory.id,
    };
    console.log(body);

    // addProduct(state, file);
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      dispatch({ type: 'PRODUCT_IMAGE_INPUT', payload: null });
      return;
    }

    const newFileURL = URL.createObjectURL(event.target.files[0]);

    dispatch({ type: 'PRODUCT_IMAGE_INPUT', payload: { url: newFileURL, file: event.target.files[0] } });
  };
  return (
    <>
      <h1>Edit Page</h1>
      {productId}
      {errorMessage && <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>}
      <AppInputWithLabel
        titleLabel={'상품 이름'}
        value={productState.name}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch({ type: 'PRODUCT_NAME_INPUT', payload: event.target?.value });
        }}
      />
      <AppInputWithLabel
        titleLabel={'상품 설명'}
        value={productState.description}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: event.target?.value });
        }}
      />
      <AppInputWithLabel
        type={'number'}
        titleLabel={'상품 가격'}
        value={productState.price}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: event.target?.value });
        }}
      />
      <img src={productState.image.url || uploadPreview} alt={product?.imageUrl} style={{ width: '300px', height: '300px' }} />
      <input type="file" id="img" accept="image/*" onChange={onImageChange} />
      <SelectWithOptions
        options={workspace.productCategories}
        value={productState.productCategory.id}
        onInput={(event: React.ChangeEvent<HTMLSelectElement>) => {
          dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: event.target.value });
        }}
      />
      <AppButton onClick={EditProduct}>변경하기</AppButton>
    </>
  );
}

export default AdminProductEdit;
