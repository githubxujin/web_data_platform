let value = "";
let name = "";
export default {
    backgroundColor: '',

    grid: {
        top: 120,
        left: "3%",
        right: "3%",
        bottom: "3%",
        containLabel: true
    },
    tooltip: {
        show: true,
        alwaysShowContent: true,
        backgroundColor: "none",
        position: ["208", "38%"], /// tooltip文字 定位位置
        formatter: function (params) {
            // 这个可以自己写dom样式
            if (params.seriesIndex === 0) {
                value = params.value;
                name = params.name

                return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${ params.name}</div>`;
            } else {
                return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${ name}</div>`;
            }
        }
    },
    "series": [{
        hoverOffset: 2,
        "type": "pie",
        "center": ["50%", "50%"],
        "radius": ["80", "90"],
        "color": ["#14DCC3", "#70C6FF", "#1EA57D ", "#3B26D9", "#4D71EC ", "#2757FC"],
        "startAngle": 135,
        "labelLine": {
            "normal": {
                "length": 25
            }
        },
        "label": {
            "normal": {
                "position": "center",
                "show": false
            },
            "emphasis": {
                "show": false
            }
        },
        minAngle: 10,
        "data": [{
            "name": "勘察企业",
            "value": "19.84"
        }, {
            "name": "监理企业",
            "value": "18.45"
        }, {
            "name": "设计企业",
            "value": "25.02"
        }, {
            "name": "造价咨询企业",
            "value": "0.12"
        }, {
            "name": "设计与施工一体化企业",
            "value": "0.12"
        }, {
            "name": "建筑业企业",
            "value": "36.45"
        }]
    }, {
        //  内圆
        type: "pie",
        center: ["50%", "50%"],
        radius: ["70", "71"],
        legendHoverLink: false,
        hoverAnimation: false,
        label: {
            normal: {
                position: "center",
                show: false
            }
        },
        data: [{
            value: 0,
            name: "",
            itemStyle: {
                normal: {
                    color: "rgb(41, 49, 52)"
                }
            }
        }]
    }]
}
