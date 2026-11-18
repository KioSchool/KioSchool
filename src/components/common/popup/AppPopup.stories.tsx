import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import AppPopup from './AppPopup';

const meta = {
  title: 'Components/Common/Popup/AppPopup',
  component: AppPopup,
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <CookiesProvider>
          <Story />
        </CookiesProvider>
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
