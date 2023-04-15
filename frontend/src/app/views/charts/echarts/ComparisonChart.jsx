import { useTheme } from '@mui/material';
import ReactEcharts from 'echarts-for-react';

const ComparisonChart = ({ height, color = [] }) => {
  const theme = useTheme();

  const option = {
    grid: { top: '10%', bottom: '10%', right: '5%' },
    legend: {
      // Try 'horizontal'
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    color: ['#223388', 'rgba(34, 51, 136, 0.8)'],
    barGap: 0,
    barMaxWidth: '64px',
    dataset: {
      source: [
        ['Month', 'Income', 'Expense'],
        ['Jan', 7000, 2510],
        ['Feb', 7000, 2510],
        ['Mar', 7000, 2510],
        ['Apr', 7000, 2510],
        ['May', 7000, 2510],
        ['Jun', 7000, 2510],
        ['Jul', 7000, 2510],
        ['Aug', 7000, 2510],
        ['Sep', 7000, 2510],
        ['Oct', 7000, 2510],
        ['Nov', 7000, 2510],
        ['Dec', 7000, 2510],
      ]
    },
    xAxis: {
      type: 'category',
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 13,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary
      }
    },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 }
      },
      axisLabel: {
        fontSize: 13,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary
      }
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' }, { type: 'bar' }]
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option }} />;
};

export default ComparisonChart;
