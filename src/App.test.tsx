import { shallow } from "enzyme";
import App from "./App"; // Introduce the corresponding React component

it("renders with AddMetric", () => {
  const wrapper = shallow(<App />); // Rendering
  expect(wrapper.find("AddMetric").length).toBe(1); // Has AddMetric component
});

it("renders with MetricsAverage", () => {
  const wrapper = shallow(<App />); // Rendering
  expect(wrapper.find("MetricsAverage").length).toBe(1); // Has MetricsAverage component
});

it("renders with MetricsTimeline", () => {
  const wrapper = shallow(<App />); // Rendering
  expect(wrapper.find("MetricsTimeline").length).toBe(1); // Has MetricsTimeline component
});
