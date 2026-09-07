import AcquisitionChannelStep from './AcquisitionChannelStep';

const meta = {
  title: 'Components/User/Register/AcquisitionChannelStep',
  component: AcquisitionChannelStep,
  parameters: { layout: 'centered' },
};

export default meta;

export const Default = {
  args: { onSubmit: () => {}, onSkip: () => {}, isSubmitting: false },
};

export const Submitting = {
  args: { onSubmit: () => {}, onSkip: () => {}, isSubmitting: true },
};

export const WithError = {
  args: { onSubmit: () => {}, onSkip: () => {}, isSubmitting: false, errorMessage: '이미 가입된 이메일입니다.' },
};
