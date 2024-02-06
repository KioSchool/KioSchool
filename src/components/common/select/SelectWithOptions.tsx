import { SelectHTMLAttributes, forwardRef } from 'react';

interface Option {
  name: string;
  id: number;
}

interface SelectWithOptionsProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}
const SelectWithOptions = forwardRef<HTMLSelectElement, SelectWithOptionsProps>(({ options, value, ...rest }, ref) => {
  return (
    <div>
      <select ref={ref} value={value} {...rest}>
        {options.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SelectWithOptions;
