import React from "react";
import { Row, Col, Empty } from "antd";
import { Column } from "@ant-design/charts";
import { MetricAverage } from "../Types/MetricAverage";

interface Props {
  metricsAverageDay?: Array<MetricAverage>;
  metricsAverageHour?: Array<MetricAverage>;
  metricsAverageMinute?: Array<MetricAverage>;
}

const config = {
  height: 400,
  xField: "name",
  yField: "value",
  point: {
    size: 5,
    shape: "diamond",
  },
};

const MetricsAverage: React.FC<Props> = ({
  metricsAverageDay = [],
  metricsAverageHour = [],
  metricsAverageMinute = [],
}) => {
  return (
    <div>
      <h2>Metrics Average</h2>
      <Row>
        <Col span={8}>
          <h3>Average per day</h3>
          {metricsAverageDay.length > 0 ? (
            <Column data={metricsAverageDay} {...config} />
          ) : (
            <Empty />
          )}
        </Col>
        <Col span={8}>
          <h3>Average per hour</h3>
          {metricsAverageHour.length > 0 ? (
            <Column data={metricsAverageHour} {...config} />
          ) : (
            <Empty />
          )}
        </Col>
        <Col span={8}>
          <h3>Average per minute</h3>
          {metricsAverageMinute.length > 0 ? (
            <Column data={metricsAverageMinute} {...config} />
          ) : (
            <Empty />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MetricsAverage;
