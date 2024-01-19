import React, { ForwardedRef, forwardRef } from 'react';

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>((props: AppInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return <input {...props} ref={ref} />;
});

export default AppInput;
