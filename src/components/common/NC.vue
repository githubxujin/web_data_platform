<template>
    <div>
        <div class="l-captcha" :data-site-key="siteKey" data-width="100%" data-callback="getResponse" data-theme="dark">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        siteKey: String
    },
    methods: {
        dynamicLoadJs: function(url, callback) {
            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            if (typeof callback == "function") {
                script.onload = script.onreadystatechange = function() {
                    if (
                        !this.readyState ||
                        this.readyState === "loaded" ||
                        this.readyState === "complete"
                    ) {
                        callback();
                        script.onload = script.onreadystatechange = null;
                    }
                };
            }
            head.appendChild(script);
        },
        // 重置人机验证
        resetCaptcha() {
            window.LUOCAPTCHA.reset();
        }
    },
    created() {
        const self = this;
        this.dynamicLoadJs("//captcha.luosimao.com/static/js/api.js");
        window.getResponse = resp => {
            var els = document.getElementsByName("luotest_response");
            if (els.length === 1 && els[0].value === resp) {
                self.$emit("success", resp);
            } else {
                // eslint-disable-next-line
                LUOCAPTCHA && LUOCAPTCHA.reset();
            }
        };
    }
};
</script>