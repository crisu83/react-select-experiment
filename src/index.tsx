import * as React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { NativeSelect, Autocomplete } from "./Select";
import { ISelectOptionHandler, ISelectOption } from "./types";

const Container = styled.div`
  font-family: Montserrat;
`;

const Title = styled.h1`
  font-family: Raleway;
  font-size: 36px;
  line-height: 1em;
`;

const Field = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  line-height: 1.4em;
  margin-bottom: 6px;
`;

const SelectWrapper = styled.div`
  position: relative;

  ::after {
    border-color: #000 transparent transparent transparent;
    border-style: solid;
    border-width: 5px;
    content: "";
    display: block;
    pointer-events: none;
    position: absolute;
    right: 10px;
    top: 15px;
  }
`;

const Select = styled(NativeSelect)`
  appearance: none;
  border-radius: 0.5em;
  background: #fff;
  border: 1px solid #aaa;
  display: block;
  font-size: 14px;
  padding: 8px 12px;
  width: 100%;

  :focus {
    border-color: #888;
    outline: none;
  }
`;

const Checkbox = styled.input`
  margin: 0 5px 0 0;
`;

const Tip = styled.p`
  font-size: 14px;
`;

const options: ISelectOption[] = [
  { label: "Select something...", value: "", disabled: true },
  { label: "Some option", value: "1" },
  { label: "Some other option", value: "2" },
  { label: "Yet another option", value: "3" },
  {
    label: "Some group",
    options: [
      { label: "A nested option", value: "4" },
      { label: "Another nested option", value: "5" }
    ]
  },
  {
    label: "Some other group",
    options: [
      { label: "A nested option", value: "6" },
      { label: "Another nested option", value: "7" }
    ]
  }
];

const App: React.FunctionComponent = () => {
  const [persistEvents, setPersistEvents] = React.useState(false);

  const handleNativeSelectChange: ISelectOptionHandler<HTMLSelectElement> = (
    selectedOption,
    event?
  ) => {
    console.log("change", selectedOption, event);
  };

  const handlePersistEventsChange = (): void => {
    setPersistEvents(!persistEvents);
    console.log("persist events", !persistEvents);
  };

  return (
    <Container>
      <Title>React Select Experiment 🧪</Title>
      <Field id="nativeSelect">
        <Label htmlFor="selectField">Some label</Label>
        <SelectWrapper>
          <Select
            id="selectField"
            defaultValue="1"
            options={options}
            handleChange={handleNativeSelectChange}
            persistEvents={persistEvents}
          />
        </SelectWrapper>
      </Field>
      <Field id="autocomplete">
        <Label htmlFor="autocompleteField">Some autocomplete</Label>
        <Autocomplete
          id="autocompleteField"
          placeholder="Start typing..."
          value="2"
          options={options}
          handleChange={() => {}}
          persistEvents={persistEvents}
        />
      </Field>
      <Field id="persistEvents">
        <Label>
          <Checkbox type="checkbox" onChange={handlePersistEventsChange} />
          Persist events
        </Label>
      </Field>
      <Tip>
        <b>Protip:</b> Open the console and play around with the component.
      </Tip>
    </Container>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
