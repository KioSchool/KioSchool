import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { subHours } from 'date-fns';
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

/**
 * 기본 상태 - 최근 2시간 범위가 선택된 상태
 */
export const Default: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(subHours(new Date(), 2));
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    return <CustomDatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />;
  },
};
