import { forwardRef } from 'react';

interface SelectWithOptionsProps {
  options: string[];
}

const SelectWithOptions = forwardRef<HTMLSelectElement, SelectWithOptionsProps>(({ options }, ref) => {
  return (
    <div>
      <select ref={ref}>
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SelectWithOptions;
