(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{"1d30":function(e,t,a){"use strict";a.r(t);a("4de4"),a("d3b7"),a("b0c0"),a("25f0");var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"text-color"},[t("div",{attrs:{clas:"q-pa-md"}},[t("div",{staticClass:"row justify-center q-pt-lg text-subtitle1 text-weight-bolder"},[e._v("\n      Current Add-on Categories\n    ")]),t("div",{staticClass:"q-pa-md row justify-center"},[t("div",{staticClass:"col-xs-12 col-sm-12 col-md-7 text-color-dark"},[t("q-table",{attrs:{dense:"",separator:"cell",grid:e.$q.screen.lt.md,"wrap-cells":!0,loading:e.loading,data:e.currentAddonCategoryOptions,columns:e.columns,filter:e.filter,"row-key":"_id","no-data-label":"No current sides available","no-results-label":"The filter didn't uncover any results","visible-columns":e.visibleColumns,"rows-per-page-options":[10,20]},scopedSlots:e._u([{key:"loading",fn:function(){return[t("q-inner-loading",{attrs:{showing:"",color:"logoRed"}})]},proxy:!0},{key:"top",fn:function(){return[t("div",{staticClass:"col-xs-12"},[t("div",{staticClass:"row justify-between q-pa-sm"},[t("div",{staticClass:"col-xs-5 col-md-4 col-lg-2"},[t("q-input",{attrs:{outlined:"",dense:"",light:"",color:"positive",debounce:"300",placeholder:"Search"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}},[t("q-icon",{attrs:{slot:"append",name:"search"},slot:"append"})],1)],1),t("div",{staticClass:"col-xs-5 col-md-4 col-lg-2"},[t("q-select",{attrs:{color:"positive",multiple:"",light:"",outlined:"",dense:"","options-dense":"","display-value":e.$q.lang.table.columns,"emit-value":"","map-options":"",options:e.columnsOptions,"option-value":"value"},model:{value:e.visibleColumns,callback:function(t){e.visibleColumns=t},expression:"visibleColumns"}})],1)])])]},proxy:!0},{key:"no-data",fn:function(a){var i=a.message;return[t("div",{staticClass:"full-width row no-wrap q-gutter-sm"},[t("q-icon",{attrs:{size:"15px",name:"fas fa-exclamation-triangle",color:"logoRed"}}),t("span",[e._v(" "+e._s(i)+" ")])],1)]}},e.$q.screen.lt.md?{key:"item",fn:function(a){return[t("div",{staticClass:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition cursor-pointer"},[t("q-card",[t("q-card-section",{staticClass:"relative-position"},[t("q-card-section",{staticClass:"q-pa-none"},e._l(a.cols,(function(i){return t("div",{key:i.name,attrs:{props:a}},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-6"},[t("q-item-label",{staticClass:"q-py-sm text-weight-bold text-color-dark",attrs:{lines:"1",caption:""}},[e._v(e._s(i.label))])],1),t("div",{staticClass:"col-6 text-right"},["actions"!==i.name&&2!==i.id?t("div",{staticClass:"text-color-dark"},[e._v("\n                            "+e._s(i.value)+"\n                          ")]):2===i.id?t("div",[t("q-badge",{staticClass:"text-capitalize",attrs:{outline:"",color:i.value?"logoRed":"positive",label:i.value.toString()}})],1):t("div",{staticClass:"text-color-dark"},[t("span",{staticClass:"q-pr-sm"},[t("q-btn",{staticClass:"text-capitalize",attrs:{round:"",color:"positive",icon:"edit",size:"sm"},on:{click:function(t){return e.handler("edit",a.row)}}},[t("q-tooltip",{attrs:{anchor:"top middle"}},[e._v("\n                                  Edit Item\n                                ")])],1)],1),t("q-btn",{staticClass:"text-capitalize",attrs:{round:"",color:"logoRed",icon:"delete",size:"sm"},on:{click:function(t){return e.handler("delete",a.row)}}},[t("q-tooltip",{attrs:{anchor:"top middle"}},[e._v("\n                                Delete Item\n                              ")])],1)],1)])])])})),0)],1)],1)],1)]}}:null,e.$q.screen.lt.md?null:{key:"header",fn:function(a){return[t("q-tr",{attrs:{props:a}},e._l(a.cols,(function(i){return t("q-th",{key:i.name,staticClass:"text-color-dark text-weight-bold",attrs:{props:a}},[e._v("\n                "+e._s(i.label)+"\n              ")])})),1)]}},e.$q.screen.lt.md?null:{key:"body",fn:function(a){return[t("q-tr",{class:"cursor-pointer",attrs:{props:a}},e._l(a.cols,(function(i){return t("q-td",{key:i.name,attrs:{props:a}},["actions"===i.name?[t("div",{staticClass:"text-color-dark row justify-center no-wrap"},[t("span",{staticClass:"q-pr-sm"},[t("q-btn",{staticClass:"text-capitalize",attrs:{round:"",color:"positive",icon:"edit",size:"md"},on:{click:function(t){return e.handler("edit",a.row)}}},[t("q-tooltip",{attrs:{anchor:"top middle"}},[e._v("\n                          Edit Item\n                        ")])],1)],1),t("q-btn",{staticClass:"text-capitalize",attrs:{round:"",color:"logoRed",icon:"delete",size:"md"},on:{click:function(t){return e.handler("delete",a.row)}}},[t("q-tooltip",{attrs:{anchor:"top middle"}},[e._v("\n                        Delete Item\n                      ")])],1)],1)]:[2!=i.id?t("div",{staticClass:"row no-wrap text-color-dark"},[e._v("\n                    "+e._s(i.value)+"\n                  ")]):t("div",[t("q-badge",{staticClass:"text-capitalize",attrs:{outline:"",color:i.value?"logoRed":"positive",label:i.value.toString()}})],1)]],2)})),1)]}}],null,!0)})],1)])]),t("q-dialog",{attrs:{"transition-show":"slide-up","transition-hide":"slide-down",persistent:""},model:{value:e.viewUpdateDialog,callback:function(t){e.viewUpdateDialog=t},expression:"viewUpdateDialog"}},[t("update-addon-categories",{attrs:{isEditing:!0,selectedAddOnItem:e.selectedAddOnItem},on:{closeUpdateDialog:e.closeUpdateDialog}})],1),t("q-dialog",{attrs:{"transition-show":"slide-up","transition-hide":"slide-down",persistent:""},model:{value:e.viewDeleteDialog,callback:function(t){e.viewDeleteDialog=t},expression:"viewDeleteDialog"}},[t("query-delete-request",{attrs:{selectedItem:e.selectedAddOnItem,deleteFunction:e.deleteFunction},on:{closeDeleteDialog:e.closeDeleteDialog}})],1)],1)},l=[],n=(a("e260"),a("e6cf"),a("3ca3"),a("ddb0"),a("d81d"),a("c707")),o=a.n(n),s={components:{"update-addon-categories":function(){return Promise.all([a.e(0),a.e(1)]).then(a.bind(null,"0cf2"))},"query-delete-request":function(){return a.e(3).then(a.bind(null,"6f8a"))}},mixins:[],props:{viewUpdateDialog:{type:Boolean,required:!1,default:!1},viewDeleteDialog:{type:Boolean,required:!1,default:!1}},data:function(){return{filter:"",deleteFunction:"deleteAddonCatOption",selectedAddOnItem:{},visibleColumns:["name","disabled"],columnsOptions:[{label:"Name",value:"name"},{label:"Disabled",value:"disabled"}],loading:!1,columns:[{id:1,name:"name",required:!1,label:"Name",align:"left",field:function(e){return e.name},sortable:!0,headerStyle:"font-size:14px;"},{id:2,name:"disabled",required:!1,label:"Disabled",align:"left",field:function(e){return e.disabled},sortable:!0,headerStyle:"font-size:14px;"},{id:3,name:"actions",align:"center",label:"Actions",sortable:!1,required:!0,headerStyle:"font-size:14px;"}]}},computed:{currentAddonCategoryOptions:function(){return o()(this.$store.getters.getAdminAddonCategories.map((function(e){return{_id:e._id,name:e.name,disabled:e.disabled}})),(function(e){return e.name.toLowerCase()}))}},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{closeDeleteDialog:function(){this.viewDeleteDialog=!1,this.selectedAddOnItem={}},closeUpdateDialog:function(){this.$emit("update:viewUpdateDialog",!1)},handler:function(e,t){var a=[t].map((function(e){return{_id:e._id,name:e.name,disabled:e.disabled}}));switch(this.selectedAddOnItem=a[0],e){case"edit":this.$emit("update:viewUpdateDialog",!0);break;case"delete":this.$emit("update:viewDeleteDialog",!0);break;default:break}}}},d=s,r=(a("6aaf"),a("2877")),c=a("eaac"),u=a("74f7"),p=a("27f9"),m=a("0016"),f=a("ddd8"),v=a("f09f"),b=a("a370"),g=a("0170"),q=a("58a81"),w=a("9c40"),h=a("05c0"),C=a("bd08"),x=a("357e"),D=a("db86"),y=a("24e8"),k=a("eebe"),_=a.n(k),I=Object(r["a"])(d,i,l,!1,null,null,null);t["default"]=I.exports;_()(I,"components",{QTable:c["a"],QInnerLoading:u["a"],QInput:p["a"],QIcon:m["a"],QSelect:f["a"],QCard:v["a"],QCardSection:b["a"],QItemLabel:g["a"],QBadge:q["a"],QBtn:w["a"],QTooltip:h["a"],QTr:C["a"],QTh:x["a"],QTd:D["a"],QDialog:y["a"]})},"6aaf":function(e,t,a){"use strict";a("f5bd")},f5bd:function(e,t,a){}}]);