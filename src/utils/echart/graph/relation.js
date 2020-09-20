import {
    refush,
    fullScreen,
    download,
    restore
} from "@/utils/echart/DataURI";

export default {
    backgroundColor: "",
    toolbox: {
        orient: "vertical",
        show: true,
        itemSize: 30,
        iconStyle: {
            borderColor: "#43A1AC",
            borderWidth: 1,
            borderType: "solid"
        },
        emphasis: {
            iconStyle: {
                backgroundColor: "#43A1AC",
                borderColor: "#43A1AC",
                borderWidth: 1,
                borderType: "solid"
            }
        },
        feature: {
            restore: {
                icon: refush
            },
            saveAsImage: {
                title: "下载",
                icon: download,
                backgroundColor: "#232528"
            },
            myFull: {
                title: "全屏",
                icon: fullScreen,
                onclick: function (e) {
                    console.log(e.getOption());
                    document.getElementById("relation").style.width = "100%";
                    document.getElementById("relation").style.height =
                        window.innerHeight + "px";
                    var el = document.getElementById("fullScreen");
                    var rfs =
                        el.requestFullScreen ||
                        el.webkitRequestFullScreen ||
                        el.mozRequestFullScreen ||
                        el.msRequestFullScreen;
                    console.log(rfs);
                    if (rfs) {
                        rfs.call(el);
                    } else if (typeof window.ActiveXObject !== "undefined") {
                        var wscript = new ActiveXObject("WScript.Shell");
                        if (wscript != null) {
                            wscript.SendKeys("{F11}");
                        }
                    }
                }
            },
            myRestore: {
                title: "恢复",
                icon: restore,
                onclick: function (e) {
                    document.getElementById("relation").style.width = 1170 + "px";
                    document.getElementById("relation").style.height = 700 + "px";
                    if (document.exitFullScreen) {
                        document.exitFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            }
        },
        right: "-2px",
        top: "20%"
    },
    legend: {
        backgroundColor: "#2D3034",
        data: [],
        icon: "circle",
        type: "scroll",
        orient: "horizontal",
        bottom: 10
    },

    series: [{
        edgeLabel: {
            normal: {
                show: true,
                textStyle: {
                    fontSize: 10
                },
                position: "middle",
                formatter: function (x) {
                    return x.data.post;
                }
            }
        },
        cursor: "pointer",
        focusNodeAdjacency: true,
        animation: false,
        hoverAnimation: true,
        animationDuration: 1000,
        zoom: 4,
        animationEasingUpdate: "quinticInOut",
        name: "企业关系图",
        type: "graph",
        layout: "force",
        data: [],
        links: [],
        categories: [{
                name: "分支机构",
                itemStyle: {
                    color: "#297D70"
                }
            },
            {
                name: "客户供应商",
                itemStyle: {
                    color: "#636389"
                }
            },
            {
                name: "诉讼关联",
                itemStyle: {
                    color: "#7D352D"
                }
            },
            {
                name: "债务/债权",
                itemStyle: {
                    color: "#A15D41"
                }
            },
            {
                name: "历史投资",
                itemStyle: {
                    color: "#B28149"
                }
            },
            {
                name: "历史股东",
                itemStyle: {
                    color: "#43648C"
                }
            },
            {
                name: "疑似关联",
                itemStyle: {
                    color: "#29617D"
                }
            },
            {
                name: "投资",
                itemStyle: {
                    color: "#B29E49"
                }
            },
            {
                name: "判决关联",
                itemStyle: {
                    color: "#3B478D"
                }
            },
            {
                name: "成员",
                itemStyle: {
                    color: "#9BBC6C"
                }
            },
            {
                name: "业务竞争",
                itemStyle: {
                    color: "#834455"
                }
            },
            {
                name: "股东",
                itemStyle: {
                    color: "#355C9C"
                }
            },
            {
                name: "兄弟公司",
                itemStyle: {
                    color: "#5A8D73"
                }
            },
            {
                name: "公司",
                itemStyle: {
                    color: "#297D70"
                }
            }
        ],
        roam: true,
        label: {
            normal: {
                fontFamily: "PingFangSC-Light",
                show: true,
                position: "bottom",
                formatter: "{b}",
                fontSize: 10,
                color: "#D3D3D4"
            }
        },
        lineStyle: {
            normal: {
                curveness: 0
            }
        }
    }]
};
