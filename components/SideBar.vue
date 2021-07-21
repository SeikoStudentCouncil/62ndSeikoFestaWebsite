<template>
    <div class="sidebar-container">
        <div class="sidebar-menu hover-mouse-pointer" @click="onClickMenu" >
            <svg class="sidebar-menu-arrow" xmlns="http://www.w3.org/2000/svg" width="46.083" height="23.291" viewBox="0 0 46.083 23.291">
                <path d="M1850,0l19.075,17.26L1889.025,0" transform="translate(-1846.469 3.531)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
            </svg>
        </div>
        <svg class="sidebar-title" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-1860 -407)">
                <text transform="translate(1883.5 451) rotate(90)" fill="#393e46" font-size="30" class="font-transat-italic" letter-spacing="0.1em"><tspan x="-43.605" y="0">SEIKO</tspan></text>
                <line data-name="線 1" x1="52" y1="29" transform="translate(1860.5 503.5)" fill="none" stroke="#000" stroke-width="1"/>
                <text transform="translate(1868 596) rotate(90)" fill="#393e46" font-size="30" class="font-transat-italic" letter-spacing="0.1em"><tspan x="-54.831" y="0">FESTA</tspan><tspan y="0" font-size="17.499" baseline-shift="9.999000313881634">62</tspan></text>
            </g>
        </svg>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShowDetailes: false
        }
    },
    methods: {
        onClickMenu() {
            this.isShowDetailes = true
        }
    }
}
</script>

<style>
.sidebar-container {
    display: inline-block;
    height: 100vh;
    width: 60px;
    background: #EEEEEE;
    float: left;
}

.sidebar-menu {
    height: 60px;
    width: 60px;
    background: var(--color-black);
}

.sidebar-menu-arrow {
    margin-top: 35px;
    transform: translateY(-50%);
}

.sidebar-title {
    height: 300px;
    width: 50px;
    margin-top: calc(50vh - 60px);
    transform: translateY(-50%);
}
.font-transat-italic {
    font-family: transat, sans-serif;
    font-weight: 300;
    font-style: italic;
}
</style>
