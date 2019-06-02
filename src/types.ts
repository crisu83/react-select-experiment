import * as React from "react";

export type SelectInputElement = HTMLSelectElement | HTMLInputElement;

export interface ISelectOption extends React.HTMLProps<HTMLOptionElement> {
  options?: ISelectOption[];
  value?: string;
}

export type ISelectOptionHandler<T = SelectInputElement> = (
  selectedOption: ISelectOption,
  event?: React.ChangeEvent<T>
) => void;
