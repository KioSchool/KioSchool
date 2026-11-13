import { SyntheticEvent, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { RiCloseLine } from '@remixicon/react';
import { match } from 'ts-pattern';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { buildSignatureSrcDoc } from '@utils/mailSrcDoc';

const INITIAL_FRAME_HEIGHT = 160;
const CLOSE_ICON_SIZE = 18;

const getWrapperBorderColor = (isSelected: boolean) =>
  match(isSelected)
    .with(true, () => Color.KIO_ORANGE)
    .otherwise(() => Color.BORDER_GREY);

const Wrapper = styled(NodeViewWrapper, { shouldForwardProp: (prop) => prop !== 'isSelected' })<{ isSelected: boolean }>`
  margin: 0 0 12px;
  padding: 12px 14px 14px 16px;
  border: 1px solid ${({ isSelected }) => getWrapperBorderColor(isSelected)};
  border-radius: 10px;
  background: ${Color.LIGHT_GREY};
  gap: 8px;
  user-select: none;
  ${colFlex()}
`;

const Header = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Label = styled.span`
  color: ${Color.MUTED_GREY};
  font-size: 12px;
  font-weight: 700;
`;

const RemoveButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: ${Color.MUTED_GREY};
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Frame = styled.iframe<{ frameHeight: number }>`
  width: 100%;
  height: ${({ frameHeight }) => frameHeight}px;
  border: none;
  background: ${Color.WHITE};
  pointer-events: none;
`;

const EmptyText = styled.span`
  color: ${Color.GREY};
  font-size: 13px;
`;

function MailSignatureNodeView({ extension, deleteNode, selected }: NodeViewProps) {
  const [frameHeight, setFrameHeight] = useState(INITIAL_FRAME_HEIGHT);
  const html: string | null = extension.options.html;
  const srcDoc = useMemo(() => buildSignatureSrcDoc(html ?? ''), [html]);

  const handleFrameLoad = (event: SyntheticEvent<HTMLIFrameElement>) => {
    const contentHeight = event.currentTarget.contentDocument?.documentElement.scrollHeight;
    if (contentHeight) setFrameHeight(contentHeight);
  };

  return (
    <Wrapper isSelected={selected} contentEditable={false}>
      <Header>
        <Label>서명</Label>
        <RemoveButton type="button" aria-label="이번 메일에서 서명 빼기" onClick={deleteNode}>
          <RiCloseLine size={CLOSE_ICON_SIZE} />
        </RemoveButton>
      </Header>
      {html && <Frame title="서명" sandbox="allow-same-origin" srcDoc={srcDoc} frameHeight={frameHeight} onLoad={handleFrameLoad} />}
      {!html && <EmptyText>설정한 서명이 없어 메일에 들어가지 않아요.</EmptyText>}
    </Wrapper>
  );
}

export default MailSignatureNodeView;
