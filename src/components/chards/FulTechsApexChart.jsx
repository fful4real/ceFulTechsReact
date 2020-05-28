import React, { Component } from "react";
import Chart from "react-apexcharts";

class FulTechsApexChart extends Component {
  constructor(props) {
    super(props);

    this.updateCharts = this.updateCharts.bind(this);
    const {data}= this.props
    // console.log(data)
    this.state = {
      optionsMixedChart: {
        tooltip:{
          enabled:false
        },
        grid: {
          show: false,
        },
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false
          }
        },
        colors: ['#00acf0'],
        stroke: {
          curve: 'straight',
          colors: ['#00acf0'],
          width:1
        },
        fill: {
          opacity: 0.5,
          colors: ['#00acf0'],
        },
        xaxis: {
          axisTicks: {
              show: false,
          },
          labels:{
            show: false
          }
        },
        markers: {
          size: 2,
          strokeWidth: 1,
          fillOpacity: 0.9,
          strokeOpacity: 0.8,
          hover: {
            size: 5
          }
        },
        yaxis: {
          axisTicks: {
              show: false,
          },
          tickAmount: 1,
          min: 0,
          max: 100,
          show:false
        }
      },
      seriesMixedChart: [
        {
          name: "FulTechs",
          type: "area",
          data:data?data: [30, 40, 25, 50, 49, 21, 60, 51]
        }
      ]
    };
  }

  updateCharts() {}

  render() {
      
    return (
        <Chart
            options={this.state.optionsMixedChart}
            series={this.state.seriesMixedChart}
            type="line"
            width="110%"
            height="90%"
        />
    )
  }
}

export default FulTechsApexChart;
