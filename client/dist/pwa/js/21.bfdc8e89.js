(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[21],{"36e1":function(e,t,n){"use strict";n.r(t);var i,r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"q-app"}},[n("q-layout",{attrs:{view:"lHh lpr lFf"}},[n("q-header",{staticClass:"bg-main-layout-light",class:e.mixin_tabMenuDisplay?"shadow-1":"shadow-10"},[n("q-toolbar",{staticClass:"bg-main-layout-light"},[n("div",{staticClass:"col-xs-12"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-xs-1"},[e.$store.getters.getAuth||e.$q.platform.is.mobile?n("q-btn",{staticClass:"q-mt-md text-color",attrs:{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu"},on:{click:function(t){e.menuDrawerOpen=!e.menuDrawerOpen}}}):e._e()],1),n("div",{staticClass:"col-xs-10 text-center"},[n("img",{staticClass:"cursor-pointer",staticStyle:{height:"70px"},attrs:{src:e.images.Logo,"no-default-spinner":"",contain:""},on:{click:e.goHome}})]),n("div",{staticClass:"col-xs-1 text-right"},[e.hasItemsInOrder&&e.$store.getters.getAuth?n("q-btn",{staticClass:"q-mt-md q-mr-lg bg-goldBrown",staticStyle:{right:"10px"},attrs:{round:"",size:"md",icon:"shopping_cart"},on:{click:e.showPurchaseProcessDialog}},[n("q-badge",{attrs:{round:"",color:"logoRed",floating:""}},[e._v(e._s(e.getItemsInOrderCount))])],1):e._e()],1)])])])],1),n("q-drawer",{attrs:{width:e.$q.screen.lt.md?230:330,overlay:"",bordered:"",behavior:"mobile","content-class":"bg-layout-color"},model:{value:e.menuDrawerOpen,callback:function(t){e.menuDrawerOpen=t},expression:"menuDrawerOpen"}},[n("q-scroll-area",{staticClass:"fit"},[n("q-list",{staticClass:"menu-list",attrs:{padding:""}},[e.$store.getters.getAuth?n("div",{staticClass:"row justify-center"},[n("label",{staticClass:"text-weight-bolder text-subtitle1 text-color q-pb-sm"},[e._v("\n              "+e._s(e.getAdminMainMenuItem.length>0?"Admin Options":"Main Menu")+"\n            ")])]):e._e(),e.$store.getters.getAuth&&e.getAdminMainMenuItem.length>0?n("q-separator"):e._e(),e.$store.getters.getAuth&&e.getAdminMainMenuItem.length>0?n("div",[e._l(e.getAdminMainMenuItem,(function(t,i){return n("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:i,attrs:{clickable:"",light:""}},[n("q-item-section",{class:e.$route.name===t.routeName?"text-logoGreen":"text-logoRed",attrs:{avatar:""}},[n("q-icon",{attrs:{name:t.icon}})],1),n("q-item-section",{staticClass:"text-color",on:{click:function(n){return e.proceedToLink(t.routeLink)}}},[e._v("\n                "+e._s(t.name)+"\n              ")])],1)})),n("q-separator")],2):e._e(),e.$store.getters.getAuth&&e.getUserMainMenuItem.length>0?n("q-separator"):e._e(),e.$store.getters.getAuth&&e.getUserMainMenuItem.length>0?n("div",[e._l(e.getUserMainMenuItem,(function(t,i){return n("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:i,attrs:{clickable:"",light:""}},[n("q-item-section",{class:e.$route.name===t.routeName?"text-logoGreen":"text-logoRed",attrs:{avatar:""}},[n("q-icon",{attrs:{name:t.icon}})],1),n("q-item-section",{staticClass:"text-color",on:{click:function(n){return e.proceedToLink(t.routeLink)}}},[e._v("\n                "+e._s(t.name)+"\n              ")])],1)})),n("q-separator")],2):e._e(),e.$store.getters.getAuth&&"HomePage"!==e.$route.name?n("div",{staticClass:"row justify-center q-pt-md"},[n("q-btn",{staticClass:"text-capitalize",staticStyle:{"min-width":"100px"},attrs:{push:"",color:"positive",label:"Logout",size:"md"},on:{click:e.handleLogout}})],1):e._e(),e.$q.screen.height<=768?n("cooking-time-info",{staticClass:"q-pt-lg q-pb-sm",attrs:{drawer:!0}}):e._e(),e.$q.screen.height<=768?n("trading-Hours",{staticClass:"q-pt-md q-pb-md",attrs:{drawer:!0}}):e._e(),e.$q.screen.height<=768?n("delivery-charges",{staticClass:"q-pt-md q-pb-md"}):e._e(),n("terms-and-conditions")],1)],1)],1),n("q-page-container",[n("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[e.showNotificationsBanner&&e.pushNotificationsSupported?n("div",{staticClass:"banner-container bg-positive"},[n("div",{staticClass:"constrain"},[n("q-banner",{staticClass:"bg-positive text-white",attrs:{"inline-actions":"",dense:""},scopedSlots:e._u([{key:"avatar",fn:function(){return[n("q-avatar",{attrs:{size:"40px",color:"white"}},[n("q-img",{attrs:{contain:"",src:e.images.Logo}})],1)]},proxy:!0},{key:"action",fn:function(){return[n("q-btn",{staticClass:"q-px-sm text-capitalize",attrs:{label:"Yes",dense:"",flat:""},on:{click:e.enableNotifications}}),n("q-btn",{staticClass:"q-px-sm text-capitalize",attrs:{label:"Later",dense:"",flat:""},on:{click:function(t){e.showNotificationsBanner=!1}}}),n("q-btn",{staticClass:"q-px-sm text-capitalize",attrs:{label:"Never",dense:"",flat:""},on:{click:e.neverShowNotificationsBanner}})]},proxy:!0}],null,!1,2041545843)},[n("b",[e._v(" Would you like to enable notifications?")])])],1)]):e._e()]),e.mixin_tabMenuDisplay?n("mobile-tab-menu-options"):e._e(),n("router-view"),n("q-dialog",{attrs:{persistent:"","full-width":!!e.$q.platform.is.mobile,"full-height":!!e.$q.platform.is.mobile,"transition-show":"slide-up","transition-hide":"slide-down"},model:{value:e.viewPurchaseProcess,callback:function(t){e.viewPurchaseProcess=t},expression:"viewPurchaseProcess"}},[e.viewPurchaseProcess?n("purchaseProcess",{attrs:{viewPurchaseProcess:e.viewPurchaseProcess},on:{"update:viewPurchaseProcess":function(t){e.viewPurchaseProcess=t},"update:view-purchase-process":function(t){e.viewPurchaseProcess=t}}}):e._e()],1),n("q-dialog",{attrs:{persistent:"","full-width":!!e.$q.platform.is.mobile,"full-height":!!e.$q.platform.is.mobile,"transition-show":"slide-up","transition-hide":"slide-down"},model:{value:e.viewPaymentStatusDialog,callback:function(t){e.viewPaymentStatusDialog=t},expression:"viewPaymentStatusDialog"}},[e.viewPaymentStatusDialog?n("payment-result",{attrs:{viewPaymentStatusDialog:e.viewPaymentStatusDialog,paymentResultSuccessful:e.paymentResultSuccessful},on:{"update:viewPaymentStatusDialog":function(t){e.viewPaymentStatusDialog=t},"update:view-payment-status-dialog":function(t){e.viewPaymentStatusDialog=t},"update:paymentResultSuccessful":function(t){e.paymentResultSuccessful=t},"update:payment-result-successful":function(t){e.paymentResultSuccessful=t}}}):e._e()],1)],1),n("q-footer",{staticClass:"bg-white",attrs:{bordered:""}},[n("transition",{attrs:{appear:""}},[e.showAppInstallBanner?n("div",{staticClass:"banner-container bg-positive"},[n("div",{staticClass:"constrain"},[n("q-banner",{staticClass:"bg-positive text-white",attrs:{"inline-actions":"",dense:""},scopedSlots:e._u([{key:"avatar",fn:function(){return[n("q-avatar",{attrs:{size:"40px",color:"white"}},[n("q-img",{attrs:{contain:"",src:e.images.Logo}})],1)]},proxy:!0},{key:"action",fn:function(){return[n("q-btn",{staticClass:"q-px-sm text-capitalize",attrs:{label:"Yes",dense:"",flat:""},on:{click:e.installApp}}),n("q-btn",{staticClass:"q-px-sm text-capitalize",attrs:{label:"Later",dense:"",flat:""},on:{click:function(t){e.showAppInstallBanner=!1}}}),n("q-btn",{staticClass:"q-px-sm text-capitalize",attrs:{label:"Never",dense:"",flat:""},on:{click:e.neverShowAppInstallBanner}})]},proxy:!0}],null,!1,3591870316)},[n("b",[e._v("Install Black Forest Grill App?")])])],1)]):e._e()])],1)],1)],1)},s=[],a=(n("13d5"),n("d3b7"),n("e6cf"),n("bf19"),n("96cf"),n("c973")),o=n.n(a),c=n("c0fd"),u=n("8f46"),l=(n("caad"),n("2532"),function(){return Promise.resolve().then(n.bind(null,"5f87"))}),p={components:{},mixins:[],props:{},data:function(){return{}},computed:{hasAccessToken:function(){var e=this;return o()(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l().then((function(e){return e.isLoggedIn}));case 2:return n=t.sent,t.abrupt("return",e.$store.getters.getAuth&&n());case 4:case"end":return t.stop()}}),t)})))()},hasNoPermissions:function(){return!this.$store.getters.getUserPermissions.includes("read:systemData")},userMainMenuItems:function(){return this.hasAccessToken&&this.hasNoPermissions?[{name:"Home Page",routeLink:"/",icon:"fas fa-home",routeName:"HomePage"},{name:"My Profile",routeLink:"/view-my-profile",icon:"fas fa-user",routeName:"myProfile"}]:[]}},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{}},h=n("e2ad"),m=function(){return Promise.resolve().then(n.bind(null,"5f87"))},f=function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"3524"))},d={name:"MainLayout",mixins:[c["a"],u["a"],p],components:{purchaseProcess:function(){return Promise.all([n.e(0),n.e(1),n.e(11)]).then(n.bind(null,"f55e"))},"delivery-charges":function(){return n.e(6).then(n.bind(null,"7b10"))},"payment-result":function(){return Promise.all([n.e(0),n.e(36)]).then(n.bind(null,"5a5c"))},"trading-Hours":function(){return n.e(7).then(n.bind(null,"f3e1"))},"cooking-time-info":function(){return n.e(1).then(n.bind(null,"0cb5"))},"mobile-tab-menu-options":function(){return Promise.all([n.e(0),n.e(35)]).then(n.bind(null,"e1cd"))},"terms-and-conditions":function(){return n.e(5).then(n.bind(null,"a99f"))}},computed:{serviceWorkerSupported:function(){return"serviceWorker"in navigator},pushNotificationsSupported:function(){return"PushManager"in window},getAdminMainMenuItem:function(){return this.adminMainMenuItems},getUserMainMenuItem:function(){return this.userMainMenuItems},hasItemsInOrder:function(){return this.$store.getters.getBasket.length>0},getItemsInOrderCount:function(){return this.$store.getters.getBasket.reduce((function(e,t){return+e+ +t.quantity}),0)}},data:function(){return{images:{Logo:n("d1e0")},viewPurchaseProcess:!1,showAppInstallBanner:!1,showNotificationsBanner:!1,viewPaymentStatusDialog:!1,paymentResultSuccessful:!1,menuDrawerOpen:!1}},beforeMount:function(){Object(h["a"])(),this.$store.dispatch("retrieveDefaultSettings"),this.$store.dispatch("retrievePlatformStatus")},mounted:function(){var e=this;return o()(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.$route.query||!e.$route.query.tr){t.next=8;break}return t.next=3,e.$store.dispatch("queryTransactionResult",e.$route.query.tr);case 3:n=t.sent,n&&e.$store.commit("updateBasket"),e.viewPaymentStatusDialog=!0,e.paymentResultSuccessful=n,e.$store.commit("setTranId",null);case 8:e.$store.getters.getTranId&&e.$store.dispatch("updateOutstandingTransaction"),r=e.$q.localStorage.getItem("neverShowAppInstallBanner"),r||window.addEventListener("beforeinstallprompt",(function(t){t.preventDefault(),i=t,setTimeout((function(){var t=e.$q.localStorage.getItem("neverShowAppInstallBanner");t||(e.showAppInstallBanner=!0)}),2e3)}));case 11:case"end":return t.stop()}}),t)})))()},watch:{"$store.getters.getAuth":function(){this.$store.getters.getAuth&&this.initNotificationsBanner()},viewPurchaseProcess:function(){this.viewPurchaseProcess?this.$store.commit("setViewingPurchaseProcess",!0):this.$store.commit("setViewingPurchaseProcess",!1)}},methods:{showPurchaseProcessDialog:function(){var e=this;return o()(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(h["a"])();case 2:n=t.sent,n||(e.viewPurchaseProcess=!0);case 4:case"end":return t.stop()}}),t)})))()},installApp:function(){var e=this;this.showAppInstallBanner=!1,i.prompt(),i.userChoice.then((function(t){"accepted"===t.outcome?(console.log("User accepted the install prompt"),e.neverShowAppInstallBanner()):(console.log("User dismissed the install prompt"),e.showAppInstallBanner=!1)}))},neverShowAppInstallBanner:function(){this.$q.localStorage.set("neverShowAppInstallBanner",!0),this.showAppInstallBanner=!1},handleLogout:function(){return o()(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,m().then((function(e){return e.logout}));case 2:t=e.sent,t();case 4:case"end":return e.stop()}}),e)})))()},proceedToLink:function(e){this.$router.push(e).catch((function(){}))},goHome:function(){this.$router.push("/").catch((function(){}))},initNotificationsBanner:function(){var e=this.$q.localStorage.getItem("neverShowNotificationsBanner");e||(this.showNotificationsBanner=!0)},enableNotifications:function(){var e=this;return o()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.pushNotificationsSupported&&Notification.requestPermission(function(){var t=o()(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.neverShowNotificationsBanner(),"granted"==n&&e.checkForExistingPushSubscription();case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},checkForExistingPushSubscription:function(){var e,t=this;this.serviceWorkerSupported&&this.pushNotificationsSupported&&navigator.serviceWorker.ready.then((function(t){return e=t,t.pushManager.getSubscription()})).then((function(n){t.createPushSubscription(e)}))},createPushSubscription:function(e){var t=this;return o()(regeneratorRuntime.mark((function i(){var r,s,a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return r="BJeT3WbOLmulqq1RNixIGxdtDcO7oxIZ2XYzZtk5MV0ucrbMrGIq-JLW26x53JTh33hBeoI_aOu31XM8Z3Mq2kE",i.next=3,f().then((function(e){return e.urlBase64ToUint8Array}));case 3:s=i.sent,a=s(r),e.pushManager.subscribe({applicationServerKey:a,userVisibleOnly:!0}).then(function(){var e=o()(regeneratorRuntime.mark((function e(i){var r,s,a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=n("4328"),s=i.toJSON(),a=r.stringify(s),e.next=4,t.$store.dispatch("subscribeNotifications",a);case 4:o=e.sent,o&&t.displayGrantedNotification();case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log("err: ",e)}));case 6:case"end":return i.stop()}}),i)})))()},displayGrantedNotification:function(){this.serviceWorkerSupported&&this.pushNotificationsSupported&&navigator.serviceWorker.ready.then((function(e){e.showNotification("You're subscribed to notifications!",{body:"Thanks for subscribing!",icon:"icons/icon-128x128.png",image:"icons/icon-128x128.png",badge:"icons/icon-128x128.png",dir:"ltr",lang:"en-US",vibrate:[100,50,200],tag:"confirm-notification",renotify:!0})}))},neverShowNotificationsBanner:function(){this.showNotificationsBanner=!1,this.$q.localStorage.set("neverShowNotificationsBanner",!0)}}},g=d,v=n("2877"),w=n("4d5a"),b=n("e359"),q=n("65c6"),x=n("9c40"),y=n("58a81"),P=n("9404"),k=n("4983"),S=n("1c1c"),I=n("eb85"),$=n("66e5"),M=n("4074"),C=n("0016"),A=n("09e3"),B=n("54e1"),N=n("cb32"),_=n("068f"),R=n("24e8"),D=n("7ff0"),L=n("714f"),O=n("eebe"),Q=n.n(O),T=Object(v["a"])(g,r,s,!1,null,null,null);t["default"]=T.exports;Q()(T,"components",{QLayout:w["a"],QHeader:b["a"],QToolbar:q["a"],QBtn:x["a"],QBadge:y["a"],QDrawer:P["a"],QScrollArea:k["a"],QList:S["a"],QSeparator:I["a"],QItem:$["a"],QItemSection:M["a"],QIcon:C["a"],QPageContainer:A["a"],QBanner:B["a"],QAvatar:N["a"],QImg:_["a"],QDialog:R["a"],QFooter:D["a"]}),Q()(T,"directives",{Ripple:L["a"]})},d1e0:function(e,t,n){e.exports=n.p+"img/logo-min.79b7b29a.png"}}]);