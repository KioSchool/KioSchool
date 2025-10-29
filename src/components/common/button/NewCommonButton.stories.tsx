import NewCommonButton from '@components/common/button/NewCommonButton';

const meta = {
  title: 'Components/Common/Button/NewCommonButton',
  component: NewCommonButton,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md'] },
    customSize: { control: 'object' },
    color: { control: 'select', options: ['kio_orange', 'blue_gray'] },
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

export const KioOrangeColor = {
  args: {
    size: 'xs',
    color: 'kio_orange',
    children: 'Click Me',
    onClick: () => alert('Button clicked!'),
  },
};

export const BlueGrayColor = {
  args: {
    size: 'xs',
    color: 'blue_gray',
    children: 'Click Me',
    onClick: () => alert('Button clicked!'),
  },
};

export const Disabled = {
  args: {
    disabled: true,
    size: 'xs',
    color: 'kio_orange',
    children: 'Disabled',
    onClick: () => alert('Button clicked!'), // disabled 상태라 클릭되지 않습니다.
  },
};
