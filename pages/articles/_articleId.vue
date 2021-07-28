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
                <div class="article-title">
                    <div class="article-title-space"></div>
                    <div class="article-type-text">{{articleId.slice(0,1)=="a"? "ARTICLE":"NOTE"}}</div>
                    <div class="article-title-text">{{ articleDocument.title }}</div><br>
                    <div class="article-date-text">{{ articleDocument.date }}</div>
                </div>
                <div v-for="block of articleDocument.body" :key="block.index" :class="{ 'article-block': true, 'article-text': (block.type == 'text'), 'article-image': (block.type == 'image'), 'article-block-title': (block.type == 'title') }" v-html="block.text" :data-index="block.index">
                </div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/storage";
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
            articleId: '',
            articleDocument: {title: ''},
            imageUrl: {}
        }
    },
    head() {
        return {
            title: this.articleDocument.title
        }
    },
    methods: {
        transmit(pageNmae) {
            this.setOnCloseDetailes(true)
            setTimeout(function() {
                this.$router.push(pageNmae)
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
        async getImageFromStorage(num, callback) {

            storage.ref().child('Articles').child(this.articleId).child(`${this.articleId}-${num}.png`)
                .getDownloadURL().then(callback)
                .catch(function(error) {
                    // TODO
                });
        },
        async getArticleFromFirestore() {
            var ref = db.collection('Articles').doc('n-001')
            ref.get().then(function(doc){
                if (doc.exists) {
                    var article = doc.data()
                    article.body.sort(function(a,b) {
                        if (a.index > b.index ) return 1;
                        if (b.index > a.index ) return -1;
                        return 0;
                    })
                    this.articleDocument = article
                    console.log(this.articleDocument)
                    this.loadImages()
                } else {
                    console.log("No such document!");
                }
            }.bind(this)).catch((error)=> {
                console.log("Error getting document:", error);
            });
        },
        zeroPadding(NUM, LEN){
            return ( Array(LEN).join('0') + NUM ).slice( -LEN );
        },
        setImageBlock(index, num) {
            this.getImageFromStorage(num, function(url){
                $(`.article-block["data-index" = "${index}"]`).child('img').src(`${url}`)
            })
        },
        loadImages() {
            for (var content of this.articleDocument.body) {
                if (content.type == "image") {
                    console.log(content)
                    const blockIndex = content.index
                    this.getImageFromStorage(content.num, function(url){
                        console.log(blockIndex)
                        $(`.article-block[data-index = '${blockIndex}']`).append(`<img src="${url}"/>`)
                    })
                }
            }
            console.log(this.imageUrl)
        }
  },
  mounted() {
    this.articleId = this.$route.params["articleId"]
    setTimeout(function() {
        this.onBlinded = false
    }.bind(this), 1000)
    this.getArticleFromFirestore()
    this.getImageFromStorage('00', function(url){
        console.log("test")
        console.log(url)
        $('.article-title').css({'background-image': `url(${url})`})
    })
  }
}
</script>

<style>
.article-title {
    height: 50vh;
    width: 100%;
    top: 0px;
    text-align: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.article-title-space {
    height: 18vh;
    width: 100%;
}

.article-title-text {
    padding-left: 1em;
    padding-right: 1em;
    padding-bottom: 0.1em;
    padding-top: 0.1em;
    margin-top: 1vh;
    height: auto;
    width: auto;
    margin-left: 48vw;
    transform: translateX(-50%);
    background: #FDFDFD;
    font-size: 2.8em;
    font-weight: 700;
    display: inline-block;
}

.article-date-text {
    height: auto;
    width: auto;
    display: inline-block;
    padding-left: 1em;
    padding-right: 1em;
    padding-bottom: 0.1em;
    padding-top: 0.1em;
    margin-top: 3vh;
    margin-left: 48vw;
    transform: translateX(-50%);
    background: #FDFDFD;
    font-size: 1.2em;
    font-weight: 500;
    display: inline-block;
    color: var(--color-shadow)
}

.article-type-text {
    font-family: all-round-gothic,sans-serif;
    font-weight: 500;
    font-style: normal;
    height: auto;
    width: auto;
    display: inline-block;
    padding-left: 1em;
    padding-right: 1em;
    padding-bottom: 0.1em;
    padding-top: 0.1em;
    margin-top: 1vh;
    margin-left: 48vw;
    transform: translateX(-50%);
    background: #FDFDFD;
    font-size: 1.1em;
    font-weight: 600;
    display: inline-block;
    letter-spacing: 0.1em;
}

.article-block {
    height: auto;
    width: 54%;
    margin-left: 23%;
    text-align: left;
    font-weight: 300;
    line-height: 2em;
    margin-top: 3vh;
    letter-spacing: 0.1em;
}

.article-block img {
    height: 0;
    width: 0;
}

.article-block p {
    margin-bottom: 1vh;
}

.article-block-title {
    height: auto;
    font-weight: 500;
    font-size: 2em;
    line-height: 2em;
    margin-top: 5vh;
    border-bottom: solid var(--color-shadow) 2px;
    text-align: left;
}
.article-block.article-image img {
    height: auto;
    width: 100%;
    margin-left: 0%;
}
</style>