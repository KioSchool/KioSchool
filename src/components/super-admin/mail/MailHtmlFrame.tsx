import { useMemo } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { buildMailSrcDoc } from '@utils/mailSrcDoc';

const Frame = styled.iframe`
  width: 100%;
  height: 320px;
  box-sizing: border-box;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 8px;
  background: ${Color.WHITE};
  resize: vertical;
`;

const PlainText = styled.p`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  color: ${Color.BLACK};
  font-size: 14px;
  line-height: 1.7;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
`;

const EmptyText = styled.span`
  color: ${Color.GREY};
  font-size: 14px;
`;

interface MailHtmlFrameProps {
  html: string | null;
  text: string | null;
}

function MailHtmlFrame({ html, text }: MailHtmlFrameProps) {
  const srcDoc = useMemo(() => (html ? buildMailSrcDoc(html) : ''), [html]);

  if (html) return <Frame title="받은 메일 내용" sandbox="allow-popups allow-popups-to-escape-sandbox" srcDoc={srcDoc} />;
  if (text) return <PlainText>{text}</PlainText>;
  return <EmptyText>내용이 없는 메일이에요.</EmptyText>;
}

export default MailHtmlFrame;
