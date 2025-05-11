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
    popupId: 1,
    title: '키오스쿨 사용 인터뷰에 참여해주세요!',
    expireDate: dayjs().set('year', 2025).set('month', 6).set('date', 30).toDate(),
    children: <PopupContent1 />,
  },
];
