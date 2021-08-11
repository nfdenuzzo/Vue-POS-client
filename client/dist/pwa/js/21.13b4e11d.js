(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[21],{"15e0":function(e,t,r){"use strict";r("31d2")},"31d2":function(e,t,r){},"6ea3":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"text-color"},[r("div",{staticClass:"row q-pa-md"},[r("div",{staticClass:"col-xs-10 col-sm-8 col-md-4 col-lg-2"},[r("q-input",{attrs:{"stack-label":"",label:"Filter Orders (Unique Order Id):",outlined:"",dark:"",color:"positive",dense:"",debounce:"300",placeholder:"Search"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}},[r("q-icon",{attrs:{slot:"append",name:"search"},slot:"append"})],1)],1)]),r("div",{directives:[{name:"drag-and-drop",rawName:"v-drag-and-drop",value:e.options,expression:"options"}],staticClass:"row justify-center"},e._l(e.getGroupedByStatus,(function(t){return r("div",{key:t.id,staticClass:"col-xs-12 col-sm-12 col-md-3 q-pa-sm",staticStyle:{border:"1px solid #019247"}},[r("div",{staticClass:"row justify-center text-center"},[r("label",{staticClass:"text-weight-bolder q-pl-sm text-subtitle1"},[e._v("\n          "+e._s(t.status)+"\n        ")]),r("q-separator",{attrs:{color:"positive",size:"2px"}})],1),r("q-list",{staticClass:"app-custom-list",attrs:{"data-id":t.id},on:{added:function(r){return e.added(r,t)},removed:function(r){return e.removed(r,t)},reordered:function(r){return e.reordered(r,t)}}},e._l(t.items,(function(i,s){return r("q-item",{key:i._id,staticClass:"app-custom-item",attrs:{"data-id":i._id}},[r("q-item-section",{on:{dblclick:function(t){return e.viewOrderDetailsDialog(i)}}},[r("q-card",{staticClass:"row justify-center",attrs:{dark:""}},["New"!==t.status||i.tableNo?e._e():r("div",{staticClass:"row justify-between q-px-md q-pt-md"},[r("div",{staticClass:"col-xs-6"},[r("q-input",{key:i._id,attrs:{dark:"","stack-label":"",label:"Pilot Table No.",color:"positive",outlined:"",dense:"",debounce:"300"},model:{value:e.orderTableNo[s],callback:function(t){e.$set(e.orderTableNo,s,t)},expression:"orderTableNo[index]"}})],1),r("div",{staticClass:"col-xs-5"},[r("q-btn",{staticClass:"text-capitalize",attrs:{disabled:!e.orderTableNo[s],label:"Assign table no.",type:"submit",color:"positive",loading:e.orderbtnLoadingNo.includes(s)},on:{click:function(t){return e.updateOrderAssignTableNo(s,i._id)}}})],1)]),r("simple-order-view",{attrs:{orderSpecifications:i}})],1)],1),r("br")],1)})),1)],1)})),0),r("q-dialog",{attrs:{"transition-show":"slide-up","transition-hide":"slide-down",persistent:""},model:{value:e.viewOrderDetails,callback:function(t){e.viewOrderDetails=t},expression:"viewOrderDetails"}},[r("q-card",{attrs:{dark:""}},[r("div",{staticClass:"row text-color"},[r("div",{staticClass:"col-xs-12 text-right"},[r("q-btn",{attrs:{icon:"close",flat:"",round:"",dense:""},on:{click:e.closeOrderDetailsDialog}})],1)]),e.viewOrderDetails?r("detailed-order-view",{attrs:{orderSpecifications:e.selectedOrder,adminView:!0},on:{closeOrderDetailsDialog:e.closeOrderDetailsDialog}}):e._e(),r("div",{staticClass:"row justify-center q-pb-md q-pt-lg"},[r("q-btn",{staticClass:"q-mr-lg text-capitalize",attrs:{label:"Cancel",color:"negative"},on:{click:e.closeOrderDetailsDialog}})],1)],1)],1)],1)},s=[],a=(r("99af"),r("4de4"),r("7db0"),r("caad"),r("c975"),r("d81d"),r("13d5"),r("a434"),r("d3b7"),r("e6cf"),r("2532"),r("448a")),n=r.n(a),o=(r("96cf"),r("c973")),d=r.n(o),l=r("2b0e"),c=r("d8c5"),u=r.n(c);l["a"].use(u.a);var f={components:{"simple-order-view":function(){return Promise.all([r.e(0),r.e(36)]).then(r.bind(null,"2866"))},"detailed-order-view":function(){return Promise.all([r.e(0),r.e(1)]).then(r.bind(null,"e8bd"))}},mixins:[],props:{},data:function(){return{orderbtnLoadingNo:[],orderTableNo:[],filter:null,selectedOrder:null,viewOrderDetails:!1,options:{multipleDropzonesItemsDraggingEnabled:!1,dropzoneSelector:".q-list",draggableSelector:".q-item"}}},computed:{getFilteredReadyOrders:function(){var e=this;return this.filter?this.$store.getters.getActiveOrders.filter((function(t){return"READY FOR COLLECTION"===t.orderStatus&&t.uniqueOrderId.toLowerCase().includes(e.filter.toLowerCase())})):this.$store.getters.getActiveOrders.filter((function(e){return"OUT FOR DELIVERY"===e.orderStatus||"READY FOR COLLECTION"===e.orderStatus}))},getGroupedByStatus:function(){return[{id:1,status:"New",items:this.$store.getters.getActiveOrders.filter((function(e){return"PROCESSING"===e.orderStatus}))},{id:2,status:"Preparing",items:this.$store.getters.getActiveOrders.filter((function(e){return"PREPARING"===e.orderStatus}))},{id:3,status:"Ready",items:this.getFilteredReadyOrders},{id:4,status:"Done",items:this.$store.getters.getActiveOrders.filter((function(e){return"COMPLETE"===e.orderStatus}))}]}},watch:{},beforeCreate:function(){},created:function(){var e=this;window.setInterval((function(){e.$store.dispatch("retrieveActiveOrders",{forceRefresh:!0})}),12e4)},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{updateOrderAssignTableNo:function(e,t){var r=this;return d()(regeneratorRuntime.mark((function i(){var s,a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return r.orderbtnLoadingNo.push(e),s=r.orderTableNo[e],i.next=4,r.$store.dispatch("updateOrderAssignTableNo",{tableNo:s,_id:t});case 4:a=i.sent,a&&200===a.status&&(r.orderTableNo=[]),r.orderbtnLoadingNo=[];case 7:case"end":return i.stop()}}),i)})))()},closeOrderDetailsDialog:function(){this.viewOrderDetails=!1,this.selectedOrder=null},viewOrderDetailsDialog:function(e){this.selectedOrder=e,this.viewOrderDetails=!0},updateOrderStatus:function(e,t,r){var i={orderStatus:e,uniqueOrderId:t,_id:r};this.$store.dispatch("updateOrderStatus",i)},added:function(e,t){var r,i=this.getGroupedByStatus.map((function(e){return e.items})).reduce((function(e,t){return[].concat(n()(e),n()(t))}),[]).filter((function(t){return e.detail.ids.map((function(e){return e})).indexOf(t._id)>=0}));(r=t.items).splice.apply(r,[e.detail.index,0].concat(n()(i)));var s=this.$store.getters.getActiveOrders.find((function(t){return t._id===e.detail.ids[0]}));if(null!=s){var a=this.getCorrectStatus(t.status.toUpperCase(),s);this.updateOrderStatus(a,s.uniqueOrderId,s._id)}},removed:function(e,t){t.items=t.items.filter((function(t){return e.detail.ids.map((function(e){return e})).indexOf(t._id)<0}))},reordered:function(e,t){var r=t.items.filter((function(t){return e.detail.ids.map((function(e){return e})).indexOf(t._id)>=0})),i=t.items.filter((function(t){return e.detail.ids.map((function(e){return e})).indexOf(t._id)<0}));i.splice.apply(i,[e.detail.index,0].concat(n()(r))),t.items=i},getCorrectStatus:function(e,t){switch(e){case"NEW":return"PROCESSING";case"PREPARING":return"PREPARING";case"READY":return"Delivery"===t.orderType?"OUT FOR DELIVERY":"READY FOR COLLECTION";case"DONE":return"COMPLETE"}}}},p=f,m=(r("15e0"),r("2877")),v=r("27f9"),O=r("0016"),b=r("eb85"),g=r("1c1c"),w=r("66e5"),h=r("4074"),C=r("f09f"),D=r("9c40"),x=r("24e8"),N=r("eebe"),q=r.n(N),S=Object(m["a"])(p,i,s,!1,null,null,null);t["default"]=S.exports;q()(S,"components",{QInput:v["a"],QIcon:O["a"],QSeparator:b["a"],QList:g["a"],QItem:w["a"],QItemSection:h["a"],QCard:C["a"],QBtn:D["a"],QDialog:x["a"]})}}]);