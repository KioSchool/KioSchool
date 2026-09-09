import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import AcquisitionChannelStep from '@components/user/register/AcquisitionChannelStep';
import RegisterForm, { RegisterFormValues } from '@components/user/register/RegisterForm';
import useRegister from '@hooks/user/useRegister';
import { GA_EVENT } from '@constants/analytics';
import { USER_ROUTES } from '@constants/routes';
import { colFlex } from '@styles/flexStyles';
import { AcquisitionChannel } from '@utils/acquisitionChannel';
import { readAcquisitionContext } from '@utils/acquisitionContext';
import { trackEvent } from '@utils/analytics';

const FormSection = styled.div`
  width: 100%;
  ${colFlex({ align: 'center' })}

  &[hidden] {
    display: none;
  }
`;

const AcquisitionSection = styled.div`
  width: 100%;
  ${colFlex({ align: 'center' })}

  &[hidden] {
    display: none;
  }
`;

type RegisterStep = 'form' | 'acquisition';

const REGISTRATION_FAILURE_RECOVERY_GUIDE = '이전으로 돌아가 이메일 인증을 다시 해주세요.';

function Register() {
  const navigate = useNavigate();
  const { registerUser, saveAcquisitionSurvey } = useRegister();

  const [step, setStep] = useState<RegisterStep>('form');
  const [pendingRegistration, setPendingRegistration] = useState<RegisterFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');

  const hasTrackedStepViewRef = useRef(false);

  const handleFormSubmit = (values: RegisterFormValues) => {
    setPendingRegistration(values);
    setStep('acquisition');

    if (!hasTrackedStepViewRef.current) {
      hasTrackedStepViewRef.current = true;
      trackEvent(GA_EVENT.SIGNUP_ACQUISITION_STEP_VIEW, {});
    }
  };

  const submitRegistration = async (channel: AcquisitionChannel | null, channelEtc: string | null, isSkip: boolean) => {
    if (!pendingRegistration || isSubmitting) return;

    if (isSkip) {
      trackEvent(GA_EVENT.SIGNUP_ACQUISITION_SKIPPED, {});
    }

    setIsSubmitting(true);
    setSubmitErrorMessage('');

    const { id, password, name, email } = pendingRegistration;
    const result = await registerUser(id, password, name, email);

    if (result !== true) {
      setIsSubmitting(false);
      setSubmitErrorMessage(`${result} ${REGISTRATION_FAILURE_RECOVERY_GUIDE}`);
      return;
    }

    await saveAcquisitionSurvey({
      channel,
      channelEtc,
      context: readAcquisitionContext(),
    });

    localStorage.setItem('isLoggedIn', 'true');
    navigate(USER_ROUTES.HOME);
  };

  const handleAcquisitionSubmit = (channel: AcquisitionChannel, channelEtc: string | null) => {
    submitRegistration(channel, channelEtc, false);
  };

  const handleAcquisitionSkip = () => {
    submitRegistration(null, null, true);
  };

  const handleBack = () => {
    setSubmitErrorMessage('');
    setStep('form');
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })} useTitle={false} useFullHeight={true}>
      <FormSection hidden={step !== 'form'}>
        <RegisterForm onSubmit={handleFormSubmit} />
      </FormSection>
      <AcquisitionSection hidden={step !== 'acquisition'}>
        <AcquisitionChannelStep
          onSubmit={handleAcquisitionSubmit}
          onSkip={handleAcquisitionSkip}
          onBack={handleBack}
          isSubmitting={isSubmitting}
          errorMessage={submitErrorMessage}
        />
      </AcquisitionSection>
    </AppContainer>
  );
}

export default Register;
