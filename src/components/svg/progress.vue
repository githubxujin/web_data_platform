<template>
    <svg width="30px" height="31px" viewBox="0 0 30 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <path
                d="M15,30.6475279 C6.71572875,30.6475279 -2.84217094e-14,23.9317992 -2.84217094e-14,15.6475279 C-2.84217094e-14,7.36325666 6.71572875,0.647527911 15,0.647527911 C23.2842712,0.647527911 30,7.36325666 30,15.6475279 C30,23.9317992 23.2842712,30.6475279 15,30.6475279 Z M15,27.4332422 C21.5090703,27.4332422 26.7857143,22.1565982 26.7857143,15.6475279 C26.7857143,9.13845765 21.5090703,3.86181362 15,3.86181362 C8.49092973,3.86181362 3.21428571,9.13845765 3.21428571,15.6475279 C3.21428571,22.1565982 8.49092973,27.4332422 15,27.4332422 Z"
                id="path-1"></path>
        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="画板" transform="translate(-211.000000, -634.000000)">
                <g id="分组" transform="translate(211.000000, 633.868421)">
                    <mask id="mask-2" fill="white">
                        <use xlink:href="#path-1"></use>
                    </mask>
                    <use id="Mask" :fill="fill?fill:colorBg" fill-rule="nonzero" xlink:href="#path-1"></use>
                </g>
                <circle id="Oval" :stroke="stroke?stroke:circleColor" cx="226" cy="649.368421" r="12.5"></circle>

                <!-- 进度条 -->
                <circle stroke-width="3.5" :stroke="color" cx="226" cy="649.368421" r="13" :stroke-dasharray="dasharray"></circle>
            </g>
        </g>
    </svg>
</template>
<script>
export default {
    props: {
        value: {
            type: [Number, String],
            default: 0
        },
        color: String,
        fill: String,
        stroke: String,
    },

    data() {
        return {
            dasharray: "",
            colorBg: '#313235',
            circleColor:'#31353A'
        };
    },
    watch: {
        value() {
            this.getDasharray();
        },
        flag(e) {
            this.setColor();
        }
    },
    computed: {
        flag: {
            get() {
                return this.$store.state.echart.flag
            },
        }
    },
    mounted() {
        this.getDasharray();
        this.setColor();
    },
    methods: {
        setColor() {
            if (this.flag == 'light') {
                this.colorBg = '#DCE6F9'
                this.circleColor = '#D2D9E5';
            } else {
                this.colorBg = '#313235'
                this.circleColor = '#31353A';
            }
        },
        getDasharray() {
            var percent = this.value / 100,
                perimeter = Math.PI * 2 * 13;
            this.dasharray =
                perimeter * percent + " " + perimeter * (1 - percent);
        }
    }
};
</script>
<style lang="scss" scoped>
    circle {
        transition: stroke-dasharray 0.25s;
    }
    svg {
        transform: rotate(-90deg);
    }
</style>


