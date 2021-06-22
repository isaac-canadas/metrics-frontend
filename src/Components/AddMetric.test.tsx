import { shallow } from "enzyme";
import AddMetric from "./AddMetric"; // Introduce the corresponding React component

it("renders with Collapse", () => {
  const wrapper = shallow(<AddMetric onFinish={onFinishMock} />); // Rendering
  expect(wrapper.find("Collapse").length).toBe(1); // Has Collapse component
});

const onFinishMock = () => ({});
