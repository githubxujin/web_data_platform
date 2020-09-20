export default {
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name: "访问来源",
            type: "pie",
            startAngle: 30,
            radius: [0, "100%"],
            silent: true,
            label: {
                normal: {
                    position: "inner",
                    formatter: "{b}\n{d}%"
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            minAngle: 10,
            data: [
                {
                    value: 50,
                    name: "其他",
                    itemStyle: {
                        color: "#2544a5"
                    }
                },
                {
                    value: 50,
                    name: "top1-3",
                    itemStyle: {
                        color: "#FFA954"
                    }
                },
                {
                    value: 50,
                    name: "top4-10",
                    itemStyle: {
                        color: "#466fff"
                    }
                }
            ]
        }
    ]
};
