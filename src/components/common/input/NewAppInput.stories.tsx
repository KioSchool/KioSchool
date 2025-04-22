import NewAppInput from '@components/common/input/NewAppInput';

const meta = {
  title: 'Components/Input/NewAppInput',
  component: NewAppInput,
  argTypes: {
    enterHandler: { control: 'function' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

export default meta;

export const Primary = {
  args: {
    placeholder: 'Enter text',
    enterHandler: () => alert('Enter key pressed!'),
  },
};
