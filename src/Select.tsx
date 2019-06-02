import * as React from "react";
import styled from "styled-components";
import useSelectValue from "./useSelectValue";

export interface ISelectOption extends React.HTMLProps<HTMLOptionElement> {
  options?: ISelectOption[];
  value?: string;
}

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

export type ISelectOptionHandler<T> = (
  selectedOption: ISelectOption,
  event?: React.ChangeEvent<T>
) => void;

export interface INativeSelectProps extends React.HTMLProps<HTMLSelectElement> {
  value: string;
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

const AutocompleteWrapper = styled.div`
  font-size: 14px;
`;

interface IAutocompleteInputProps extends React.HTMLProps<HTMLInputElement> {
  isOpen: boolean;
}

const AutocompleteInput = styled.input<IAutocompleteInputProps>`
  appearance: none;
  border: 1px solid #aaa;
  border-radius: ${props => (props.isOpen ? "0.5em 0.5em 0 0" : "0.5em")};
  box-sizing: border-box;
  font-size: inherit;
  padding: 8px 12px;
  width: 100%;

  :focus {
    outline: none;
  }
` as React.FunctionComponent<IAutocompleteInputProps>;

const AutocompleteList = styled.ul`
  border: 1px solid #aaa;
  border-top: none;
  border-radius: 0 0 0.5em 0.5em;
  list-style: none;
  margin: 0;
  padding: 4px 0;
`;

const AutocompleteItem = styled.li`
  padding: 6px 12px;
`;

interface IAutocompleteProps extends INativeSelectProps {
  placeholder: string;
}

export const Autocomplete: React.FunctionComponent<IAutocompleteProps> = ({
  placeholder,
  value,
  options,
  ...selectProps
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [filteredOptions, setFilteredOptions] = React.useState(options);
  const [selectedValue, setSelectedValue] = React.useState(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setFilteredOptions(
      options.filter(option => option.label.startsWith(searchValue))
    );
  };

  return (
    <AutocompleteWrapper>
      <AutocompleteInput
        placeholder={placeholder}
        isOpen={isOpen}
        onFocus={_ => setIsOpen(true)}
        onBlur={_ => setIsOpen(false)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(e)
        }
      />
      {isOpen && (
        <AutocompleteList>
          {filteredOptions.map(option =>
            // TODO: Add support for option groups
            option.options ? null : (
              <AutocompleteItem>{option.label}</AutocompleteItem>
            )
          )}
        </AutocompleteList>
      )}
      <NativeSelect
        {...selectProps}
        value={value}
        options={options}
        style={{ display: "none" }}
      />
    </AutocompleteWrapper>
  );
};
