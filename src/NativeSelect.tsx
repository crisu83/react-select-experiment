import * as React from "react";
import useSelectValue from "./useSelectValue";
import { ISelectOption, ISelectOptionHandler } from "./types";

interface IOptionGroupProps extends React.HTMLProps<HTMLOptGroupElement> {
  options?: ISelectOption[];
}

const OptionGroup: React.FunctionComponent<IOptionGroupProps> = ({
  options,
  ...groupProps
}) => (
  <optgroup {...groupProps}>
    {options.map(optionProps => (
      <option {...optionProps} />
    ))}
  </optgroup>
);

export interface INativeSelectProps extends React.HTMLProps<HTMLSelectElement> {
  value?: string;
  options: ISelectOption[];
  handleChange?: ISelectOptionHandler<HTMLSelectElement>;
  persistEvents?: boolean;
}

export const NativeSelect: React.FunctionComponent<INativeSelectProps> = ({
  value,
  options,
  handleChange = () => {},
  persistEvents = false,
  ...selectProps
}) => {
  const [selectedValue, handleSelectValue] = useSelectValue<HTMLSelectElement>(
    value,
    persistEvents,
    options,
    handleChange
  );

  return (
    <select
      {...selectProps}
      value={selectedValue}
      onChange={e => handleSelectValue(e)}
    >
      {options.map(groupOrOptionProps =>
        groupOrOptionProps.options ? (
          <OptionGroup {...groupOrOptionProps} />
        ) : (
          <option {...groupOrOptionProps} />
        )
      )}
    </select>
  );
};

export default NativeSelect;
