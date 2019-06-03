import * as React from "react";

export type SelectInputElement = HTMLSelectElement | HTMLInputElement;

export interface ISelectOption extends React.HTMLProps<HTMLOptionElement> {}

export type ISelectOptionHandler = (
  selectedOption: ISelectOption,
  event?: React.ChangeEvent<SelectInputElement>
) => void;
