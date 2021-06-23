import { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import { MetricSearchResultType } from "./Types/MetricSearchResultType";
import { MetricAverageResultType } from "./Types/MetricAverageResultType";
import MetricsTimeline from "./Components/MetricsTimeline";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "antd";
import AddMetric from "./Components/AddMetric";
import { Metric } from "./Types/Metric";
import MetricsAverage from "./Components/MetricsAverage";
import { MetricAverage } from "./Types/MetricAverage";
import httpService from "./services/httpService";
import config from "./config.json";
import React from "react";

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
    const { data: metrics } = await httpService.get<MetricSearchResultType>(
      config.apiEndpoint
    );
    const { data: metricsAverageDay } =
      await httpService.get<MetricAverageResultType>(
        config.apiEndpoint + config.averageDayQuery
      );
    const { data: metricsAverageHour } =
      await httpService.get<MetricAverageResultType>(
        config.apiEndpoint + config.averageHourQuery
      );
    const { data: metricsAverageMinute } =
      await httpService.get<MetricAverageResultType>(
        config.apiEndpoint + config.averageMinuteQuery
      );
    this.setState({
      metrics,
      metricsAverageDay,
      metricsAverageHour,
      metricsAverageMinute,
    });
  }

  private onFinish = async (values: Metric) => {
    const { data: metric } = await httpService.post(config.apiEndpoint, values);
    // Update the new metric in the UI and empty the averages
    // before refeshing from the server
    const metrics: Metric[] = [...this.state.metrics, metric];
    const newState = {
      metrics,
      metricsAverageDay: {},
      metricsAverageHour: {},
      metricsAverageMinute: {},
    };
    this.setState(newState);
    // Info the user that the operation was a success
    toast("Metric inserted successfully");
    // Reload the data after adding the new value to refresh data
    // from other users and update the averages
    this.reloadMetrics();
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
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
      </React.Fragment>
    );
  }
  parseAverage(metricAverageResult: any): MetricAverage[] {
    let metricsAverage: MetricAverage[] = [];
    const entries = Object.entries(metricAverageResult);
    entries.map((entry: [string, any]) =>
      metricsAverage.push({ name: entry[0], value: entry[1] })
    );
    return metricsAverage;
  }
}

export default App;
