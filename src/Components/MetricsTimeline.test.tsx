import { shallow } from "enzyme";
import MetricsTimeline from "./MetricsTimeline"; // Introduce the corresponding React component

it("renders with Timeline", () => {
  const wrapper = shallow(<MetricsTimeline />); // Rendering
  expect(wrapper.find("Timeline").length).toBe(1); // Has Timeline component
});
