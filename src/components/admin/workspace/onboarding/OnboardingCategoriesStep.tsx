import styled from '@emotion/styled';
import { ProductCategory } from '@@types/index';
import NewAppInput from '@components/common/input/NewAppInput';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useMemo, useState } from 'react';
import OnboardingStepLayout from './OnboardingStepLayout';

const RECOMMENDED_CATEGORIES = ['주류', '안주', '음료', '기타'] as const;

const Controls = styled.div`
  width: 100%;
  gap: 12px;
  ${colFlex({ align: 'start' })}
`;

const InputRow = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ChipList = styled.div`
  width: 100%;
  min-height: 92px;
  padding: 18px;
  border-radius: 24px;
  border: 1px solid #e8eef2;
  background: #ffffff;
  box-sizing: border-box;
  gap: 10px;
  flex-wrap: wrap;
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

const Chip = styled.div`
  padding: 10px 14px;
  border-radius: 999px;
  background: #fff0e5;
  color: ${Color.KIO_ORANGE};
  font-size: 14px;
  font-weight: 700;
`;

const EmptyText = styled.div`
  color: #8b949b;
  font-size: 14px;
`;

const Footer = styled.div`
  width: 100%;
  padding-top: 10px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

interface OnboardingCategoriesStepProps {
  categories: ProductCategory[];
  isSubmitting: boolean;
  onAddCategory: (name: string) => Promise<void>;
  onAddRecommendedCategories: () => Promise<void>;
  onSubmit: () => void;
}

function OnboardingCategoriesStep({ categories, isSubmitting, onAddCategory, onAddRecommendedCategories, onSubmit }: OnboardingCategoriesStepProps) {
  const [categoryName, setCategoryName] = useState('');

  const missingRecommendedCount = useMemo(() => {
    const existingCategories = new Set(categories.map((category) => category.name.trim()));

    return RECOMMENDED_CATEGORIES.filter((name) => !existingCategories.has(name)).length;
  }, [categories]);

  const handleAddCategory = async () => {
    const trimmedName = categoryName.trim();

    if (!trimmedName) {
      alert('카테고리 이름을 입력해주세요.');
      return;
    }

    if (categories.some((category) => category.name.trim() === trimmedName)) {
      alert('이미 등록된 카테고리입니다.');
      return;
    }

    await onAddCategory(trimmedName);
    setCategoryName('');
  };

  return (
    <OnboardingStepLayout
      stepLabel="STEP 3"
      title="메뉴를 나눌 카테고리를 만듭니다"
      description="상품은 카테고리 기준으로 묶여 노출됩니다. 최소 1개 카테고리가 있어야 첫 상품을 등록할 수 있습니다."
      tip="입력한 카테고리는 즉시 저장됩니다. 일반적인 주점 구성이 필요하면 추천 카테고리 버튼으로 빠르게 시작할 수 있습니다."
    >
      <Controls>
        <InputRow>
          <NewAppInput
            width="100%"
            label="카테고리 이름"
            placeholder="예: 주류, 안주, 음료"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            enterHandler={handleAddCategory}
          />
          <NewCommonButton type="button" size="sm" onClick={handleAddCategory} disabled={isSubmitting}>
            추가
          </NewCommonButton>
        </InputRow>

        <NewCommonButton
          type="button"
          size="xs"
          color="blue_gray"
          onClick={onAddRecommendedCategories}
          disabled={isSubmitting || missingRecommendedCount === 0}
        >
          일반적인 주점 카테고리 추천
        </NewCommonButton>
      </Controls>

      <ChipList>
        {categories.length === 0 && <EmptyText>등록된 카테고리가 없습니다. 최소 1개 이상 추가해주세요.</EmptyText>}
        {categories.map((category) => (
          <Chip key={category.id}>{category.name}</Chip>
        ))}
      </ChipList>

      <Footer>
        <div />
        <NewCommonButton type="button" size="sm" onClick={onSubmit} disabled={isSubmitting}>
          다음 단계
        </NewCommonButton>
      </Footer>
    </OnboardingStepLayout>
  );
}

export default OnboardingCategoriesStep;
