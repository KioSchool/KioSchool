import AppPopup from '@components/common/popup/AppPopup';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Components/Common/Popup/AppPopup',
  component: AppPopup,
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    popupData: { control: 'object' },
    children: { control: 'object' },
  },
};

export default meta;

export const Basic = {
  args: {},
};
