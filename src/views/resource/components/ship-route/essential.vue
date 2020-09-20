<template>
    <div>
        <div class="content pt30">
            <div class="basic">
                <div class="box first">
                    <div class="title">MMSI</div>
                    <div class="detail">{{list.mmsi || '-'}}</div>
                </div>
                <div class="box">
                    <div class="title">类型</div>
                    <div class="detail">{{list.shipType || '-'}}</div>
                </div>
                <div class="box">
                    <div class="title">总吨</div>
                    <div class="detail">{{list.totalWeight || '-'}}</div>
                </div>
            </div>
            <div class="basic">
                <div class="box">
                    <div class="title">船长(米)</div>
                    <div class="detail">{{list.shipLength || '-'}}</div>
                </div>
                <div class="box">
                    <div class="title">船宽(米)</div>
                    <div class="detail">{{list.shipWidth || '-'}}</div>
                </div>
                <div class="box">
                    <div class="title">吃水(米)</div>
                    <div class="detail">{{list.draught || '-'}}</div>
                </div>
            </div>
            <div class="basic">
                <div class="box">
                    <div class="title">呼号</div>
                    <div class="detail">{{list.callsign || '-'}}</div>
                </div>
                <div class="box">
                    <div class="title">船藉</div>
                    <div class="detail">{{list.flagCountry || '-'}}</div>
                </div>
                <div class="box">
                    <div class="title">净吨</div>
                    <div class="detail">{{list.netWeight || '-'}}</div>
                </div>
            </div>
            <div class="basic last">
                <div class="box">
                    <div class="title">IMO</div>
                    <div class="detail">{{list.imo || '-'}}</div>
                </div>
                <div class="box">
                    <div class="title">建造时间</div>
                    <div class="detail">{{list.buildDate?list.buildDate.replace('/','-'):''}}</div>
                </div>
                <div class="box">
                    <div class="title">载重吨</div>
                    <div class="detail">{{list.loadWeight || '-'}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
    },
    data() {
        return {
            list: {}
        };
    },
    created() {
        this.getList(this.$route.query.id)
    },
    methods: {
        getList(id) {
            this.ajax
                .json('/dcp/ship/info/detail', { id }, { type: 'get' })
                .then(res => {
                    this.list = res.data
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    .basic {
        display: inline-block;
        width: 325px;
        height: 202px;
        box-sizing: border-box;
        padding-left: 39px;
        vertical-align: middle;
        &.first {
            padding-left: 0;
        }
        &.last {
            border-right: 0 solid #4f5155;
        }
    }
    .box {
        margin-bottom: 30px;
        &:last-child {
            margin-bottom: 0;
        }
        .title {
            font-family: PingFangSC-Light;
            font-size: 14px;
            line-height: 22px;
        }
        .detail {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            line-height: 24px;
        }
    }

    .dark{
        .basic {
            border-right: 1px solid #4f5155;
        }
        .box {
            .title {
                color: #909399;
            }
            .detail {
                color: #d3d3d4;
            }
        }
    }
    .light{
        .basic {
            border-right: 1px solid #D2D9E5;
        }
        .box {
            .title {
                font-family: PingFangSC-Regular;
                color: #999;
            }
            .detail {
                color: #666;
            }
        }
    }
</style>
