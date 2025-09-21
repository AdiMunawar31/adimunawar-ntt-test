import { type ApexOptions } from "apexcharts";

const chartData: {
  type: "area";
  height: number;
  options: ApexOptions;
  series: { name: string; data: number[] }[];
} = {
  type: "area",
  height: 95,
  options: {
    chart: {
      id: "support-chart",
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: () => "",
        },
      },
      marker: {
        show: false,
      },
    },
  },
  series: [
    {
      name: "Series 1",
      data: [45, 60, 75, 51, 42, 42, 30],
    },
  ],
};

export default chartData;
