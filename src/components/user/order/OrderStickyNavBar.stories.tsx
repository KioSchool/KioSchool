import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Admin/Order/OrderStickyNavBar',
  component: OrderStickyNavBar,
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    useLeftArrow: { control: 'boolean' },
    showNavBar: { control: 'boolean' },
    workspaceName: { control: 'text' },
    tableNo: { control: 'text' },
    useShareButton: { control: 'boolean' },
  },
} as Meta<typeof OrderStickyNavBar>;

export default meta;
type Story = StoryObj<typeof OrderStickyNavBar>;

export const Default: Story = {
  args: {
    useLeftArrow: true,
    showNavBar: true,
    workspaceName: '키오스쿨 레스토랑',
    useShareButton: true,
  },
};

export const LongWorkspaceName: Story = {
  args: {
    useLeftArrow: true,
    showNavBar: true,
    workspaceName: '아주 긴 이름의 키오스쿨 레스토랑입니다. 이름이 너무 길어서 말줄임표가 보여야 합니다.',
    tableNo: '5',
    useShareButton: true,
  },
};
