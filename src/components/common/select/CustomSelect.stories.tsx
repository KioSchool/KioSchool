import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { format, subHours } from 'date-fns';
import CustomSelect from './CustomSelect';
import CustomDatePicker from '../date-picker/CustomDatePicker';

const meta: Meta<typeof CustomSelect> = {
  title: 'Common/Select/CustomSelect',
  component: CustomSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CustomSelect>;

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    return <CustomSelect value={value} options={options} onChange={setValue} placeholder="Select an option" />;
  },
};

export const WithPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <CustomSelect value={value} options={options} onChange={setValue} placeholder="Select an option" width="200px" />;
  },
};

export const CustomWidth: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    return <CustomSelect value={value} options={options} onChange={setValue} width="300px" />;
  },
};

export const HighlightOnSelect: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    return <CustomSelect value={value} options={options} onChange={setValue} placeholder="Select an option" width="200px" highlightOnSelect={true} />;
  },
};

const statusOptions = [
  { value: 'NOT_PAID', label: '미결제' },
  { value: 'PAID', label: '결제완료' },
  { value: 'SERVED', label: '서빙완료' },
];

export const StatusFilter: Story = {
  render: () => {
    const [value, setValue] = useState('SERVED');
    return <CustomSelect value={value} options={statusOptions} onChange={setValue} width="100px" highlightOnSelect={true} />;
  },
};

/**
 * CustomDatePicker를 CustomSelect 내부에 통합하여 사용하는 예시
 * 날짜 범위를 선택하고, 선택된 범위를 triggerLabel로 표시합니다.
 */
export const WithCustomDatePicker: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(subHours(new Date(), 2));
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    const formattedRange = startDate && endDate ? `${format(startDate, 'yyyy-MM-dd')} ~ ${format(endDate, 'yyyy-MM-dd')}` : '날짜 선택중';

    return (
      <CustomSelect width="320px" highlightOnSelect={true} triggerLabel={formattedRange} value={formattedRange}>
        <CustomDatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      </CustomSelect>
    );
  },
};
