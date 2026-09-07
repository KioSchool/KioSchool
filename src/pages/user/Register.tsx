import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import AcquisitionChannelStep from '@components/user/register/AcquisitionChannelStep';
import RegisterForm, { PendingRegistration } from '@components/user/register/RegisterForm';
import useRegister from '@hooks/user/useRegister';
import { USER_ROUTES } from '@constants/routes';
import { colFlex } from '@styles/flexStyles';
import { AcquisitionChannel } from '@utils/acquisitionChannel';
import { readAcquisitionContext } from '@utils/acquisitionContext';
import { trackEvent } from '@utils/analytics';

const FormSection = styled.div``;

const AcquisitionSection = styled.div``;

type RegisterStep = 'form' | 'acquisition';

function Register() {
  const navigate = useNavigate();
  const { registerUser } = useRegister();

  const [step, setStep] = useState<RegisterStep>('form');
  const [pendingRegistration, setPendingRegistration] = useState<PendingRegistration | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');

  const handleFormSubmit = (values: PendingRegistration) => {
    setPendingRegistration(values);
    setStep('acquisition');
    trackEvent('signup_acquisition_step_view');
  };

  const submitRegistration = async (channel: AcquisitionChannel | null, channelEtc: string | null) => {
    if (!pendingRegistration || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitErrorMessage('');

    const result = await registerUser({
      ...pendingRegistration,
      acquisitionChannel: channel,
      acquisitionChannelEtc: channelEtc,
      acquisitionContext: readAcquisitionContext(),
    });

    if (result !== true) {
      setIsSubmitting(false);
      setSubmitErrorMessage(result);
      return;
    }

    trackEvent('signup_completed', { channel: channel ?? 'NONE' });
    localStorage.setItem('isLoggedIn', 'true');
    navigate(USER_ROUTES.HOME);
  };

  const handleAcquisitionSubmit = (channel: AcquisitionChannel, channelEtc: string | null) => {
    submitRegistration(channel, channelEtc);
  };

  const handleAcquisitionSkip = () => {
    trackEvent('signup_acquisition_skipped');
    submitRegistration(null, null);
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
