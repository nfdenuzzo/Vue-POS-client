(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[23],{"36e1":function(t,e,n){"use strict";n.r(e);var s,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"q-app"}},[n("q-layout",{attrs:{view:"lHh lpr lFf"}},[n("q-header",{staticClass:"bg-main-layout-light",class:t.mixin_tabMenuDisplay?"shadow-1":"shadow-10"},[n("q-toolbar",{staticClass:"bg-main-layout-light"},[n("div",{staticClass:"col-xs-12"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-xs-1"},[t.$store.getters.getAuth||!(t.$q.screen.height>767&&t.$q.screen.width>700)||!t.$store.getters.getAuth&&"HomePage"!==t.$route.name?n("q-btn",{staticClass:"q-mt-md text-color",attrs:{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu"},on:{click:function(e){t.menuDrawerOpen=!t.menuDrawerOpen}}}):t._e()],1),n("div",{staticClass:"col-xs-10 text-center"},[n("img",{staticClass:"cursor-pointer",staticStyle:{height:"70px"},attrs:{src:t.images.Logo,"no-default-spinner":"",contain:""},on:{click:t.goHome}})]),n("div",{staticClass:"col-xs-1 text-right"},[t.hasItemsInOrder&&t.$store.getters.getAuth?n("q-btn",{staticClass:"q-mt-md q-mr-lg bg-goldBrown",staticStyle:{right:"10px"},attrs:{round:"",size:"md",icon:"shopping_cart"},on:{click:t.showPurchaseProcessDialog}},[n("q-badge",{attrs:{round:"",color:"logoRed",floating:""}},[t._v(t._s(t.getItemsInOrderCount))])],1):t._e()],1)])])])],1),t.$store.getters.getAuth||!(t.$q.screen.height>767&&t.$q.screen.width>700)||!t.$store.getters.getAuth&&"HomePage"!==t.$route.name?n("q-drawer",{attrs:{width:t.$q.screen.lt.md?230:330,overlay:"",bordered:"",behavior:"mobile","content-class":"bg-layout-color"},model:{value:t.menuDrawerOpen,callback:function(e){t.menuDrawerOpen=e},expression:"menuDrawerOpen"}},[n("q-scroll-area",{staticClass:"fit"},[n("q-list",{staticClass:"menu-list",attrs:{padding:""}},[t.$store.getters.getAuth?n("div",{staticClass:"row justify-center"},[n("label",{staticClass:"text-weight-bolder text-subtitle1 text-color q-pb-sm"},[t._v("\n              "+t._s(t.getAdminMainMenuItem.length>0?"Admin Options":"Main Menu")+"\n            ")])]):t._e(),t.$store.getters.getAuth&&t.getAdminMainMenuItem.length>0?n("q-separator"):t._e(),t.$store.getters.getAuth&&t.getAdminMainMenuItem.length>0?n("div",[t._l(t.getAdminMainMenuItem,(function(e,s){return n("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:s,attrs:{clickable:"",light:""}},[n("q-item-section",{class:t.$route.name===e.routeName?"text-logoGreen":"text-logoRed",attrs:{avatar:""}},[n("q-icon",{attrs:{name:e.icon}})],1),n("q-item-section",{staticClass:"text-color",on:{click:function(n){return t.proceedToLink(e.routeLink)}}},[t._v("\n                "+t._s(e.name)+"\n              ")])],1)})),n("q-separator")],2):t._e(),t.$store.getters.getAuth&&t.getUserMainMenuItem.length>0?n("q-separator"):t._e(),t.$store.getters.getAuth||"HomePage"===t.$route.name?t._e():n("div",{staticClass:"row justify-center q-pt-md"},[n("q-btn",{staticClass:"text-capitalize",staticStyle:{"min-width":"100px"},attrs:{push:"",color:"positive",label:"Home Page",size:"md"},on:{click:t.goHome}})],1),t.$store.getters.getAuth&&t.getUserMainMenuItem.length>0?n("div",[t._l(t.getUserMainMenuItem,(function(e,s){return n("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:s,attrs:{clickable:"",light:""}},[n("q-item-section",{class:t.$route.name===e.routeName?"text-logoGreen":"text-logoRed",attrs:{avatar:""}},[n("q-icon",{attrs:{name:e.icon}})],1),n("q-item-section",{staticClass:"text-color",on:{click:function(n){return t.proceedToLink(e.routeLink)}}},[t._v("\n                "+t._s(e.name)+"\n              ")])],1)})),n("q-separator")],2):t._e(),t.$store.getters.getAuth&&"HomePage"!==t.$route.name?n("div",{staticClass:"row justify-center q-pt-md"},[n("q-btn",{staticClass:"text-capitalize",staticStyle:{"min-width":"100px"},attrs:{push:"",color:"positive",label:"Logout",size:"md"},on:{click:t.handleLogout}})],1):t._e(),t.$q.screen.width<=700||!t.$store.getters.getAuth&&"HomePage"!==t.$route.name?n("cooking-time-info",{staticClass:"q-pt-lg q-pb-sm",attrs:{drawer:!0}}):t._e(),t.$q.screen.width<=700||!t.$store.getters.getAuth&&"HomePage"!==t.$route.name?n("trading-Hours",{staticClass:"q-pt-md q-pb-md",attrs:{drawer:!0}}):t._e(),t.$q.screen.width<=700||!t.$store.getters.getAuth&&"HomePage"!==t.$route.name?n("delivery-charges",{staticClass:"q-pt-md q-pb-md",attrs:{drawer:!0}}):t._e(),n("terms-and-conditions")],1)],1)],1):t._e(),n("q-page-container",[n("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[t.showNotificationsBanner&&t.pushNotificationsSupported?n("div",{staticClass:"banner-container bg-positive"},[n("div",{staticClass:"constrain"},[n("q-banner",{staticClass:"bg-positive text-white",attrs:{"inline-actions":"",dense:""},scopedSlots:t._u([{key:"avatar",fn:function(){return[n("q-avatar",{attrs:{size:"40px",color:"white"}},[n("q-img",{attrs:{contain:"",src:t.images.Logo}})],1)]},proxy:!0},{key:"action",fn:function(){return[n("q-btn",{staticClass:"q-px-sm text-capitalize",attrs:{label:"Yes",dense:"",flat:""},on:{click:t.enableNotifications}}),n("q-btn",{staticClass:"q-px-sm text-capitalize",attrs:{label:"Later",dense:"",flat:""},on:{click:function(e){t.showNotificationsBanner=!1}}}),n("q-btn",{staticClass:"q-px-sm text-capitalize",attrs:{label:"Never",dense:"",flat:""},on:{click:t.neverShowNotificationsBanner}})]},proxy:!0}],null,!1,2041545843)},[n("b",[t._v(" Would you like to enable notifications?")])])],1)]):t._e()]),t.mixin_tabMenuDisplay?n("tab-menu-options"):t._e(),n("transition",{attrs:{name:"component-fade",mode:"out-in"}},[n("router-view")],1),n("q-dialog",{attrs:{persistent:"","full-width":!!t.$q.platform.is.mobile,"full-height":!!t.$q.platform.is.mobile,"transition-show":"slide-up","transition-hide":"slide-down"},model:{value:t.viewPurchaseProcess,callback:function(e){t.viewPurchaseProcess=e},expression:"viewPurchaseProcess"}},[t.viewPurchaseProcess?n("purchaseProcess",{attrs:{viewPurchaseProcess:t.viewPurchaseProcess},on:{"update:viewPurchaseProcess":function(e){t.viewPurchaseProcess=e},"update:view-purchase-process":function(e){t.viewPurchaseProcess=e}}}):t._e()],1),n("q-dialog",{attrs:{persistent:"","full-width":!!t.$q.platform.is.mobile,"full-height":!!t.$q.platform.is.mobile,"transition-show":"slide-up","transition-hide":"slide-down"},model:{value:t.viewPaymentStatusDialog,callback:function(e){t.viewPaymentStatusDialog=e},expression:"viewPaymentStatusDialog"}},[t.viewPaymentStatusDialog?n("payment-result",{attrs:{viewPaymentStatusDialog:t.viewPaymentStatusDialog,paymentResultSuccessful:t.paymentResultSuccessful},on:{"update:viewPaymentStatusDialog":function(e){t.viewPaymentStatusDialog=e},"update:view-payment-status-dialog":function(e){t.viewPaymentStatusDialog=e},"update:paymentResultSuccessful":function(e){t.paymentResultSuccessful=e},"update:payment-result-successful":function(e){t.paymentResultSuccessful=e}}}):t._e()],1)],1),n("q-footer",{staticClass:"bg-transparent"},[!t.$q.platform.is.ios&&t.showAppInstallBanner?n("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[n("div",{staticClass:"banner-container bg-positive"},[n("div",{staticClass:"constrain"},[n("q-banner",{staticClass:"bg-positive text-white",attrs:{"inline-actions":"",dense:""},scopedSlots:t._u([{key:"avatar",fn:function(){return[n("q-avatar",{attrs:{size:"40px",color:"white"}},[n("q-img",{attrs:{contain:"",src:t.images.Logo}})],1)]},proxy:!0},{key:"action",fn:function(){return[n("q-btn",{staticClass:"q-px-sm text-capitalize",attrs:{label:"Yes",dense:"",flat:""},on:{click:t.installApp}}),n("q-btn",{staticClass:"q-px-sm text-capitalize",attrs:{label:"Later",dense:"",flat:""},on:{click:function(e){t.showAppInstallBanner=!1}}}),n("q-btn",{staticClass:"q-px-sm text-capitalize",attrs:{label:"Never",dense:"",flat:""},on:{click:t.neverShowAppInstallBanner}})]},proxy:!0}],null,!1,3591870316)},[n("b",[t._v("Install Black Forest Grill App?")])])],1)])]):t._e(),t.showAppInstallBanner||"HomePage"!==t.$route.name?t._e():n("div",{staticClass:"row"},[n("div",{staticClass:"col-xs-12 text-right q-px-md text-color no-wrap"},[n("q-icon",{attrs:{size:"12px",name:"fas fa-circle",color:t.getOnlineStatus?"positive":"logoRed"}},[n("q-tooltip",{attrs:{self:"top middle","content-class":"bg-white"}},[n("span",{staticClass:"text-color"},[t._v("\n                "+t._s(t.getOnlineStatus?"Server: Online":"Server: Offline")+"\n              ")])])],1),n("span",[t._v(" v"+t._s(t.getLatestVersion)+" ")])],1)]),t.$q.platform.is.ios&&t.$q.platform.is.safari&&t.$q.platform.is.mobile&&t.showAppInstallBanner&&!t.getStandAloneStatus?n("div",[n("div",{staticClass:"row justify-center"},[n("div",{staticClass:"col-xs-12 col-md-4 text-center bg-positive",staticStyle:{"max-height":"70px","min-height":"70px","border-radius":"15px"}},[n("div",{staticClass:"row text-white"},[n("div",{staticClass:"col-xs-12 text-right q-pr-md q-pt-xs"},[n("q-btn",{attrs:{icon:"close",flat:"",round:"",dense:"",size:"sm"},on:{click:t.neverShowAppInstallBanner}})],1)]),n("div",{staticClass:"text-white",staticStyle:{"margin-top":"-17px"}},[t._v("\n              Install this webapp on your iPhone,\n              "),n("br"),t._v("\n              Tap\n              "),n("q-img",{staticClass:"q-mb-xs",attrs:{height:"22px",width:"22px",src:t.images.AppleShareIcon}}),t._v("\n              and then add to homescreen\n            ")],1)])]),n("div",{staticClass:"row justify-center"},[n("div",{staticStyle:{width:"0",height:"0","border-left":"20px solid transparent","border-right":"20px solid transparent","border-top":"20px solid #019247"}})])]):t._e()],1)],1)],1)},a=[],r=(n("13d5"),n("d3b7"),n("e6cf"),n("bf19"),n("96cf"),n("c973")),o=n.n(r),c=n("c0fd"),u=n("8f46"),l=(n("caad"),n("2532"),function(){return Promise.resolve().then(n.bind(null,"5f87"))}),p={components:{},mixins:[],props:{},data:function(){return{}},computed:{hasAccessToken:function(){var t=this;return o()(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l().then((function(t){return t.isLoggedIn}));case 2:return n=e.sent,e.abrupt("return",t.$store.getters.getAuth&&n());case 4:case"end":return e.stop()}}),e)})))()},hasNoPermissions:function(){return!this.$store.getters.getUserPermissions.includes("read:systemData")},userMainMenuItems:function(){return this.hasAccessToken&&this.hasNoPermissions?[{name:"Home Page",routeLink:"/",icon:"fas fa-home",routeName:"HomePage"},{name:"My Profile",routeLink:"/view-my-profile",icon:"fas fa-user",routeName:"myProfile"},{name:"Order History",routeLink:"/order-history",icon:"fas fa-list",routeName:"orderHistory"}]:[]}},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{}},h=n("e2ad"),m=n("9149"),d=function(){return Promise.resolve().then(n.bind(null,"5f87"))},g=function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"3524"))},f=function(){return"standalone"in window.navigator&&window.navigator.standalone},v={name:"MainLayout",mixins:[c["a"],u["a"],p],components:{purchaseProcess:function(){return Promise.all([n.e(0),n.e(1),n.e(12)]).then(n.bind(null,"f55e"))},"delivery-charges":function(){return n.e(7).then(n.bind(null,"7b10"))},"payment-result":function(){return Promise.all([n.e(0),n.e(37)]).then(n.bind(null,"5a5c"))},"trading-Hours":function(){return n.e(8).then(n.bind(null,"f3e1"))},"cooking-time-info":function(){return n.e(1).then(n.bind(null,"0cb5"))},"tab-menu-options":function(){return Promise.all([n.e(0),n.e(38)]).then(n.bind(null,"73be"))},"terms-and-conditions":function(){return n.e(5).then(n.bind(null,"a99f"))}},computed:{getLatestVersion:function(){return"2.1"},serviceWorkerSupported:function(){return"serviceWorker"in navigator},pushNotificationsSupported:function(){return"PushManager"in window},getAdminMainMenuItem:function(){return this.adminMainMenuItems},getUserMainMenuItem:function(){return this.userMainMenuItems},hasItemsInOrder:function(){return null!=this.$store.getters.getBasket&&this.$store.getters.getBasket.length>0},getItemsInOrderCount:function(){return this.$store.getters.getBasket.reduce((function(t,e){return+t+ +e.quantity}),0)},getOnlineStatus:function(){return navigator.onLine},getStandAloneStatus:function(){return f()}},data:function(){return{images:{Logo:n("d1e0"),AppleShareIcon:n("5971")},viewPurchaseProcess:!1,showAppInstallBanner:!1,showNotificationsBanner:!1,viewPaymentStatusDialog:!1,paymentResultSuccessful:!1,menuDrawerOpen:!1}},beforeMount:function(){this.$store.getters.getAuth&&(Object(h["a"])(),this.$store.dispatch("retrieveDefaultSettings"),this.$store.dispatch("retrievePlatformStatus"))},mounted:function(){var t=this;return o()(regeneratorRuntime.mark((function e(){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.$route.query||!t.$route.query.tr){e.next=10;break}return t.$q.loading.show({spinner:m["a"],spinnerColor:"positive",backgroundColor:"darkgrey",message:"Processing...."}),e.next=4,t.$store.dispatch("queryTransactionResult",t.$route.query.tr);case 4:n=e.sent,n&&t.$store.commit("updateBasket",[]),t.$q.loading.hide(),t.viewPaymentStatusDialog=!0,t.paymentResultSuccessful=n,t.$store.commit("setTranId",null);case 10:t.$store.getters.getTranId&&t.$store.dispatch("updateOutstandingTransaction"),i=t.$q.localStorage.getItem("neverShowAppInstallBanner"),i||(window.addEventListener("beforeinstallprompt",(function(e){e.preventDefault(),s=e,setTimeout((function(){var e=t.$q.localStorage.getItem("neverShowAppInstallBanner");e||(t.showAppInstallBanner=!0)}),2e3)})),t.$q.platform.is.ios&&t.$q.platform.is.mobile&&setTimeout((function(){var e=t.$q.localStorage.getItem("neverShowAppInstallBanner");e||(t.showAppInstallBanner=!0)}),2e3));case 13:case"end":return e.stop()}}),e)})))()},watch:{"$store.getters.getAuth":function(){this.$store.getters.getAuth&&this.initNotificationsBanner()},viewPurchaseProcess:function(){this.viewPurchaseProcess?this.$store.commit("setViewingPurchaseProcess",!0):this.$store.commit("setViewingPurchaseProcess",!1)}},methods:{showPurchaseProcessDialog:function(){var t=this;return o()(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(h["a"])();case 2:n=e.sent,n||(t.viewPurchaseProcess=!0);case 4:case"end":return e.stop()}}),e)})))()},installApp:function(){var t=this;this.showAppInstallBanner=!1,s.prompt(),s.userChoice.then((function(e){"accepted"===e.outcome?(console.log("User accepted the install prompt"),t.neverShowAppInstallBanner()):(console.log("User dismissed the install prompt"),t.showAppInstallBanner=!1)}))},neverShowAppInstallBanner:function(){this.$q.localStorage.set("neverShowAppInstallBanner",!0),this.showAppInstallBanner=!1},handleLogout:function(){return o()(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,d().then((function(t){return t.logout}));case 2:e=t.sent,e();case 4:case"end":return t.stop()}}),t)})))()},proceedToLink:function(t){this.$router.push(t).catch((function(){}))},goHome:function(){this.menuDrawerOpen=!1,this.$router.push("/").catch((function(){}))},initNotificationsBanner:function(){var t=this.$q.localStorage.getItem("neverShowNotificationsBanner");t||(this.showNotificationsBanner=!0)},enableNotifications:function(){var t=this;return o()(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.pushNotificationsSupported&&Notification.requestPermission(function(){var e=o()(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.neverShowNotificationsBanner(),"granted"==n&&t.checkForExistingPushSubscription();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e)})))()},checkForExistingPushSubscription:function(){var t,e=this;this.serviceWorkerSupported&&this.pushNotificationsSupported&&navigator.serviceWorker.ready.then((function(e){return t=e,e.pushManager.getSubscription()})).then((function(n){e.createPushSubscription(t)}))},createPushSubscription:function(t){var e=this;return o()(regeneratorRuntime.mark((function s(){var i,a,r;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return i="BJeT3WbOLmulqq1RNixIGxdtDcO7oxIZ2XYzZtk5MV0ucrbMrGIq-JLW26x53JTh33hBeoI_aOu31XM8Z3Mq2kE",s.next=3,g().then((function(t){return t.urlBase64ToUint8Array}));case 3:a=s.sent,r=a(i),t.pushManager.subscribe({applicationServerKey:r,userVisibleOnly:!0}).then(function(){var t=o()(regeneratorRuntime.mark((function t(s){var i,a,r,o,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=n("4328"),a=s.toJSON(),r=i.stringify(a),o={subscriptionObj:r,isMobile:e.$q.platform.is.mobile,isDesktop:!e.$q.platform.is.mobile},t.next=5,e.$store.dispatch("subscribeNotifications",o);case 5:c=t.sent,c&&e.displayGrantedNotification();case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){console.log("err: ",t)}));case 6:case"end":return s.stop()}}),s)})))()},displayGrantedNotification:function(){this.serviceWorkerSupported&&this.pushNotificationsSupported&&navigator.serviceWorker.ready.then((function(t){t.showNotification("You're subscribed to notifications!",{body:"Thanks for subscribing!",icon:"icons/icon-128x128.png",image:"icons/icon-128x128.png",badge:"icons/icon-128x128.png",dir:"ltr",lang:"en-US",vibrate:[100,50,200],tag:"confirm-notification",renotify:!0})}))},neverShowNotificationsBanner:function(){this.showNotificationsBanner=!1,this.$q.localStorage.set("neverShowNotificationsBanner",!0)}}},w=v,b=n("2877"),x=n("4d5a"),A=n("e359"),q=n("65c6"),y=n("9c40"),P=n("58a81"),S=n("9404"),k=n("4983"),$=n("1c1c"),I=n("eb85"),B=n("66e5"),C=n("4074"),M=n("0016"),N=n("09e3"),_=n("54e1"),R=n("cb32"),D=n("068f"),L=n("24e8"),O=n("7ff0"),U=n("05c0"),T=n("714f"),H=n("eebe"),Q=n.n(H),V=Object(b["a"])(w,i,a,!1,null,null,null);e["default"]=V.exports;Q()(V,"components",{QLayout:x["a"],QHeader:A["a"],QToolbar:q["a"],QBtn:y["a"],QBadge:P["a"],QDrawer:S["a"],QScrollArea:k["a"],QList:$["a"],QSeparator:I["a"],QItem:B["a"],QItemSection:C["a"],QIcon:M["a"],QPageContainer:N["a"],QBanner:_["a"],QAvatar:R["a"],QImg:D["a"],QDialog:L["a"],QFooter:O["a"],QTooltip:U["a"]}),Q()(V,"directives",{Ripple:T["a"]})},5971:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAISSURBVEhLxZa/TsMwEMbtkPSBUGdUpD4AA30KWJh4EXgLBvZWagtIlZAqsVaMMFVIZU2Txtzn2MF24/xBKf1JVuw4vs8+n8/hw+EgYIxxKkCop26boE9MJjPhGQPccb4+AeETqpQJuewgKmt3ojA4eDiLwhAmWiEw8zogIkVpktwUBbPLpyRNd6rVHAhbhhzQp93LJxfTLH9tA/EkSVWrGXUrLrbAJ6qZj55JPFGteswgAaEqJoHrXh/z0UtjZXfFW/V0xTtHRvV4PJXRwXm+eBlEDsvlG9tsvvf2evh4HglisXgN+v3TtNeLVI+NihN9gvLjZAlXuJVE4KGAhItIgjA9stXqnX3cfvrD+5pDC6IQt48TTVzV9tAG3ZgoWK+/9ODSIFSixVgYahI4OkOUioI4jrUdN240sFH0+T4CGVxrFnpXPUlyp3Rp/n1lOoMx3yrwHv0woGfr+9ZagEqtlZO0BjhAxBTyiUpoD0MEKpUAhV6heNNZlfBf0F5CQd2bD7oWbgyEm0R15xx1xUdBB0FTsC07eV4Z60U3UUBHB5FbeWWW0XbFGeV13AlMXLFku01kncQh3Eq8tatxkbhF0cZz9rUI+P1vlFPac+84nZHMkwBBXSzoFit+DBxb8nYyjdQB4xij02hdKvXS2tVdcTThyj3ukrI9ljgRegisBf2nq62zLn/A1MV9cKBFD1osYz80FdCm0n8XewAAAABJRU5ErkJggg=="},d1e0:function(t,e,n){t.exports=n.p+"img/logo-min.79b7b29a.png"}}]);