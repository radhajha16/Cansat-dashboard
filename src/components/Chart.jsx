import { Paper } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import faker from "faker";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const lineBorderColorMatrix = {
  red: "rgb(255, 99, 132)",
  green: "rgb(109, 255, 99)",
  blue: "rgb(99, 104, 255)",
};
const lineBackgroundColorMatrix = {
  red: "rgba(255, 99, 132, 0.5)",
  green: "rgba(109, 255, 99, 0.5)",
  blue: "rgba(99, 104, 255, 0.5)",
};

const Chart = ({
  labels = [],
  datasets = [],
  xAxisLable = "Please give x-asis lable",
  yAxisLable = "Please give y-asis lable",
  title,
}) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: title ? true : false,
        text: title,
        color: "GrayText",
        font: {
          size: 15,
          weight: 800,
        },
      },
      legend: {
        display: true,
        labels: {
          useBorderRadius: true,
          borderRadius: 5,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xAxisLable,
          color: "GrayText",
          font: {
            size: 15,
            weight: 800,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisLable,
          color: "GrayText",
          font: {
            size: 15,
            weight: 800,
          },
        },
      },
    },
  };

  datasets.forEach((dst) => {
    dst["lineTension"] = 0.4;
    dst["borderColor"] = lineBorderColorMatrix[dst.color];
    dst["backgroundColor"] = lineBackgroundColorMatrix[dst.color];
    return dst;
  });

  return (
    <Line
      options={options}
      style={{
        padding: 0,
      }}
      data={{
        labels,
        datasets,
      }}
    />
  );
};

export default Chart;
