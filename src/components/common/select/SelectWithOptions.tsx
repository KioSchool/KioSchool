import { SelectHTMLAttributes, forwardRef } from 'react';

interface Option {
  name: string;
  val: number | string;
}

interface SelectWithOptionsProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}
const SelectWithOptions = forwardRef<HTMLSelectElement, SelectWithOptionsProps>(({ options, value, ...rest }, ref) => {
  return (
    <div>
      <select ref={ref} value={value} {...rest}>
        {options.map((item, index) => (
          <option key={index} value={item.val}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SelectWithOptions;
