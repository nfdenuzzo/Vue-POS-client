(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[45],{"8ccc":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"text-color"},[a("div",{staticClass:"text-h6 text-weight-bolder q-pt-md text-center q-pb-lg"},[e._v("\n    My Profile\n  ")]),a("div",{staticClass:"row justify-center"},[a("div",{staticClass:"col-xs-12 col-sm-12 col-md-8"},[a("q-card",{staticClass:"q-pa-md"},[e.updateProfileObj?a("q-form",{ref:"myForm",on:{submit:e.onSubmit}},[a("div",{staticClass:"row justify-center"},[a("div",{staticClass:"col-xs-11 col-md-5 col-lg-5 q-pa-md"},[a("q-input",{attrs:{outlined:"",label:"Email",color:"positive",disable:!0},model:{value:e.updateProfileObj.userEmail,callback:function(t){e.$set(e.updateProfileObj,"userEmail",t)},expression:"updateProfileObj.userEmail"}})],1),a("div",{staticClass:"col-xs-11 col-md-5 col-lg-5 q-pa-md"},[a("q-input",{attrs:{outlined:"",label:"Prefered username","lazy-rules":"",color:"positive"},model:{value:e.updateProfileObj.name,callback:function(t){e.$set(e.updateProfileObj,"name",t)},expression:"updateProfileObj.name"}})],1),a("div",{staticClass:"col-xs-11 col-md-5 col-lg-5 q-pa-md"},[a("q-input",{attrs:{outlined:"",label:"Address",autogrow:"","lazy-rules":"",color:"positive",rules:[function(e){return e&&e.length>0&&/\S/.test(e)||"Address is required!"}]},model:{value:e.updateProfileObj.address,callback:function(t){e.$set(e.updateProfileObj,"address",t)},expression:"updateProfileObj.address"}})],1),a("div",{staticClass:"col-xs-11 col-md-5 col-lg-5 q-pa-md"},[a("q-input",{attrs:{outlined:"",label:"Address Line 2",autogrow:"",color:"positive"},model:{value:e.updateProfileObj.addressLine2,callback:function(t){e.$set(e.updateProfileObj,"addressLine2",t)},expression:"updateProfileObj.addressLine2"}})],1),a("div",{staticClass:"col-xs-11 col-md-5 col-lg-5 q-pa-md"},[a("q-select",{attrs:{outlined:"",options:e.deliveryAreas,label:"Select Delivery Area",color:"positive",dense:"","use-input":"","input-debounce":"0","option-value":"_id","option-label":"area","lazy-rules":"",rules:[function(e){return null!=e||"Please select a delivery area!"}]},on:{filter:e.filterFn},scopedSlots:e._u([{key:"no-option",fn:function(){return[a("q-item",[a("q-item-section",{staticClass:"text-italic text-grey"},[e._v("\n                      No options available\n                    ")])],1)]},proxy:!0}],null,!1,3809330998),model:{value:e.updateProfileObj.deliveryArea,callback:function(t){e.$set(e.updateProfileObj,"deliveryArea",t)},expression:"updateProfileObj.deliveryArea"}})],1),a("div",{staticClass:"col-xs-11 col-md-5 col-lg-5 q-pa-md"},[a("q-input",{attrs:{outlined:"",label:"Contact number","lazy-rules":"",mask:"(###) ### - ####",color:"positive",rules:[function(e){return e&&e.length>0&&/\S/.test(e)||"Contact number is required!"}]},model:{value:e.updateProfileObj.contactNumber,callback:function(t){e.$set(e.updateProfileObj,"contactNumber",t)},expression:"updateProfileObj.contactNumber"}})],1)]),e.$q.platform.is.ios?e._e():a("div",{staticClass:"row justify-center"},[a("div",{staticClass:"col-xs-10"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-11 col-md-5 col-lg-5 q-pa-md"},[a("q-checkbox",{attrs:{"left-label":"",label:"Subscribe to Phone Notifications",color:"positive"},model:{value:e.updateProfileObj.notificationsEnabled,callback:function(t){e.$set(e.updateProfileObj,"notificationsEnabled",t)},expression:"updateProfileObj.notificationsEnabled"}})],1)])])]),a("div",{staticClass:"row justify-center"},[a("div",{staticClass:"col-xs-10"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-11 col-md-5 col-lg-5 q-pa-md"},[a("q-checkbox",{attrs:{"left-label":"",label:"Subscribe to Email Notifications",color:"positive"},model:{value:e.updateProfileObj.emailNotificationsEnabled,callback:function(t){e.$set(e.updateProfileObj,"emailNotificationsEnabled",t)},expression:"updateProfileObj.emailNotificationsEnabled"}})],1)])])]),a("div",{staticClass:"row justify-center q-pb-md"},[a("q-btn",{staticClass:"q-mr-lg text-capitalize",attrs:{label:"Reset",color:"logoRed"},on:{click:e.onReset}}),a("q-btn",{staticClass:"text-capitalize",attrs:{label:"Update Profile",type:"submit",color:"positive",loading:e.updateBtnLoading}})],1)]):a("div",[a("q-spinner-hourglass",{attrs:{color:"logoRed",size:"6em"}})],1)],1)],1)])])},o=[],s=(a("4de4"),a("c975"),a("96cf"),a("c973")),r=a.n(s),l=a("3524"),n={components:{},mixins:[],props:{},data:function(){return{deliveryAreas:[],updateProfileObj:null,updateBtnLoading:!1}},computed:{getCurrentProfile:function(){return this.$store.getters.getMyProfile}},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){var e=this;return r()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.assignData();case 2:case"end":return t.stop()}}),t)})))()},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{assignData:function(){var e=this;return r()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.updateProfileObj=JSON.parse(JSON.stringify(e.getCurrentProfile));case 1:case"end":return t.stop()}}),t)})))()},onSubmit:function(){var e=this;return r()(regeneratorRuntime.mark((function t(){var a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.updateBtnLoading=!0,!e.updateProfileObj.notificationsEnabled){t.next=8;break}return t.next=4,Object(l["webPushCreateSub"])();case 4:a=t.sent,e.updateProfileObj.subscriptionObject=a,e.updateProfileObj.isMobile=e.$q.platform.is.mobile,e.updateProfileObj.isDesktop=!e.$q.platform.is.mobile;case 8:return t.next=10,e.$store.dispatch("updateUserProfile",e.updateProfileObj);case 10:i=t.sent,i&&200===i.status&&e.$q.notify({type:"positive",message:"Profile updated successfully.",color:"positive"}),e.updateBtnLoading=!1;case 13:case"end":return t.stop()}}),t)})))()},onReset:function(){var e=this;return r()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.assignData();case 2:e.$refs.myForm.reset();case 3:case"end":return t.stop()}}),t)})))()},filterFn:function(e,t,a){var i=this;t((function(){var t=e.toLocaleLowerCase();i.deliveryAreas=i.$store.getters.getDeliveryCharges.filter((function(e){return e.area.toLocaleLowerCase().indexOf(t)>-1}))}))},setModel:function(e){this.deliveryAreas=e}}},c=n,u=a("2877"),d=a("f09f"),p=a("0378"),f=a("27f9"),b=a("ddd8"),m=a("66e5"),v=a("4074"),g=a("8f8e"),x=a("9c40"),P=a("9149"),j=a("eebe"),O=a.n(j),C=Object(u["a"])(c,i,o,!1,null,null,null);t["default"]=C.exports;O()(C,"components",{QCard:d["a"],QForm:p["a"],QInput:f["a"],QSelect:b["a"],QItem:m["a"],QItemSection:v["a"],QCheckbox:g["a"],QBtn:x["a"],QSpinnerHourglass:P["a"]})}}]);