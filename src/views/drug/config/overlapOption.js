import echarts from "echarts";
export default {
  legend: {
    data: ["生物合成人胰岛素注射液", "物西咪替丁片", "华法林钠片", "生物合成人胰岛素注射液增长率", "物西咪替丁片增长率", "华法林钠片增长率"],
    top: 80,
    left: 140,
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(3,18,44,0.90)",
    extraCssText: "box-shadow: inset 0 0 7px 0 #4088FD;border-radius: 2px;",
    padding: 15,
    axisPointer: {
      lineStyle: {
        color: "#4088FD",
        width: 1
      }
    }
  },
  grid: {
    top: 140
  },
  xAxis: [{
    type: "category",
    data: ['2019-01-02', '2019-02-03', '2019–03-14', '2019-04-18', '2019-05-03', '2019-07-31',
      '2019-08-16', '2019-09-03', '2019-10-29', '2019-11-14', '2019-12-21'
    ],

  }],
  yAxis: [{
      name: "单位/元",
      nameTextStyle: {
        color: "#809CFF",
        align: "right"
      },
      type: "value",
    },
    {
      type: "value",
      min: 180,
      max: 25,
      position: "rgiht",
      axisLabel: {
        formatter: "{value}%"
      }
    }
  ],
  series: [{
      name: "生物合成人胰岛素注射液",
      type: "bar",
      stack: "总量",
      barWidth: 42,
      data: [1400, 1000, 1600, 1700, 1500, 9100],
      itemStyle: {
        borderColor: "#FFF78A",
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(255,188,37,0.34)"
          },
          {
            offset: 0.8,
            color: "rgba(255,223,117,0.01)"
          }
        ])
      }
    },
    {
      name: "物西咪替丁片",
      type: "bar",
      stack: "总量",
      barWidth: 42,
      data: [1200, 1400, 600, 1300, 400, 4000],
      itemStyle: {
        borderColor: "#4088FD",
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(37,87,255,0.34)"
          },
          {
            offset: 0.8,
            color: "rgba(117,143,255,0.00)"
          }
        ])
      }
    },
    {
      name: "华法林钠片",
      type: "bar",
      stack: "总量",
      barWidth: 42,
      data: [2000, 9000, 300, 1000, 1400, 1900],
      itemStyle: {
        borderColor: "#33F0C0",
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(37,255,221,0.34)"
          },
          {
            offset: 0.8,
            color: "rgba(122,244,174,0.02)"
          }
        ])
      }
    },
    {
      name: "华法林钠片增长率",
      type: "line",
      data: [40, 30, 60, 180, 60, 40],
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          color: '#33F0C0',
          lineStyle: {
            type: "dotted"
          }
        },
      },
    }, {
      name: "生物合成人胰岛素注射液增长率",
      type: "line",
      data: [50, 40, 40, 130, 50, 120],
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          color: '#FFF78A ',
          lineStyle: {
            type: "dotted"
          }
        },
      },
    }, {
      name: "物西咪替丁片增长率",
      type: "line",
      data: [50, 90, 80, 120, 60, 100],
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          color: '#4088FD ',
          lineStyle: {
            type: "dotted"
          }
        },
      },
    }

  ]
};
