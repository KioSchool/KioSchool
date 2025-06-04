import styled from '@emotion/styled';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { categoriesAtom } from '@recoils/atoms';
import { ChangeEvent, useEffect, useReducer } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import SelectWithLabel from '@components/common/select/SelectWithLabel';
import AppImageInput from '@components/common/input/AppImageInput';
import useConfirm from '@hooks/useConfirm';
import { colFlex } from '@styles/flexStyles';
import RoundedAppButton from '@components/common/button/RoundedAppButton';
import AppContainer from '@components/common/container/AppContainer';
import { defaultProductEditValue } from '@@types/defaultValues';
import { ProductActionType, ProductEdit, ProductStateType } from '@@types/index';
import NewAppInput from '@components/common/input/NewAppInput';
import NewRoundedButton from '@components/common/button/NewRoundedButton';

function reducer(state: ProductEdit, action: ProductActionType) {
  switch (action.type) {
    case 'PRODUCT_NAME_INPUT':
      return { ...state, name: action.payload };
    case 'PRODUCT_DESCRIPTION_INPUT':
      return { ...state, description: action.payload };
    case 'PRODUCT_PRICE_INPUT':
      return { ...state, price: action.payload };
    case 'PRODUCT_CATEGORY_INPUT':
      const isFirstRendered = typeof action.payload === 'object';

      if (isFirstRendered) return { ...state, productCategory: action.payload };
      return { ...state, productCategory: { ...state.productCategory, id: action.payload } };
    case 'PRODUCT_IMAGE_INPUT':
      return { ...state, image: action.payload };
    case 'PRODUCT_ID_INPUT':
      return { ...state, id: action.payload };
    default:
      throw new Error('Unhandled action');
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
  gap: 15px;
  ${colFlex({ align: 'center' })}
`;

function AdminProductEdit() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchProduct, fetchCategories, editProduct, deleteProduct } = useAdminProducts(workspaceId);
  const productCategories = useRecoilValue(categoriesAtom);

  const [searchParams] = useSearchParams();
  const productId = Number(searchParams.get('productId'));

  const navigate = useNavigate();
  const [productState, dispatch] = useReducer(reducer, defaultProductEditValue);
  const { ConfirmModal, confirm } = useConfirm({
    title: `'${productState.name}' 상품을 삭제하시겠습니까?`,
    description: '확인 후 되돌릴 수 없습니다.',
    okText: '삭제하기',
    cancelText: '취소',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const data = await fetchProduct(productId);

      dispatch({ type: 'PRODUCT_NAME_INPUT', payload: data.name });
      dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: data.description });
      dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: data.price });
      dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: data.productCategory });
      dispatch({ type: 'PRODUCT_IMAGE_INPUT', payload: { url: data.imageUrl, file: null } });
      dispatch({ type: 'PRODUCT_ID_INPUT', payload: data.id });
    })();
    fetchCategories();
  }, []);

  const submitEditProduct = () => {
    if (!productState.name || !productState.description) {
      alert('상품 이름 및 설명을 입력해주세요');
      return;
    }
    if (productState.price < 0) {
      alert('가격은 음수가 될 수 없습니다.');
      return;
    }
    if (!productState.image.url) {
      alert('파일을 선택해주세요');
      return;
    }

    if (productState.name.length > 12) {
      alert('상품 이름은 12자 이하로 입력해주세요');
      return;
    }

    if (productState.description.length > 30) {
      alert('상품 설명은 30자 이하로 입력해주세요');
      return;
    }

    const body: ProductStateType = {
      productId: productState.id,
      name: productState.name,
      description: productState.description,
      price: productState.price,
      workspaceId: workspaceId,
      productCategoryId: productState.productCategory?.id,
    };

    editProduct(body, productState.image.file);
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      dispatch({ type: 'PRODUCT_IMAGE_INPUT', payload: null });
      return;
    }

    const newFile = event.target.files[0];
    if (newFile.size > 1024 * 1024 * 5) {
      alert('상품 이미지는 5MB 이하로 업로드 가능합니다.');
      return;
    }

    const newFileURL = URL.createObjectURL(newFile);

    dispatch({ type: 'PRODUCT_IMAGE_INPUT', payload: { url: newFileURL, file: newFile } });
  };

  const deleteProductHandler = async () => {
    const userInput = await confirm();
    if (!userInput) return;

    deleteProduct(productId);
    navigate(`/admin/workspace/${workspaceId}/products`);
  };

  const titleNavBarChildren = (
    <RoundedAppButton size={'160px'} onClick={deleteProductHandler}>
      상품 삭제
    </RoundedAppButton>
  );

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      useNavBackground={true}
      titleNavBarProps={{ title: '상품 수정', children: titleNavBarChildren }}
      useScroll={true}
    >
      <Container>
        <SelectWithLabel
          titleLabel={'카테고리'}
          options={productCategories}
          value={productState.productCategory ? productState.productCategory.id : 'null'}
          onInput={(event: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: event.target.value });
          }}
        />
        <NewAppInput
          label={'상품명'}
          placeholder={'최대 12자까지 입력 가능합니다.'}
          value={productState.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'PRODUCT_NAME_INPUT', payload: event.target?.value });
          }}
        />

        <AppImageInput title={'상품 사진'} url={productState.image.url} file={productState.image.files} onImageChange={onImageChange} />
        <NewAppInput
          label={'상품 설명'}
          placeholder={'최대 30자까지 입력 가능합니다.'}
          value={productState.description}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: event.target?.value });
          }}
        />
        <NewAppInput
          label={'상품 가격'}
          value={productState.price}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: event.target?.value });
          }}
        />
        <NewRoundedButton onClick={submitEditProduct} size={'md'} style={{ margin: '38px 0' }}>
          변경하기
        </NewRoundedButton>
        <ConfirmModal />
      </Container>
    </AppContainer>
  );
}

export default AdminProductEdit;
