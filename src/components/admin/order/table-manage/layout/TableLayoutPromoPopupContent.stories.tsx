import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import AppPopup from '@components/common/popup/AppPopup';
import { POPUP_CLOSE_MODE, PopupData } from '@constants/data/popupData';
import TableLayoutPromoPopupContent, { TABLE_LAYOUT_PROMO_POPUP_ID } from './TableLayoutPromoPopupContent';

const POPUP_DATAS: PopupData[] = [
  {
    popupId: TABLE_LAYOUT_PROMO_POPUP_ID,
    title: '테이블 배치 기능 안내',
    expireDate: new Date(9999, 11, 31),
    children: <TableLayoutPromoPopupContent />,
    closeMode: POPUP_CLOSE_MODE.FOREVER,
    closeText: '다시 보지 않기',
  },
];

const meta = {
  title: 'Components/Admin/TableManage/TableLayoutPromoPopupContent',
  component: TableLayoutPromoPopupContent,
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <CookiesProvider>
          <Story />
        </CookiesProvider>
      </BrowserRouter>
    ),
  ],
};

export default meta;

export const InAppPopup = {
  render: () => <AppPopup popupDatas={POPUP_DATAS} />,
};
