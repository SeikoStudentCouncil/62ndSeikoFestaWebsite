<template>
  <div class="container">
    <div id="mainContainer" class="full-screen">
      <SideBar id="sideBar" class="side-bar" :isShowDetailes="isShowDetailes" @onClickMenu="onMenuAnime"/>
      <div id="luxy" class="scroll-container">
        <div :class="{ 'menu-anime': true, 'anime':isShowDetailes, 'close':onCloseDetails, 'blind':onBlinded  }">
          <div class="menu-anime-1"></div>
          <div class="menu-anime-2"></div>
          <div class="menu-anime-3"></div>
          <!--div class="menu-anime-4"></!--div-->
          <div class="menu-innner">
            <div class="menu-concept">MENU!</div>
            <div class="menu-container">
              <div class="menu-content-row selected" @click="onMenuAnime"><div class="menu-content-block"></div> <a>Home </a> <span class="menu-content-jp">ホーム</span></div>
              <div class="menu-content-row"><div class="menu-content-block"></div><a>Map</a><span class="menu-content-jp">マップ</span></div>
              <div class="menu-content-row"><div class="menu-content-block"></div><a>Timetable</a><span class="menu-content-jp">タイムテーブル</span></div>
              <div class="menu-content-row"><div class="menu-content-block"></div><a>Congestions</a><span class="menu-content-jp">室内混雑度</span></div>
              <div class="menu-content-row" @click="transmit('departments')"><div class="menu-content-block"></div><a>Departments</a><span class="menu-content-jp">部門紹介</span></div>
              <div class="menu-content-row"><div class="menu-content-block"></div><a>Club Exhibition</a><span class="menu-content-jp">展示団体</span></div>
              <div class="menu-content-row"><div class="menu-content-block"></div><a>Food Stands</a><span class="menu-content-jp">食品店舗</span></div>
              <div class="menu-content-row"><div class="menu-content-block"></div><a>Articles</a><span class="menu-content-jp">特集</span></div>
            </div>
            <div class="menu-over-color"></div>
          </div>
        </div>
        <!--div id="scrollContainerBackground" class="scroll-container-background">
          <img class="block-notice-back" src="../assets/image/notice-background.svg" :style="{ 'margin-top' : backgroundMargin+'px' }"/>
          <img class="block-concept-back" src="../assets/image/concept-background.svg" />
          <img class="block-cloud" src="../assets/image/cloud1.svg" />
        </！div-->
        <MainLottie ref="blockmain" class="block-main scroll-block" :options='defaultOptions' v-on:animCreated="handleAnimation" ></MainLottie>
        <div class="block-notice scroll-block">
          <div class="block-notice-title">お知らせ</div>
          <div class="block-notice-list-container">
            <div v-for="(content, index) in notices.slice(0, 3)" :key="index" class="block-notice-list-content">
              <img class="notice-list-content-image" />
              <div class="notice-list-content-title">【{{content.type}}】<br>{{content.title}}</div>
              <div class="notice-list-content-date">{{content.date}}</div>
              <div class="notice-list-content-body">{{content.body}}</div>
            </div>
            <img class="notice-list-detail" src="../assets/image/notice-list-detail.svg" />
          </div>
        </div>

        <div class="block-concept-foreground scroll-block" >
          <div class="concept-text-blank"/>
          <div class="concept-text-container">
            <div class="concept-wrap">
              <div class="concept">XXXX!</div>
            </div>
            <div class="concept-poem">
              <div class="concept-poem-title">もう一度、空へ。</div>
              <div class="concept-poem-text">約一年半前、
                <br>世界は大きく変わりました。
                <br>未知のウイルスは日常を蝕み、
                <br>今でも闘いは続いています。
                <br>一般客を迎えられなかった
                <br>昨年の聖光祭から一年、
                <br>高い峰を超えた鳥は
                <br>新しい扉を開け、
                <br>淡い光を放ちながら
                <br>再び、大空へと飛び立ちます。<br><br>
              </div>
            </div>
          </div>
        </div>
        <div class="block-concept-video-container scroll-block">
          <iframe class="block-concept-video" src="https://www.youtube.com/embed/j4zZ4hp7Ef8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="block-committee-poem scroll-block">
          <img class="committee-poem-cloud" src="../assets/image/cloud1.svg">
          <div class="committee-poem-container">
            <img class="committee-poem-image" src="../assets/image/test.png"/>
            <div class="committee-poem-text"><font class="title">実行委員長より<br></font><br>年々成長し、進化を続ける聖光祭は今年で60年目。スローガン “NEXIT” は記念となる今年の文化祭を一つの節目として、次の世代へ継承していこうという願いを込め、next と exit を組み合わせて創りました。「ドラゴン桜2」とのコラボや聖光祭アプリを用いた企画「トレジャーハント」などは皆様を満足させること間違いなし！ぜひ最高の祭りをご堪能ください。<br><font class="name">実行委員長　大下 晟生</font></div>
          </div>
        </div>
        <div class="block-outline scroll-block">
          <div class="outline-title">開催概要</div>
          <img class="outline-image" src="../assets/image/outline.png"/>
        </div>
        <Footer class="block-footer scroll-block" />
      </div>
    </div>
  </div>
</template>

<script>
import * as animationData from "~/assets/animation/test.json";
import {mapState} from 'vuex';
import jQuery from 'jquery'
global.jquery = jQuery
global.$ = jQuery
window.$ = window.jQuery = require('jquery')


