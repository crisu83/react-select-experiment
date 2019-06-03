import * as React from "react";
import { ISelectOptionHandler, ISelectOption } from "./types";

type ISelectValueHandler = (
  selectedValue: string,
  event?: React.SyntheticEvent
) => void;

function useSelectValue(
  initialValue: string,
  options: ISelectOption[],
  handleChange: ISelectOptionHandler,
  persistEvents: boolean
): [string, ISelectValueHandler] {
  const [selectedValue, setSelectedValue] = React.useState(initialValue);

  const findOptionByValue = (
    value: string,
    options: ISelectOption[]
  ): ISelectOption => options.filter(option => option.value === value)[0];

  const handleSelectValue: ISelectValueHandler = (selectedValue, event) => {
    setSelectedValue(selectedValue);

    const selectedOption = findOptionByValue(selectedValue, options);

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
