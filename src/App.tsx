import { Component } from "react";
import axios from "axios";
import { MetricSearchResultType } from "./Types/MetricSearchResultType";
import { MetricAverageResultType } from "./Types/MetricAverageResultType";
import MetricsTimeline from "./Components/MetricsTimeline";
import "antd/dist/antd.css";
import { Layout } from "antd";
import AddMetric from "./Components/AddMetric";
import { Metric } from "./Types/Metric";
import MetricsAverage from "./Components/MetricsAverage";
import { MetricAverage } from "./Types/MetricAverage";

class App extends Component {
  state = {
    metrics: [],
    metricsAverageDay: [],
    metricsAverageHour: [],
    metricsAverageMinute: [],
  };

  async componentDidMount() {
    this.reloadMetrics();
  }

  async reloadMetrics() {
    const { data: metrics } = await axios.get<MetricSearchResultType>(
      `http://localhost:3000/metrics`
    );
    const { data: metricsAverageDay } =
      await axios.get<MetricAverageResultType>(
        `http://localhost:3000/metrics/average_day`
      );
    const { data: metricsAverageHour } =
      await axios.get<MetricAverageResultType>(
        `http://localhost:3000/metrics/average_hour`
      );
    const { data: metricsAverageMinute } =
      await axios.get<MetricAverageResultType>(
        `http://localhost:3000/metrics/average_minute`
      );
    this.setState({
      metrics,
      metricsAverageDay,
      metricsAverageHour,
      metricsAverageMinute,
    });
  }

  private onFinish = (values: Metric) => {
    axios
      .post("http://localhost:3000/metrics", values)
      .then((response) => this.reloadMetrics());
  };

  render() {
    return (
      <Layout>
        <Layout>
          <Layout.Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <MetricsTimeline metrics={this.state.metrics} />
              <AddMetric onFinish={this.onFinish} />
              <MetricsAverage
                metricsAverageDay={this.parseAverage(
                  this.state.metricsAverageDay
                )}
                metricsAverageHour={this.parseAverage(
                  this.state.metricsAverageHour
                )}
                metricsAverageMinute={this.parseAverage(
                  this.state.metricsAverageMinute
                )}
              />
            </div>
          </Layout.Content>
          <Layout.Footer style={{ textAlign: "center" }}>
            Metrics application. A test playing with React and Ruby on Rails
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
  parseAverage(metricAverageResult: any): MetricAverage[] {
    let metricsAverage: MetricAverage[] = [];
    console.log("MetricAverageResult:");
    console.log(metricAverageResult);
    const entries = Object.entries(metricAverageResult);
    console.log("Entries:");
    console.log(entries);
    entries.map((entry: [string, any]) =>
      metricsAverage.push({ name: entry[0], value: entry[1] })
    );
    return metricsAverage;
  }
}

export default App;
