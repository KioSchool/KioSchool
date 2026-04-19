import styled from '@emotion/styled';
import { ProductCategory } from '@@types/index';
import AppImageInput from '@components/common/input/AppImageInput';
import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';
import SelectWithOptions from '@components/common/select/SelectWithOptions';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { MAX_PRODUCT_IMAGE_SIZE } from '@constants/data/productData';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import OnboardingStepLayout from './OnboardingStepLayout';

const Form = styled.div`
  width: 100%;
  gap: 16px;
  ${colFlex({ align: 'start' })}
`;

const Footer = styled.div`
  width: 100%;
  padding-top: 10px;
  ${rowFlex({ justify: 'end', align: 'center' })}
`;

interface OnboardingProductStepProps {
  categories: ProductCategory[];
  isSubmitting: boolean;
  onSubmit: (draft: { name: string; description: string; price: number; productCategoryId: string; imageUrl: string }, imageFile: File | null) => void;
}

function OnboardingProductStep({ categories, isSubmitting, onSubmit }: OnboardingProductStepProps) {
  const [productCategoryId, setProductCategoryId] = useState(categories[0] ? String(categories[0].id) : 'null');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const imageUrl = useMemo(() => (imageFile ? URL.createObjectURL(imageFile) : ''), [imageFile]);

  useEffect(() => {
    if (categories[0]) {
      setProductCategoryId(String(categories[0].id));
    }
  }, [categories]);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > MAX_PRODUCT_IMAGE_SIZE) {
      alert('상품 이미지는 5MB 이하로 업로드 가능합니다.');
      return;
    }

    setImageFile(file);
  };

  const handleSubmit = () => {
    onSubmit(
      {
        name,
        description,
        price: Number(price) || 0,
        productCategoryId,
        imageUrl,
      },
      imageFile,
    );
  };

  return (
    <OnboardingStepLayout
      stepLabel="STEP 4"
      title="첫 주문을 받을 대표 상품을 등록합니다"
      description="첫 상품 1개만 등록하면 온보딩이 완료됩니다. 이후 상품 관리 화면에서 더 많은 메뉴를 자유롭게 추가할 수 있습니다."
      tip="이 단계는 기존 상품 관리 규칙을 그대로 따릅니다. 카테고리, 상품명, 가격, 이미지, 설명을 모두 입력해야 저장됩니다."
    >
      <Form>
        <SelectWithOptions
          options={categories}
          value={productCategoryId}
          onChange={(event) => setProductCategoryId(event.target.value)}
          width="100%"
          isUseDefaultOption={false}
        />
        <NewAppInput label="상품명" placeholder="최대 12자까지 가능합니다." value={name} onChange={(event) => setName(event.target.value)} width="100%" />
        <NewAppInput
          label="상품 가격"
          placeholder="숫자만 입력해주세요."
          value={price}
          onChange={(event) => setPrice(event.target.value.replace(/[^0-9]/g, ''))}
          width="100%"
        />
        <AppImageInput title="상품 사진" url={imageUrl} file={imageFile} onImageChange={handleImageChange} width={260} height={260} />
        <NewAppTextarea
          label="상품 설명"
          placeholder="최대 30자까지 가능합니다."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          width="100%"
          height={120}
        />
      </Form>

      <Footer>
        <NewCommonButton type="button" size="sm" onClick={handleSubmit} disabled={isSubmitting}>
          설정 완료
        </NewCommonButton>
      </Footer>
    </OnboardingStepLayout>
  );
}

export default OnboardingProductStep;
