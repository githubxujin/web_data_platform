import bgImg from '@/assets/images/lALPBE1XYv8DozDNAUDNAUA_320_320.png';
export default {
    tooltip: {
        backgroundColor: "rgba(3,18,44,0.90)",
        extraCssText: "box-shadow: inset 0 0 7px 0 #4088FD;border-radius: 2px;",
        padding: 15,
        axisPointer: {
            lineStyle: {
                color: "#4088FD",
                width: 1
            }
        },
        formatter: "{b} : {c} ({d}%)",
    },

    legend: [{
            orient: 'vertical',
            top: 'middle',
            right: '24%',
            data: [],
            itemWidth: 10,
            itemHeight: 10,
        },
        {
            orient: 'vertical',
            icon: "none",
            top: 'middle',
            right: '16%',
            data: [],
            // formatter: function (name) {
            //     for (let i = 0; i < option.length; i++) {
            //         if (name === option[i].name) {
            //             return option[i].value
            //         }
            //     }
            // },
            textStyle: {
                color: "#809CFF ",
                fontSize: 12,
                padding: [-2, 0, 0, 0],
            },
        },
        {
            orient: 'vertical',
            icon: "none",
            top: 'middle',
            right: '4%',
            data: [],
            // formatter: function (name) {
            //     for (let i = 0; i < option.length; i++) {
            //         if (name === option[i].name) {
            //             return [(option[i].value / sumOption * 100).toFixed(2)] + '%'
            //         }
            //     }
            // },
            textStyle: {
                color: "#809CFF ",
                fontSize: 12,
                padding: [-2, 0, 0, 0],
            },
        }
    ],

    graphic: [{
        type: 'image',
        id: 'logo',
        left: 26,
        top: 76,
        z: -10,
        bounding: 'raw',
        origin: [75, 75],
        style: {
            image: bgImg,
            width: 310,
            height: 310,
        }
    }],
    grid: {
        top: 110,
        left: 190,
    },
    series: [{
        type: 'pie',
        radius: '40%',
        center: ['31.2%', '50%'],
        selectedMode: 'single',
        labelLine: {
            length: 26,
            length2: 26,
            smooth: true,
            lineStyle: {
                color: '#26439E'
            },
        },
        label: {
            normal: {
                show: true,
                // position: 'inside',
                formatter: '{b} {d}%', //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                textStyle: {
                    align: 'center',
                    baseline: 'middle',
                    fontSize: 12,
                    fontWeight: 'bolder'
                }
            },
        },
        data: [],
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
            }
        }
    }],
    color: ['#17D7EB ', '#466FFF', '#375EDA', '#4631D3', '#8734C4', '#668AFD', '#375EDA']
};
