if (self.CavalryLogger) { CavalryLogger.start_js(["0Pdt\/"]); }

__d("InlineFbtResult",["requireCond","cr:1183579"],(function(a,b,c,d,e,f){e.exports=b("cr:1183579")}),null);
__d("FbtReactUtil",[],(function(a,b,c,d,e,f){a=typeof Symbol==="function"&&Symbol["for"]&&Symbol["for"]("react.element")||60103;var g=!1;b={REACT_ELEMENT_TYPE:a,injectReactShim:function(a){var b={validated:!0};g?Object.defineProperty(a,"_store",{configurable:!1,enumerable:!1,writable:!1,value:b}):a._store=b}};e.exports=b}),null);
__d("FbtResultBase",[],(function(a,b,c,d,e,f){"use strict";var g=function(){function a(a,b){this.$1=a,this.__errorListener=b,this.$2=null}var b=a.prototype;b.flattenToArray=function(){return a.flattenToArray(this.$1)};b.getContents=function(){return this.$1};b.toString=function(){if(this.$2!=null)return this.$2;var b="",c=this.flattenToArray();for(var d=0;d<c.length;++d){var e=c[d];if(typeof e==="string"||e instanceof a)b+=e.toString();else{var f;(f=this.__errorListener)==null?void 0:f.onStringSerializationError==null?void 0:f.onStringSerializationError(e)}}Object.isFrozen(this)||(this.$2=b);return b};b.toJSON=function(){return this.toString()};a.flattenToArray=function(b){var c=[];for(var d=0;d<b.length;++d){var e=b[d];Array.isArray(e)?c.push.apply(c,a.flattenToArray(e)):e instanceof a?c.push.apply(c,e.flattenToArray()):c.push(e)}return c};return a}();["anchor","big","blink","bold","charAt","charCodeAt","codePointAt","contains","endsWith","fixed","fontcolor","fontsize","includes","indexOf","italics","lastIndexOf","link","localeCompare","match","normalize","repeat","replace","search","slice","small","split","startsWith","strike","sub","substr","substring","sup","toLocaleLowerCase","toLocaleUpperCase","toLowerCase","toUpperCase","trim","trimLeft","trimRight"].forEach(function(a){g.prototype[a]=function(){var b;(b=this.__errorListener)==null?void 0:b.onStringMethodUsed==null?void 0:b.onStringMethodUsed(a);for(var c=arguments.length,d=new Array(c),e=0;e<c;e++)d[e]=arguments[e];return String.prototype[a].apply(this,d)}});e.exports=g}),null);
__d("FbtResult",["FbtReactUtil","FbtResultBase"],(function(a,b,c,d,e,f){var g=function(a){return a.content};a=function(a){"use strict";babelHelpers.inheritsLoose(c,a);function c(c,d){d=a.call(this,c,d)||this;d.$$typeof=b("FbtReactUtil").REACT_ELEMENT_TYPE;d.key=null;d.ref=null;d.type=g;d.props={content:c};return d}c.get=function(a){return new c(a.contents,a.errorListener)};return c}(b("FbtResultBase"));e.exports=a}),null);
__d("TransAppInlineMode",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({TRANSLATION:"TRANSLATION",APPROVE:"APPROVE",REPORT:"REPORT",NO_INLINE:"NO_INLINE"})}),null);
__d("getUnwrappedFbt",["FbtResultGK"],(function(a,b,c,d,e,f){function a(a){a=a.contents;var c=b("FbtResultGK").inlineMode,d=b("FbtResultGK").shouldReturnFbtResult;if(!d&&c!=="REPORT")return(a==null?void 0:a.length)===1&&typeof a[0]==="string"?a[0]:a}e.exports=a}),null);
__d("getFbtResult",["FbtResult","FbtResultGK","InlineFbtResult","SiteData","TransAppInlineMode","getUnwrappedFbt","gkx","recoverableViolation"],(function(a,b,c,d,e,f){var g=b("FbtResultGK").inlineMode;if(b("SiteData").is_comet&&g==="TRANSLATION"){b("recoverableViolation")("TransAppInlineMode=TRANSLATION should not happen on Comet yet. "+("[inlineMode="+((c=g)!=null?c:"")+"]")+("[runtime_site_is_comet="+String(b("gkx")("708253"))+"]"),"internationalization")}function a(a){var c=b("getUnwrappedFbt")(a);if(c!=null)return c;c=a.contents;var d=a.patternString,e=a.patternHash;return g!=null&&g!=="NO_INLINE"?new(b("InlineFbtResult"))(c,g,d,e):b("FbtResult").get(a)}e.exports=a}),null);
__d("FbtErrorListenerWWW",["FBLogger","killswitch"],(function(a,b,c,d,e,f){a=function(){"use strict";function a(a){this.$1=a.hash,this.$2=a.translation}var c=a.prototype;c.onStringSerializationError=function(a){var c="Context not logged.";if(!b("killswitch")("JS_RELIABILITY_FBT_LOGGING"))try{var d=JSON.stringify(a);d!=null&&(c=d.substr(0,250))}catch(a){c=a.message}d=(a==null?void 0:(d=a.constructor)==null?void 0:d.name)||"";b("FBLogger")("fbt").blameToPreviousDirectory().blameToPreviousDirectory().mustfix('Converting to a string will drop content data. Hash="%s" Translation="%s" Content="%s" (type=%s,%s)',this.$1,this.$2,c,typeof a,d)};c.onStringMethodUsed=function(a){b("FBLogger")("fbt").blameToPreviousDirectory().blameToPreviousDirectory().mustfix("Error using fbt string. Used method %s on Fbt string. Fbt string is designed to be immutable and should not be manipulated.",a)};return a}();e.exports=a}),null);
__d("FbtPureStringResult",["FbtResult"],(function(a,b,c,d,e,f){a=function(a){"use strict";babelHelpers.inheritsLoose(b,a);function b(){return a.apply(this,arguments)||this}return b}(b("FbtResult"));e.exports=a}),null);
__d("getFbsResult",["FbtPureStringResult"],(function(a,b,c,d,e,f){function a(a){return new(b("FbtPureStringResult"))(a.contents,a.errorListener)}e.exports=a}),null);
__d("getTranslatedInput",[],(function(a,b,c,d,e,f){var g="B!N@$T",h={};function a(a){var b=a.table;typeof b==="string"&&b.startsWith(g)&&(b in h||(h[b]=JSON.parse(b.substring(g.length))),b=h[b]);return{table:b,args:a.args}}e.exports=a}),null);
__d("FbtEnv",["requireDeferred","Banzai","FbtErrorListenerWWW","IntlViewerContext","getFbsResult","getFbtResult","getTranslatedInput","promiseDone","FbtHooks"],(function(a,b,c,d,e,f){"use strict";var g=b("requireDeferred")("FbtLogging"),h=!1;a={setupOnce:function(){if(h)return;h=!0;b("FbtHooks").register({errorListener:function(a){return new(b("FbtErrorListenerWWW"))(a)},getFbsResult:b("getFbsResult"),getFbtResult:b("getFbtResult"),getTranslatedInput:b("getTranslatedInput"),onTranslationOverride:function(a){return b("Banzai").post("intl_qt_event",{hash:a})},getViewerContext:function(){return b("IntlViewerContext")},logImpression:function(a){return b("promiseDone")(g.load().then(function(b){return b==null?void 0:b.logImpression(a)}))}})}};e.exports=a}),null);
__d("FbtHooksImpl",[],(function(a,b,c,d,e,f){var g={};a={getErrorListener:function(a){return g.errorListener==null?void 0:g.errorListener(a)},logImpression:function(a){g.logImpression==null?void 0:g.logImpression(a)},onTranslationOverride:function(a){g.onTranslationOverride==null?void 0:g.onTranslationOverride(a)},getFbsResult:function(a){return g.getFbsResult(a)},getFbtResult:function(a){return g.getFbtResult(a)},getTranslatedInput:function(a){var b;return(b=g.getTranslatedInput==null?void 0:g.getTranslatedInput(a))!=null?b:a},getViewerContext:function(){return g.getViewerContext()},register:function(a){Object.assign(g,a)}};e.exports=a}),null);
__d("FbtHooks",["FbtEnv","FbtHooksImpl"],(function(a,b,c,d,e,f){e.exports=b("FbtHooksImpl"),b("FbtEnv").setupOnce()}),null);
__d("FbtLogging",["requireCond","cr:1094907"],(function(a,b,c,d,e,f){"use strict";e.exports=b("cr:1094907")}),null);