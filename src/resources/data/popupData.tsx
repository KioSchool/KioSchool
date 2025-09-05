import dayjs from 'dayjs';
import PopupContent1 from '@components/common/popup/popup-content/PopupContent1';

export interface PopupData {
  popupId: number;
  title: string;
  expireDate: Date;
  children: React.ReactNode;
}

export const popupDatas: PopupData[] = [
  {
    popupId: 0,
    title: 'Default Popup for prevent flickering',
    expireDate: dayjs().set('year', 1000).set('month', 1).set('date', 1).toDate(),
    children: null,
  },
  {
    popupId: 1,
    title: '키오스쿨 사용 인터뷰에 참여해주세요!',
    expireDate: dayjs().set('year', 2025).set('month', 9).set('date', 30).toDate(),
    children: <PopupContent1 />,
  },
];
