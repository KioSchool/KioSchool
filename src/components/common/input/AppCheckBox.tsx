import React from 'react';

interface AppCheckBoxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

function AppCheckBox(props: AppCheckBoxProps) {
  return (
    <div>
      <input type="checkbox" checked={props.checked} onChange={props.onChange} />
      <label>{props.label}</label>
    </div>
  );
}

export default AppCheckBox;
