import { useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { adminCategoriesAtom, adminProductsAtom } from '@jotai/admin/atoms';
import { Product } from '@@types/index';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

function useAdminProductDnd(workspaceId: string | undefined) {
  const { reorderProducts } = useAdminProducts(workspaceId);
  const [products, setProducts] = useAtom(adminProductsAtom);
  const rawCategories = useAtomValue(adminCategoriesAtom);
  const categories = [...rawCategories, { id: null, name: '기본메뉴' }];

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const findCategoryOfProduct = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.productCategory?.id || null : undefined;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const productId = Number(String(active.id).replace('product-', ''));
    const product = products.find((p) => p.id === productId);
    if (product) setActiveProduct(product);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeIdNum = Number(String(active.id).replace('product-', ''));
    let overIdNum: number | null = null;
    let overCategoryId: number | null | undefined = undefined;

    if (String(over.id).startsWith('product-')) {
      overIdNum = Number(String(over.id).replace('product-', ''));
      overCategoryId = findCategoryOfProduct(overIdNum);
    } else if (String(over.id).startsWith('category-')) {
      const parts = String(over.id).split('-');
      overCategoryId = parts[1] === 'default' ? null : Number(parts[1]);
    }

    const activeCategoryId = findCategoryOfProduct(activeIdNum);

    if (overCategoryId !== undefined && activeCategoryId !== overCategoryId) {
      setProducts((prev) => {
        const activeIndex = prev.findIndex((p) => p.id === activeIdNum);
        if (activeIndex === -1) return prev;

        const newItems = [...prev];
        const targetCategory = rawCategories.find((c) => c.id === overCategoryId);

        newItems[activeIndex] = {
          ...newItems[activeIndex],
          productCategory: targetCategory ? { ...targetCategory } : null,
        };

        if (overIdNum !== null) {
          const overIndex = prev.findIndex((p) => p.id === overIdNum);
          if (overIndex !== -1) {
            return arrayMove(newItems, activeIndex, overIndex);
          }
        } else {
          // 카테고리의 빈 공간(우측 끝)으로 드래그했을 때, 해당 카테고리의 맨 마지막으로 위치를 이동시킵니다.
          const targetItems = prev.filter((p) => (p.productCategory?.id || null) === overCategoryId);
          if (targetItems.length > 0) {
            const lastTargetItem = targetItems[targetItems.length - 1];
            const lastTargetIndex = prev.findIndex((p) => p.id === lastTargetItem.id);
            return arrayMove(newItems, activeIndex, lastTargetIndex);
          }
        }
        return newItems;
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const activeIdNum = Number(String(active.id).replace('product-', ''));
      const overIdNum = String(over.id).startsWith('product-') ? Number(String(over.id).replace('product-', '')) : null;

      setProducts((prev) => {
        let finalItems = [...prev];
        const activeIndex = finalItems.findIndex((p) => p.id === activeIdNum);

        if (overIdNum !== null && activeIdNum !== overIdNum) {
          const overIndex = finalItems.findIndex((p) => p.id === overIdNum);
          if (overIndex !== -1) {
            finalItems = arrayMove(finalItems, activeIndex, overIndex);
          }
        } else if (overIdNum === null) {
          // 같은 카테고리 내에서 우측의 넓은 빈 공간 영역으로 드래그 앤 드롭했을 때,
          // 동작하지 않는 문제를 해결하기 위해 해당 아이템을 무조건 현재 카테고리의 가장 마지막으로 이동시킵니다.
          const activeCategoryId = finalItems[activeIndex]?.productCategory?.id || null;
          const targetItems = finalItems.filter((p) => (p.productCategory?.id || null) === activeCategoryId);

          if (targetItems.length > 0) {
            const lastTargetItem = targetItems[targetItems.length - 1];
            const lastTargetIndex = finalItems.findIndex((p) => p.id === lastTargetItem.id);
            if (activeIndex !== lastTargetIndex) {
              finalItems = arrayMove(finalItems, activeIndex, lastTargetIndex);
            }
          }
        }

        const sorts = categories.map((cat) => {
          const categoryProducts = finalItems.filter((p) => (p.productCategory?.id || null) === cat.id);
          return {
            categoryId: cat.id,
            productIds: categoryProducts.map((p) => p.id),
          };
        });

        reorderProducts(sorts);

        return finalItems;
      });
    }

    setActiveProduct(null);
  };

  return {
    products,
    categories,
    activeProduct,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}

export default useAdminProductDnd;
