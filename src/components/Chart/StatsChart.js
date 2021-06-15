import React, {useEffect, useState} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const StatsChart = ({identifier, data, ...props}) => {

  const [chart, setChart] = useState(null);

  useEffect(() => {
    renderChart();
    return () => chart?.dispose()
  }, []);

  const renderChart = () => {

    /* Create chart instance */
    var chart = am4core.create(identifier, am4charts.RadarChart);

    /* Add data */
    chart.data = data;

    /* Create axes */
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "stat";

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
    valueAxis.renderer.axisFills.template.fillOpacity = 0.05;

    /* Create and configure series */
    var series = chart.series.push(new am4charts.RadarSeries());
    series.dataFields.valueY = "score";
    series.dataFields.categoryX = "stat";
    series.name = "Pokemon";
    series.strokeWidth = 3;

    setChart(chart);
  };

  return <div id={identifier} {...props}/>
};

export default StatsChart;