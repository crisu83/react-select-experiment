import * as React from "react";
import { ISelectOption, ISelectOptionHandler } from "./Select";

type ISelectValueHandler<T> = (event?: React.ChangeEvent<T>) => void;

function useSelectValue<T = HTMLSelectElement | HTMLInputElement>(
  initialValue: string,
  persistEvents: boolean,
  options: ISelectOption[],
  handleChange: ISelectOptionHandler<T>
): [string, ISelectValueHandler<T>] {
  const [selectedValue, setSelectedValue] = React.useState(initialValue);

  const findOptionByValue = (
    value: string,
    options: ISelectOption[]
  ): ISelectOption =>
    options
      // First we need to flatten the options
      .reduce(
        (previousValue, currentValue) =>
          currentValue.options
            ? [...previousValue, ...currentValue.options]
            : [...previousValue, currentValue],
        []
      )
      // Then we filter out the option with the given value
      .filter(option => option.value === value)[0];

  const handleSelectValue = (event: React.ChangeEvent<T>) => {
    const newValue = event.target.value;
    const selectedOption = findOptionByValue(newValue, options);

    setSelectedValue(newValue);

    if (persistEvents) {
      // React events are pooled, so if we want to hold on to the event,
      // we need to persist it explicitly by calling `persist()` on it.
      // See: https://reactjs.org/docs/events.html#event-pooling
      event.persist();

      handleChange(selectedOption, event);
    } else {
      handleChange(selectedOption);
    }
  };

  return [selectedValue, handleSelectValue];
}

export default useSelectValue;
