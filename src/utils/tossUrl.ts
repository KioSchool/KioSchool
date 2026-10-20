const TOSS_SEND_URL_PREFIX = 'supertoss://send?';

// 주점 주인이 등록한 링크를 손님 화면이 그대로 열기 때문에 토스 송금 링크만 쓴다
export function isTossSendUrl(url?: string | null): url is string {
  return !!url && url.startsWith(TOSS_SEND_URL_PREFIX);
}
