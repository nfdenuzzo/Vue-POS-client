(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[27],{f61b:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"text-color row justify-center"},[i("div",{staticClass:"col-xs-11"},[i("q-card",{staticStyle:{cursor:"pointer"},style:t.getCardMinHeight,on:{click:t.viewDetails}},[i("div",{staticClass:"row q-pa-sm q-px-md"},[i("div",{staticClass:"col-xs-8 text-subtitle1 text-weight-bolder"},[t._v("\n          "+t._s(t.item.name)+"\n        ")]),i("div",{staticClass:"col-xs-4 self-start text-right text-weight-bolder text-subtitle1"},[t._v("\n          R "+t._s(t.item.price)+"\n        ")])]),i("div",{staticClass:"row q-px-md"},[i("div",{staticClass:"col-xs-7",class:t.item.menuItemImage?"col-xs-7":"col-xs-10"},[i("div",{staticClass:"row text-caption"},[t._v("\n            "+t._s(t.item.description)+"\n          ")])]),t.item.menuItemImage?i("div",{staticClass:"col-xs-5 self-end text-right self-center q-mb-lg"},[i("q-avatar",{attrs:{size:"110px",color:"black"}},[i("img",{attrs:{contain:"",src:t.item.menuItemImage}})])],1):t._e()]),i("br")])],1)])},n=[],a=(i("caad"),i("2532"),{components:{},mixins:[],props:{item:{type:Object,default:function(){},required:!1}},data:function(){return{}},computed:{getCardMinHeight:function(){return this.$route.path.includes("/menu-option-chef-specials/")?this.$q.screen.md?"min-height: 220px; max-height: 220px":this.$q.screen.sm?"min-height: 235px; max-height: 235px":(this.$q.screen.xs,"min-height: 180px; max-height: 180px"):this.item.menuItemImage?"min-height: 180px; max-height: 180px":"min-height: 150px; max-height: 150px"}},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{viewDetails:function(){this.$store.getters.getOrderingActive&&this.$emit("viewDetails",this.item)}}}),c=a,o=i("2877"),r=i("f09f"),m=i("cb32"),l=i("eebe"),h=i.n(l),u=Object(o["a"])(c,s,n,!1,null,null,null);e["default"]=u.exports;h()(u,"components",{QCard:r["a"],QAvatar:m["a"]})}}]);