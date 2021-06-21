import { MetricAverage } from "./MetricAverage";

export type MetricAverageResultType = {
  total_count: number;
  incomplete_results: boolean;
  items: Array<MetricAverage>;
};
