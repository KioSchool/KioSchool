import React from 'react';
import { Cookies } from 'react-cookie';
import dayjs from 'dayjs';
import useApi from '@hooks/useApi';

function usePopup() {
  const { adminApi } = useApi();
  const [isOpen, setIsOpen] = React.useState(false);

  const sendPopupResult = (result: string) => {
    adminApi.post('/discord/popup', { result });
  };

  const isValidPopup = (popupId: number, expireDate: Date) => {
    const cookies = new Cookies();
    const currentDate = new Date();

    const cookie = cookies.get(`close_popup_${popupId}`);
    if (cookie) {
      return false;
    }

    return expireDate >= currentDate;
  };

  const openPopup = () => {
    setIsOpen(true);
    // 팝업창 open 시 배경 스크롤 금지 코드
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setIsOpen(false);
    // 팝업창 close 시 배경 스크롤 금지 해제 코드
    document.body.style.overflow = 'auto';
  };

  const closePopupForDay = (popupId: number) => {
    const cookies = new Cookies();
    const expireDate = dayjs().add(1, 'day').startOf('day').toDate();
    cookies.set(`close_popup_${popupId}`, 'true', { path: '/', expires: expireDate });
    closePopup();
  };

  const closePopupForever = (popupId: number) => {
    const cookies = new Cookies();
    cookies.set(`close_popup_${popupId}`, 'true', { path: '/' });
    closePopup();
  };

  return {
    isOpen,
    sendPopupResult,
    openPopup,
    closePopup,
    closePopupForDay,
    closePopupForever,
    isValidPopup,
  };
}

export default usePopup;
