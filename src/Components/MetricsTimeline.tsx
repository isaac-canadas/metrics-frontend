import { Timeline } from "antd";
import React from "react";
import { Metric } from "../Types/Metric";

interface Props {
  metrics?: Array<Metric>;
}

const MetricsTimeline: React.FC<Props> = ({ metrics = [] }) => {
  return (
    <div>
      <h2>Metrics Timeline</h2>
      <Timeline pending="Waiting for additional data..." reverse={false}>
        {metrics.map((metric) => (
          <Timeline.Item
            key={metric.id}
            label={metric.name + " = " + metric.value}
            position="right"
            color="blue"
          >
            <div>
              {new Date(metric.created_at).toDateString()}
              <br />
              {new Date(metric.created_at).toTimeString()}
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default MetricsTimeline;