export default {
  head: {
    title: 'トップ'
  },
  mounted() {
    setTimeout(function() {
        this.onBlinded = false
    }.bind(this), 1000)
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
  computed: {
    ...mapState(['notices'])
  },
  asyncData() {
    return {
      lottieOptions: {
        animationData: require(`~/assets/animation/test.json`),
      }
    }
  },
  data() {
    return {
      onBlinded: true,
      isShowDetailes: false,
      onCloseDetails: false,
      defaultOptions: {
        animationData: animationData
      },
      animationSpeed: 2,
      show: true,
      backgroundScroll: 0,
      backgroundMargin: Number
    };
  }
}
</script>

<style>
.block-main {
  margin: 0px;
}

.block-notice {
  height: 100vh;
  width: 100%;
  border-top: solid transparent 5vh;
  background: url('../assets/image/notice-background.svg');
  background-repeat: no-repeat;
  background-size: cover;
}

.block-notice-back {
  height: 100%;
  width: auto;
}

.block-notice-title {
  height: auto;
  width: auto;
  margin-top: 7%;
  margin-left: 5%;
  text-align: left;
  font-weight: 800;
  font-style: normal;
  font-size: 4.3em;
}

.block-notice-list-container {
  height: 41vh;
  width: 80%;
  margin-left: 10%;
  margin-top: 10%;
  font-size: 1.6vh;
}

.block-notice-list-content {
  display: inline-block;
  float: left;
  height: 100%;
  width: 23%;
  background: white;
  border-radius: 20px;
  margin-right: 7%;
  box-shadow: var(--color-shadow) 3px 3px 10px;
  text-align: left;
}

.notice-list-content-image {
  height: 40%;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: solid transparent 0px;
}

.notice-list-content-title {
  display: inline-block;
  height: auto;
  width: auto;
  margin-left: 7%;
  font-weight: 800;
  font-style: normal;
  font-size: 1.1em;
  margin-top: 5%;
}

.notice-list-content-date {
  display: inline-block;
  width: auto;
  font-weight: 300;
  font-size: 0.8em;
  text-align: right;
  float: right;
  margin-right: 7%;
  margin-top: calc(2.5em + 5%);
}

.notice-list-content-body {
  height: 30%;
  width: 90%;
  margin-left: 7%;
  font-size: 1em;
  font-weight: 300;
  margin-top: 5%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
}

.notice-list-detail {
  height: auto;
  width: 8vh;
  margin-top: 20vh;
  transform: translateY(-50%);
}

.block-concept {
  height: 100vh;
  width: 100%;
  transform: translateY(-30%);
}

.block-concept-back {
  height: auto;
  width: 100%;
  transform:  translateX(-1vw);
}

.block-concept-foreground {
  height: 160vh;
  width: 100%;
  background: url('../assets/image/concept_background.png');
    background-repeat: no-repeat;
  background-size: contain;
  scroll-snap-align: center;
}

.concept-text-blank {
  width: 100%;
  height: 30%;
}

.concept-text-container {
  height: auto;
  width: 40%;
  margin-left: 15%;
  text-align: left;
}

.concept-poem {
  display: inline-block;
  margin-left: 7vw;
  margin-bottom: 10vh;
}

.concept-poem-title {
  display: inline-block;
  height: auto;
  width: auto;
  font-size: 2em;
  font-weight: 300;
  margin-top: 0px ;
}

.concept-poem-text {
  margin-top: 10%;
  font-weight: 300;
  letter-spacing: 0.1em;
  line-height: 220%;
  opacity: 0.8;
}

.concept-wrap {
  width: 10vw;
  height: auto;
  display: inline-block;
  letter-spacing: 1em;
}
.concept {
  font-family: transat, sans-serif;
  font-weight: 500;
  font-size: 9.5vw;
  margin-right: 0px;
  -webkit-writing-mode: vertical-rl;
      -ms-writing-mode: tb-rl;
          writing-mode: vertical-rl;
}

.committee-poem-cloud {
  height: auto;
  width: 100%;
  margin-top: 5vh;
}

.block-concept-video-container {
  height: auto;
  width: 100%;
  scroll-snap-align: center;
}

.block-concept-video {
  width: 60%;
  height: 60vh;
}


.block-committee-poem {
  margin-top: 15vh;
  width: 100%;
  height: 100vh;
  vertical-align: top;
}

.committee-poem-container {
  height: 45%;
  width: 70%;
  margin-left: 15%;
  text-align: left;
  margin-top: 5%;
}

.committee-poem-image {
  display: inline-block;
  height: auto;
  width: 40%;

  margin-top: 1vh;
}

.committee-poem-text {
  display: inline-block;
  width: 50%;
  height: auto;
  font-weight: 300;
  letter-spacing: 0.1em;
  line-height: 220%;
  opacity: 0.8;
  text-align: left;
  margin-left: 8%;
}

.committee-poem-text .title{
  margin-bottom: 3em;
  font-size: 2.2em;
  font-weight: 600;
}

.committee-poem-text .name {
  float: right;
}
.block-outline {
  height: 100vh;
  width: 100%;
  text-align: left;
}
.outline-title {
  height: auto;
  width: auto;
  margin-left: 7%;
  font-weight: 800;
  font-style: normal;
  font-size: 4.3em;
  text-align: left;
}
.outline-image {
  height: auto;
  width: 70%;
  margin-left: 15%;
  margin-top: 5%;
}
.block-footer {
  scroll-snap-align: end;
}
</style>
