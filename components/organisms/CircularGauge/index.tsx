import React from "react";

export type GaugeData = {
  icon: string;
  percentage: number;
  color: string;
  lightColor: string;
};

interface Props {
  gaugeDatas: GaugeData[];
}

function CircularGauge({ gaugeDatas }: Props) {
  return <></>;
}

export default CircularGauge;
