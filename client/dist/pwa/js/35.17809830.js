(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[35],{aec5:function(t,e,a){"use strict";a.r(e);a("ac1f"),a("00b4");var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"text-color"},[e("div",{staticClass:"text-weight-bolder q-pb-xs q-pt-md text-center text-h6"},[t._v("\n    Platform VAT Rate\n  ")]),e("div",{staticClass:"row"},[e("div",{staticClass:"col-xs-12 col-sm-12 col-md-12 text-color text-center"},[e("q-card",{staticStyle:{height:"80px"}},[e("q-form",{ref:"myForm",on:{submit:t.onSubmit}},[e("div",{staticClass:"row justify-center no-wrap"},[e("div",{staticClass:"row no-wrap q-pt-md q-px-xs"},[e("q-input",{directives:[{name:"cleave",rawName:"v-cleave",value:t.masks.TwoDecimals,expression:"masks.TwoDecimals"}],attrs:{outlined:"",dense:"",dark:"",color:"positive",rules:[function(t){return t&&t.length>0&&/\S/.test(t)||"VAT rate is required!"}]},nativeOn:{input:function(e){return t.onInputCleaveFormatValue()}},model:{value:t.vat,callback:function(e){t.vat=e},expression:"vat"}}),e("span",{staticClass:"q-pt-sm q-pl-sm text-weight-bolder text-subtitle1"},[t._v("%")])],1),e("div",{staticClass:"col-xs-4 col-md-2 q-pt-md q-mt-xs"},[e("q-btn",{staticClass:"text-capitalize",attrs:{label:"Update",type:"submit",color:"positive",loading:t.updateBtnLoading}})],1)])])],1)],1)])])},i=[],s=(a("b680"),a("a9e3"),a("7fd9")),o={name:"cleave",bind:function(t,e){var a=t.querySelector("input");a._vCleave=new s["a"](a,e.value)},unbind:function(t){var e=t.querySelector("input");e._vCleave.destroy()}},r={components:{},mixins:[],directives:{cleave:o},props:{},data:function(){return{masks:{TwoDecimals:{numeral:!0,numeralDecimalMark:".",delimiter:"",numeralPositiveOnly:!0,numeralDecimalScale:2}},vat:null,updateBtnLoading:!1}},computed:{},watch:{"$store.getters.getAdminVATRate":function(){this.vat=(100*Number(this.$store.getters.getAdminVATRate)).toFixed(2)}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.vat=(100*Number(this.$store.getters.getAdminVATRate)).toFixed(2)},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},methods:{onInputCleaveFormatValue:function(){this.vat=event.target._vCleave.getFormattedValue()},onSubmit:function(){this.updateBtnLoading=!0;var t=this.$store.dispatch("updateVATRate",Number(this.vat));t&&200===t.status&&this.$q.notify({type:"positive",message:"VAT rate updated successfully.",color:"positive"}),this.updateBtnLoading=!1}}},l=r,c=a("2877"),u=a("f09f"),d=a("0378"),m=a("27f9"),p=a("9c40"),v=a("eebe"),f=a.n(v),b=Object(c["a"])(l,n,i,!1,null,null,null);e["default"]=b.exports;f()(b,"components",{QCard:u["a"],QForm:d["a"],QInput:m["a"],QBtn:p["a"]})}}]);