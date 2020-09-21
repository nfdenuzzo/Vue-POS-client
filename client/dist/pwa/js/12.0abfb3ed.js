(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{"1d53":function(e,t,r){},"27ae":function(e,t,r){"use strict";var s=r("1d53"),i=r.n(s);i.a},e0b5:function(e,t,r){"use strict";var s=r("fd95"),i=r.n(s);i.a},f55e:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-card",{style:e.$q.platform.is.mobile?"":"width: 750px;"},[r("q-stepper",{ref:"stepper",attrs:{color:"primary",animated:"",vertical:e.$q.screen.lt.sm,horizontal:e.$q.screen.gt.sm,"keep-alive":!0},scopedSlots:e._u([{key:"navigation",fn:function(){return[r("div",{attrs:{clas:"q-pa-md"}},[r("div",{staticClass:"row justify-center q-pb-md"},[r("q-stepper-navigation",[r("div",{staticClass:"row justify-center q-pb-md q-pt-sm"},[e.step>1?r("q-btn",{staticClass:"q-mr-lg text-capitalize",attrs:{color:"logoRed",label:"Back"},on:{click:function(t){return e.$refs.stepper.previous()}}}):r("q-btn",{staticClass:"q-mr-lg text-capitalize",attrs:{label:"Order more",color:"logoRed"},on:{click:e.closeDialog}}),e.hasItemsInOrder?r("q-btn",{staticClass:"text-capitalize",attrs:{label:e.getLabel,color:"positive",disabled:!e.$store.getters.getAuth},on:{click:e.proceed}}):e._e()],1)])],1)])]},proxy:!0}]),model:{value:e.step,callback:function(t){e.step=t},expression:"step"}},[r("q-step",{attrs:{name:1,title:"Confirm Order",icon:"fas fa-receipt",done:e.step>1,"done-color":"positive","active-color":"logoRed"}},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-xs-12"},[1===e.step?r("basket",{ref:"basket",attrs:{viewPurchaseProcess:e.viewPurchaseProcess}}):e._e()],1)])]),r("q-step",{attrs:{name:2,title:"Order Details",icon:"fas fa-receipt","done-color":"positive","active-color":"logoRed",done:e.step>2}},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-xs-12"},[2===e.step?r("orderDetails",{ref:"orderDetail",on:{proceedPaymentMethod:e.proceedPaymentMethod}}):e._e()],1)])]),r("q-step",{attrs:{name:3,title:"Payment Method",icon:"far fa-credit-card","done-color":"positive","active-color":"logoRed"}},[3===e.step?r("purchaseSummary",{ref:"purchaseSummary",attrs:{orderTotal:e.orderTotal,orderDeliveryCharge:e.orderDeliveryCharge},on:{placeOrder:e.placeOrder}}):e._e()],1)],1)],1)},i=[],n=(r("e260"),r("d3b7"),r("25f0"),r("3ca3"),r("ddb0"),r("2b3d"),r("96cf"),r("c973")),a=r.n(n),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"text-color"},[r("q-card-section",{staticClass:"text-color row items-center q-pb-none"},[r("div",{staticClass:"col-xs-11"},[r("div",{staticClass:"text-weight-bolder q-pb-xs text-center text-subtitle1"},[e._v("\n        Your Order\n      ")])])]),r("div",{staticClass:"text-color row items-center text-center q-pb-none"},[r("div",{staticClass:"col-xs-11 text-weight-bold"},[e._v(e._s(e.itemsInOrder)+" Items")])]),r("q-card-section",{staticClass:"text-color row items-center q-pa-sm"},[e.hasItemsInOrder?r("div",{staticClass:"col-xs-12"},[r("div",{staticClass:"row"},e._l(e.showItemsInOrder,(function(e,t){return r("div",{key:t,staticClass:"col-xs-12 q-px-xs q-py-sm"},[r("q-card",[r("order-item-display",{attrs:{menuItemDetails:e}})],1)],1)})),0),r("div",{staticClass:"row q-pt-md q-px-lg"},[r("div",{staticClass:"col-xs-12 text-right text-weight-bolder text-caption"},[e._v("\n          Items Total: R "+e._s(e.itemTotal)+"\n        ")])]),r("div",{staticClass:"row q-px-lg"},[e.basketExtrasCost?r("div",{staticClass:"col-xs-12 text-right text-weight-bolder text-caption"},[e._v("\n          Extra's Total: R "+e._s(e.basketExtrasCost)+"\n        ")]):e._e()]),r("div",{staticClass:"row q-px-lg"},[r("div",{staticClass:"col-xs-12 text-right text-weight-bolder text-caption"},[e._v("\n          VAT "+e._s((100*e.$store.getters.getVATRate).toFixed(2))+"% (Already\n          Included): R "+e._s(e.vatTotal)+"\n        ")])]),r("div",{staticClass:"row q-px-lg"},[r("div",{staticClass:"col-xs-12 text-right text-weight-bolder text-subtitle1"},[e._v("\n          Order Total: R "+e._s(e.basketTotal)+"\n        ")])])]):r("div",[e._v("\n      please select an item to order\n    ")])])],1)},c=[],l=(r("4160"),r("13d5"),r("a9e3"),r("b680"),r("e6cf"),r("159b"),{components:{"order-item-display":function(){return r.e(7).then(r.bind(null,"cba2"))}},mixins:[],props:{viewPurchaseProcess:{type:Boolean,default:!1,required:!0}},data:function(){return{}},computed:{hasItemsInOrder:function(){return this.$store.getters.getBasket.length>0},showItemsInOrder:function(){return this.$store.getters.getBasket},itemsInOrder:function(){return this.$store.getters.getBasket.reduce((function(e,t){return+e+ +t.quantity}),0)},vatTotal:function(){return(this.basketTotal*Number(this.$store.getters.getVATRate)).toFixed(2)},basketTotal:function(){return this.itemTotal+this.basketExtrasCost},itemTotal:function(){return this.$store.getters.getBasket.reduce((function(e,t){return+e+ +t.price*t.quantity}),0)},basketExtrasCost:function(){var e=0;return this.showItemsInOrder.forEach((function(t){t.makeCalzone&&(e+=t.calzonePrice),t.extraBurgerToppings.length>0&&(e+=t.extraBurgerToppings.reduce((function(e,t){return+e+ +t.price}),0)),t.extraDessertToppings.length>0&&(e+=t.extraDessertToppings.reduce((function(e,t){return+e+ +t.price}),0)),t.extraMainOptions.length>0&&(e+=t.extraMainOptions.reduce((function(e,t){return+e+ +t.price}),0)),t.extraPastaToppings.length>0&&(e+=t.extraPastaToppings.reduce((function(e,t){return+e+ +t.price}),0)),t.extraPizzaToppings.length>0&&(e+=t.extraPizzaToppings.reduce((function(e,t){return+e+ +t.price}),0)),t.extraSaladToppings.length>0&&(e+=t.extraSaladToppings.reduce((function(e,t){return+e+ +t.price}),0)),t.extraSuaces.length>0&&(e+=t.extraSuaces.reduce((function(e,t){return+e+ +t.price}),0))})),e}},watch:{hasItemsInOrder:function(){this.hasItemsInOrder||this.$emit("update:viewPurchaseProcess",!1)}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{}}),d=l,u=r("2877"),p=r("a370"),f=r("f09f"),m=r("eebe"),v=r.n(m),x=Object(u["a"])(d,o,c,!1,null,null,null),b=x.exports;v()(x,"components",{QCardSection:p["a"],QCard:f["a"]});var h=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"row justify-center"},[e.updateOrderDetailsObj?r("div",{staticClass:"col-xs-12 col-sm-12"},[r("q-card",{staticClass:"q-pa-md"},[r("q-form",{ref:"myForm",on:{submit:e.onSubmit}},[r("div",{staticClass:"row justify-center"},[r("div",{staticClass:"col-xs-12"},[e.hasExistingContactNumber?r("div",{staticClass:"col-xs-6 text-center q-pa-md text-color text-weight-bold"},[r("q-checkbox",{attrs:{"left-label":"",label:"Use existing contact number",color:"positive"},model:{value:e.useExistingContactNumber,callback:function(t){e.useExistingContactNumber=t},expression:"useExistingContactNumber"}})],1):e._e(),e.useExistingContactNumber?e._e():r("div",{staticClass:"col-xs-11 q-pa-md"},[r("q-input",{attrs:{outlined:"",label:"Contact number","lazy-rules":"",mask:"(###) ### - ####",color:"positive",rules:[function(e){return e&&/\S/.test(e)||"Contact number is required!"},function(e){return 16===e.length||"Valid contact number is required"}]},model:{value:e.updateOrderDetailsObj.contactNumber,callback:function(t){e.$set(e.updateOrderDetailsObj,"contactNumber",t)},expression:"updateOrderDetailsObj.contactNumber"}})],1),r("div",{staticClass:"col-xs-11 items-center "},[r("div",{staticClass:"row justify-center text-center"},[r("div",[r("q-field",{staticClass:"delivery-fit-content",attrs:{dense:"",borderless:"",value:e.deliveryType,rules:[function(e){return null!=e||"Please select delivery type!"}]},scopedSlots:e._u([{key:"control",fn:function(){return[r("div",{staticClass:"col-xs-12 justify-around text-center text-color text-weight-bold"},[r("q-option-group",{attrs:{inline:"",options:e.options,color:"positive"},model:{value:e.deliveryType,callback:function(t){e.deliveryType=t},expression:"deliveryType"}})],1)]},proxy:!0}],null,!1,2787245896)})],1)])])])]),"Delivery"===e.deliveryType?r("div",{staticClass:"row justify-center"},[r("div",{staticClass:"col-xs-12 items-center"},[e.hasExistingAddresss?r("div",{staticClass:"col-xs-6 text-center text-color text-weight-bold"},[r("q-checkbox",{attrs:{"left-label":"",label:"Use existing delivery address",color:"positive"},model:{value:e.useExistingAddress,callback:function(t){e.useExistingAddress=t},expression:"useExistingAddress"}})],1):e._e(),e.useExistingAddress?e._e():r("div",{staticClass:"col-xs-11 q-pa-md"},[r("q-input",{attrs:{outlined:"",label:"Delievery Address",autogrow:"","lazy-rules":"",color:"positive",rules:[function(e){return e&&e.length>0&&/\S/.test(e)||"Address is required!"}]},model:{value:e.updateOrderDetailsObj.address,callback:function(t){e.$set(e.updateOrderDetailsObj,"address",t)},expression:"updateOrderDetailsObj.address"}})],1),e.useExistingAddress?e._e():r("div",{staticClass:"col-xs-11 q-pa-md"},[r("q-input",{attrs:{outlined:"",label:"Delievery Address Line 2",autogrow:"",color:"positive"},model:{value:e.updateOrderDetailsObj.addressLine2,callback:function(t){e.$set(e.updateOrderDetailsObj,"addressLine2",t)},expression:"updateOrderDetailsObj.addressLine2"}})],1),e.useExistingAddress?e._e():r("div",{staticClass:"col-xs-11 q-pt-md q-px-md"},[r("q-select",{attrs:{outlined:"",options:e.deliveryAreas,label:"Select Delivery Area",color:"positive",dense:"","use-input":"","input-debounce":"0","option-value":"_id","option-label":"area","lazy-rules":"",rules:[function(e){return null!=e||"Please select a delivery area!"}]},on:{filter:e.filterFn},scopedSlots:e._u([{key:"no-option",fn:function(){return[r("q-item",[r("q-item-section",{staticClass:"text-italic text-grey"},[e._v("\n                      No options available\n                    ")])],1)]},proxy:!0}],null,!1,3809330998),model:{value:e.updateOrderDetailsObj.deliveryArea,callback:function(t){e.$set(e.updateOrderDetailsObj,"deliveryArea",t)},expression:"updateOrderDetailsObj.deliveryArea"}})],1),"Delivery"===e.deliveryType?r("div",{staticClass:"col-xs-11 q-px-md text-color text-center text-weight-bold"},[e._v("\n              Delivery cost R "+e._s(e.getDeliveryCost)+"\n            ")]):e._e()])]):e._e(),r("div",{staticClass:"col-xs-6 text-center q-px-md q-pt-md text-color text-weight-bold"},[r("q-checkbox",{attrs:{"left-label":"",label:"Notify me when the status of my order changes",color:"positive"},model:{value:e.subscribe,callback:function(t){e.subscribe=t},expression:"subscribe"}})],1),r("div",{staticClass:"col-xs-6 text-center text-caption text-color text-weight-bold q-pt-sm"},[e._v("\n          Notifications will be sent to you when - Your order has been\n          processed. "),r("br"),e._v("Your order is being prepared. "),r("br"),e._v("Your order is\n          ready.\n          "),"Delivery"===e.deliveryType?r("span",[r("br"),e._v("Your order is out for Delivery")]):e._e(),"Delivery"!==e.deliveryType?r("span",[r("br"),e._v("Your order is ready for Collection")]):e._e()])])],1)],1):e._e()])},g=[],y=(r("4de4"),r("c975"),r("3524")),C={components:{},mixins:[],props:{},data:function(){return{options:[{label:"Collection",value:"Collection"},{label:"Delivery",value:"Delivery"}],updateOrderDetailsObj:null,useExistingAddress:!1,useExistingContactNumber:!1,hasExistingAddresss:!1,hasExistingContactNumber:!1,deliveryType:null,deliveryAreas:[],subscribe:!1}},computed:{getCurrentProfile:function(){return this.$store.getters.getMyProfile},getDeliveryCost:function(){return"Delivery"===this.deliveryType&&this.updateOrderDetailsObj.deliveryArea?this.updateOrderDetailsObj.deliveryArea.price:0}},watch:{useExistingAddress:function(){this.useExistingAddress&&(this.updateOrderDetailsObj.address=this.getCurrentProfile.address,this.updateOrderDetailsObj.addressLine2=this.getCurrentProfile.addressLine2,this.updateOrderDetailsObj.deliveryArea=this.getCurrentProfile.deliveryArea)},useExistingContactNumber:function(){this.useExistingAddress&&(this.updateOrderDetailsObj.contactNumber=this.getCurrentProfile.contactNumber)}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){var e=this;return a()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.assignData();case 2:case"end":return t.stop()}}),t)})))()},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{filterFn:function(e,t,r){var s=this;t((function(){var t=e.toLocaleLowerCase();s.deliveryAreas=s.$store.getters.getDeliveryCharges.filter((function(e){return e.area.toLocaleLowerCase().indexOf(t)>-1}))}))},setModel:function(e){this.deliveryAreas=e},assignData:function(){var e=this;return a()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.updateOrderDetailsObj=JSON.parse(JSON.stringify(e.getCurrentProfile)),e.updateOrderDetailsObj&&e.updateOrderDetailsObj.address?(e.hasExistingAddresss=!0,e.useExistingAddress=!0):e.useExistingAddress=!1,e.updateOrderDetailsObj&&e.updateOrderDetailsObj.contactNumber?(e.hasExistingContactNumber=!0,e.useExistingContactNumber=!0):e.useExistingContactNumber=!1;case 3:case"end":return t.stop()}}),t)})))()},onSubmit:function(){var e=this;return a()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$refs.myForm.validate().then(function(){var t=a()(regeneratorRuntime.mark((function t(r){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!r){t.next=7;break}return t.next=3,e.createDTO();case 3:s=t.sent,e.$emit("proceedPaymentMethod",{dto:s,deliveryCost:e.getDeliveryCost}),t.next=7;break;case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 2:case"end":return t.stop()}}),t)})))()},createDTO:function(){var e=this;return a()(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.updateOrderDetailsObj.subscribeNotifications=e.subscribe,!e.updateOrderDetailsObj.subscribeNotifications){t.next=5;break}return t.next=4,Object(y["b"])();case 4:e.updateOrderDetailsObj.subscriptionObject=t.sent;case 5:return r=JSON.parse(JSON.stringify(e.updateOrderDetailsObj)),r.orderType=e.deliveryType,"Delivery"!==e.deliveryType&&(delete r.deliveryArea,delete r.address,delete r.addressLine2),t.abrupt("return",r);case 9:case"end":return t.stop()}}),t)})))()}}},_=C,O=(r("e0b5"),r("0378")),w=r("8f8e"),q=r("27f9"),D=r("8572"),k=r("9f0a"),T=r("ddd8"),j=r("66e5"),$=r("4074"),A=Object(u["a"])(_,h,g,!1,null,null,null),P=A.exports;v()(A,"components",{QCard:f["a"],QForm:O["a"],QCheckbox:w["a"],QInput:q["a"],QField:D["a"],QOptionGroup:k["a"],QSelect:T["a"],QItem:j["a"],QItemSection:$["a"]});var R=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"text-color"},[r("q-card-section",{staticClass:"text-color row items-center q-pb-none"},[r("div",{staticClass:"col-xs-12"},[r("div",{staticClass:"text-weight-bolder q-pb-xs text-center text-subtitle1"},[e._v("\n        Order Summary\n      ")])])]),r("div",{staticClass:"row justify-center text-color"},[r("div",{staticClass:"col-xs-10 q-pa-sm"},[r("q-card",[r("div",{staticClass:"row q-pa-sm"},[e._l(e.showItemsInOrder,(function(t,s){return r("div",{key:s,staticClass:"col-xs-12 q-px-md q-py-xs"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-xs-6"},[e._v("\n                "+e._s(t.quantity)+" x "+e._s(t.name)+"\n              ")]),r("div",{staticClass:"col-xs-6 text-right"},[e._v("\n                R "+e._s(t.price*t.quantity)+"\n              ")])])])})),r("div",{staticClass:"row q-px-md q-pt-md"},[r("div",{staticClass:"col-xs-12 text-weight-bold"},[e._v("\n              Total items in Basket: "+e._s(e.itemsInOrder)+"\n            ")])])],2),r("div",{staticClass:"row q-pb-sm q-pa-sm"},[r("div",{staticClass:"col-xs-12 q-px-md q-py-xs q-pb-md"},[r("div",{staticClass:"col-xs-12 text-weight-bold text-right"},[e._v("\n              SubTotal (Items + Extras): R "+e._s(e.orderTotal)+"\n            ")]),r("div",{staticClass:"col-xs-12 text-weight-bold text-right"},[e._v("\n              VAT (Already Included): R "+e._s(e.vatTotal)+"\n            ")]),e.orderDeliveryCharge>0?r("div",{staticClass:"col-xs-12 text-weight-bold text-right"},[e._v("\n              Delivery fee: R "+e._s(e.orderDeliveryCharge)+"\n            ")]):e._e(),r("div",{staticClass:"col-xs-12 text-weight-bolder text-right"},[e._v("\n              Total Due: R "+e._s(e.orderTotal+e.orderDeliveryCharge)+"\n            ")])])])])],1)]),r("div",{staticClass:"col-xs-11 items-center "},[r("div",{staticClass:"row justify-center text-center"},[r("q-form",{ref:"myForm",on:{submit:e.onSubmit}},[r("q-field",{staticClass:"delivery-fit-content",attrs:{dense:"",borderless:"",value:e.paymentType,rules:[function(e){return null!=e||"Please select an option!"}]},scopedSlots:e._u([{key:"control",fn:function(){return[r("div",{staticClass:"col-xs-12 justify-around text-center text-color text-weight-bold"},[r("q-option-group",{attrs:{inline:"",options:e.options,color:"positive"},model:{value:e.paymentType,callback:function(t){e.paymentType=t},expression:"paymentType"}})],1)]},proxy:!0}])})],1)],1)])],1)},E=[],S={components:{},mixins:[],props:{orderTotal:{type:Number,default:0,required:!0},orderDeliveryCharge:{type:Number,default:0,required:!0}},data:function(){return{paymentType:null,options:[{label:"Pay now",value:"Pay now"},{label:"Pay on Collection",value:"Pay on Collection"}]}},computed:{showItemsInOrder:function(){return this.$store.getters.getBasket},itemsInOrder:function(){return this.$store.getters.getBasket.reduce((function(e,t){return+e+ +t.quantity}),0)},vatTotal:function(){return(this.orderTotal*Number(this.$store.getters.getVATRate)).toFixed(2)}},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{onSubmit:function(){var e=this;return a()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$refs.myForm.validate().then(function(){var t=a()(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r&&e.$emit("placeOrder",e.paymentType);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 2:case"end":return t.stop()}}),t)})))()}}},I=S,N=Object(u["a"])(I,R,E,!1,null,null,null),Q=N.exports;v()(N,"components",{QCardSection:p["a"],QCard:f["a"],QForm:O["a"],QField:D["a"],QOptionGroup:k["a"]});var B=r("9149"),L=r("6821"),M=new URLSearchParams({merchant_id:"10000100",merchant_key:"46f0cd694581a",return_url:"http://localhost:8080/",cancel_url:"http://localhost:8080/cancel",notify_url:"http://localhost:8080/success",name_first:"name_first",email_address:"email_address",m_payment_id:"unique_id_for_user",amount:"amount",item_name:"payment_name",item_description:"description_if_any",custom_int1:"custome_integer_value_if_any",custom_str1:"custome_string_value_if_any",custom_str2:"custome_string_value_if_any",passphrase:"passphrase_set_in_payfast_account"}),z=(L(M.toString()),{components:{basket:b,orderDetails:P,purchaseSummary:Q},mixins:[],props:{viewPurchaseProcess:{type:Boolean,default:!1,required:!0}},data:function(){return{step:1,orderDetails:{},orderTotal:0,orderDeliveryCharge:0}},computed:{hasItemsInOrder:function(){return this.$store.getters.getBasket.length>0},getLabel:function(){return this.$store.getters.getAuth?1===this.step?"Order Details":2===this.step?"Payment Methods":"Confirm":"Login Required"}},watch:{},beforeCreate:function(){},created:function(){},beforeMount:function(){this.$store.dispatch("retrieveMyProfile"),this.$store.dispatch("retrieveDefaultSettings",{forceRefresh:!0})},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{closeDialog:function(){this.$emit("update:viewPurchaseProcess",!1)},proceedPaymentMethod:function(e){this.orderDetails=e.dto,this.orderDeliveryCharge=e.deliveryCost,this.step++},placeOrder:function(e){var t=this;return a()(regeneratorRuntime.mark((function r(){var s,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t.orderDetails.paymentType=e,s=t.orderDetails,s.orderDetails=t.$store.getters.getBasket,t.$q.loading.show({spinner:B["a"],spinnerColor:"positive",backgroundColor:"darkgrey",message:"Processing Order...."}),r.next=6,t.$store.dispatch("placeOrder",s);case 6:i=r.sent,t.$q.loading.hide(),i&&("Delivery"!==s.orderDetails.orderType&&t.$q.notify({type:"positive",message:"Order has been placed.",color:"positive"}),t.closeDialog());case 9:case"end":return r.stop()}}),r)})))()},proceed:function(){var e=this;return a()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:1===e.step?(e.orderTotal=e.$refs.basket.basketTotal,e.step++):2===e.step?e.$refs.orderDetail.onSubmit():3===e.step&&e.$refs.purchaseSummary.onSubmit();case 1:case"end":return t.stop()}}),t)})))()}}}),F=z,U=(r("27ae"),r("f531")),J=r("87fe"),V=r("b19c"),Y=r("9c40"),G=Object(u["a"])(F,s,i,!1,null,null,null);t["default"]=G.exports;v()(G,"components",{QCard:f["a"],QStepper:U["a"],QStep:J["a"],QStepperNavigation:V["a"],QBtn:Y["a"]})},fd95:function(e,t,r){}}]);