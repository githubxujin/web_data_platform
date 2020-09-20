export default {
  legend: {
    data: ['订单价格', '销售价格', ],
    top: '60',
    right: '8%'
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(3,18,44,0.90)',
    extraCssText: 'box-shadow: inset 0 0 7px 0 #4088FD;border-radius: 2px;',
    padding: 15,
    axisPointer: {
      lineStyle: {
        color: '#4088FD',
        width: 1
      }
    },
  },
  grid: {
    top: 120,
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    data: ['2019-01-02', '2019-02-03', '2019–03-14', '2019-04-18', '2019-05-03', '2019-07-31',
      '2019-08-16', '2019-09-03', '2019-10-29', '2019-11-14', '2019-12-21'
    ]

  },
  yAxis: {
    type: 'value'
  },
  series: [{
      name: '订单价格',
      type: 'line',
      step: 'start',
      data: [120, 132, 101, 134, 90, 230, 210],
      itemStyle: {
        normal: {
          color: '#3B7FEE',
        },
      },
    },
    {
      name: '销售价格',
      type: 'line',
      step: 'middle',
      data: [220, 282, 201, 234, 290, 430, 410],
      itemStyle: {
        normal: {
          color: '#33F0C0',
        },
      },
    }
  ]
};
