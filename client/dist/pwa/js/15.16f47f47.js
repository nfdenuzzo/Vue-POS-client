(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{"1bbd":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"text-color"},[i("div",{attrs:{clas:"q-pa-md"}},[i("div",{staticClass:"row justify-center q-pt-lg text-subtitle1 text-weight-bolder"},[e._v("\n      Current Side items\n    ")]),i("div",{staticClass:"q-pa-md row justify-center"},[i("div",{staticClass:"col-xs-12 col-sm-12 col-md-7 text-color"},[i("q-table",{attrs:{dense:"",separator:"cell",grid:e.$q.screen.lt.md,"wrap-cells":!0,loading:e.loading,data:e.currentSideItems,columns:e.columns,filter:e.filter,"row-key":"_id","no-data-label":"No current sides available","no-results-label":"The filter didn't uncover any results","visible-columns":e.visibleColumns,"rows-per-page-options":[10,20]},scopedSlots:e._u([{key:"loading",fn:function(){return[i("q-inner-loading",{attrs:{showing:"",color:"logoRed"}})]},proxy:!0},{key:"top",fn:function(){return[i("div",{staticClass:"col-xs-12"},[i("div",{staticClass:"row justify-between q-pa-sm"},[i("div",{staticClass:"col-xs-5 col-md-4 col-lg-2"},[i("q-input",{attrs:{outlined:"",dense:"",color:"positive",debounce:"300",placeholder:"Search"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}},[i("q-icon",{attrs:{slot:"append",name:"search"},slot:"append"})],1)],1),i("div",{staticClass:"col-xs-5 col-md-4 col-lg-2"},[i("q-select",{attrs:{color:"positive",multiple:"",outlined:"",dense:"","options-dense":"","display-value":e.$q.lang.table.columns,"emit-value":"","map-options":"",options:e.columnsOptions,"option-value":"value"},model:{value:e.visibleColumns,callback:function(t){e.visibleColumns=t},expression:"visibleColumns"}})],1)])])]},proxy:!0},{key:"no-data",fn:function(t){var a=t.message;return[i("div",{staticClass:"full-width row no-wrap q-gutter-sm"},[i("q-icon",{attrs:{size:"15px",name:"fas fa-exclamation-triangle",color:"logoRed"}}),i("span",[e._v(" "+e._s(a)+" ")])],1)]}},e.$q.screen.lt.md?{key:"item",fn:function(t){return[i("div",{staticClass:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition cursor-pointer"},[i("q-card",[i("q-card-section",{staticClass:"relative-position"},[i("q-card-section",{staticClass:"q-pa-none"},e._l(t.cols,(function(a){return i("div",{key:a.name,attrs:{props:t}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-6"},[i("q-item-label",{staticClass:"q-py-sm text-weight-bold text-color",attrs:{lines:"1",caption:""}},[e._v(e._s(a.label))])],1),i("div",{staticClass:"col-6 text-right"},["actions"!==a.name&&4!==a.id?i("div",{staticClass:"text-color"},[e._v("\n                            "+e._s(a.value)+"\n                          ")]):4===a.id?i("div",[i("q-badge",{staticClass:"text-capitalize",attrs:{outline:"",color:a.value?"logoRed":"positive",label:a.value.toString()}})],1):i("div",{staticClass:"text-color"},[i("span",{staticClass:"q-pr-sm"},[i("q-btn",{staticClass:"text-capitalize",attrs:{round:"",color:"positive",icon:"edit",size:"sm"},on:{click:function(i){return e.handler("edit",t.row)}}},[i("q-tooltip",{attrs:{anchor:"top middle"}},[e._v("\n                                  Edit Item\n                                ")])],1)],1),i("q-btn",{staticClass:"text-capitalize",attrs:{round:"",color:"logoRed",icon:"delete",size:"sm"},on:{click:function(i){return e.handler("delete",t.row)}}},[i("q-tooltip",{attrs:{anchor:"top middle"}},[e._v("\n                                Delete Item\n                              ")])],1)],1)])])])})),0)],1)],1)],1)]}}:null,e.$q.screen.lt.md?null:{key:"header",fn:function(t){return[i("q-tr",{attrs:{props:t}},e._l(t.cols,(function(a){return i("q-th",{key:a.name,staticClass:"text-color text-weight-bold",attrs:{props:t}},[e._v("\n                "+e._s(a.label)+"\n              ")])})),1)]}},e.$q.screen.lt.md?null:{key:"body",fn:function(t){return[i("q-tr",{class:"cursor-pointer",attrs:{props:t}},e._l(t.cols,(function(a){return i("q-td",{key:a.name,attrs:{props:t}},["actions"===a.name?[i("div",{staticClass:"text-color row justify-center no-wrap"},[i("span",{staticClass:"q-pr-sm"},[i("q-btn",{staticClass:"text-capitalize",attrs:{round:"",color:"positive",icon:"edit",size:"md"},on:{click:function(i){return e.handler("edit",t.row)}}},[i("q-tooltip",{attrs:{anchor:"top middle"}},[e._v("\n                          Edit Item\n                        ")])],1)],1),i("q-btn",{staticClass:"text-capitalize",attrs:{round:"",color:"logoRed",icon:"delete",size:"md"},on:{click:function(i){return e.handler("delete",t.row)}}},[i("q-tooltip",{attrs:{anchor:"top middle"}},[e._v("\n                        Delete Item\n                      ")])],1)],1)]:[4!=a.id?i("div",{staticClass:"row no-wrap text-color"},[e._v("\n                    "+e._s(a.value)+"\n                  ")]):i("div",[i("q-badge",{staticClass:"text-capitalize",attrs:{outline:"",color:a.value?"logoRed":"positive",label:a.value.toString()}})],1)]],2)})),1)]}}],null,!0)})],1)])]),i("q-dialog",{attrs:{"transition-show":"slide-up","transition-hide":"slide-down"},model:{value:e.viewUpdateDialog,callback:function(t){e.viewUpdateDialog=t},expression:"viewUpdateDialog"}},[i("update-side-items",{attrs:{isEditing:!0,selectedSideItem:e.selectedSideObj},on:{closeUpdateDialog:e.closeUpdateDialog}})],1),i("q-dialog",{attrs:{"transition-show":"slide-up","transition-hide":"slide-down"},model:{value:e.viewDeleteDialog,callback:function(t){e.viewDeleteDialog=t},expression:"viewDeleteDialog"}},[i("query-delete-request",{attrs:{selectedItem:e.selectedSideObj,deleteFunction:e.deleteFunction},on:{closeDeleteDialog:e.closeDeleteDialog}})],1)],1)},l=[],o=(i("d81d"),i("b0c0"),i("d3b7"),i("e6cf"),i("c707")),n=i.n(o),s={components:{"update-side-items":function(){return Promise.all([i.e(0),i.e(1)]).then(i.bind(null,"7de8"))},"query-delete-request":function(){return i.e(3).then(i.bind(null,"6f8a"))}},mixins:[],props:{viewUpdateDialog:{type:Boolean,required:!1,default:!1},viewDeleteDialog:{type:Boolean,required:!1,default:!1}},data:function(){return{filter:"",deleteFunction:"deleteSideItem",selectedSideObj:{},visibleColumns:["name","category","price","disabled"],columnsOptions:[{label:"Name",value:"name"},{label:"Price",value:"price"},{label:"Disabled",value:"disabled"},{label:"Category",value:"category"}],loading:!1,columns:[{id:1,name:"name",required:!1,label:"Name",align:"left",field:function(e){return e.name},sortable:!0,headerStyle:"font-size:14px;"},{id:2,name:"price",required:!1,label:"Price",align:"left",field:function(e){return e.price},sortable:!0,headerStyle:"font-size:14px;"},{id:3,name:"category",required:!1,label:"Category",align:"left",field:function(e){return e.addonCategory?e.addonCategory.name:"N/A"},sortable:!0,headerStyle:"font-size:14px;"},{id:4,name:"disabled",required:!1,label:"Disabled",align:"left",field:function(e){return e.disabled},sortable:!0,headerStyle:"font-size:14px;"},{id:5,name:"actions",align:"center",label:"Actions",sortable:!1,required:!0,headerStyle:"font-size:14px;"}]}},computed:{currentSideItems:function(){return n()(this.$store.getters.getAdminSideItems.map((function(e){return{_id:e._id,name:e.name,price:e.price,disabled:e.disabled,addonCategory:e.addonCategory}})),(function(e){return e.name.toLowerCase()}))}},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{closeDeleteDialog:function(){this.$emit("update:viewDeleteDialog",!1),this.selectedSideObj={}},closeUpdateDialog:function(){this.$emit("update:viewUpdateDialog",!1)},handler:function(e,t){var i=[t].map((function(e){return{_id:e._id,name:e.name,price:e.price,addonCategory:e.addonCategory,disabled:e.disabled}}));switch(this.selectedSideObj=i[0],e){case"edit":this.$emit("update:viewUpdateDialog",!0);break;case"delete":this.$emit("update:viewDeleteDialog",!0);break;default:break}}}},r=s,d=(i("eca5"),i("2877")),c=i("eaac"),u=i("74f7"),p=i("27f9"),m=i("0016"),f=i("ddd8"),b=i("f09f"),v=i("a370"),g=i("0170"),q=i("58a81"),w=i("9c40"),C=i("05c0"),h=i("bd08"),y=i("357e"),x=i("db86"),D=i("24e8"),_=i("eebe"),k=i.n(_),S=Object(d["a"])(r,a,l,!1,null,null,null);t["default"]=S.exports;k()(S,"components",{QTable:c["a"],QInnerLoading:u["a"],QInput:p["a"],QIcon:m["a"],QSelect:f["a"],QCard:b["a"],QCardSection:v["a"],QItemLabel:g["a"],QBadge:q["a"],QBtn:w["a"],QTooltip:C["a"],QTr:h["a"],QTh:y["a"],QTd:x["a"],QDialog:D["a"]})},a169:function(e,t,i){},eca5:function(e,t,i){"use strict";i("a169")}}]);