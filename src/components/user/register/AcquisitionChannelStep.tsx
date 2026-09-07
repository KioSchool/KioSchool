import { useState } from 'react';
import styled from '@emotion/styled';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { Color, OnboardingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { ACQUISITION_CHANNEL, ACQUISITION_CHANNEL_ETC_MAX_LENGTH, ACQUISITION_CHANNEL_ORDER, AcquisitionChannel } from '@utils/acquisitionChannel';
import AcquisitionChannelOption from './AcquisitionChannelOption';

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  gap: 16px;
  ${colFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    max-width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
  }
`;

const HeaderArea = styled.div`
  width: 100%;
  gap: 6px;
  ${colFlex({ align: 'start' })}
`;

const Title = styled.h1`
  margin: 0;
  color: ${OnboardingColor.TITLE_TEXT};
  font-size: 18px;
  line-height: 1.2;
`;

const Description = styled.p`
  margin: 0;
  color: ${OnboardingColor.SUBTLE_TEXT};
  font-size: 14px;
  line-height: 1.7;
`;

const OptionList = styled.div`
  width: 100%;
  gap: 7px;
  ${colFlex()}
`;

const EtcInput = styled.input`
  width: 100%;
  padding: 4px 2px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid ${OnboardingColor.STEP_IDLE_BORDER};
  border-radius: 0;
  background: transparent;
  color: ${OnboardingColor.TITLE_TEXT};
  font-family: inherit;
  font-size: 14px;
  transition: border-bottom-color 0.15s;

  &::placeholder {
    color: ${OnboardingColor.MUTED_TEXT};
  }

  &:focus {
    outline: none;
    border-bottom-color: ${Color.KIO_ORANGE};
  }
`;

const ActionArea = styled.div`
  width: 100%;
  padding-top: 2px;
  gap: 10px;
  ${colFlex({ align: 'center' })}
`;

const SecondaryActions = styled.div`
  gap: 8px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const SkipButton = styled.button`
  border: none;
  background: none;
  padding: 4px 8px;
  font-size: 13px;
  color: ${OnboardingColor.EYEBROW_TEXT};
  cursor: pointer;
  text-decoration: underline;

  &:disabled {
    cursor: not-allowed;
  }
`;

const SecondaryActionsDivider = styled.span`
  font-size: 13px;
  color: ${OnboardingColor.EYEBROW_TEXT};
`;

const ErrorMessageContainer = styled.div`
  width: 100%;
  min-height: 20px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const ErrorMessage = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${Color.KIO_ORANGE};
  text-align: center;
`;

interface AcquisitionChannelStepProps {
  onSubmit: (channel: AcquisitionChannel, channelEtc: string | null) => void;
  onSkip: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  errorMessage?: string;
}

function AcquisitionChannelStep({ onSubmit, onSkip, onBack, isSubmitting, errorMessage }: AcquisitionChannelStepProps) {
  const [selectedChannel, setSelectedChannel] = useState<AcquisitionChannel | null>(null);
  const [channelEtcInput, setChannelEtcInput] = useState('');

  const isEtcSelected = selectedChannel === ACQUISITION_CHANNEL.ETC;

  const handleSubmit = () => {
    if (!selectedChannel || isSubmitting) return;

    const trimmedEtc = channelEtcInput.trim();
    onSubmit(selectedChannel, isEtcSelected && trimmedEtc ? trimmedEtc : null);
  };

  return (
    <Container>
      <HeaderArea>
        <Title>키오스쿨을 어떻게 알게 되셨나요?</Title>
        <Description>더 나은 서비스를 만드는 데 큰 도움이 됩니다. 하나만 골라주세요.</Description>
      </HeaderArea>

      <OptionList>
        {ACQUISITION_CHANNEL_ORDER.map((channel) => (
          <AcquisitionChannelOption key={channel} channel={channel} isSelected={selectedChannel === channel} onSelect={setSelectedChannel}>
            {channel === ACQUISITION_CHANNEL.ETC && isEtcSelected && (
              <EtcInput
                id="acquisitionChannelEtc"
                placeholder="어떻게 알게 되셨는지 알려주세요."
                maxLength={ACQUISITION_CHANNEL_ETC_MAX_LENGTH}
                value={channelEtcInput}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setChannelEtcInput(event.target.value)}
              />
            )}
          </AcquisitionChannelOption>
        ))}
      </OptionList>

      <ErrorMessageContainer>{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}</ErrorMessageContainer>

      <ActionArea>
        <NewCommonButton type="button" size={'sm'} disabled={!selectedChannel || isSubmitting} onClick={handleSubmit}>
          가입 완료
        </NewCommonButton>
        <SecondaryActions>
          <SkipButton type="button" disabled={isSubmitting} onClick={onBack}>
            이전으로
          </SkipButton>
          <SecondaryActionsDivider>·</SecondaryActionsDivider>
          <SkipButton type="button" disabled={isSubmitting} onClick={onSkip}>
            건너뛰고 가입하기
          </SkipButton>
        </SecondaryActions>
      </ActionArea>
    </Container>
  );
}

export default AcquisitionChannelStep;
