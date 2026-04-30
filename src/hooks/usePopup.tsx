import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { addDays, startOfDay } from 'date-fns';
import useApi from '@hooks/useApi';

function usePopup() {
  const { adminApi, userApi } = useApi();
  const [isOpen, setIsOpen] = useState(false);

  const sendAdminPopupResult = (result: string) => {
    adminApi.post('/discord/popup', { result });
  };

  const sendUserPopupResult = (result: string) => {
    userApi.post('/discord/popup', { result });
  };

  const isValidPopup = (popupId: number, expireDate?: Date) => {
    const cookies = new Cookies();
    const currentDate = new Date();

    const cookie = cookies.get(`close_popup_${popupId}`);
    if (cookie) {
      return false;
    }

    if (!expireDate) {
      return true;
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
    const expireDate = startOfDay(addDays(new Date(), 1));
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
    openPopup,
    closePopup,
    closePopupForDay,
    closePopupForever,
    isValidPopup,
    sendAdminPopupResult,
    sendUserPopupResult,
  };
}

export default usePopup;
