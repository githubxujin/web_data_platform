<template>
    <div class="border">
        <div class="logo"><span>&nbsp;验真中 . . .</span></div>
        <div class="wrapASH" style="margin-top:5px">
            <div class="barASH"></div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style scoped>
.border {
    border: 1px solid #ffc193;
    width: 121px;
    height: 40px;
    padding: 5px;
}
.wrapASH {
    height: 5px;
    width: 110px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
}
.logo {
    margin-left: 10px;
    color: #f56a00;
    display: flex;
    align-items: center;
}
.barASH {
    width: 490px;
    height: 16px;
    left: -200px;
    position: absolute;
    background: linear-gradient(
        90deg,
        rgb(250, 225, 209) 0px,
        rgb(255, 102, 13) 145px,
        rgb(250, 225, 209) 290px
    );
    border-radius: 10px;
    animation: mymove 1s linear infinite alternate;
}
@-webkit-keyframes mymove /* Safari and Chrome */ {
    from {
        left: -250px;
    }
    to {
        left: -10px;
    }
}
</style>