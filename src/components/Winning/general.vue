<template>
    <div class="table-wrap">
        <div class="echart-big-wrap p-re">
            <div class="echart-big-title">中国建筑近一年新增中标公告数</div>
            <chart height="511px" width="1168px" id="general" :option="option" />
            <el-row type="flex" class="tag-box pb20">
                <el-row type="flex" class="mr20">
                    <c-op v-for="(v,k) in tagList1" :key="k" :class="{act: tagCur1 === k}" @click.native="tagHand1(k,v.value)">
                        {{v.label}}</c-op>
                </el-row>
            </el-row>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.p-re {
  position: relative;
}
.tag-box {
  position: absolute;
  top: 28px;
  left: 1000px;
}
</style>
<script>
import { deepClone } from "@/utils/common";
import steelLine from "@/utils/echart/steelLine.js";
import Chart from "@/components/Charts/invoiceInvalid";
import cOp from "@/components/common/c-op";
export default {
  components: {
    cOp,
    Chart
  },
  data() {
    return {
      option: {},
      params: {
        dateType: "1"
      },
      tagCur1: 0,
      tagList1: [
        {
          value: 1,
          label: "周"
        },
        {
          value: 2,
          label: "月"
        },
        {
          value: 3,
          label: "季"
        }
      ]
    };
  },
  created() {
    this.getChart();
  },
  methods: {
    //控制周月季
    tagHand1(k, value) {
      this.tagCur1 = k;
      this.params.dateType = value;
      this.getChart();
    },
    getChart() {
      this.$http("/dcp/bid/trend", this.params, { type: "get" }).then(res => {
        let steelLineDraw = deepClone(steelLine);
        let dateArr =
          res.data.length > 0 ? res.data[0].data.map(i => i.date) : [];
        var zj, zt, ztj, zjiao;
        let key = dateArr.reduce((acc, cur) => {
          acc[cur] = 0;
          return acc;
        }, {});
        zj = deepClone(key);
        zt = deepClone(key);
        ztj = deepClone(key);
        zjiao = deepClone(key);
        res.data[0].data.map(i => {
          zj[i.date] = i.value;
        });
        res.data[1].data.map(i => {
          zt[i.date] = i.value;
        });
        res.data[2].data.map(i => {
          ztj[i.date] = i.value;
        });
        res.data[3].data.map(i => {
          zjiao[i.date] = i.value;
        });
        steelLineDraw.xAxis.data = dateArr;
        steelLineDraw.series = [
          // {
          //     name: "中建",
          //     type: "line",
          //     data: Object.values(zj)
          // },
          {
            name: "中铁",
            type: "line",
            data: Object.values(zt)
          }
          // {
          //     name: "中铁建",
          //     type: "line",
          //     data: Object.values(ztj)
          // },
          // {
          //     name: "中交",
          //     type: "line",
          //     data: Object.values(zjiao)
          // }
        ];
        steelLineDraw.legend.data = res.data.map(i => i.coreCompany);
        this.option = steelLineDraw;
      });
    }
  }
};
</script>
<style lang="scss" scope>
@import "~@/assets/css/echart.scss";
.p-re {
  position: relative;
}
.tag-box {
  position: absolute;
  top: 58px;
  left: 46px;
  width: 410px;
  .c-tag + .c-tag {
    margin-left: 10px;
  }
}
</style>