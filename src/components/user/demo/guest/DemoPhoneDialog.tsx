import styled from '@emotion/styled';
import { LandingColor } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(25, 31, 40, 0.42);
`;

const Dialog = styled.div`
  position: absolute;
  left: 40px;
  right: 40px;
  top: 35%;
  overflow: hidden;
  border-radius: 16px;
  background: rgba(250, 250, 250, 0.98);
  text-align: center;
`;

const Message = styled.div`
  padding: 20px 14px 16px;
  font-size: 14px;
  line-height: 1.55;
  color: ${LandingColor.TEXT};
`;

const Origin = styled.span`
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  color: ${LandingColor.SUB_TEXT};
`;

const MessageLine = styled.span`
  display: block;
`;

const Buttons = styled.div`
  height: 46px;
  border-top: 1px solid #dcdfe3;
  ${rowFlex({ align: 'stretch' })}
`;

const DialogButton = styled.button`
  flex: 1;
  padding: 0;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 16px;
  font-weight: 700;
  color: #0a84ff;
  cursor: pointer;

  & + & {
    border-left: 1px solid #dcdfe3;
  }
`;

export interface DemoPhoneDialogButton {
  label: string;
  onClick: () => void;
}

interface DemoPhoneDialogProps {
  lines: string[];
  buttons: DemoPhoneDialogButton[];
}

function DemoPhoneDialog({ lines, buttons }: DemoPhoneDialogProps) {
  return (
    <Overlay>
      <Dialog role="alertdialog" aria-modal="true">
        <Message>
          <Origin>kio-school.com</Origin>
          {lines.map((line) => (
            <MessageLine key={line}>{line}</MessageLine>
          ))}
        </Message>
        <Buttons>
          {buttons.map((button) => (
            <DialogButton key={button.label} type="button" onClick={button.onClick}>
              {button.label}
            </DialogButton>
          ))}
        </Buttons>
      </Dialog>
    </Overlay>
  );
}

export default DemoPhoneDialog;
