import { Collapse, Form, Input, InputNumber, Button } from "antd";
import { AddMetricProps } from "../Types/AddMetricProps";

const { Panel } = Collapse;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const AddMetric = (props: AddMetricProps) => {
  return (
    <Collapse>
      <Panel header="Add new metric" key="1">
        <Form {...layout} name="metric" onFinish={props.onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the metric name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Value"
            name="value"
            rules={[
              {
                required: true,
                message: "Please input the metric value",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default AddMetric;
