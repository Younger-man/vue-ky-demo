(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{dd7b:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"view login"},[e("ky-toast",{staticClass:"toast",attrs:{"should-show-toast":t.shouldShowToast}},[e("div",{staticClass:"tips",domProps:{innerHTML:t._s(t.setResult.tips)}})]),e("div",{staticClass:"content"},[e("div",{staticClass:"triangle"}),e("div",{staticClass:"not-login shadow-box",class:{hide:t.shouldShowLogined}},[e("div",{staticClass:"container phone",attrs:{retina:"line-bottom"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],attrs:{type:"tel",placeholder:"请输入手机号码",maxlength:"11"},domProps:{value:t.phone},on:{input:function(i){i.target.composing||(t.phone=i.target.value)}}}),e("div",{staticClass:"tip",class:{"visibility-hide":!t.shouldShowPhoneErrorTip}},[t._v("\n          "+t._s(t.phoneErrorTip||"请输入正确的手机号")+"\n        ")])]),e("div",{staticClass:"container captcha",class:{hide:!t.getSmsCodeState.shouldShowCaptcha},attrs:{retina:"line-bottom"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.captcha,expression:"captcha"}],attrs:{disabled:t.getSmsCodeState.captchaVerified,placeholder:"请输入图形验证码",maxlength:"4"},domProps:{value:t.captcha},on:{input:function(i){i.target.composing||(t.captcha=i.target.value)}}}),e("div",{staticClass:"tip",class:{"visibility-hide":t.isValidCaptcha}},[t._v("请输入正确的图形码")]),e("div",{staticClass:"check-result",class:t.classNameOfCaptcha}),e("img",{staticClass:"btn icon",attrs:{alt:"验证码",src:t.captchaUrl},on:{click:t.refreshCaptcha}})]),e("div",{staticClass:"container code",attrs:{retina:"line-bottom"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{type:"tel",placeholder:"请输入短信验证码",maxlength:"6"},domProps:{value:t.code},on:{input:function(i){i.target.composing||(t.code=i.target.value)}}}),e("div",{staticClass:"tip",class:{"visibility-hide":!t.shouldShowCodeErrorTip}},[t._v("\n          "+t._s(t.codeErrorTip||"请输入正确的验证码")+"\n        ")]),e("div",{staticClass:"btn-container"},[e("span",{staticClass:"btn",class:{hide:0!==t.timeRemaining},on:{click:t.clickGetSmsCode}},[t._v("获取验证码")]),e("span",{staticClass:"interval",class:{hide:0===t.timeRemaining}},[e("span",{staticClass:"left-time"},[t._v(t._s(t.timeRemaining))]),t._v("s后重新获取\n          ")])])]),e("div",{staticClass:"btn btn-primary",on:{click:t.clickLogin}},[t._v("设为彩铃")])]),e("div",{staticClass:"logined shadow-box",class:{hide:!t.shouldShowLogined}},[e("div",{staticClass:"detail"},[t._v("点击确认即可开始设置彩铃")]),e("div",{staticClass:"container"},[e("div",{staticClass:"icon"}),e("div",{staticClass:"desc"},[t._v(t._s(t.loginedUser.phone))])]),e("div",{staticClass:"btn change-phone",on:{click:t.clickSwitchPhone}},[t._v("更换号码")]),e("div",{staticClass:"setring btn btn-primary",on:{click:t.clickOrderRing}},[t._v("确认")])])]),e("ky-rights"),e("div",{staticClass:"warm-tips"},[e("div",{staticClass:"title"},[t._v("温馨提示")]),e("div",{domProps:{innerHTML:t._s(t.warmTips)}})]),e("div",{staticClass:"place-holder"})],1)},a=[],n=(e("8e6e"),e("ac6a"),e("456d"),e("bd86")),o=(e("7f7f"),e("2f62")),c=function(){var t=this,i=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"rights"},[e("div",{staticClass:"title"},[t._v("专享特权")]),e("div",{staticClass:"flex-row"},[e("div",{staticClass:"ring bg-contain flex-not-shrink"}),e("div",{staticClass:"right-container"},[e("div",{staticClass:"right"},[t._v("所有彩铃任意换")]),e("div",{staticClass:"desc"},[t._v("百万彩铃资源想用就用，自由随心换！")])])]),e("div",{staticClass:"flex-row"},[e("div",{staticClass:"music bg-contain flex-not-shrink"}),e("div",{staticClass:"right-container"},[e("div",{staticClass:"right"},[t._v("热门铃声实时推")]),e("div",{staticClass:"desc"},[t._v("网络热歌，潮流新曲找不到，我们给你推！")])])]),e("div",{staticClass:"flex-row"},[e("div",{staticClass:"gift bg-contain flex-not-shrink"}),e("div",{staticClass:"right-container"},[e("div",{staticClass:"right"},[t._v("应用广告永久去")]),e("div",{staticClass:"desc"},[t._v("应用广告你不想看，我们就永久隐藏！")])])])])}],l=e("2877"),h={},d=Object(l["a"])(h,c,r,!1,null,"46f3ac2e",null),p=d.exports,u=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"toast",class:t.shouldShowToast?"show":"hide"},[t._t("default")],2)},v=[],C={props:{shouldShowToast:{types:Boolean,default:!1}}},g=C,m=Object(l["a"])(g,u,v,!1,null,"001c0ea8",null),f=m.exports,b=e("ac15"),w=e("c89c"),S=e("6b6d"),O=e("ccf7"),_=e("b672");function y(t,i){var e=Object.keys(t);return Object.getOwnPropertySymbols&&e.push.apply(e,Object.getOwnPropertySymbols(t)),i&&(e=e.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),e}function P(t){for(var i=1;i<arguments.length;i++){var e=null!=arguments[i]?arguments[i]:{};i%2?y(e,!0).forEach(function(i){Object(n["a"])(t,i,e[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):y(e).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))})}return t}var j="login",R={components:{KyRights:p,KyToast:f},beforeRouteEnter:function(t,i,e){"login"===t.name?e(function(t){t.resetLogin(),t.isChangingPhone=!1}):e()},computed:P({shouldShowPhoneErrorTip:function(){var t=this.phoneErrorTip,i=this.isValidPhone;return""!==t||!i},shouldShowCodeErrorTip:function(){var t=this.codeErrorTip,i=this.isValidCode;return""!==t||!i}},Object(o["e"])(j,["getSmsCodeState","loginState","orderState"]),{},Object(o["c"])(j,["setResult","ct","warmTips","phoneErrorTip","codeErrorTip"]),{},Object(o["e"])(["loginedUser","currentRing"]),{},Object(o["c"])(["config"]),{shouldShowLogined:function(){var t=this.loginedUser.phone,i=this.isChangingPhone;return Object(b["h"])(t)&&!i},classNameOfCaptcha:function(){var t=this.getSmsCodeState.captchaVerified;return!0===t?"right":"hide"}}),methods:P({},Object(o["b"])(j,["resetOrderState","updateGetSmsCodeState","reset"]),{refreshCaptcha:function(){var t=this;Object(w["qryCaptchaUrl"])().then(function(i){t.captchaUrl=i})},startCountDown:function(){var t=this,i=this.config.smsInterval,e=void 0===i?60:i;this.timeRemaining=e,this.smsCodeInterval&&window.clearInterval(this.smsCodeInterval),this.smsCodeInterval=window.setInterval(function(){--t.timeRemaining||t.stopCountDown()},1e3)},stopCountDown:function(){this.smsCodeInterval&&(window.clearInterval(this.smsCodeInterval),this.smsCodeInterval=0),this.timeRemaining=0,this.updateGetSmsCodeState({shouldShowCountDown:!1})}},Object(o["b"])(j,["getSmsCode","login","order"]),{clickGetSmsCode:function(){var t=this.phone,i=this.captcha,e=this.currentRing.id;Object(b["h"])(t)?(this.isValidPhone=!0,""===i||Object(b["g"])(i)?(this.isValidCaptcha=!0,this.getSmsCode({phone:t,captcha:i,id:e})):this.isValidCaptcha=!1):this.isValidPhone=!1},clickLogin:function(){var t=this.phone,i=this.code,e=this.currentRing.id;Object(b["h"])(t)?(this.isValidPhone=!0,Object(b["i"])(i)?(this.isValidCode=!0,this.login({phone:t,code:i,id:e})):this.isValidCode=!1):this.isValidPhone=!1},clickOrderRing:function(){var t=this.loginedUser.phone,i=this.currentRing.id;this.order({phone:t,id:i})},resetLogin:function(){this.phone="",this.captcha="",this.code="",this.isValidPhone=!0,this.isValidCaptcha=!0,this.isValidCode=!0,this.reset()},clickSwitchPhone:function(){this.isChangingPhone=!0,this.resetLogin()}}),data:function(){return{SetResultType:S["c"],LoadStatus:O["b"],phone:"",isValidPhone:!0,captcha:"",isValidCaptcha:!0,captchaUrl:"",code:"",isValidCode:!0,timeRemaining:0,smsCodeInterval:null,shouldShowToast:!1,throttledResetLoginState:null,isChangingPhone:!1}},watch:{"getSmsCodeState.shouldShowCountDown":function(t){!0===t?this.startCountDown():this.stopCountDown()},"getSmsCodeState.status":function(t){t!==O["a"].RequireCaptcha&&t!==O["a"].CaptchaError||this.refreshCaptcha(),t===O["a"].CaptchaError&&(this.isValidCaptcha=!1)},captcha:function(t){Object(b["g"])(t)&&this.clickGetSmsCode()},"orderState.status":function(){var t=this;this.setResult.type===S["c"].CheckFail&&(this.shouldShowToast=!0,setTimeout(function(){t.shouldShowToast=!1,t.resetOrderState()},2e3))},phone:function(){null===this.throttledResetLoginState&&(this.throttledResetLoginState=Object(_["d"])({func:this.reset,wait:100,frequency:100})),this.throttledResetLoginState()},setResult:function(t){t.type!==S["c"].Success&&t.type!==S["c"].SetFail||this.$router.go(-1)},loginState:function(t){t===O["b"].Success&&(this.isChangingPhone=!1)}}},k=R,T=Object(l["a"])(k,s,a,!1,null,"dabe4cfe",null);i["default"]=T.exports}}]);