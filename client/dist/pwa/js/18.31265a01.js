(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[18],{"63a7":function(e,t,a){},9346:function(e,t,a){"use strict";var l=a("63a7"),n=a.n(l);n.a},a32f:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"text-color"},[a("div",{staticClass:"text-weight-bolder q-pb-xs  q-pt-md text-center text-subtitle1"},[e._v("\n    Current Users\n  ")]),a("div",{staticClass:"q-pa-md row justify-center"},[a("div",{staticClass:"col-xs-12 col-sm-12 col-md-7 text-color"},[a("q-table",{attrs:{dense:"",separator:"cell",grid:e.$q.screen.lt.md,"wrap-cells":!0,loading:e.loading,data:e.currentUsers,columns:e.columns,filter:e.filter,"row-key":"_id","no-data-label":"No current users","no-results-label":"The filter didn't uncover any results","visible-columns":e.visibleColumns,"rows-per-page-options":[10,20]},scopedSlots:e._u([{key:"loading",fn:function(){return[a("q-inner-loading",{attrs:{showing:"",color:"logoRed"}})]},proxy:!0},{key:"top",fn:function(){return[a("div",{staticClass:"col-xs-12"},[a("div",{staticClass:"row justify-between q-pa-sm"},[a("div",{staticClass:"col-xs-5 col-md-4 col-lg-2"},[a("q-input",{attrs:{outlined:"",dense:"",debounce:"300",placeholder:"Search"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}},[a("q-icon",{attrs:{slot:"append",name:"search"},slot:"append"})],1)],1),a("div",{staticClass:"col-xs-5 col-md-4 col-lg-2"},[a("q-select",{attrs:{color:"positive",multiple:"",outlined:"",dense:"","options-dense":"","display-value":e.$q.lang.table.columns,"emit-value":"","map-options":"",options:e.columnsOptions,"option-value":"value"},model:{value:e.visibleColumns,callback:function(t){e.visibleColumns=t},expression:"visibleColumns"}})],1)])])]},proxy:!0},{key:"no-data",fn:function(t){var l=t.message;return[a("div",{staticClass:"full-width row no-wrap q-gutter-sm"},[a("q-icon",{attrs:{size:"15px",name:"fas fa-exclamation-triangle",color:"logoRed"}}),a("span",[e._v(" "+e._s(l)+" ")])],1)]}},e.$q.screen.lt.md?{key:"item",fn:function(t){return[a("div",{staticClass:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition cursor-pointer"},[a("q-card",[a("q-card-section",{staticClass:"relative-position"},[a("q-card-section",{staticClass:"q-pa-none"},e._l(t.cols,(function(l){return a("div",{key:l.name,attrs:{props:t}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-6"},[a("q-item-label",{staticClass:"q-py-sm text-weight-bold text-color",attrs:{lines:"1",caption:""}},[e._v(e._s(l.label))])],1),a("div",{staticClass:"col-6 text-right"},[5!=l.id?a("div",{staticClass:"text-color breakWord"},[e._v("\n                          "+e._s(l.value)+"\n                        ")]):a("div",[a("q-badge",{staticClass:"text-capitalize",attrs:{outline:"",color:l.value?"positive":"logoRed",label:l.value.toString()}})],1)])])])})),0)],1)],1)],1)]}}:null,e.$q.screen.lt.md?null:{key:"header",fn:function(t){return[a("q-tr",{attrs:{props:t}},e._l(t.cols,(function(l){return a("q-th",{key:l.name,staticClass:"text-color text-weight-bold",attrs:{props:t}},[e._v("\n              "+e._s(l.label)+"\n            ")])})),1)]}},e.$q.screen.lt.md?null:{key:"body",fn:function(t){return[a("q-tr",{class:"cursor-pointer",attrs:{props:t}},e._l(t.cols,(function(l){return a("q-td",{key:l.name,attrs:{props:t}},[[5!=l.id?a("div",{staticClass:"row no-wrap text-color"},[e._v("\n                  "+e._s(l.value)+"\n                ")]):a("div",[a("q-badge",{staticClass:"text-capitalize",attrs:{outline:"",color:l.value?"positive":"logoRed",label:l.value.toString()}})],1)]],2)})),1)]}}],null,!0)})],1)])])},n=[],i=(a("b0c0"),a("c707")),s=a.n(i),o={components:{},mixins:[],props:{},data:function(){return{filter:"",visibleColumns:["name","email","lastLoginDate","created","emailVerified"],columnsOptions:[{label:"Name",value:"name"},{label:"Email",value:"email"},{label:"Last Login Date",value:"lastLoginDate"},{label:"Created",value:"created"},{label:"Email Verified",value:"emailVerified"}],loading:!1,columns:[{id:1,name:"name",required:!1,label:"Name",align:"left",field:function(e){return e.name},sortable:!0,headerStyle:"font-size:14px;"},{id:2,name:"email",required:!1,label:"Email",align:"left",field:function(e){return e.userEmail},sortable:!0,headerStyle:"font-size:14px;"},{id:3,name:"lastLoginDate",required:!1,label:"Last Login Date",align:"left",field:function(e){return e.lastLoginDate},sortable:!0,headerStyle:"font-size:14px;"},{id:4,name:"created",required:!1,label:"Created",align:"left",field:function(e){return e.createdAt},sortable:!0,headerStyle:"font-size:14px;"},{id:5,name:"emailVerified",required:!1,label:"Email Verified",align:"left",field:function(e){return e.emailVerified},sortable:!0,headerStyle:"font-size:14px;"}]}},computed:{currentUsers:function(){return s()(this.$store.getters.getUserList,(function(e){return e.name.toLowerCase()}))}},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{}},r=o,c=(a("9346"),a("2877")),d=a("eaac"),u=a("74f7"),f=a("27f9"),p=a("0016"),m=a("ddd8"),b=a("f09f"),v=a("a370"),g=a("0170"),q=a("58a81"),x=a("bd08"),C=a("357e"),y=a("db86"),w=a("eebe"),h=a.n(w),_=Object(c["a"])(r,l,n,!1,null,null,null);t["default"]=_.exports;h()(_,"components",{QTable:d["a"],QInnerLoading:u["a"],QInput:f["a"],QIcon:p["a"],QSelect:m["a"],QCard:b["a"],QCardSection:v["a"],QItemLabel:g["a"],QBadge:q["a"],QTr:x["a"],QTh:C["a"],QTd:y["a"]})}}]);