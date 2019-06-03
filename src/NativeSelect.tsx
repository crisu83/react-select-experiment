import * as React from "react";
import useSelectValue from "./useSelectValue";
import { ISelectOptionHandler, ISelectOption } from "./types";

export interface INativeSelectProps extends React.HTMLProps<HTMLSelectElement> {
  value?: string;
  options: ISelectOption[];
  handleChange: ISelectOptionHandler;
  persistEvents?: boolean;
}

function NativeSelect({
  value,
  options,
  handleChange,
  persistEvents = false,
  ...selectProps
}: INativeSelectProps) {
  const [selectedValue, handleSelectValue] = useSelectValue(
    value,
    options,
    handleChange,
    persistEvents
  );

  const handleChangeInternal = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    handleSelectValue(event.target.value, event);
  };

  return (
    <select
      {...selectProps}
      value={selectedValue}
      onChange={handleChangeInternal}
    >
      {options.map(props => (
        <option {...props} />
      ))}
    </select>
  );
}

export default NativeSelect;
