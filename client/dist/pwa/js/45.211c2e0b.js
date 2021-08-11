(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[45],{de38:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"text-color"},[s("div",{staticClass:"text-weight-bolder q-pb-xs q-pt-md text-center text-subtitle1"},[t._v("\n    Order History "+t._s(t.hasCorrectPermissions?"":"(Last 5)")+"\n  ")]),s("div",{staticClass:"row justify-center"},[s("div",{staticClass:"col-xs-6 col-sm-4 col-md-3 col-lg-2 q-pa-md"},[s("q-input",{attrs:{dark:"",outlined:"",dense:"",color:"positive",mask:"date",rules:["date"]},scopedSlots:t._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[s("q-popup-proxy",{ref:"qDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[s("q-date",{attrs:{options:t.optionsDateFromFn,color:"positive","text-color":"white"},model:{value:t.dateFrom,callback:function(e){t.dateFrom=e},expression:"dateFrom"}},[s("div",{staticClass:"row justify-center"},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"negative"}})],1)])],1)],1)]},proxy:!0}]),model:{value:t.dateFrom,callback:function(e){t.dateFrom=e},expression:"dateFrom"}})],1),s("div",{staticClass:"col-xs-6 col-sm-4 col-md-3 col-lg-2 q-pa-md"},[s("q-input",{attrs:{outlined:"",dense:"",dark:"",mask:"date",rules:["date"],color:"positive"},scopedSlots:t._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[s("q-popup-proxy",{ref:"qDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[s("q-date",{attrs:{options:t.optionsDateToFn,color:"positive","text-color":"white"},model:{value:t.dateTo,callback:function(e){t.dateTo=e},expression:"dateTo"}},[s("div",{staticClass:"row justify-center"},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"negative"}})],1)])],1)],1)]},proxy:!0}]),model:{value:t.dateTo,callback:function(e){t.dateTo=e},expression:"dateTo"}})],1),s("div",{staticClass:"col-xs-3 col-sm-2 col-md-2 col-lg-1 q-pa-md"},[s("q-btn",{staticClass:"q-mr-lg text-capitalize",attrs:{label:"Reset",color:"warning"},on:{click:t.resetCalender}})],1)]),s("div",{staticClass:"q-pa-md row justify-center"},[t._l(t.getMyOrderHistory,(function(t,e){return s("div",{key:e,staticClass:"col-xs-12 col-sm-12 col-md-6 col-xl-4 q-pa-md"},[s("q-card",{staticClass:"q-pa-xs"},[s("view-order",{attrs:{orderSpecifications:t}})],1)],1)})),0===t.getMyOrderHistory.length?s("div",{staticClass:"text-weight-bold q-pb-xs  q-pt-md text-center text-subtitle1"},[s("q-icon",{staticClass:"text-logoRed",staticStyle:{"font-size":"2rem"},attrs:{name:"fas fa-exclamation-triangle"}}),s("span",{staticClass:"q-pl-md"},[t._v("There is currently no order history available")])],1):t._e()],2),t.hasCorrectPermissions&&t.getMyOrderHistory.length>0?s("div",{staticClass:"q-pa-md row justify-center"},[s("q-pagination",{attrs:{color:"logoRed",max:t.getMyOrderHistoryPage,"direction-links":!0,"boundary-links":!0,"icon-first":"skip_previous","icon-last":"skip_next","icon-prev":"fast_rewind","icon-next":"fast_forward"},model:{value:t.current,callback:function(e){t.current=e},expression:"current"}})],1):t._e()])},o=[],r=(s("caad"),s("d3b7"),s("e6cf"),s("2532"),s("24b9")),i=s("49ef"),n=s("e3ee"),c={components:{"view-order":function(){return Promise.all([s.e(0),s.e(1)]).then(s.bind(null,"e8bd"))}},mixins:[],props:{},data:function(){return{resettingCalender:!1,current:1,page:1,dateFrom:Object(r["a"])(new Date),dateTo:Object(r["b"])(new Date)}},computed:{hasCorrectPermissions:function(){return this.$store.getters.getUserPermissions.includes("read:systemData")},getMyOrderHistory:function(){return this.$store.getters.getOrderHistory.data?this.$store.getters.getOrderHistory.data:[]},getMyOrderHistoryPage:function(){return this.$store.getters.getOrderHistory.totalPages?this.$store.getters.getOrderHistory.totalPages:1}},watch:{dateFrom:function(){Object(i["a"])(Object(n["a"])(this.dateFrom))&&10===this.dateFrom.length&&!this.resettingCalender&&this.fetchPage()},dateTo:function(){Object(i["a"])(Object(n["a"])(this.dateTo))&&10===this.dateFrom.length&&!this.resettingCalender&&this.fetchPage()},current:function(t,e){t>e?this.nextPage():this.previousPage()}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{resetCalender:function(){this.resettingCalender=!0,this.dateFrom=Object(r["a"])(new Date),this.dateTo=Object(r["b"])(new Date),this.resettingCalender=!1,this.fetchPage()},optionsDateToFn:function(t){return new Date(t)<=new Date&&new Date(t)>=new Date(this.dateFrom)},optionsDateFromFn:function(t){return new Date(t)<=new Date},nextPage:function(){this.page+=1,this.fetchPage()},previousPage:function(){this.page>1&&(this.page-=1,this.fetchPage())},fetchPage:function(){this.$store.dispatch("retrieveOrderHistory",{forceRefresh:!0,page:this.page,dateRange:{dateFrom:this.dateFrom,dateTo:this.dateTo}})}}},l=c,d=s("2877"),u=s("27f9"),p=s("0016"),f=s("7cbe"),m=s("52ee"),g=s("9c40"),h=s("f09f"),b=s("3b16"),v=s("7f67"),x=s("eebe"),y=s.n(x),w=Object(d["a"])(l,a,o,!1,null,null,null);e["default"]=w.exports;y()(w,"components",{QInput:u["a"],QIcon:p["a"],QPopupProxy:f["a"],QDate:m["a"],QBtn:g["a"],QCard:h["a"],QPagination:b["a"]}),y()(w,"directives",{ClosePopup:v["a"]})}}]);