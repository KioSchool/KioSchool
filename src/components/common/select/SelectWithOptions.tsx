import { SelectHTMLAttributes } from 'react';

interface Option {
  name: string;
  id: number | string;
}

interface SelectWithOptionsProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

const SelectWithOptions = (props: SelectWithOptionsProps) => {
  const defaultOption = { name: '기본', id: 'null' };
  const allOptions = [defaultOption, ...props.options];

  return (
    <div>
      <select {...props}>
        {allOptions.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectWithOptions;
