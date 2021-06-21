import { Metric } from "./Metric";

export type MetricSearchResultType = {
  total_count: number;
  incomplete_results: boolean;
  items: Array<Metric>;
};
