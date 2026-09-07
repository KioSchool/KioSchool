import { useState } from 'react';
import styled from '@emotion/styled';
import NewAppInput from '@components/common/input/NewAppInput';
import NewCommonButton from '@components/common/button/NewCommonButton';
import OnboardingHeader from '@components/onboarding/OnboardingHeader';
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

const OptionList = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()}
`;

const ActionArea = styled.div`
  width: 100%;
  padding-top: 4px;
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
  height: 20px;
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
      <OnboardingHeader
        eyebrow="LAST STEP"
        title="키오스쿨을 어떻게 알게 되셨나요?"
        description="더 나은 서비스를 만드는 데 큰 도움이 됩니다. 하나만 골라주세요."
      />

      <OptionList>
        {ACQUISITION_CHANNEL_ORDER.map((channel) => (
          <AcquisitionChannelOption key={channel} channel={channel} isSelected={selectedChannel === channel} onSelect={setSelectedChannel} />
        ))}

        {isEtcSelected && (
          <NewAppInput
            id="acquisitionChannelEtc"
            placeholder="어떻게 알게 되셨는지 알려주세요."
            width={'100%'}
            maxLength={ACQUISITION_CHANNEL_ETC_MAX_LENGTH}
            value={channelEtcInput}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setChannelEtcInput(event.target.value)}
          />
        )}
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
