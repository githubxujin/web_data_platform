import { refush, fullScreen, download, restore } from "@/utils/echart/DataURI";
// import echarts from "echarts"
export default {
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
                onclick: function(e) {
                    var el = document.getElementById("fullScreen");
                    document.getElementById("relation").style.width =
                        window.innerWidth - 40 + "px";

                    document.getElementById("relation").style.height =
                        1000 + "px";
                    // var opts = e.getOption()
                    // opts.toolbox[0].feature.myFull.show = false
                    // opts.toolbox[0].feature.myRestore.show = true

                    // var fullchart = echarts.init(document.getElementById('relation'))
                    // fullchart.setOption(opts)

                    var rfs =
                        el.requestFullScreen ||
                        el.webkitRequestFullScreen ||
                        el.mozRequestFullScreen ||
                        el.msRequestFullScreen;

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
                onclick: function(e) {
                    document.getElementById("relation").style.width =
                        1320 + "px";
                    document.getElementById("relation").style.height =
                        800 + "px";
                    // var opts = e.getOption()
                    // opts.toolbox[0].feature.myFull.show = true
                    // opts.toolbox[0].feature.myRestore.show = false
                    // var fullchart = echarts.init(document.getElementById('relation'))
                    // fullchart.setOption(opts)
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
        right: 0,
        top: "20%"
    },
    backgroundColor: "",
    animationDuration: 1000,
    animationEasingUpdate: "quinticInOut",
    series: [
        {
            name: "知识图谱",
            type: "graph",
            layout: "force",
            zoom: 5,
            force: {
                repulsion: 100,
                layoutAnimation: true
            },
            data: [],
            links: [],
            categories: [],
            roam: true,
            label: {
                normal: {
                    show: true,
                    position: "inside",
                    formatter: function(params) {
                        return params.data.value;
                    },
                    fontSize: 16,
                    fontStyle: "600"
                }
            },
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 1.5,
                    curveness: 0,
                    color: "#393C44"
                }
            }
        }
    ]
};
