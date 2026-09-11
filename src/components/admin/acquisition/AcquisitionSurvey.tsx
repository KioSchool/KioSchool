import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { GA_EVENT } from '@constants/analytics';
import useAcquisitionSurvey from '@hooks/admin/useAcquisitionSurvey';
import { Color, OnboardingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { ACQUISITION_CHANNEL, ACQUISITION_CHANNEL_ETC_MAX_LENGTH, ACQUISITION_CHANNEL_ORDER, AcquisitionChannel } from '@utils/acquisitionChannel';
import { trackEvent } from '@utils/analytics';
import AcquisitionSurveyOption from './AcquisitionSurveyOption';

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  padding: 12px 0 48px;
  box-sizing: border-box;
  gap: 16px;
  ${colFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    max-width: 100%;
    padding: 12px 16px 48px;
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

  ${rowFlex({ justify: 'center', align: 'center' })}
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

const SUBMIT_FAILURE_MESSAGE = '저장하지 못했습니다. 잠시 후 다시 시도해주세요.';

function AcquisitionSurvey() {
  const { saveSurvey, markAnswered } = useAcquisitionSurvey();

  const [selectedChannel, setSelectedChannel] = useState<AcquisitionChannel | null>(null);
  const [channelEtcInput, setChannelEtcInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hasTrackedViewRef = useRef(false);

  useEffect(() => {
    if (hasTrackedViewRef.current) return;

    hasTrackedViewRef.current = true;
    trackEvent(GA_EVENT.ACQUISITION_SURVEY_VIEW, {});
  }, []);

  const isEtcSelected = selectedChannel === ACQUISITION_CHANNEL.ETC;

  const handleSubmit = async () => {
    if (!selectedChannel || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    const trimmedEtc = channelEtcInput.trim();
    const isSaved = await saveSurvey(selectedChannel, isEtcSelected && trimmedEtc ? trimmedEtc : null);

    if (!isSaved) {
      setIsSubmitting(false);
      setErrorMessage(SUBMIT_FAILURE_MESSAGE);
      return;
    }

    trackEvent(GA_EVENT.ACQUISITION_SURVEY_ANSWERED, { channel: selectedChannel });
    markAnswered();
  };

  // 저장에 실패해도 통과시킨다. 답하지 않겠다는 유저를 실패한 요청 때문에 홈에 못 들어가게 둘 수는 없다.
  const handleSkip = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    trackEvent(GA_EVENT.ACQUISITION_SURVEY_SKIPPED, {});
    await saveSurvey(null, null);
    markAnswered();
  };

  return (
    <Container>
      <HeaderArea>
        <Title>키오스쿨을 어떻게 알게 되셨나요?</Title>
        <Description>더 나은 서비스를 만드는 데 큰 도움이 됩니다. 하나만 골라주세요.</Description>
      </HeaderArea>

      <OptionList>
        {ACQUISITION_CHANNEL_ORDER.map((channel) => (
          <AcquisitionSurveyOption key={channel} channel={channel} isSelected={selectedChannel === channel} onSelect={setSelectedChannel}>
            {channel === ACQUISITION_CHANNEL.ETC && isEtcSelected && (
              <EtcInput
                id="acquisitionChannelEtc"
                placeholder="어떻게 알게 되셨는지 알려주세요."
                maxLength={ACQUISITION_CHANNEL_ETC_MAX_LENGTH}
                value={channelEtcInput}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setChannelEtcInput(event.target.value)}
              />
            )}
          </AcquisitionSurveyOption>
        ))}
      </OptionList>

      <ErrorMessageContainer>{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}</ErrorMessageContainer>

      <ActionArea>
        <NewCommonButton type="button" size={'sm'} disabled={!selectedChannel || isSubmitting} onClick={handleSubmit}>
          완료
        </NewCommonButton>
        <SkipButton type="button" disabled={isSubmitting} onClick={handleSkip}>
          건너뛰기
        </SkipButton>
      </ActionArea>
    </Container>
  );
}

export default AcquisitionSurvey;
