<template>
    <div class="container">
        <div class="full-screen">
            <SideBar id="sideBar" class="side-bar" :isShowDetailes="isShowDetailes" @onClickMenu="onMenuAnime"/>
            <div id="scrollContainer" class="scroll-container">
                <div :class="{ 'menu-anime': true, 'anime':isShowDetailes, 'close':onCloseDetails, 'blind':onBlinded }">
                    <div class="menu-anime-1"></div>
                    <div class="menu-anime-2"></div>
                    <div class="menu-anime-3"></div>
                    <!--div class="menu-anime-4"></!--div-->
                    <div class="menu-innner">
                    <div class="menu-concept">MENU!</div>
                    <div class="menu-container">
                        <div class="menu-content-row" @click="transmit('/')"><div class="menu-content-block"></div> <a>Home </a> <span class="menu-content-jp">ホーム</span></div>
                        <div class="menu-content-row"><div class="menu-content-block"></div><a>Map</a><span class="menu-content-jp">マップ</span></div>
                        <div class="menu-content-row"><div class="menu-content-block"></div><a>Timetable</a><span class="menu-content-jp">タイムテーブル</span></div>
                        <div class="menu-content-row"><div class="menu-content-block"></div><a>Congestions</a><span class="menu-content-jp">室内混雑度</span></div>
                        <div class="menu-content-row selected" @click="onMenuAnime"><div class="menu-content-block"></div><a>Departments</a><span class="menu-content-jp">部門紹介</span></div>
                        <div class="menu-content-row"><div class="menu-content-block"></div><a>Club Exhibition</a><span class="menu-content-jp">展示団体</span></div>
                        <div class="menu-content-row"><div class="menu-content-block"></div><a>Food Stands</a><span class="menu-content-jp">食品店舗</span></div>
                        <div class="menu-content-row"><div class="menu-content-block"></div><a>Articles</a><span class="menu-content-jp">特集</span></div>
                    </div>
                    <div class="menu-over-color"></div>
                    </div>
                </div>
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
        title: '部門紹介'
    },
    computed: {
        ...mapState(['departments'])
    },
    data() {
        return {
            departmentIndex: 0,
            isShowDetailes: false,
            onCloseDetails: false,
            onBlinded: true,
        }
    },
    methods: {
        transmit(pageNmae) {
            this.setOnCloseDetailes(true)
            setTimeout(function() {
                this.$router.push(pageNmae)
            }.bind(this), 1000)
        },
        handleAnimation(anim) {
            this.anim = anim;
        },
        onMenuAnime() {
            console.log("on")
            if (!this.isShowDetailes) {
                this.setIsShowDetailes(true)
            } else {
                this.setOnCloseDetailes(true)
                setTimeout(function() {
                this.setIsShowDetailes(false)
                }.bind(this), 1000)
                setTimeout(function() {
                this.setOnCloseDetailes(false)
                }.bind(this), 6000)
            }
        },
        setIsShowDetailes(bool) {
            this.isShowDetailes = bool
        },
        setOnCloseDetailes(bool) {
            this.onCloseDetails = bool
        }
  },
  mounted() {
    setTimeout(function() {
        this.onBlinded = false
    }.bind(this), 1000)

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