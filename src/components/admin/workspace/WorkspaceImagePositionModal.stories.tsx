import { Meta, StoryObj } from '@storybook/react';
import { MODAL_ROOT_KEY } from '@hooks/useModal';
import { DEFAULT_FOCAL_POINT } from '@constants/data/workspaceImageData';
import WorkspaceImagePositionModal from './WorkspaceImagePositionModal';

const meta: Meta<typeof WorkspaceImagePositionModal> = {
  title: 'Admin/Workspace/WorkspaceImagePositionModal',
  component: WorkspaceImagePositionModal,
  decorators: [
    (Story) => {
      if (!document.getElementById(MODAL_ROOT_KEY)) {
        const root = document.createElement('div');
        root.id = MODAL_ROOT_KEY;
        document.body.appendChild(root);
      }
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof WorkspaceImagePositionModal>;

export const Portrait: Story = {
  args: {
    imageUrl: 'https://placehold.co/600x800/FF8A00/FFFFFF/png?text=Portrait',
    focalPoint: DEFAULT_FOCAL_POINT,
    onConfirm: () => {},
    onClose: () => {},
  },
};

export const Landscape: Story = {
  args: {
    imageUrl: 'https://placehold.co/1200x400/FF8A00/FFFFFF/png?text=Landscape',
    focalPoint: DEFAULT_FOCAL_POINT,
    onConfirm: () => {},
    onClose: () => {},
  },
};
