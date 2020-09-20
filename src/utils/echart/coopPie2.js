var value = "";
var name = "";
export default {
    backgroundColor: '',
    grid: {},
    tooltip: {
        show: true,
        alwaysShowContent: true,
        backgroundColor: "none",
        position: ["208", "38%"], // tooltip文字 定位位置
        formatter: function (params) {
            // 这个可以自己写dom样式
            // console.log('params',params);

            if (params.seriesIndex === 0) {
                value = params.value;
                name = params.name
                return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${name}</div>`;
            } else {
                return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${name}</div>`;
            }
        }
    },
    "series": [{
        hoverOffset: 2,
        "type": "pie",
        "center": ["50%", "50%"],
        "radius": ["80", "90"],
        "color": ["#14dcc3", "#1ea57d", "#4d71ec "],
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
        "data": [{
            "name": "其它",
            "value": "40.24"
        }, {
            "name": "市政工程",
            "value": "13.57"
        }, {
            "name": "房屋建筑工程",
            "value": "46.19"
        }]
    }, {
        //  内圆
        type: "pie",
        center: ["50%", "50%"],
        radius: ["70", "71"],
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
