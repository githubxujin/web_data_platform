export default {
  grid: {
    top: 110
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(255,255,255,0.1)",
    axisPointer: {
      type: "shadow",
      label: {
        show: true,
        backgroundColor: "#7B7DDC"
      }
    }
  },
  legend: {
    data: ["作废发票", "作废比例"],
    textStyle: {
      color: "#B4B4B4"
    },
    top: "63",
    right: "4%"
  },
  xAxis: {
    axisTick: {
      show: false
    },
    data: []
  },
  yAxis: [{
      //             type: "value",
      name: "单位/张",
      nameTextStyle: {
        color: "#809CFF",
        align: "right"
      },
      splitLine: {
        show: true,
          lineStyle: {
              opacity: 0.5
          }
      }
    },
    {
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        formatter: "{value}%"
      }
    }
  ],

  series: [{
      name: "作废比例",
      type: "line",
      symbolSize: 8,
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          color: "#33F0C0",
          lineStyle: {
            type: "dotted"
          }
        }
      },
      data: []
    },
    {
      name: "作废发票",
      type: "bar",
      barWidth: 25,
      itemStyle: {
        normal: {
          borderColor: "#26409D",

          color: {
            colorStops: [{
                offset: 0,
                color: "#188df0"
              },
              {
                offset: 0.4,
                color: "#26409D"
              },
              {
                offset: 1,
                color: "rgba(38,64,157,0.00)"
              }
            ]
          }
        }
      },
      data: []
    }
  ]
}
