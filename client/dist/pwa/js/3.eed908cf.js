(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"6f8a":function(e,t,n){"use strict";n.r(t);n("b0c0");var o=function(){var e=this,t=e._self._c;return t("q-card",[t("div",{staticClass:"text-color"},[t("div",{staticClass:"text-weight-bolder q-pb-xs q-pt-md text-center text-subtitle1"},[e._v("\n      Are You sure?\n    ")]),t("div",{staticClass:"row text-weight-bold q-pb-lg q-pt-md text-center text-caption q-pa-md"},[t("span",[e._v("\n        Deleting is a destructive operation, and should be avoided if possible\n        - once an item has been deleted it cannot be recovered. are you sure u\n        want to delete:\n        "),t("br"),t("span",{staticClass:"font-weight-bolder text-logoRed"},[e._v(e._s(e.selectedItem?e.selectedItem.name:""))]),e.selectedItem&&e.selectedItem.addonCategory?t("span",[t("br"),e._v("\n          it is currently assigned to the following side category:\n          "),t("span",{staticClass:"font-weight-bolder text-logoRed"},[e._v(e._s(e.selectedItem.addonCategory.name?e.selectedItem.addonCategory.name:"Not assigned to a side category")+"\n          ")])]):e._e()])]),t("div",{staticClass:"row justify-center q-pb-md"},[t("q-btn",{staticClass:"q-mr-lg text-capitalize",attrs:{label:"No",color:"positive"},on:{click:e.closeDialog}}),t("q-btn",{staticClass:"text-capitalize",attrs:{label:"Yes",color:"logoRed",loading:e.deleteBtnLoading},on:{click:e.confirmDelete}})],1)])])},s=[],a=n("c973"),i=n.n(a),c=(n("96cf"),{components:{},mixins:[],props:{selectedItem:{type:Object,default:function(){},required:!0},deleteFunction:{type:String,default:"",required:!0}},data:function(){return{deleteBtnLoading:!1}},computed:{},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{confirmDelete:function(){var e=this;return i()(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.deleteBtnLoading=!0,t.next=3,e.$store.dispatch(e.deleteFunction,e.selectedItem._id);case 3:n=t.sent,n&&200===n.status&&e.$q.notify({type:"positive",message:"Item deleted successfully.",color:"positive"}),e.deleteBtnLoading=!1,e.$emit("closeDeleteDialog");case 7:case"end":return t.stop()}}),t)})))()},closeDialog:function(){this.$emit("closeDeleteDialog")}}}),l=c,r=n("2877"),d=n("f09f"),u=n("9c40"),p=n("eebe"),f=n.n(p),m=Object(r["a"])(l,o,s,!1,null,null,null);t["default"]=m.exports;f()(m,"components",{QCard:d["a"],QBtn:u["a"]})}}]);