import * as React from "react";

export interface ISelectOption extends React.HTMLProps<HTMLOptionElement> {}

export type ISelectOptionHandler = (
  selectedOption: ISelectOption,
  event?: React.SyntheticEvent
) => void;
