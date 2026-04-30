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
    expireDate: new Date(1000, 1, 1),
    children: null,
  },
  {
    popupId: 1,
    title: '키오스쿨 사용 인터뷰에 참여해주세요!',
    expireDate: new Date(2025, 8, 30),
    children: <PopupContent1 />,
  },
];
