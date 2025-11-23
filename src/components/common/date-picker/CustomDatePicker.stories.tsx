import type { Meta, StoryObj } from '@storybook/react';
import CustomDatePicker from './CustomDatePicker';

const meta: Meta<typeof CustomDatePicker> = {
  title: 'Common/DatePicker/CustomDatePicker',
  component: CustomDatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CustomDatePicker>;

export const Default: Story = {
  args: {},
};
