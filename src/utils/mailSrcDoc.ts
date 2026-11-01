// 밖에서 온 메일 HTML을 슈퍼어드민 화면에 그대로 띄우므로 외부 이미지·스타일·폰트 요청(추적 픽셀)을 막는다.
// 스크립트와 폼은 iframe의 sandbox가 막는다.
const MAIL_FRAME_HEAD = [
  '<meta charset="utf-8">',
  `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:">`,
  '<meta name="referrer" content="no-referrer">',
  '<base target="_blank">',
  '<style>body { margin: 12px; font-family: sans-serif; font-size: 14px; line-height: 1.6; overflow-wrap: anywhere; }</style>',
].join('');

export function buildMailSrcDoc(html: string): string {
  return `<!DOCTYPE html><html><head>${MAIL_FRAME_HEAD}</head><body>${html}</body></html>`;
}
