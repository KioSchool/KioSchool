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
  argTypes: {
    width: { control: 'text' },
    flex: { control: 'text' },
    highlightOnSelect: { control: 'boolean' },
    triggerLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CustomSelect>;

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    value: 'option1',
    options,
    placeholder: 'Select an option',
    highlightOnSelect: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || '');
    return (
      <CustomSelect
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
};

export const WithPlaceholder: Story = {
  args: {
    value: '',
    options,
    placeholder: 'Select an option',
    width: '200px',
    highlightOnSelect: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || '');
    return (
      <CustomSelect
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
};

export const CustomWidth: Story = {
  args: {
    value: 'option1',
    options,
    width: '300px',
    highlightOnSelect: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || '');
    return (
      <CustomSelect
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
};

export const HighlightOnSelect: Story = {
  args: {
    value: 'option1',
    options,
    placeholder: 'Select an option',
    width: '200px',
    highlightOnSelect: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || '');
    return (
      <CustomSelect
        {...args}
        value={value}
        onChange={(newValue: string) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
};

const statusOptions = [
  { value: 'NOT_PAID', label: '미결제' },
  { value: 'PAID', label: '결제완료' },
  { value: 'SERVED', label: '서빙완료' },
];

export const StatusFilter: Story = {
  args: {
    value: 'SERVED',
    options: statusOptions,
    width: '100px',
    highlightOnSelect: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || '');
    return (
      <CustomSelect
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
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
      <CustomSelect width="320px" highlightOnSelect={true} triggerLabel={formattedRange}>
        <CustomDatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      </CustomSelect>
    );
  },
};
