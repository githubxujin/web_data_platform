import {
    formatDate,
    numFormat
} from "@/filters"

import Fetch from '@/config/fetch'
import env from '@/config/env'

const myFetch = new Fetch(env)

export default {
    data() {
        return {
            env,
            ajax: myFetch,
            CATEGORY: {
                1: '基建',
                2: '医疗',
                3: '能源',
                0: '其他'
            },
            G_userName: {
                'jerry.chen': '陈仁泽',
                'cindy.hao': '郝雅欣',
                'emily.wang': '王丽华',
                'shirley.zhang': '张新竹',
                'kendrick.huang': '黄玮瑾',
                'andy.pan': '潘先念',
                'young.yang': '杨雅谊',
                'deron.he': '贺正东',
                'even.sun': '孙彬彬',
                'kevin.xie': '谢富轲',
                'rachel.huang': '黄欢',
                'judy.ma': '马硕康',
                'lucky.ye': '叶迪',
            },
            G_userName_test: {
                'music.yin': '殷乐',
                'lee.li': '李明津',
                'yi.zhang': '张一',
                'er.zhang': '张二',
                'san.zhang': '张三',
                'yi.li': '李一',
                'er.li': '李二',
                'san.li': '李三',
            },
            G_withRelations: [{
                    label: '实控人',
                    value: '实控人'
                },
                {
                    label: '法定代表人',
                    value: '法定代表人'
                },
                {
                    label: '董事',
                    value: '董事'
                },
                {
                    label: '监事',
                    value: '监事'
                },
                {
                    label: '经理',
                    value: '经理'
                },
                {
                    label: '股东',
                    value: '股东'
                },
                {
                    label: '其他',
                    value: '其他'
                },
            ]
        }
    },
    methods: {
        formatLabel(row, column, cellValue) {
            if (typeof cellValue === 'object' && cellValue) {
                return cellValue.length > 0 ? cellValue : '-'
            } else if (cellValue === 0) {
                return cellValue
            } else {
                return cellValue || '-'
            }
        },
        formatDate,
        numFormat,
        escape2Html(str) {
            var arrEntities = {
                'lt': '<',
                'gt': '>',
                'nbsp': ' ',
                'amp': '&',
                'quot': '"',
                '#61': '='
            };
            str = str.replace(/(&lt;|<)img/ig, '<weiwei')
            return str.replace(/&(lt|gt|nbsp|amp|quot|#61);/ig, function (all, t) {
                return arrEntities[t];
            });
        },
        isObjectEmpty(val) {
            // 判断对象
            return val == null || !(Object.keys(val) || val).length;
        },
        //双击实现复制
        onDbClick(row, column, cell, event) {
            var aux = document.createElement("input");
            // 获得需要复制的内容
            var text = cell.querySelector('div').innerHTML
            aux.setAttribute("value", text);
            // 添加到 DOM 元素中
            document.body.appendChild(aux);
            // 执行选中
            // 注意: 只有 input 和 textarea 可以执行 select() 方法.
            aux.select();
            // 获得选中的内容
            window.getSelection();
            document.execCommand("copy");
            document.body.removeChild(aux);
            document.execCommand('Copy')

        },
    },
    filters: {
        numFormat
    }
}
