(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[21],{"2fb6":function(t,e,n){},4987:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text-color"},[n("div",{staticClass:"text-weight-bolder q-pb-xs  q-pt-md text-center text-subtitle1"},[t._v("\n    Our Current Promotion\n  ")]),n("div",{staticClass:"row justify-center"},[t.loading?n("div",[n("q-spinner-cube",{attrs:{color:"logoRed",size:"5.5em"}})],1):n("div",{staticClass:"col-xs-12 col-sm-10"},[n("div",{staticClass:"constrain-more-large q-pa-md"},[n("div",{staticClass:"camera-frame-large q-pa-md"},[n("q-img",{attrs:{src:t.imageUrl}})],1)])])]),n("div",{staticClass:"text-weight-bolder q-pb-xs  q-pt-md text-center text-body2"},[t._v("\n    While stocks last.\n  ")]),n("div",{staticClass:"text-weight-bolder q-pb-xs  q-pt-md text-center text-body2"},[t._v("\n    Terms and conditions apply.\n  ")]),n("div",{staticClass:"text-weight-bolder q-pb-xs  q-pt-md text-center text-body2"},[t._v("\n    Please contact us if you have any further queries.\n  ")])])},i=[],r=(n("96cf"),n("c973")),s=n.n(r),o={components:{},mixins:[],props:{},data:function(){return{loading:!0,imageUrl:null}},computed:{},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.loadSpecialCampaginImage()},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{loadSpecialCampaginImage:function(){var t=this;return s()(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.$route.params.special,e.next=3,t.$store.dispatch("retrieveSpecialImageUrl",n);case 3:t.imageUrl=e.sent,t.loading=!1;case 5:case"end":return e.stop()}}),e)})))()}}},c=o,l=(n("c9fe"),n("2877")),u=n("068f"),d=n("a6a3"),p=n("eebe"),m=n.n(p),f=Object(l["a"])(c,a,i,!1,null,null,null);e["default"]=f.exports;m()(f,"components",{QImg:u["a"],QSpinnerCube:d["a"]})},c9fe:function(t,e,n){"use strict";n("2fb6")}}]);