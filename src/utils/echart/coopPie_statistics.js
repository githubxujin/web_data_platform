var value = "";
var name = "";
export default {
    backgroundColor: '',

    tooltip: {
        show: true,
        alwaysShowContent: true,
        backgroundColor: "none",
        position: ["29.5%", "36%"],
        // position: ["208", "45"], // tooltip文字 定位位置
        formatter: function (params) {
            // 这个可以自己写dom样式
            // console.log('params',params);

            if (params.seriesIndex === 0) {
                value = params.value;
                name = params.name
                return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:14px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:10px;color:rgb(194, 194, 195);text-align:center;margin-top:0;">${name}</div>`;
            } else {
                return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:14px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:10px;color:rgb(194, 194, 195);text-align:center;margin-top:0;">${name}</div>`;
            }
        }
    },
    "series": [
        {
        hoverOffset: 2,
        "type": "pie",
        "center": ["50%", "50%"],
        "radius": ["40", "43"],
        // top:-130,
        "color": ["#89a764", "#55B2A3", "#3f949e"],
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
                "show": false,
            }
        },
        "data": [{
            "name": "其它",
            "value": "40.24"
        }, {
            "name": "市政工程",
            "value": "13.57"
        }, 
        {
            "name": "房屋建筑工程",
            "value": "46.19"
        }
    ]
    }, 
    {
        //  内圆
        type: "pie",
        center: ["50%", "50%"],
        radius: ["35", "36"],
        // top:-130,
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
                    color: "rgb(79, 79, 79)"
                }
            }
        }]
    }]
}
