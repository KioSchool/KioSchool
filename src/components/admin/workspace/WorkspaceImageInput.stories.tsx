import { Meta, StoryObj } from '@storybook/react';
import { DEFAULT_FOCAL_POINT } from '@constants/data/workspaceImageData';
import { defaultImageValue } from '@@types/defaultValues';
import WorkspaceImageInput from './WorkspaceImageInput';

const meta: Meta<typeof WorkspaceImageInput> = {
  title: 'Admin/Workspace/WorkspaceImageInput',
  component: WorkspaceImageInput,
};

export default meta;
type Story = StoryObj<typeof WorkspaceImageInput>;

const filledSlot = (focalPoint: { x: number; y: number }) => ({
  image: { ...defaultImageValue, id: 1, url: 'https://placehold.co/600x800/FF8A00/FFFFFF/png?text=Portrait', focalPoint },
  focalPoint,
});

export const OneAdjustedOneDefault: Story = {
  args: {
    slots: [filledSlot({ x: 50, y: 10 }), filledSlot(DEFAULT_FOCAL_POINT), { image: null, focalPoint: DEFAULT_FOCAL_POINT }],
    previewUrls: ['https://placehold.co/600x800/FF8A00/FFFFFF/png?text=Portrait', 'https://placehold.co/600x800/FF8A00/FFFFFF/png?text=Portrait', null],
    handleAdjustPosition: () => {},
    handleDeleteImage: () => {},
    handleAddImageClick: () => {},
    handleAddNewImage: () => {},
  },
};

export const Empty: Story = {
  args: {
    slots: [
      { image: null, focalPoint: DEFAULT_FOCAL_POINT },
      { image: null, focalPoint: DEFAULT_FOCAL_POINT },
      { image: null, focalPoint: DEFAULT_FOCAL_POINT },
    ],
    previewUrls: [null, null, null],
    handleAdjustPosition: () => {},
    handleDeleteImage: () => {},
    handleAddImageClick: () => {},
    handleAddNewImage: () => {},
  },
};

// firstEmptyIndex는 slots에 빈 슬롯이 없으면 -1이 된다. 이 스토리는 그 상태(모든 슬롯이 채워져
// 있어 더미 박스가 하나도 렌더링되지 않는 경우)를 시각적으로 고정해, firstEmptyIndex가 -1인
// 분기가 실제로는 죽은 코드임을 보여준다.
export const AllThreeFilled: Story = {
  args: {
    slots: [filledSlot({ x: 50, y: 10 }), filledSlot(DEFAULT_FOCAL_POINT), filledSlot({ x: 20, y: 80 })],
    previewUrls: [
      'https://placehold.co/600x800/FF8A00/FFFFFF/png?text=Portrait',
      'https://placehold.co/600x800/FF8A00/FFFFFF/png?text=Portrait',
      'https://placehold.co/600x800/FF8A00/FFFFFF/png?text=Portrait',
    ],
    handleAdjustPosition: () => {},
    handleDeleteImage: () => {},
    handleAddImageClick: () => {},
    handleAddNewImage: () => {},
  },
};
