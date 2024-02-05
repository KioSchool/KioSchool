import { forwardRef } from 'react';

interface Option {
  name: string;
  val: number | string;
}

interface SelectWithOptionsProps {
  options: Option[];
}
const SelectWithOptions = forwardRef<HTMLSelectElement, SelectWithOptionsProps>(({ options }, ref) => {
  return (
    <div>
      <select ref={ref}>
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
