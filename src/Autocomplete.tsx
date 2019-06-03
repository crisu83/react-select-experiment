import * as React from "react";
import styled from "styled-components";
import { ISelectOption, ISelectOptionHandler } from "./types";
import useSelectValue from "./useSelectValue";

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
`;

const AutocompleteList = styled.ul`
  border: 1px solid #aaa;
  border-top: none;
  border-radius: 0 0 0.5em 0.5em;
  list-style: none;
  margin: 0;
  padding: 4px 0;
`;

interface IAutocompleteItemProps {
  isDisabled?: boolean;
  isSelected?: boolean;
}

const AutocompleteItem = styled.li<IAutocompleteItemProps>`
  background-color: ${props => (props.isSelected ? "#f5f5f5" : "#fff")};
  color: ${props => (props.isDisabled ? "#888" : "#000")};
  cursor: default;
  font-weight: ${props => (props.isSelected ? 700 : 400)};
  padding: 6px 12px;
  user-select: none;
`;

export interface IAutocompleteProps extends React.HTMLProps<HTMLInputElement> {
  placeholder: string;
  value?: string;
  options: ISelectOption[];
  handleChange: ISelectOptionHandler;
  persistEvents?: boolean;
}

export const Autocomplete: React.FunctionComponent<IAutocompleteProps> = ({
  value,
  options,
  handleChange,
  persistEvents = false,
  ...inputProps
}) => {
  const selectedOption = options.filter(option => option.value === value)[0];
  const initialIInputValue = selectedOption ? selectedOption.label : "";

  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(initialIInputValue);
  const [filteredOptions, setFilteredOptions] = React.useState(options);
  const [selectedValue, setSelectedValue] = useSelectValue(
    value,
    options,
    handleChange,
    persistEvents
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setFilteredOptions(
      options.filter(option => option.label.startsWith(newValue))
    );
  };

  const handleChangeInternal = (
    selectedOption: ISelectOption,
    event: React.MouseEvent
  ): void => {
    if (selectedOption.disabled) {
      return;
    }
    setInputValue(selectedOption.label);
    setSelectedValue(String(selectedOption.value), event);
    setIsOpen(false);
    console.log("autocomplete change", selectedValue);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    // TODO: Add support for selecting using the keyboard
    // event.persist();
    // console.log(event.key, event.keyCode);
  };

  return (
    <AutocompleteWrapper>
      {/* TODO: Fix type issue */}
      <AutocompleteInput
        {...inputProps}
        value={inputValue}
        isOpen={isOpen}
        onFocus={_ => setIsOpen(true)}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      {isOpen && (
        <AutocompleteList>
          {filteredOptions.map(option => (
            <AutocompleteItem
              onClick={e => handleChangeInternal(option, e)}
              isSelected={option.value === selectedValue}
              isDisabled={option.disabled}
            >
              {option.label}
            </AutocompleteItem>
          ))}
        </AutocompleteList>
      )}
    </AutocompleteWrapper>
  );
};

export default Autocomplete;
