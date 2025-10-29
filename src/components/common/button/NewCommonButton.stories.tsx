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
    onClick: () => alert('Button clicked!'),
  },
};

export const CustomColors = {
  args: {
    size: 'sm',
    children: 'Custom Green',
    onClick: () => alert('Button clicked!'),
    customColors: {
      background: '#28a745',
      color: '#ffffff',
      border: '2px solid #218838',
      hoverBackground: '#218838',
      hoverColor: '#ffffff',
    },
  },
};

export const CustomBlueGrayVariant = {
  args: {
    size: 'sm',
    color: 'blue_gray',
    children: 'Custom Border',
    onClick: () => alert('Button clicked!'),
    customColors: {
      border: '2px solid #007bff',
      hoverBackground: '#f0f8ff',
    },
  },
};
