(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{f3e1:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"text-color"},[s("div",{staticClass:"text-weight-bolder q-pb-xs text-center",class:t.drawer?"text-subtitle2":"text-subtitle1"},[t._v("\n    Trading Hours\n  ")]),t._l(t.getTradingHours,(function(e,n){return s("div",{key:n,staticClass:"text-center text-caption text-weight-bold"},[s("div",{staticClass:"row q-pt-xs justify-center"},[s("div",{staticClass:"col-xs-10 col-md-8 col-lg-6"},[s("div",{staticClass:"row justify-center"},[s("div",{staticClass:"col-xs-7 col-sm-4 col-md-3 col-lg-3 col-xl-3 text-left"},[e.closed?t._e():s("span",[t._v("\n              "+t._s(e.day)+"\n            ")])]),e.time?s("div",{staticClass:"col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-3 text-right"},[e.closed?t._e():s("span",{staticClass:"no-wrap"},[t._v("\n              "+t._s(e.time.start.hours)+":"+t._s(e.time.start.min)+" -\n              "+t._s(e.time.end.hours)+":"+t._s(e.time.end.min)+"\n            ")])]):t._e()])])])])}))],2)},o=[],i={components:{},mixins:[],props:{drawer:{type:Boolean,default:!1,required:!1}},data:function(){return{}},computed:{getTradingHours:function(){return this.$store.getters.getTradingHours}},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{}},c=i,r=s("2877"),a=Object(r["a"])(c,n,o,!1,null,null,null);e["default"]=a.exports}}]);