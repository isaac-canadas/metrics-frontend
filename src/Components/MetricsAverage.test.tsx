import { shallow } from "enzyme";
import MetricsAverage from "./MetricsAverage"; // Introduce the corresponding React component

it("renders with Empty when empty data", () => {
  const wrapper = shallow(<MetricsAverage />); // Rendering
  expect(wrapper.find("Empty").length).toBe(3); // Has 3 Empty components
});
