import PopupContent1 from '@components/common/popup/popup-content/PopupContent1';

export const POPUP_CLOSE_MODE = {
  DAY: 'DAY',
  FOREVER: 'FOREVER',
} as const;

export type PopupCloseMode = typeof POPUP_CLOSE_MODE[keyof typeof POPUP_CLOSE_MODE];

export interface PopupData {
  popupId: number;
  title: string;
  expireDate: Date;
  children: React.ReactNode;
  closeMode?: PopupCloseMode;
  closeText?: string;
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
