export default {
    "backgroundColor": "",
    "tooltip": {
        "show": true,
        "alwaysShowContent": true,
        "backgroundColor": "none",
        "position": [
            "50",
            "44%"
        ]
    },
    "series": [{
            "hoverOffset": 2,
            "type": "pie",
            "center": [
                "50%",
                "50%"
            ],
            "radius": [
                "80",
                "90"
            ],
            "color": [
                "#319A8A",
                "#4181CF",
                "#ACCE7A",
                "#A13940",
                "#444E80"
            ],
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
                    "value": 50.74,
                    "name": "安全"
                },
                {
                    "value": 43.88,
                    "name": "异常"
                },
                {
                    "value": 2.11,
                    "name": "特别关注"
                },
                {
                    "value": 0.74,
                    "name": "疑似高度匹配"
                },
                {
                    "value": 2.53,
                    "name": "高度匹配"
                }
            ]
        },
        {
            "type": "pie",
            "center": [
                "50%",
                "50%"
            ],
            "radius": [
                "70",
                "71"
            ],
            "hoverAnimation": false,
            "label": {
                "normal": {
                    "position": "center",
                    "show": false
                }
            },
            "data": [{
                "value": 0,
                "name": "",
                "itemStyle": {
                    "normal": {
                        "color": "rgb(41, 49, 52)"
                    }
                }
            }]
        }
    ]
}
