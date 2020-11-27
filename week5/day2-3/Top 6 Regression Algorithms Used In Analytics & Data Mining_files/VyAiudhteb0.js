if (self.CavalryLogger) { CavalryLogger.start_js(["YMXTT"]); }

__d("FBJSON",[],(function(a,b,c,d,e,f){e.exports={parse:JSON.parse,stringify:JSON.stringify}}),null);
__d("BanzaiConsts",[],(function(a,b,c,d,e,f){a={SEND:"Banzai:SEND",OK:"Banzai:OK",ERROR:"Banzai:ERROR",SHUTDOWN:"Banzai:SHUTDOWN",BASIC:"basic",VITAL:"vital",BASIC_WAIT:6e4,BASIC_WAIT_COMET:2e3,VITAL_WAIT:1e3,BATCH_SIZE_LIMIT:64e3,EXPIRY:864e5,BATCH_TIMEOUT:1e4,LAST_STORAGE_FLUSH:"banzai:last_storage_flush",STORAGE_FLUSH_INTERVAL:12*60*6e4,ODS_ROUTE:"categorized_ods",POST_READY:0,POST_INFLIGHT:1,POST_SENT:2};e.exports=a}),null);
__d("CurrentUser",["Cookie","CurrentUserInitialData"],(function(a,b,c,d,e,f){var g,h={getID:function(){return(g||(g=b("CurrentUserInitialData"))).USER_ID},getAccountID:function(){return(g||(g=b("CurrentUserInitialData"))).ACCOUNT_ID},getEmployeeWorkUserID:function(){return(g||(g=b("CurrentUserInitialData"))).WORK_USER_ID},getName:function(){return(g||(g=b("CurrentUserInitialData"))).NAME},getShortName:function(){return(g||(g=b("CurrentUserInitialData"))).SHORT_NAME},isLoggedIn:function(){return(g||(g=b("CurrentUserInitialData"))).USER_ID!=="0"},isLoggedInNow:function(){if(!h.isLoggedIn())return!1;if((g||(g=b("CurrentUserInitialData"))).IS_INTERN_SITE)return!0;if((g||(g=b("CurrentUserInitialData"))).IS_WORK_USER)return!0;return(g||(g=b("CurrentUserInitialData"))).ORIGINAL_USER_ID!=null&&(g||(g=b("CurrentUserInitialData"))).ORIGINAL_USER_ID!=""?(g||(g=b("CurrentUserInitialData"))).ORIGINAL_USER_ID===b("Cookie").get("c_user"):(g||(g=b("CurrentUserInitialData"))).USER_ID===b("Cookie").get("c_user")},isEmployee:function(){return!!(g||(g=b("CurrentUserInitialData"))).IS_EMPLOYEE},isTestUser:function(){return!!(g||(g=b("CurrentUserInitialData"))).IS_TEST_USER},hasWorkUser:function(){return!!(g||(g=b("CurrentUserInitialData"))).HAS_WORK_USER},isWorkUser:function(){return!!(g||(g=b("CurrentUserInitialData"))).IS_WORK_USER},isGray:function(){return!!(g||(g=b("CurrentUserInitialData"))).IS_GRAY},isUnderage:function(){return!!(g||(g=b("CurrentUserInitialData"))).IS_UNDERAGE},isMessengerOnlyUser:function(){return!!(g||(g=b("CurrentUserInitialData"))).IS_MESSENGER_ONLY_USER},isDeactivatedAllowedOnMessenger:function(){return!!(g||(g=b("CurrentUserInitialData"))).IS_DEACTIVATED_ALLOWED_ON_MESSENGER},isMessengerCallGuestUser:function(){return!!(g||(g=b("CurrentUserInitialData"))).IS_MESSENGER_CALL_GUEST_USER},getAppID:function(){return(g||(g=b("CurrentUserInitialData"))).APP_ID}};e.exports=h}),null);
__d("BanzaiUtils",["BanzaiConsts","CurrentUser","FBLogger","WebSession","performanceAbsoluteNow"],(function(a,b,c,d,e,f){"use strict";var g,h,i={canSend:function(a){return a[2]>=(g||(g=b("performanceAbsoluteNow")))()-(h||(h=b("BanzaiConsts"))).EXPIRY},filterPost:function(a,c,d,e){if(e.overlimit)return!0;if(!e.sendMinimumOnePost&&a[4]+e.currentSize>(h||(h=b("BanzaiConsts"))).BATCH_SIZE_LIMIT)return!0;var f=a.__meta;if(f.status!=null&&f.status>=(h||(h=b("BanzaiConsts"))).POST_SENT||!i.canSend(a))return!1;if(f.status!=null&&f.status>=(h||(h=b("BanzaiConsts"))).POST_INFLIGHT)return!0;var g=f.compress!=null?f.compress:!0,j=(f.webSessionId!=null?f.webSessionId:"null")+(f.userID!=null?f.userID:"null")+(f.appID!=null?f.appID:"null")+(g?"compress":""),k=e.wadMap.get(j);k||(k={app_id:f.appID,needs_compression:g,posts:[],user:f.userID,webSessionId:f.webSessionId},e.wadMap.set(j,k),c.push(k));f.status=(h||(h=b("BanzaiConsts"))).POST_INFLIGHT;Array.isArray(k.posts)?k.posts.push(a):b("FBLogger")("banzai").mustfix("Posts were a string instead of array");d.push(a);e.currentSize+=a[4];e.currentSize>=(h||(h=b("BanzaiConsts"))).BATCH_SIZE_LIMIT&&(e.overlimit=!0);return e.keepRetryable&&Boolean(f.retry)},resetPostStatus:function(a){a.__meta.status=(h||(h=b("BanzaiConsts"))).POST_READY},retryPost:function(a,c,d){var e=a;e.__meta.status=(h||(h=b("BanzaiConsts"))).POST_READY;e[3]=(e[3]||0)+1;e.__meta.retry!==!0&&c>=400&&c<600&&d.push(a)},wrapData:function(a,c,d,e,f){d=[a,c,d,0,(a=f)!=null?a:c?JSON.stringify(c).length:0];d.__meta={appID:b("CurrentUser").getAppID(),retry:e===!0,status:(h||(h=b("BanzaiConsts"))).POST_READY,userID:b("CurrentUser").getID(),webSessionId:b("WebSession").getId()};return d}};e.exports=i}),null);
__d("cancelIdleCallback",["requireCond","cr:692209"],(function(a,b,c,d,e,f){e.exports=b("cr:692209")}),null);
__d("SetIdleTimeoutAcrossTransitions",["NavigationMetrics","cancelIdleCallback","clearTimeout","nullthrows","requestIdleCallbackAcrossTransitions","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){"use strict";var g=!1,h=new Map();c={start:function(a,c){if(g){var d=b("setTimeoutAcrossTransitions")(function(){var c=b("requestIdleCallbackAcrossTransitions")(function(){a(),h["delete"](c)});h.set(d,c)},c);return d}else return b("setTimeoutAcrossTransitions")(a,c)},clear:function(a){b("clearTimeout")(a),h.has(a)&&(b("cancelIdleCallback")(b("nullthrows")(h.get(a))),h["delete"](a))}};b("NavigationMetrics").addRetroactiveListener(b("NavigationMetrics").Events.EVENT_OCCURRED,function(b,c){c.event==="all_pagelets_loaded"&&(g=!!a.requestIdleCallback)});e.exports=c}),null);
__d("WebStorageMutex",["WebStorage","clearTimeout","pageID","setTimeout"],(function(a,b,c,d,e,f){"use strict";var g,h=null,i=!1,j=b("pageID");function k(){i||(i=!0,h=(g||(g=b("WebStorage"))).getLocalStorage());return h}a=function(){function a(a){this.name=a}a.testSetPageID=function(a){j=a};var c=a.prototype;c.$2=function(){var a,b=k();if(!b)return j;b=b.getItem("mutex_"+this.name);b=((a=b)!=null?a:"").split(":");return b&&parseInt(b[1],10)>=Date.now()?b[0]:null};c.$3=function(a){var c=k();if(!c)return;a=a==null?1e3:a;a=Date.now()+a;(g||(g=b("WebStorage"))).setItemGuarded(c,"mutex_"+this.name,j+":"+a)};c.hasLock=function(){return this.$2()===j};c.lock=function(a,c,d){var e=this;this.$1&&b("clearTimeout")(this.$1);j===(this.$2()||j)&&this.$3(d);this.$1=b("setTimeout")(function(){e.$1=null;var b=e.hasLock()?a:c;b&&b(e)},0)};c.unlock=function(){this.$1&&b("clearTimeout")(this.$1);var a=k();a&&this.hasLock()&&a.removeItem("mutex_"+this.name)};return a}();e.exports=a}),null);
__d("BanzaiStorage",["BanzaiConsts","BanzaiUtils","CurrentUser","FBJSON","SetIdleTimeoutAcrossTransitions","WebSession","WebStorage","WebStorageMutex","isInIframe","performanceAbsoluteNow"],(function(a,b,c,d,e,f){"use strict";var g,h,i,j="bz:",k=b("isInIframe")(),l,m=!1,n=null;function o(){var a="check_quota";try{var b=p();if(!b)return!1;b.setItem(a,a);b.removeItem(a);return!0}catch(a){return!1}}function p(){m||(m=!0,l=(g||(g=b("WebStorage"))).getLocalStorage());return l}a={flush:function(a){if(k)return;var c=p();if(c){n==null&&(n=parseInt(c.getItem((h||(h=b("BanzaiConsts"))).LAST_STORAGE_FLUSH),10));var d=n&&(i||(i=b("performanceAbsoluteNow")))()-n>=(h||(h=b("BanzaiConsts"))).STORAGE_FLUSH_INTERVAL;d&&a();(d||!n)&&(n=(i||(i=b("performanceAbsoluteNow")))(),(g||(g=b("WebStorage"))).setItemGuarded(c,(h||(h=b("BanzaiConsts"))).LAST_STORAGE_FLUSH,n.toString()))}},restore:function(a){if(k)return;var c=p();if(!c)return;var d=function(d){var e=[];for(var f=0;f<c.length;f++){var g=c.key(f);typeof g==="string"&&g.indexOf(j)===0&&g.indexOf("bz:__")!==0&&e.push(g)}e.forEach(function(d){var e=c.getItem(d);c.removeItem(d);if(e==null||e==="")return;d=b("FBJSON").parse(e);d.forEach(function(c){if(!c)return;var d=c.__meta=c.pop(),e=b("BanzaiUtils").canSend(c);if(!e)return;e=b("CurrentUser").getID();(d.userID===e||e==="0")&&(b("BanzaiUtils").resetPostStatus(c),a(c))})});d&&d.unlock()};o()?new(b("WebStorageMutex"))("banzai").lock(d):b("SetIdleTimeoutAcrossTransitions").start(d,0)},store:function(a){if(k)return;var c=p(),d=a.filter(function(a){var c=a.__meta.status===(h||(h=b("BanzaiConsts"))).POST_SENT;if(!c)return!0;c=a[0]===(h||(h=b("BanzaiConsts"))).ODS_ROUTE&&typeof a[1]==="object"&&(Boolean(a[1]["2887"])||Boolean(a[1]["2979"]));return!c});if(!c||d.length<=0)return;d=d.map(function(a){return[a[0],a[1],a[2],a[3]||0,a[4],a.__meta]});a.splice(0,a.length);(g||(g=b("WebStorage"))).setItemGuarded(c,j+b("WebSession").getId()+"."+(i||(i=b("performanceAbsoluteNow")))(),b("FBJSON").stringify(d))}};e.exports=a}),null);
__d("once",[],(function(a,b,c,d,e,f){"use strict";function a(a){var b=g(a);for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b}function g(a){var b=a,c;a=function(){if(b){for(var a=arguments.length,d=new Array(a),e=0;e<a;e++)d[e]=arguments[e];c=b.apply(this,d);b=null}return c};return a}e.exports=a}),null);
__d("BanzaiAdapter",["invariant","Arbiter","BanzaiConsts","BanzaiStorage","CurrentUser","ErrorGuard","QueryString","Run","TimeSlice","URI","UserAgent","ZeroRewrites","getAsyncParams","gkx","isInIframe","lowerFacebookDomain","once","BanzaiConfig"],(function(a,b,c,d,e,f,g){var h,i,j=[],k=new(b("Arbiter"))(),l=b("isInIframe")(),m="/ajax/bz",n="POST",o={config:b("BanzaiConfig"),useBeacon:!0,getEndPointUrl:function(a){a=b("getAsyncParams")(n);a.bz_orig="blue";a=b("QueryString").appendToUrl(m,a);a.length<=2e3||g(0,21850,a);return a},getStorage:function(){return b("BanzaiStorage")},getTopLevel:function(){return l&&b("lowerFacebookDomain").isValidDocumentDomain()?window.top:null},getUserID:function(){return b("CurrentUser").getID()},inform:function(a){k.inform(a)},subscribe:function(a,b){return k.subscribe(a,b)},wrapInTimeSlice:function(a,c){return b("TimeSlice").guard(function(){a()},c,{propagationType:b("TimeSlice").PropagationType.ORPHAN})},cleanup:function(){var a=j;j=[];a.forEach(function(a){a.readyState<4&&a.abort()})},preferredCompressionMethod:b("once")(function(){return"snappy_base64"}),readyToSend:function(){return b("UserAgent").isBrowser("IE <= 8")||navigator.onLine},send:function(a,c,d,e){var f=o.getEndPointUrl(!1);f=b("ZeroRewrites").rewriteURI(new(h||(h=b("URI")))(f));var g=b("ZeroRewrites").getTransportBuilderForURI(f)();g.open(n,f.toString(),!0);g.onreadystatechange=function(){if(g.readyState>=4){var a=j.indexOf(g);a>=0&&j.splice(a,1);try{a=g.status}catch(b){a=0}a==200?(c&&c(),e||o.inform((i||(i=b("BanzaiConsts"))).OK)):(d&&d(a),e||o.inform((i||(i=b("BanzaiConsts"))).ERROR))}};j.push(g);g.send(a,!1)},setHooks:function(a){},setUnloadHook:function(a){b("Run").onAfterUnload(a._unload)},onUnload:function(a){b("Run").onAfterUnload(a)},isOkToSendViaBeacon:function(){return!0}};e.exports=o}),null);
__d("cancelIdleCallbackBlue",["IdleCallbackImplementation","TimerStorage","TimeSlice"],(function(a,b,c,d,e,f){var g=b("TimerStorage").IDLE_CALLBACK;function a(a){b("TimerStorage").unset(g,a);var c=g+String(a);b("TimeSlice").cancelWithToken(c);b("IdleCallbackImplementation").cancelIdleCallback(a)}e.exports=a}),null);
/**
 * License: https://www.facebook.com/legal/license/WRsJ32R7YJG/
 */
__d("SnappyCompress",[],(function(a,b,c,d,e,f){"use strict";function g(){return typeof process==="object"&&(typeof process.versions==="object"&&typeof process.versions.node!=="undefined")?!0:!1}function h(a){return a instanceof Uint8Array&&(!g()||!Buffer.isBuffer(a))}function i(a){return a instanceof ArrayBuffer}function j(a){return!g()?!1:Buffer.isBuffer(a)}var k="Argument compressed must be type of ArrayBuffer, Buffer, or Uint8Array";function a(a){if(!h(a)&&!i(a)&&!j(a))throw new TypeError(k);var b=!1,c=!1;h(a)?b=!0:i(a)&&(c=!0,a=new Uint8Array(a));a=new A(a);var d=a.readUncompressedLength();if(d===-1)throw new Error("Invalid Snappy bitstream");if(b){b=new Uint8Array(d);if(!a.uncompressToBuffer(b))throw new Error("Invalid Snappy bitstream")}else if(c){b=new ArrayBuffer(d);c=new Uint8Array(b);if(!a.uncompressToBuffer(c))throw new Error("Invalid Snappy bitstream")}else{b=Buffer.alloc(d);if(!a.uncompressToBuffer(b))throw new Error("Invalid Snappy bitstream")}return b}function b(a){if(!h(a)&&!i(a)&&!j(a))throw new TypeError(k);var b=!1,c=!1;h(a)?b=!0:i(a)&&(c=!0,a=new Uint8Array(a));a=new x(a);var d=a.maxCompressedLength(),e,f,g;b?(e=new Uint8Array(d),g=a.compressToBuffer(e)):c?(e=new ArrayBuffer(d),f=new Uint8Array(e),g=a.compressToBuffer(f)):(e=Buffer.alloc(d),g=a.compressToBuffer(e));if(!e.slice){f=new Uint8Array(Array.prototype.slice.call(e,0,g));if(b)return f;else if(c)return f.buffer;else throw new Error("not implemented")}return e.slice(0,g)}c=16;var l=1<<c,m=14,n=new Array(m+1);function o(a,b){return a*506832829>>>b}function p(a,b){return a[b]+(a[b+1]<<8)+(a[b+2]<<16)+(a[b+3]<<24)}function q(a,b,c){return a[b]===a[c]&&a[b+1]===a[c+1]&&a[b+2]===a[c+2]&&a[b+3]===a[c+3]}function r(a,b,c,d,e){var f;for(f=0;f<e;f++)c[d+f]=a[b+f]}function s(a,b,c,d,e){c<=60?(d[e]=c-1<<2,e+=1):c<256?(d[e]=60<<2,d[e+1]=c-1,e+=2):(d[e]=61<<2,d[e+1]=c-1&255,d[e+2]=c-1>>>8,e+=3);r(a,b,d,e,c);return e+c}function t(a,b,c,d){if(d<12&&c<2048){a[b]=1+(d-4<<2)+(c>>>8<<5);a[b+1]=c&255;return b+2}else{a[b]=2+(d-1<<2);a[b+1]=c&255;a[b+2]=c>>>8;return b+3}}function u(a,b,c,d){while(d>=68)b=t(a,b,c,64),d-=64;d>64&&(b=t(a,b,c,60),d-=60);return t(a,b,c,d)}function v(a,b,c,d,e){var f=1;while(1<<f<=c&&f<=m)f+=1;f-=1;var g=32-f;typeof n[f]==="undefined"&&(n[f]=new Uint16Array(1<<f));f=n[f];var h;for(h=0;h<f.length;h++)f[h]=0;h=b+c;var i=b,j=b,k,l,r,t,v,w=!0,x=15;if(c>=x){c=h-x;b+=1;x=o(p(a,b),g);while(w){t=32;l=b;do{b=l;k=x;v=t>>>5;t+=1;l=b+v;if(b>c){w=!1;break}x=o(p(a,l),g);r=i+f[k];f[k]=b-i}while(!q(a,b,r));if(!w)break;e=s(a,j,b-j,d,e);do{v=b;k=4;while(b+k<h&&a[b+k]===a[r+k])k+=1;b+=k;l=v-r;e=u(d,e,l,k);j=b;if(b>=c){w=!1;break}t=o(p(a,b-1),g);f[t]=b-1-i;v=o(p(a,b),g);r=i+f[v];f[v]=b-i}while(q(a,b,r));if(!w)break;b+=1;x=o(p(a,b),g)}}j<h&&(e=s(a,j,h-j,d,e));return e}function w(a,b,c){do b[c]=a&127,a=a>>>7,a>0&&(b[c]+=128),c+=1;while(a>0);return c}function x(a){this.array=a}x.prototype.maxCompressedLength=function(){var a=this.array.length;return 32+a+Math.floor(a/6)};x.prototype.compressToBuffer=function(a){var b=this.array,c=b.length,d=0,e=0,f;e=w(c,a,e);while(d<c)f=Math.min(c-d,l),e=v(b,d,f,a,e),d+=f;return e};var y=[0,255,65535,16777215,4294967295];function r(a,b,c,d,e){var f;for(f=0;f<e;f++)c[d+f]=a[b+f]}function z(a,b,c,d){var e;for(e=0;e<d;e++)a[b+e]=a[b-c+e]}function A(a){this.array=a,this.pos=0}A.prototype.readUncompressedLength=function(){var a=0,b=0,c,d;while(b<32&&this.pos<this.array.length){c=this.array[this.pos];this.pos+=1;d=c&127;if(d<<b>>>b!==d)return-1;a|=d<<b;if(c<128)return a;b+=7}return-1};A.prototype.uncompressToBuffer=function(a){var b=this.array,c=b.length,d=this.pos,e=0,f,g,h,i;while(d<b.length){f=b[d];d+=1;if((f&3)===0){g=(f>>>2)+1;if(g>60){if(d+3>=c)return!1;h=g-60;g=b[d]+(b[d+1]<<8)+(b[d+2]<<16)+(b[d+3]<<24);g=(g&y[h])+1;d+=h}if(d+g>c)return!1;r(b,d,a,e,g);d+=g;e+=g}else{switch(f&3){case 1:g=(f>>>2&7)+4;i=b[d]+(f>>>5<<8);d+=1;break;case 2:if(d+1>=c)return!1;g=(f>>>2)+1;i=b[d]+(b[d+1]<<8);d+=2;break;case 3:if(d+3>=c)return!1;g=(f>>>2)+1;i=b[d]+(b[d+1]<<8)+(b[d+2]<<16)+(b[d+3]<<24);d+=4;break;default:break}if(i===0||i>e)return!1;z(a,e,i,g);e+=g}}return!0};e.exports.uncompress=a;e.exports.compress=b}),null);
__d("SnappyCompressUtil",["SnappyCompress"],(function(a,b,c,d,e,f){"use strict";var g={compressUint8ArrayToSnappy:function(c){if(c==null)return null;var d=null;try{d=b("SnappyCompress").compress(c)}catch(a){return null}c="";for(var e=0;e<d.length;e++)c+=String.fromCharCode(d[e]);return a.btoa(c)},compressStringToSnappy:function(b){if(a.Uint8Array===void 0||a.btoa===void 0)return null;var c=new a.Uint8Array(b.length);for(var d=0;d<b.length;d++){var e=b.charCodeAt(d);if(e>127)return null;c[d]=e}return g.compressUint8ArrayToSnappy(c)},compressStringToSnappyBinary:function(c){if(a.Uint8Array===void 0)return null;var d=null;if(a.TextEncoder!==void 0)d=new TextEncoder().encode(c);else{d=new a.Uint8Array(c.length);for(var e=0;e<c.length;e++){var f=c.charCodeAt(e);if(f>127)return null;d[e]=f}}f=null;try{f=b("SnappyCompress").compress(d)}catch(a){return null}return f}};e.exports=g}),null);
__d("BanzaiCompressionUtils",["Promise","FBLogger","SnappyCompressUtil","once","performanceNow"],(function(a,b,c,d,e,f){"use strict";var g,h=b("once")(function(){if(a.CompressionStream==null)return!1;if(a.Response==null)return!1;try{new a.CompressionStream("deflate")}catch(a){return!1}return!0}),i={compressWad:function(a,c){if(a.needs_compression!==!0){delete a.needs_compression;return}if(c==="deflate"){i.compressWad(a,"snappy");return}var d=(g||(g=b("performanceNow")))(),e=JSON.stringify(a.posts),f;switch(c){case"snappy":f=b("SnappyCompressUtil").compressStringToSnappyBinary(e);break;case"snappy_base64":f=b("SnappyCompressUtil").compressStringToSnappy(e);break;default:break}f!=null&&f.length<e.length?(a.posts=f,a.compression=c,a.snappy_ms=Math.ceil((g||(g=b("performanceNow")))()-d),a.snappy_ms<0&&b("FBLogger")("BanzaiCompressionUtils").warn("Expected positive snappy_ms but got %s",a.snappy_ms)):a.compression="";delete a.needs_compression},compressWadAsync:function(c,d){if(d!=="deflate"){i.compressWad(c,"snappy");return b("Promise").resolve()}if(!h())return i.compressWadAsync(c,"snappy");var e=(g||(g=b("performanceNow")))(),f=JSON.stringify(c.posts),j=new Response(f).body;if(!j){c.compression="";delete c.needs_compression;return b("Promise").resolve()}j=j.pipeThrough(new a.CompressionStream("deflate"));return new Response(j).arrayBuffer().then(function(a){a.byteLength<f.length?(c.posts=new Uint8Array(a),c.compression=d,c.snappy_ms=Math.ceil((g||(g=b("performanceNow")))()-e),c.snappy_ms<0&&b("FBLogger")("BanzaiCompressionUtils").warn("Expected positive snappy_ms but got %s",c.snappy_ms)):c.compression="",delete c.needs_compression})["catch"](function(){c.compression="",delete c.needs_compression})},outOfBandsPosts:function(a){var b=0,c={};for(var d=0;d<a.length;d++){var e=a[d],f=e.compression==="snappy"||e.compression==="deflate";if(f){f=new Blob([e.posts],{type:"application/octet-stream"});e.posts=String(b);c["post_"+String(b)]=f;b++}}return c}};e.exports=i}),null);
__d("BanzaiBase",["BanzaiAdapter","BanzaiCompressionUtils","BanzaiConsts","BanzaiLazyQueue","BanzaiUtils","CurrentUser","ErrorGuard","ExecutionEnvironment","FBLogger","NavigationMetrics","SetIdleTimeoutAcrossTransitions","Visibility","WebSession","performanceAbsoluteNow"],(function(a,b,c,d,e,f){var g,h,i,j="categorized_ods",k="blue_send_via_beacon_failure";c="blue_messages_received";d="blue_messages_sent";var l="blue_total_messages_received",m="blue_total_messages_sent",n={received:c,sent:d},o,p,q=[],r=null,s=0,t=0,u=0,v=0,w={_clearPostBuffer:function(){q=[]},_gatherWadsAndPostsFromBuffer:function(a,c,d,e,f){var g={currentSize:0,keepRetryable:d,overlimit:!1,sendMinimumOnePost:f,wadMap:new Map()};d=e.filter(function(d,e){return b("BanzaiUtils").filterPost(d,a,c,g)});g.overlimit&&d.length&&w._schedule(0);if(c.length+t+s!==0){s+=2;f=c.length+t+2;u+=2;v+=c.length+2;w.counterTracker("received",s,a,c);w.counterTracker("sent",f,a,c)}s=0;t=0;return d},_getEventTime:function(){return(g||(g=b("performanceAbsoluteNow")))()},_getWebSessionId:function(){return b("WebSession").getId()},_getPostBuffer:function(){return q},_getUserId:function(){return b("CurrentUser").getID()},_getAppId:function(){return b("CurrentUser").getAppID()},_initialize:function(){b("ExecutionEnvironment").canUseDOM&&(w.adapter.useBeacon&&b("Visibility").isSupported()?(b("Visibility").addListener(b("Visibility").HIDDEN,function(){w._getPostBuffer().length>0&&(w._tryToSendViaBeacon()||w._store(!1))}),w.isEnabled("enable_client_logging_clear_on_visible")&&b("Visibility").addListener(b("Visibility").VISIBLE,function(){w._tryToSendViaBeacon()||w._restore(!1)})):w.adapter.setHooks(w),w.adapter.setUnloadHook(w),b("NavigationMetrics").addListener(b("NavigationMetrics").Events.NAVIGATION_DONE,function(a,c){if(c.pageType!=="normal")return;w._restore(!1);b("NavigationMetrics").removeCurrentListener()}))},_sendBeacon:function(b,c){return a.navigator.sendBeacon(b,c)},_prepForTransit:function(a){var c=new FormData();c.append("ts",String(Date.now()));var d={};Object.keys(d).sort().forEach(function(a){var b=d[a];if(b===void 0)return;if(b===null){c.append(a,"");return}c.append(a,String(b))});var e=b("BanzaiCompressionUtils").outOfBandsPosts(a);Object.keys(e).forEach(function(a){c.append(a,e[a])});c.append("q",JSON.stringify(a));return c},_prepWadForTransit:function(a){b("BanzaiCompressionUtils").compressWad(a,b("BanzaiAdapter").preferredCompressionMethod())},_processCallbacksAndSendViaBeacon:function(){var a=[],c=[],d=[];w._gatherWadsAndPostsFromBuffer(c,d,!0,a,!1);if(c.length>0){c[0].send_method="beacon";c.map(w._prepWadForTransit);d=w._prepForTransit(c);a=b("BanzaiAdapter").getEndPointUrl(!0);c=w._sendBeacon(a,d);c||b("FBLogger")("banzai").warn("Error sending beacon")}},_restore:function(a){a=b("BanzaiAdapter").getStorage();var c=function(a){q.push(a)};(h||(h=b("ErrorGuard"))).applyWithGuard(a.restore,a,[c]);w._schedule(b("BanzaiAdapter").config.RESTORE_WAIT||(i||(i=b("BanzaiConsts"))).VITAL_WAIT)},_schedule:function(a){var c=w._getEventTime()+a;if(!p||c<p){p=c;b("SetIdleTimeoutAcrossTransitions").clear(o);o=b("SetIdleTimeoutAcrossTransitions").start(b("BanzaiAdapter").wrapInTimeSlice(w._sendWithCallbacks,"Banzai.send"),a);return!0}return!1},_sendWithCallbacks:function(a,c){p=null;w._schedule(w.BASIC.delay);if(!b("BanzaiAdapter").readyToSend()){c&&c();return}if(w.isEnabled("flush_storage_periodically")){var d=b("BanzaiAdapter").getStorage(),e=function(){w._restore(!1)};(h||(h=b("ErrorGuard"))).applyWithGuard(d.flush,d,[e])}b("BanzaiAdapter").inform((i||(i=b("BanzaiConsts"))).SEND);d=[];var f=[];q=w._gatherWadsAndPostsFromBuffer(d,f,!0,q,!0);if(d.length<=0){b("BanzaiAdapter").inform((i||(i=b("BanzaiConsts"))).OK);a&&a();return}d[0].trigger=r;r=null;d[0].send_method="ajax";d.map(w._prepWadForTransit);b("BanzaiAdapter").send(w._prepForTransit(d),function(){f.forEach(function(a){a=a;a.__meta.status=(i||(i=b("BanzaiConsts"))).POST_SENT;a.__meta.callback&&a.__meta.callback()}),a&&a()},function(a){f.forEach(function(c){b("BanzaiUtils").retryPost(c,a,q)}),c&&c()})},_store:function(a){a=b("BanzaiAdapter").getStorage();(h||(h=b("ErrorGuard"))).applyWithGuard(a.store,a,[q])},_testState:function(){return{postBuffer:q,triggerRoute:r}},_tryToSendViaBeacon:function(){if(!(navigator&&navigator.sendBeacon&&b("BanzaiAdapter").isOkToSendViaBeacon()))return!1;var a=[],c=[];q=w._gatherWadsAndPostsFromBuffer(a,c,!1,q,!1);if(a.length<=0)return!1;a[0].send_method="beacon";a.map(w._prepWadForTransit);a=w._prepForTransit(a);var d=b("BanzaiAdapter").getEndPointUrl(!0);d=w._sendBeacon(d,a);if(!d){c.forEach(function(a){q.push(a)});q.push(b("BanzaiUtils").wrapData(j,{2979:{banzai:(a={},a[k]=[1],a)}},w._getEventTime()));return!1}return!0},_unload:function(){var a,c;u+=2;v+=2;a=b("BanzaiUtils").wrapData(j,{2979:{banzai:(a={},a[l]=[u],a)}},w._getEventTime(),!0);c=b("BanzaiUtils").wrapData(j,{2979:{banzai:(c={},c[m]=[v],c)}},w._getEventTime(),!0);q.unshift(a,c);navigator&&navigator.sendBeacon&&b("BanzaiAdapter").isOkToSendViaBeacon()&&w._processCallbacksAndSendViaBeacon();b("BanzaiAdapter").cleanup();b("BanzaiAdapter").inform((i||(i=b("BanzaiConsts"))).SHUTDOWN);q.length>0&&((!w.adapter.useBeacon||!w._tryToSendViaBeacon())&&w._store(!1))},BASIC:{delay:b("BanzaiAdapter").config.MAX_WAIT||(i||(i=b("BanzaiConsts"))).BASIC_WAIT},BASIC_WAIT:(i||(i=b("BanzaiConsts"))).BASIC_WAIT,ERROR:i.ERROR,OK:i.OK,SEND:i.SEND,SHUTDOWN:i.SHUTDOWN,VITAL:{delay:b("BanzaiAdapter").config.MIN_WAIT||(i||(i=b("BanzaiConsts"))).VITAL_WAIT},VITAL_WAIT:i.VITAL_WAIT,adapter:b("BanzaiAdapter"),canUseNavigatorBeacon:function(){return Boolean(navigator&&navigator.sendBeacon&&b("BanzaiAdapter").isOkToSendViaBeacon())},counterTracker:function(a,c,d,e){var f;c=c;a=b("BanzaiUtils").wrapData(j,{2979:{banzai:(f={},f[n[a]]=[c],f)}},w._getEventTime(),!0);e.push(a);d.push({webSessionId:w._getWebSessionId(),posts:[a],needs_compression:!0,user:w._getUserId(),app_id:w._getAppId()})},flush:function(a,c){b("SetIdleTimeoutAcrossTransitions").clear(o),w._sendWithCallbacks(a,c)},isEnabled:function(a){return Boolean(b("BanzaiAdapter").config.gks&&b("BanzaiAdapter").config.gks[a])},post:function(a,c,d){var e;a||b("FBLogger")("banzai").mustfix("Banzai.post called without specifying a route");var f=(e=JSON.stringify(c))!=null?e:"",g=d==null?void 0:d.retry;if(b("BanzaiAdapter").config.disabled)return;if(!b("ExecutionEnvironment").canUseDOM&&!b("ExecutionEnvironment").isInWorker)return;var h=w.adapter.getTopLevel();if(h){var j;try{j=h.require("Banzai")}catch(a){j=null}if(j){j.post.apply(j,arguments);return}}var k=b("BanzaiAdapter").config.blacklist;if(k&&(k.indexOf&&(typeof k.indexOf=="function"&&k.indexOf(a)!=-1)))return;var l=f.length;s++;u++;var m=b("BanzaiUtils").wrapData(a,c,w._getEventTime(),g,l),n=m;(d==null?void 0:d.callback)&&(n.__meta.callback=d==null?void 0:d.callback);(d==null?void 0:d.compress)!=null&&(n.__meta.compress=d==null?void 0:d.compress);var o=d==null?void 0:d.delay;o==null&&(o=(i||(i=b("BanzaiConsts"))).BASIC_WAIT);if(d==null?void 0:d.signal){n.__meta.status=(i||(i=b("BanzaiConsts"))).POST_INFLIGHT;var p=[{user:w._getUserId(),webSessionId:w._getWebSessionId(),app_id:w._getAppId(),posts:[m],trigger:a}];b("BanzaiAdapter").send(w._prepForTransit(p),function(){v++,t++,n.__meta.status=(i||(i=b("BanzaiConsts"))).POST_SENT,n.__meta.callback&&n.__meta.callback()},function(a){b("BanzaiUtils").retryPost(m,a,q)},!0);if(!g)return}q.push(m);(w._schedule(o)||!r)&&(r=a);var x=b("BanzaiLazyQueue").flushQueue();x.forEach(function(a){return w.post.apply(w,a)})},subscribe:b("BanzaiAdapter").subscribe};w._initialize();e.exports=w}),null);