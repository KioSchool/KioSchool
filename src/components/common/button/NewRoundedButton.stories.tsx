import NewRoundedButton from '@components/common/button/NewRoundedButton';

const meta = {
  title: 'Components/Common/Button/NewRoundedButton',
  component: NewRoundedButton,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md'] },
    customSize: { control: 'object' },
  },
};

export default meta;

export const Primary = {
  args: {
    children: 'Click Me',
    onClick: () => alert('Button clicked!'),
  },
};

export const Size = {
  args: {
    size: 'xs',
    children: 'Click Me',
    onClick: () => alert('Button clicked!'),
  },
};

export const CustomSize = {
  args: {
    customSize: { width: 200, height: 50 },
    children: 'Click Me',
    onClick: () => alert('Button clicked!'),
  },
};
