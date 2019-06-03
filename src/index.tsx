import * as React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import NativeSelect from "./NativeSelect";
import Autocomplete from "./Autocomplete";
import mapOptions from "./mapOptions";
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
  { id: null, title: "Select something...", disabled: true },
  { id: "1", title: "Some option" },
  { id: "2", title: "Some other option" },
  { id: "3", title: "Yet another option" }
  // {
  //   label: "Some group",
  //   options: [
  //     { label: "A nested option", value: "4" },
  //     { label: "Another nested option", value: "5" }
  //   ]
  // },
  // {
  //   label: "Some other group",
  //   options: [
  //     { label: "A nested option", value: "6" },
  //     { label: "Another nested option", value: "7" }
  //   ]
  // }
];

const App: React.FunctionComponent = () => {
  const [persistEvents, setPersistEvents] = React.useState(false);

  const handleNativeSelectChange: ISelectOptionHandler = (
    selectedOption,
    event?
  ) => {
    console.log("select optoin", selectedOption, event);
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
            options={mapOptions(options, "title", "id")}
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
          options={mapOptions(options, "title", "id")}
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
