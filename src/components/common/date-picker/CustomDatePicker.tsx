import SingleDatePicker, { SingleDatePickerProps } from './SingleDatePicker';
import RangeDatePicker, { RangeDatePickerProps } from './RangeDatePicker';

type CustomDatePickerProps = SingleDatePickerProps | RangeDatePickerProps;

function CustomDatePicker(props: CustomDatePickerProps) {
  if (props.mode === 'single') {
    return <SingleDatePicker {...props} />;
  }

  return <RangeDatePicker {...props} />;
}

export default CustomDatePicker;
