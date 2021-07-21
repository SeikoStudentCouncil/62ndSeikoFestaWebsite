import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      notices: [
        {id: "n-023", type: "お知らせ", title: "事前予約について", date: "2021/7/1", body: "今回の聖光祭では新型コロナウイルス感染対策の点から事前予約を行います。予約方法や注意点についてお知らせいたします。"},
        {id: "a-019", type: "特集", title: "交通研究部", date: "2021/7/1", body: "毎年、聖光祭にて「展示大賞」を獲得している交通研究部。今回はどのような活動をしているのかお伝えしたいと思います。"},
        {id: "a-018", type: "特集", title: "情報技術統括所", date: "2021/7/1", body: "このホームページを含め、聖光祭をIT技術で支える技術部門。実は今年初めて成立した団体なのです。どんな団体なのか見ていこうと思います。"}
      ],
      departments: [
        {num: "01",name: "展示部門", name_alphabet: "The Department of Display", img_name:"displays", body:"展示部門は展示団体を統括し、補佐する部門です。聖光祭のメインとも言える展示団体の準備がスムーズに、その完成度が高くなるように補佐し支えつづけるのが展示部門の仕事です。資材の配布や教室の確保、進捗の管理などを行います。"},
        {num: "02",name: "食品部門", name_alphabet: "The Department of Food", img_name:"displays", body:"食品部門は食品店舗を統括し、補佐する部門です。聖光祭の要とも言える食品店舗を統括し、よりよい味と最高のおもてなしを提供できるよう、何回も試作を繰り返し追求します。焼きそばや餃子などの王道店舗からポップコーンやドリンクなどのちょっとした食品までぜひどうぞ！"},
      ]
    }),
  })
}

export default createStore;