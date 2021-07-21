<template>
    <div class="footer-container">
        
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
.footer-container {
    height: 70vh;
    width: 100%;
    background: #2E2E2E;
}
</style>
