(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[26],{f61b:function(t,e,i){"use strict";i.r(e);i("b0c0"),i("a4d3"),i("e01a");var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"text-color row justify-center"},[e("div",{staticClass:"col-xs-11"},[e("q-card",{staticClass:"my-hover-shadow",staticStyle:{cursor:"pointer"},style:t.getCardMinHeight,on:{click:t.viewDetails}},[e("div",{staticClass:"row q-pa-sm q-px-md"},[e("div",{staticClass:"col-xs-8 text-subtitle1 text-weight-bolder"},[t._v("\n          "+t._s(t.item.name)+"\n        ")]),e("div",{staticClass:"col-xs-4 self-start text-right text-weight-bolder text-subtitle1"},[t._v("\n          R "+t._s(t.item.price)+"\n        ")])]),e("div",{staticClass:"row q-px-md"},[e("div",{staticClass:"col-xs-7",class:t.item.menuItemImage?"col-xs-7":"col-xs-10"},[e("div",{staticClass:"row text-caption"},[t._v("\n            "+t._s(t.item.description)+"\n          ")])]),t.item.menuItemImage?e("div",{staticClass:"col-xs-5 self-end text-right self-center q-mb-lg"},[e("q-avatar",{attrs:{size:"110px",color:"black"}},[e("img",{attrs:{contain:"",src:t.item.menuItemImage}})])],1):t._e()]),e("br")])],1)])},a=[],n=(i("caad"),i("2532"),{components:{},mixins:[],props:{item:{type:Object,default:function(){},required:!1}},data:function(){return{}},computed:{getCardMinHeight:function(){return this.$route.path.includes("/menu-option-chef-specials")?"min-height: 200px; max-height: 200px":"min-height: 150px; max-height: 150px"}},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{viewDetails:function(){this.$emit("viewDetails",this.item)}}}),c=n,o=i("2877"),r=i("f09f"),l=i("cb32"),u=i("eebe"),d=i.n(u),m=Object(o["a"])(c,s,a,!1,null,null,null);e["default"]=m.exports;d()(m,"components",{QCard:r["a"],QAvatar:l["a"]})}}]);