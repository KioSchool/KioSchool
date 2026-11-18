import { USER_ROUTES } from '@constants/routes';
import { formatKoreanRevenue } from '@utils/formatKoreanRevenue';

export const LANDING_DEMO_PATH = USER_ROUTES.DEMO;

export const LANDING_BUTTON_LABEL = {
  START: '무료로 시작하기',
  DEMO: '체험해보기',
  INFO: '서비스 알아보기',
} as const;

export const INFO_SECTION_ID = {
  ORDER: 'info-order',
  PROCESS: 'info-process',
  TABLE: 'info-table',
  LAYOUT: 'info-layout',
  MENU: 'info-menu',
  SETTLEMENT: 'info-settlement',
  MONEY: 'info-money',
  PREPARATION: 'info-preparation',
  TEAM: 'info-team',
} as const;

export const LANDING_STATS = [
  { value: 36000, unit: '명+', label: '누적 이용자' },
  { value: 31000, unit: '건+', label: '누적 주문' },
  { value: 187, unit: '개+', label: '사용 주점' },
  { value: 62000, unit: '원+', label: '주점 누적 매출', format: formatKoreanRevenue },
];

const FAQ_COST = {
  question: '비용이 드나요?',
  answer: '아니요, 무료입니다. 주점을 만들고 주문을 받는 데까지 별도 비용이 들지 않으니 부담 없이 시작하셔도 됩니다.',
};
const FAQ_PAYMENT = {
  question: '손님은 어떻게 계산하나요?',
  answer:
    '손님이 토스, 카카오페이, 계좌이체 중 편한 방법을 선택해 주점 계좌로 직접 송금합니다. 돈은 키오스쿨을 거치지 않으니 안심하셔도 됩니다. 운영진은 입금자명을 확인한 뒤 확인 버튼만 눌러 주시면 됩니다.',
};
const FAQ_OTHER_EVENTS = {
  question: '축제 말고도 쓸 수 있나요?',
  answer: '네, 일일호프나 학과 행사에서도 똑같이 사용하실 수 있습니다. 지난 할로윈 일일호프에서는 하루 200건 이상의 주문을 받은 주점도 있었습니다.',
};

export const LANDING_HOME_FAQ = [
  FAQ_COST,
  FAQ_PAYMENT,
  {
    question: '노트북이 꼭 있어야 하나요?',
    answer: '노트북이 없어도 괜찮습니다. PC나 태블릿으로도 주문을 관리하실 수 있습니다. 카운터와 주방 등 여러 기기에서 한 계정으로 함께 사용하셔도 됩니다.',
  },
  FAQ_OTHER_EVENTS,
];

export const LANDING_INFO_FAQ = [
  FAQ_COST,
  FAQ_PAYMENT,
  { question: '노트북이 꼭 있어야 하나요?', answer: '노트북이 없어도 괜찮습니다. PC나 태블릿으로도 주문을 관리하실 수 있습니다.' },
  {
    question: '여러 명이 같이 쓸 수 있나요?',
    answer: '네, 한 계정으로 카운터와 주방 등 여러 기기에서 동시에 사용하실 수 있습니다. 주문이 들어오거나 상태가 바뀌면 모든 화면에 바로 반영됩니다.',
  },
  FAQ_OTHER_EVENTS,
  {
    question: '운영 중에 문제가 생기면 어떻게 하나요?',
    answer: '운영 중 문제가 생기면 문의하기나 키오스쿨 인스타그램 메시지로 알려 주세요. 축제 기간에는 최대한 빠르게 확인하겠습니다.',
  },
];
