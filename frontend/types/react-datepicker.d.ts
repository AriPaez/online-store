declare module 'react-datepicker' {
  import * as React from 'react';
  export interface ReactDatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
    selected?: Date | null;
    onChange?: (date: Date | null, event?: React.SyntheticEvent<any> | undefined) => void;
    dateFormat?: string | string[];
    className?: string;
    [key: string]: any;
  }

  const DatePicker: React.FC<ReactDatePickerProps>;
  export default DatePicker;
}
