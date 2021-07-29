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
                        <div class="menu-content-row"  @click="transmit('/departments')"><div class="menu-content-block"></div><a>Departments</a><span class="menu-content-jp">部門紹介</span></div>
                        <div class="menu-content-row"><div class="menu-content-block"></div><a>Club Exhibition</a><span class="menu-content-jp">展示団体</span></div>
                        <div class="menu-content-row"><div class="menu-content-block"></div><a>Food Stands</a><span class="menu-content-jp">食品店舗</span></div>
                        <div class="menu-content-row selected" @click="onMenuAnime"><div class="menu-content-block"></div><a>Articles</a><span class="menu-content-jp">特集</span></div>
                    </div>
                    <div class="menu-over-color"></div>
                    </div>
                </div>
                <div class="article-item" @click="transmit(`/articles/${content.id}`)" v-for="(content, index) in articleList" :key="index">
                    <div class="article-item-type">{{content.type}}</div>
                    <img class="article-item-thumbnail" :src="content.thumbnail"/>
                    <div class="article-item-title">{{content.title}}</div>
                    <div class="article-item-date">{{content.date}}</div>
                    <hr>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/storage";
import 'vue-router';
import jQuery from 'jquery'
global.jquery = jQuery
global.$ = jQuery
window.$ = window.jQuery = require('jquery')

var config = {
          apiKey: "AIzaSyAoYxCjDpPYPA3eMwcHoQDCYoAiS1CF2V4",
          authDomain: "seikofes62ndwebsite.firebaseapp.com",
          projectId: "seikofes62ndwebsite",
          storageBucket: "seikofes62ndwebsite.appspot.com",
          messagingSenderId: "2816752655",
          appId: "1:2816752655:web:282fcac0e22718a0c7777a",
          measurementId: "G-KETHWYCYN5"
        }
var app = firebase.initializeApp(config);
var db = firebase.firestore(app);
var storage = firebase.storage();

export default {
    data() {
        return {
            onBlinded: true,
            isShowDetailes: false,
            onCloseDetails: false,
            articleList: []
        }
    },
    methods: {
        transmit(pageNmae) {
            this.setOnCloseDetailes(true)
            setTimeout(function() {
                // this.$router.push({ name: 'articles', params: { id: 'n-001' } })
                window.location.href = pageNmae
            }.bind(this), 1000)
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
        },
        getImageFromStorage(articleId, num, callback) {

            storage.ref().child('Articles').child(articleId).child(`${articleId}-${num}.png`)
                .getDownloadURL().then(callback)
                .catch(function(error) {
                    // TODO
                });
        },
        getAllDocument() {
            db.collection("Articles").get().then((querySnapshot) => {
                console.log("get")
                querySnapshot.forEach((doc) => {
                    console.log("get")
                    var title = doc.data().title
                    var date = doc.data().date
                    var type = doc.id.slice(0, 1) == "a"? "ARTICLE":"NOTE"
                    var aeticleId = doc.id
                    this.getImageFromStorage(doc.id, "00", function(url){
                        this.articleList.push({ 'id': aeticleId, 'title': title, 'date': date, 'type': type, 'thumbnail': url })
                    }.bind(this))
                });
            });
        },
        zeroPadding(NUM, LEN){
            return ( Array(LEN).join('0') + NUM ).slice( -LEN );
        },
    },
    mounted() {
        setTimeout(function() {
            this.onBlinded = false
        }.bind(this), 1000)
        this.getAllDocument()
    },
    beforeRouteUpdate (to, from, next) {
        console.log("test")
        setTimeout(function() {
            this.onBlinded = false
        }.bind(this), 1000)
        this.getAllDocument()
        next()
    },
}
</script>

<style>
.article-item {
    height: auto;
    width: 54%;
    margin-left: 23%;
    text-align: left;
    margin-top: 10vh;
}

.article-item-type {
    padding-left: 1em;
    padding-right: 1em;
    padding-bottom: 0.1em;
    padding-top: 0.1em;
    font-family: all-round-gothic,sans-serif;
    font-weight: 500;
    font-style: normal;
    height: auto;
    width: auto;
    background: #02C1C9;
    font-size: 1.1em;
    font-weight: 600;
    display: inline-block;
    letter-spacing: 0.1em;
    color: #FDFDFD;
}

.article-item-title {
    height: auto;
    width: 100%;
    background: #FDFDFD;
    font-size: 2.1em;
    font-weight: 500;
    transform: translateX(-0.5em);
    margin-top: 2vh;
}

.article-item-date {
    background: #FDFDFD;
    font-size: 1em;
    font-weight: 300;
    color: var(--color-shadow);
    margin-top: 1vh;
    margin-bottom: 3vh;
}

.article-item-thumbnail {
    height: auto;
    width: 100%;
    margin-top: 1vh;
}
</style>