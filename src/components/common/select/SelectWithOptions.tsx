import { SelectHTMLAttributes, forwardRef } from 'react';

interface Option {
  name: string;
  id: number | string;
}

interface SelectWithOptionsProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

const SelectWithOptions = forwardRef<HTMLSelectElement, SelectWithOptionsProps>(({ options, value, ...rest }, ref) => {
  const defaultOption = { name: '기본', id: 'null' };
  const allOptions = [defaultOption, ...options];

  return (
    <div>
      <select ref={ref} value={value} {...rest}>
        {allOptions.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SelectWithOptions;
