function mapOptions<T = Object>(
  data: T[],
  labelField: string = "label",
  valueField: string = "value",
  disabledField: string = "disabled"
): T[] {
  return data.map(item => ({
    label: item[labelField],
    value: item[valueField],
    disabled: item[disabledField],
    ...item
  }));
}

export default mapOptions;
