(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[46],{f669:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"text-color"},[e.mixin_tabMenuDisplay?e._e():i("div",{staticClass:"text-subtitle1 text-weight-bolder q-pt-md q-pb-md text-center"},[e._v("\n    Starters\n  ")]),i("div",{staticClass:"row q-pt-md justify-center"},[i("div",{staticClass:"col-xs-12 col-sm-12 col-md-10"},[i("div",{staticClass:"row justify-center"},e._l(e.getStartersList,(function(t){return i("div",{key:t._id,staticClass:"col-xs-12 col-sm-12 col-md-4 q-pt-md"},[t._id?i("menu-item",{attrs:{item:t},on:{viewDetails:e.viewDetails}}):e._e()],1)})),0)])]),i("q-page-scroller",{attrs:{position:"bottom-right","scroll-offset":150,offset:[18,18]}},[i("q-btn",{attrs:{round:"",icon:"keyboard_arrow_up",color:"logoRed",size:e.$q.screen.gt.md?"lg":"md",dense:""}})],1),e.viewMenuItemsDetails?i("q-dialog",{attrs:{"full-width":!!e.$q.platform.is.mobile,"full-height":!!e.$q.platform.is.mobile,"transition-show":"slide-up","transition-hide":"slide-down"},model:{value:e.viewMenuItemsDetails,callback:function(t){e.viewMenuItemsDetails=t},expression:"viewMenuItemsDetails"}},[i("menu-item-details",{attrs:{menuItemSelected:e.menuItemDetails},on:{closeMenuItemsDetails:e.closeMenuItemsDetails}})],1):e._e()],1)},n=[],o=(i("b0c0"),i("d3b7"),i("e6cf"),i("c707")),l=i.n(o),a=i("c0fd"),r={name:"starters",components:{"menu-item":function(){return Promise.all([i.e(0),i.e(4)]).then(i.bind(null,"f61b"))},"menu-item-details":function(){return Promise.all([i.e(0),i.e(3)]).then(i.bind(null,"a27f"))}},beforeRouteLeave:function(e,t,i){this.viewMenuItemsDetails?(this.viewMenuItemsDetails=!1,i(!1)):i()},mixins:[a["a"]],props:{},data:function(){return{viewMenuItemsDetails:!1,menuItemDetails:null}},computed:{getStartersList:function(){return l()(this.$store.getters.getStarters,(function(e){return e.name.toLowerCase()}))}},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{viewDetails:function(e){this.viewMenuItemsDetails=!0,this.menuItemDetails=e},closeMenuItemsDetails:function(){this.viewMenuItemsDetails=!1}}},u=r,c=i("2877"),m=i("5096"),d=i("9c40"),f=i("24e8"),w=i("eebe"),p=i.n(w),b=Object(c["a"])(u,s,n,!1,null,null,null);t["default"]=b.exports;p()(b,"components",{QPageScroller:m["a"],QBtn:d["a"],QDialog:f["a"]})}}]);