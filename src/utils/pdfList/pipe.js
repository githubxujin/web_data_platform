export default {
    color: ['#43A1AC', '#18454A'],
    title: {
        text: '6/12',
        subtext: '检查中',
        textStyle: {
            fontSize: 18,
            color: '#D3D3D4',
            fontWeight: 'normal',
        },
        top: '30%',
        textAlign: "center",
        fontFamily: "PingFangSC-Light",
        left: "46%",
        subtextStyle: {
            color: '#43A1AC',
            fontSize: 12,
            fontWeight: 'normal',
            margin: '-10'

        }
    },
    grid: {
        left: 'center'
    },

    toolbox: {
        show: false
    },
    series: [{
            name: "",
            animation: true,
            type: "pie",
            radius: [45, 50],
            center: ["50%", "50%"],
            label: {
                normal: {
                    show: false,
                }
            },
            itemStyle: {

            },
            hoverAnimation: false,
            data: [1, 0]
        },
        {
            name: "",
            type: "pie",
            hoverAnimation: false,
            radius: [39, 40],
            center: ["50%", "50%"],
            label: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: "1",
                    color: "#18454A"
                }
            },
            data: [0]

        }
    ]
};
