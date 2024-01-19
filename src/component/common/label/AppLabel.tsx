import React from 'react';

interface AppLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

function AppLabel(props: AppLabelProps) {
  return <label {...props} />;
}

export default AppLabel;
