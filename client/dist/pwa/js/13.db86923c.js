(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"1d30":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"text-color"},[a("div",{attrs:{clas:"q-pa-md"}},[a("div",{staticClass:"row justify-center q-pt-lg text-subtitle1 text-weight-bolder"},[e._v("\n      Current Add-on Categories\n    ")]),a("div",{staticClass:"q-pa-md row justify-center"},[a("div",{staticClass:"col-xs-11 col-sm-11 col-md-7 text-color"},[a("q-table",{attrs:{dense:"",separator:"cell",grid:e.$q.screen.lt.md,"wrap-cells":!0,loading:e.loading,data:e.currentAddonCategoryOptions,columns:e.columns,filter:e.filter,"row-key":"_id","no-data-label":"No current sides available","no-results-label":"The filter didn't uncover any results","visible-columns":e.visibleColumns,"rows-per-page-options":[10,20]},scopedSlots:e._u([{key:"loading",fn:function(){return[a("q-inner-loading",{attrs:{showing:"",color:"logoRed"}})]},proxy:!0},{key:"top",fn:function(){return[a("div",{staticClass:"col-xs-12"},[a("div",{staticClass:"row justify-between q-pa-sm"},[a("div",{staticClass:"col-xs-5 col-md-4 col-lg-2"},[a("q-input",{attrs:{outlined:"",dense:"",debounce:"300",placeholder:"Search"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}},[a("q-icon",{attrs:{slot:"append",name:"search"},slot:"append"})],1)],1),a("div",{staticClass:"col-xs-5 col-md-4 col-lg-2"},[a("q-select",{attrs:{color:"positive",multiple:"",outlined:"",dense:"","options-dense":"","display-value":e.$q.lang.table.columns,"emit-value":"","map-options":"",options:e.columnsOptions,"option-value":"value"},model:{value:e.visibleColumns,callback:function(t){e.visibleColumns=t},expression:"visibleColumns"}})],1)])])]},proxy:!0},{key:"no-data",fn:function(t){var i=t.message;return[a("div",{staticClass:"full-width row no-wrap q-gutter-sm"},[a("q-icon",{attrs:{size:"15px",name:"fas fa-exclamation-triangle",color:"logoRed"}}),a("span",[e._v(" "+e._s(i)+" ")])],1)]}},e.$q.screen.lt.md?{key:"item",fn:function(t){return[a("div",{staticClass:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition cursor-pointer"},[a("q-card",[a("q-card-section",{staticClass:"relative-position"},[a("q-card-section",{staticClass:"q-pa-none"},e._l(t.cols,(function(i){return a("div",{key:i.name,attrs:{props:t}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-6"},[a("q-item-label",{staticClass:"q-py-sm text-weight-bold text-color",attrs:{lines:"1",caption:""}},[e._v(e._s(i.label))])],1),a("div",{staticClass:"col-6 text-right"},["actions"!==i.name&&2!==i.id?a("div",{staticClass:"text-color"},[e._v("\n                            "+e._s(i.value)+"\n                          ")]):2===i.id?a("div",[a("q-badge",{staticClass:"text-capitalize",attrs:{outline:"",color:i.value?"logoRed":"positive",label:i.value.toString()}})],1):a("div",{staticClass:"text-color"},[a("span",{staticClass:"q-pr-sm"},[a("q-btn",{staticClass:"text-capitalize",attrs:{round:"",color:"positive",icon:"edit",size:"sm"},on:{click:function(a){return e.handler("edit",t.row)}}},[a("q-tooltip",{attrs:{anchor:"top middle"}},[e._v("\n                                  Edit Item\n                                ")])],1)],1),a("q-btn",{staticClass:"text-capitalize",attrs:{round:"",color:"logoRed",icon:"delete",size:"sm"},on:{click:function(a){return e.handler("delete",t.row)}}},[a("q-tooltip",{attrs:{anchor:"top middle"}},[e._v("\n                                Delete Item\n                              ")])],1)],1)])])])})),0)],1)],1)],1)]}}:null,e.$q.screen.lt.md?null:{key:"header",fn:function(t){return[a("q-tr",{attrs:{props:t}},e._l(t.cols,(function(i){return a("q-th",{key:i.name,staticClass:"text-color text-weight-bold",attrs:{props:t}},[e._v("\n                "+e._s(i.label)+"\n              ")])})),1)]}},e.$q.screen.lt.md?null:{key:"body",fn:function(t){return[a("q-tr",{class:"cursor-pointer",attrs:{props:t}},e._l(t.cols,(function(i){return a("q-td",{key:i.name,attrs:{props:t}},["actions"===i.name?[a("div",{staticClass:"text-color row justify-center"},[a("span",{staticClass:"q-pr-sm"},[a("q-btn",{staticClass:"text-capitalize",attrs:{round:"",color:"positive",icon:"edit",size:"md"},on:{click:function(a){return e.handler("edit",t.row)}}},[a("q-tooltip",{attrs:{anchor:"top middle"}},[e._v("\n                          Edit Item\n                        ")])],1)],1),a("q-btn",{staticClass:"text-capitalize",attrs:{round:"",color:"logoRed",icon:"delete",size:"md"},on:{click:function(a){return e.handler("delete",t.row)}}},[a("q-tooltip",{attrs:{anchor:"top middle"}},[e._v("\n                        Delete Item\n                      ")])],1)],1)]:[2!=i.id?a("div",{staticClass:"row no-wrap text-color"},[e._v("\n                    "+e._s(i.value)+"\n                  ")]):a("div",[a("q-badge",{staticClass:"text-capitalize",attrs:{outline:"",color:i.value?"logoRed":"positive",label:i.value.toString()}})],1)]],2)})),1)]}}],null,!0)})],1)])]),a("q-dialog",{attrs:{"transition-show":"slide-up","transition-hide":"slide-down"},model:{value:e.viewUpdateDialog,callback:function(t){e.viewUpdateDialog=t},expression:"viewUpdateDialog"}},[a("update-addon-categories",{attrs:{isEditing:!0,selectedAddOnItem:e.selectedAddOnItem,viewUpdateDialog:e.viewUpdateDialog},on:{"update:viewUpdateDialog":function(t){e.viewUpdateDialog=t},"update:view-update-dialog":function(t){e.viewUpdateDialog=t}}})],1),a("q-dialog",{attrs:{"transition-show":"slide-up","transition-hide":"slide-down"},model:{value:e.viewDeleteDialog,callback:function(t){e.viewDeleteDialog=t},expression:"viewDeleteDialog"}},[a("query-delete-request",{attrs:{selectedItem:e.selectedAddOnItem,deleteFunction:e.deleteFunction},on:{closeDeleteDialog:e.closeDeleteDialog}})],1)],1)},n=[],l=(a("d81d"),a("b0c0"),a("d3b7"),a("e6cf"),a("2ef0")),o=a.n(l),s={components:{"update-addon-categories":function(){return Promise.all([a.e(0),a.e(1)]).then(a.bind(null,"0cf2"))},"query-delete-request":function(){return a.e(5).then(a.bind(null,"6f8a"))}},mixins:[],props:{},data:function(){return{filter:"",deleteFunction:"deleteAddonCatOption",selectedAddOnItem:{},viewUpdateDialog:!1,viewDeleteDialog:!1,visibleColumns:["name","disabled"],columnsOptions:[{label:"Name",value:"name"},{label:"Disabled",value:"disabled"}],loading:!1,columns:[{id:1,name:"name",required:!1,label:"Name",align:"left",field:function(e){return e.name},sortable:!0,headerStyle:"font-size:14px;"},{id:2,name:"disabled",required:!1,label:"Disabled",align:"left",field:function(e){return e.disabled},sortable:!0,headerStyle:"font-size:14px;"},{id:3,name:"actions",align:"center",label:"Actions",sortable:!1,required:!0,headerStyle:"font-size:14px;"}]}},computed:{currentAddonCategoryOptions:function(){return o.a.sortBy(this.$store.getters.getAdminAddonCategories.map((function(e){return{_id:e._id,name:e.name,disabled:e.disabled}})),(function(e){return e.name.toLowerCase()}))}},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{closeDeleteDialog:function(){this.viewDeleteDialog=!1,this.selectedAddOnItem={}},handler:function(e,t){var a=[t].map((function(e){return{_id:e._id,name:e.name,disabled:e.disabled}}));switch(this.selectedAddOnItem=a[0],e){case"edit":this.viewUpdateDialog=!0;break;case"delete":this.viewDeleteDialog=!0;break;default:break}}}},r=s,d=(a("4f9e"),a("2877")),c=a("eaac"),u=a("74f7"),p=a("27f9"),m=a("0016"),f=a("ddd8"),v=a("f09f"),b=a("a370"),g=a("0170"),w=a("58a81"),q=a("9c40"),C=a("05c0"),h=a("bd08"),x=a("357e"),D=a("db86"),y=a("24e8"),_=a("eebe"),k=a.n(_),I=Object(d["a"])(r,i,n,!1,null,null,null);t["default"]=I.exports;k()(I,"components",{QTable:c["a"],QInnerLoading:u["a"],QInput:p["a"],QIcon:m["a"],QSelect:f["a"],QCard:v["a"],QCardSection:b["a"],QItemLabel:g["a"],QBadge:w["a"],QBtn:q["a"],QTooltip:C["a"],QTr:h["a"],QTh:x["a"],QTd:D["a"],QDialog:y["a"]})},3679:function(e,t,a){},"4f9e":function(e,t,a){"use strict";var i=a("3679"),n=a.n(i);n.a}}]);