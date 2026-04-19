import { useEffect, useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { ProductCategory, Workspace } from '@@types/index';
import { ONBOARDING_STEP, OnboardingStep } from '@@types/onboarding';
import { adminCategoriesAtom, adminWorkspaceAtom } from '@jotai/admin/atoms';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import useOnboardingExitGuard from '@hooks/admin/useOnboardingExitGuard';
import { colFlex } from '@styles/flexStyles';
import { getInitialOnboardingStep, isOnboardingStepCompleted, needsWorkspaceOnboarding, validateOnboardingStep } from '@utils/onboarding';
import OnboardingCategoriesStep from './OnboardingCategoriesStep';
import OnboardingCompleteStep from './OnboardingCompleteStep';
import OnboardingInfoStep from './OnboardingInfoStep';
import OnboardingProductStep from './OnboardingProductStep';
import OnboardingProgress from './OnboardingProgress';
import OnboardingTablesStep from './OnboardingTablesStep';

const LEAVE_WARNING_MESSAGE = '설정을 완료하지 않으면 서비스를 이용할 수 없습니다.';

const Container = styled.div`
  width: 100%;
  max-width: 920px;
  padding: 96px 0 72px;
  box-sizing: border-box;
  gap: 28px;
  ${colFlex({ align: 'center' })}
`;

const Header = styled.div`
  width: 100%;
  gap: 12px;
  ${colFlex({ align: 'start' })}
`;

const Eyebrow = styled.div`
  color: #8d959c;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

const Title = styled.h1`
  margin: 0;
  color: #25282b;
  font-size: 42px;
  line-height: 1.2;
`;

const Description = styled.p`
  margin: 0;
  color: #5d6368;
  font-size: 17px;
  line-height: 1.7;
`;

const StepContainer = styled.div`
  width: 100%;
`;

interface AdminWorkspaceOnboardingProps {
  workspaceId: string;
  showCompleteStep: boolean;
  onComplete: () => void;
  onMoveToDashboard: () => void;
}

function AdminWorkspaceOnboarding({ workspaceId, showCompleteStep, onComplete, onMoveToDashboard }: AdminWorkspaceOnboardingProps) {
  const workspace = useAtomValue(adminWorkspaceAtom);
  const storedCategories = useAtomValue(adminCategoriesAtom);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(getInitialOnboardingStep(workspace));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { fetchWorkspace, updateWorkspaceInfoAndImage, updateWorkspaceTableCount } = useAdminWorkspace();
  const { addCategory, addProduct, fetchCategories, fetchProducts } = useAdminProducts(workspaceId);

  const categories: ProductCategory[] = useMemo(
    () => (storedCategories.length > 0 ? storedCategories : workspace.productCategories),
    [storedCategories, workspace.productCategories],
  );
  const resolvedStep = showCompleteStep ? ONBOARDING_STEP.COMPLETE : currentStep;

  useOnboardingExitGuard(needsWorkspaceOnboarding(workspace) && !showCompleteStep, LEAVE_WARNING_MESSAGE);

  useEffect(() => {
    if (showCompleteStep) {
      return;
    }

    setCurrentStep(getInitialOnboardingStep(workspace));
  }, [showCompleteStep, workspace]);

  useEffect(() => {
    if (resolvedStep === ONBOARDING_STEP.CATEGORIES || resolvedStep === ONBOARDING_STEP.PRODUCTS) {
      fetchCategories();
    }
  }, [resolvedStep, fetchCategories]);

  const handleStepClick = (step: OnboardingStep) => {
    if (showCompleteStep) {
      return;
    }

    if (!isOnboardingStepCompleted(workspace, step)) {
      return;
    }

    setCurrentStep(step);
  };

  const handleInfoSubmit = async (draft: { name: string; description: string; notice: string }, imageFile: File | null, imageId: number | null) => {
    const validation = validateOnboardingStep(ONBOARDING_STEP.INFO, draft);

    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedWorkspace =
        (await updateWorkspaceInfoAndImage(
          Number(workspaceId),
          draft.name.trim(),
          draft.description.trim(),
          draft.notice.trim() || undefined,
          [imageId, null, null],
          [imageFile, null, null],
          { navigate: false },
        )) ?? workspace;

      setCurrentStep(getInitialOnboardingStep(updatedWorkspace as Workspace));
    } catch (error) {
      console.error(error);
      alert('주점 기본 정보 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTablesSubmit = async (tableCount: number) => {
    const validation = validateOnboardingStep(ONBOARDING_STEP.TABLES, { tableCount });

    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedWorkspace = (await updateWorkspaceTableCount(workspaceId, tableCount)) ?? workspace;
      setCurrentStep(getInitialOnboardingStep(updatedWorkspace as Workspace));
    } catch (error) {
      console.error(error);
      alert('테이블 설정 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategory = async (name: string) => {
    setIsSubmitting(true);

    try {
      await addCategory(name);
    } catch (error) {
      console.error(error);
      alert('카테고리 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddRecommendedCategories = async () => {
    const existingCategoryNames = new Set(categories.map((category) => category.name.trim()));
    const missingCategories = ['주류', '안주', '음료', '기타'].filter((name) => !existingCategoryNames.has(name));

    if (missingCategories.length === 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      for (const categoryName of missingCategories) {
        await addCategory(categoryName);
      }
    } catch (error) {
      console.error(error);
      alert('추천 카테고리 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoriesSubmit = async () => {
    const validation = validateOnboardingStep(ONBOARDING_STEP.CATEGORIES, { categories: categories.map((category) => category.name) });

    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedWorkspace = (await fetchWorkspace(workspaceId)) ?? workspace;
      setCurrentStep(getInitialOnboardingStep(updatedWorkspace as Workspace));
    } catch (error) {
      console.error(error);
      alert('카테고리 상태를 확인하는 중 문제가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProductSubmit = async (
    draft: { name: string; description: string; price: number; productCategoryId: string; imageUrl: string },
    imageFile: File | null,
  ) => {
    const validation = validateOnboardingStep(ONBOARDING_STEP.PRODUCTS, draft);

    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    if (!imageFile) {
      alert('상품 이미지를 등록해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      await addProduct(
        {
          workspaceId,
          name: draft.name,
          description: draft.description,
          price: draft.price,
          productCategoryId: draft.productCategoryId,
        },
        imageFile,
        { navigate: false },
      );
      await fetchProducts();
      await fetchWorkspace(workspaceId);
      onComplete();
    } catch (error) {
      console.error(error);
      alert('대표 상품 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Header>
        <Eyebrow>WORKSPACE ONBOARDING</Eyebrow>
        <Title>주점을 열기 전, 꼭 필요한 설정부터 빠르게 끝냅니다</Title>
        <Description>이 화면에서 핵심 준비를 순서대로 마치면 바로 주문을 받을 수 있습니다. 완료 전에는 다른 관리 화면으로 이동할 수 없습니다.</Description>
      </Header>

      <OnboardingProgress workspace={workspace} currentStep={resolvedStep} onStepClick={handleStepClick} />

      <StepContainer>
        <motion.div key={resolvedStep} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          {match(resolvedStep)
            .with(ONBOARDING_STEP.INFO, () => <OnboardingInfoStep workspace={workspace} isSubmitting={isSubmitting} onSubmit={handleInfoSubmit} />)
            .with(ONBOARDING_STEP.TABLES, () => (
              <OnboardingTablesStep initialTableCount={workspace.tableCount} isSubmitting={isSubmitting} onSubmit={handleTablesSubmit} />
            ))
            .with(ONBOARDING_STEP.CATEGORIES, () => (
              <OnboardingCategoriesStep
                categories={categories}
                isSubmitting={isSubmitting}
                onAddCategory={handleAddCategory}
                onAddRecommendedCategories={handleAddRecommendedCategories}
                onSubmit={handleCategoriesSubmit}
              />
            ))
            .with(ONBOARDING_STEP.PRODUCTS, () => <OnboardingProductStep categories={categories} isSubmitting={isSubmitting} onSubmit={handleProductSubmit} />)
            .with(ONBOARDING_STEP.COMPLETE, () => <OnboardingCompleteStep workspace={workspace} onMoveToDashboard={onMoveToDashboard} />)
            .exhaustive()}
        </motion.div>
      </StepContainer>
    </Container>
  );
}

export default AdminWorkspaceOnboarding;
