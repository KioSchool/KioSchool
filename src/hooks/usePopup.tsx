import React from 'react';

function usePopup() {
  const [isOpen, setIsOpen] = React.useState(false);

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

  return {
    isOpen,
    openPopup,
    closePopup,
  };
}

export default usePopup;
