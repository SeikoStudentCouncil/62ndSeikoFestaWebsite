<template>
    <div class="container">
        <div class="full-screen">
            <SideBar id="sideBar" class="side-bar"/>
            <div id="scrollContainer" class="scroll-container">
                    <div class="introduce-departments-container">
                        <div class="departments-text">
                            <div class="departments-number">{{departments[departmentIndex].num}}</div>
                            <div class="departments-title">{{departments[departmentIndex].name}}<br><font class="alphabet">{{departments[departmentIndex].name_alphabet}}</font></div>
                            <hr class="departments-line">
                            <div class="departments-body">{{departments[departmentIndex].body}}</div>
                        </div>
                        <img class="departments-image" src="../assets/image/display.svg"/>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    head: {
        title: '第62回聖光祭公式サイト｜部門'
    },
    computed: {
        ...mapState(['departments'])
    },
    data() {
        return {
            departmentIndex: 0
        }
    }
}
</script>

<style>
.introduce-departments-container {
    text-align: left;
    display: block;
    height: 60%;
    width: 84%;
    margin-top: 10%;
    margin-left: 8%;
}
.departments-text {
    display: inline-block;
    height: auto;
    width: 40%;
}


.departments-number {
    font-family: futura-pt, sans-serif;
    font-weight: 300;
    font-style: normal;
    font-size: 10vw;
    line-height: 90%;
}

.departments-title {
    font-family: toppan-bunkyu-midashi-go-std,sans-serif;
    font-weight: 900;
    font-style: normal;
    font-size: 2.8vw;
    line-height: 100%;
}
.departments-title .alphabet {
    font-family: futura-pt, sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 0.7em;
}

.departments-line {
    border-top: solid var(--color-black) 3px;
    margin-top: 3%;
    width: 80%;
}
.departments-body {
    height: auto;
    width: 100%;
    font-weight: 300;
    margin-top: 40%;
    letter-spacing: 0.1em;
    line-height: 180%;
    font-size: 1em;
}

.departments-image {
    display: inline-block;
    height: auto;
    width: 55%;
    margin-left: 4%;
}
</style>