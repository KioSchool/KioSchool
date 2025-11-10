export type StatusType = 'registered' | 'unregisteredTossQR' | 'unregisteredAccount';

export type AdminSidebarType = 'REGISTER_ACCOUNT' | 'REGISTER_TOSS' | null;

export const REGISTRATION_STATUS_CONTENT: Record<StatusType, { title: string; description: string }> = {
  registered: {
    title: '등록됨',
    description: '현재 토스 QR이 등록되어 있습니다.',
  },
  unregisteredTossQR: {
    title: '등록되지 않음',
    description: '현재 토스 QR이 등록되어 있지 않습니다.',
  },
  unregisteredAccount: {
    title: '등록되지 않음',
    description: '현재 계좌가 등록되어 있지 않습니다.',
  },
} as const;

export const TOSS_ACCOUNT_INFO = {
  TITLE: '등록된 토스 QR',
  PRIMARY_BUTTON: 'QR 등록',
  SECONDARY_BUTTON: 'QR 삭제',
  TOOLTIP: '계좌번호를 복사해 직접 송금할 필요 없이, 바로 토스로 연결되어 간편하게 결제할 수 있습니다.',
} as const;

export const ACCOUNT_INFO = {
  TITLE: '등록된 계좌',
  PRIMARY_BUTTON: '계좌 등록',
  SECONDARY_BUTTON: '계좌 삭제',
  BANK_NAME_LABEL: '은행명',
  HOLDER_LABEL: '예금주',
  ACCOUNT_NUMBER_LABEL: '계좌번호',
} as const;

export const ACCOUNT_MODAL = {
  TITLE: '계좌 등록',
  SUBTITLE: '*편집 중 창을 닫지 마세요',
} as const;

export const TOSS_MODAL = {
  TITLE: '토스 QR 등록',
  SUBTITLE: '1. 토스 앱 실행\n2. 하단 전체 메뉴 선택\n3. 사진으로 송금 메뉴 검색\n4. 계좌 선택 후 받을 금액 미설정\n5. QR코드 발급',
} as const;
