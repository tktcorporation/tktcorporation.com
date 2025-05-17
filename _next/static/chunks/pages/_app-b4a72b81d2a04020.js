(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{3454:function(e,t,r){"use strict";var n,a;e.exports=(null==(n=r.g.process)?void 0:n.env)&&"object"==typeof(null==(a=r.g.process)?void 0:a.env)?r.g.process:r(7663)},6840:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(5098)}])},5098:function(e,t,r){"use strict";let n,a,i,o,s,l,c,u,d;r.r(t),r.d(t,{default:function(){return _app}});var p,h,f,g,m=r(5893);r(2352);var b=r(7294),w=r(3454);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let stringToByteArray$1=function(e){let t=[],r=0;for(let n=0;n<e.length;n++){let a=e.charCodeAt(n);a<128?t[r++]=a:(a<2048?t[r++]=a>>6|192:((64512&a)==55296&&n+1<e.length&&(64512&e.charCodeAt(n+1))==56320?(a=65536+((1023&a)<<10)+(1023&e.charCodeAt(++n)),t[r++]=a>>18|240,t[r++]=a>>12&63|128):t[r++]=a>>12|224,t[r++]=a>>6&63|128),t[r++]=63&a|128)}return t},byteArrayToString=function(e){let t=[],r=0,n=0;for(;r<e.length;){let a=e[r++];if(a<128)t[n++]=String.fromCharCode(a);else if(a>191&&a<224){let i=e[r++];t[n++]=String.fromCharCode((31&a)<<6|63&i)}else if(a>239&&a<365){let i=e[r++],o=e[r++],s=e[r++],l=((7&a)<<18|(63&i)<<12|(63&o)<<6|63&s)-65536;t[n++]=String.fromCharCode(55296+(l>>10)),t[n++]=String.fromCharCode(56320+(1023&l))}else{let i=e[r++],o=e[r++];t[n++]=String.fromCharCode((15&a)<<12|(63&i)<<6|63&o)}}return t.join("")},y={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let r=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let t=0;t<e.length;t+=3){let a=e[t],i=t+1<e.length,o=i?e[t+1]:0,s=t+2<e.length,l=s?e[t+2]:0,c=a>>2,u=(3&a)<<4|o>>4,d=(15&o)<<2|l>>6,p=63&l;s||(p=64,i||(d=64)),n.push(r[c],r[u],r[d],r[p])}return n.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(stringToByteArray$1(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):byteArrayToString(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let r=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let t=0;t<e.length;){let a=r[e.charAt(t++)],i=t<e.length,o=i?r[e.charAt(t)]:0;++t;let s=t<e.length,l=s?r[e.charAt(t)]:64;++t;let c=t<e.length,u=c?r[e.charAt(t)]:64;if(++t,null==a||null==o||null==l||null==u)throw new DecodeBase64StringError;let d=a<<2|o>>4;if(n.push(d),64!==l){let e=o<<4&240|l>>2;if(n.push(e),64!==u){let e=l<<6&192|u;n.push(e)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};let DecodeBase64StringError=class DecodeBase64StringError extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}};let base64Encode=function(e){let t=stringToByteArray$1(e);return y.encodeByteArray(t,!0)},base64urlEncodeWithoutPadding=function(e){return base64Encode(e).replace(/\./g,"")},base64Decode=function(e){try{return y.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null},getDefaultsFromGlobal=()=>/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==r.g)return r.g;throw Error("Unable to locate global object.")})().__FIREBASE_DEFAULTS__,getDefaultsFromEnvVariable=()=>{if(void 0===w||void 0===w.env)return;let e=w.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},getDefaultsFromCookie=()=>{let e;if("undefined"==typeof document)return;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}let t=e&&base64Decode(e[1]);return t&&JSON.parse(t)},getDefaults=()=>{try{return getDefaultsFromGlobal()||getDefaultsFromEnvVariable()||getDefaultsFromCookie()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},getDefaultAppConfig=()=>{var e;return null===(e=getDefaults())||void 0===e?void 0:e.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Deferred=class Deferred{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,r))}}};function index_esm2017_isIndexedDBAvailable(){try{return"object"==typeof indexedDB}catch(e){return!1}}function index_esm2017_validateIndexedDBOpenable(){return new Promise((e,t)=>{try{let r=!0,n="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(n);a.onsuccess=()=>{a.result.close(),r||self.indexedDB.deleteDatabase(n),e(!0)},a.onupgradeneeded=()=>{r=!1},a.onerror=()=>{var e;t((null===(e=a.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})}let FirebaseError=class FirebaseError extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name="FirebaseError",Object.setPrototypeOf(this,FirebaseError.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ErrorFactory.prototype.create)}};let ErrorFactory=class ErrorFactory{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},n=`${this.service}/${e}`,a=this.errors[e],i=a?a.replace(v,(e,t)=>{let n=r[t];return null!=n?String(n):`<${t}?>`}):"Error",o=`${this.serviceName}: ${i} (${n}).`,s=new FirebaseError(n,o,r);return s}};let v=/\{\$([^}]+)}/g;function deepEqual(e,t){if(e===t)return!0;let r=Object.keys(e),n=Object.keys(t);for(let a of r){if(!n.includes(a))return!1;let r=e[a],i=t[a];if(isObject(r)&&isObject(i)){if(!deepEqual(r,i))return!1}else if(r!==i)return!1}for(let e of n)if(!r.includes(e))return!1;return!0}function isObject(e){return null!==e&&"object"==typeof e}function calculateBackoffMillis(e,t=1e3,r=2){let n=t*Math.pow(r,e);return Math.min(144e5,n+Math.round(.5*n*(Math.random()-.5)*2))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function index_esm2017_getModularInstance(e){return e&&e._delegate?e._delegate:e}let Component=class Component{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Provider=class Provider{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let e=new Deferred;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{let r=this.getOrInitializeService({instanceIdentifier:t});r&&e.resolve(r)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),n=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(e){if(n)return null;throw e}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if("EAGER"===e.instantiationMode)try{this.getOrInitializeService({instanceIdentifier:_})}catch(e){}for(let[e,t]of this.instancesDeferred.entries()){let r=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:r});t.resolve(e)}catch(e){}}}}clearInstance(e=_){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=_){return this.instances.has(e)}getOptions(e=_){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let n=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[e,t]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(e);r===a&&t.resolve(n)}return n}onInit(e,t){var r;let n=this.normalizeInstanceIdentifier(t),a=null!==(r=this.onInitCallbacks.get(n))&&void 0!==r?r:new Set;a.add(e),this.onInitCallbacks.set(n,a);let i=this.instances.get(n);return i&&e(i,n),()=>{a.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let n of r)try{n(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:e===_?void 0:e,options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch(e){}return r||null}normalizeInstanceIdentifier(e=_){return this.component?this.component.multipleInstances?e:_:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ComponentContainer=class ComponentContainer{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){let t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Provider(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let I=[];(f=g||(g={}))[f.DEBUG=0]="DEBUG",f[f.VERBOSE=1]="VERBOSE",f[f.INFO=2]="INFO",f[f.WARN=3]="WARN",f[f.ERROR=4]="ERROR",f[f.SILENT=5]="SILENT";let E={debug:g.DEBUG,verbose:g.VERBOSE,info:g.INFO,warn:g.WARN,error:g.ERROR,silent:g.SILENT},D=g.INFO,C={[g.DEBUG]:"log",[g.VERBOSE]:"log",[g.INFO]:"info",[g.WARN]:"warn",[g.ERROR]:"error"},defaultLogHandler=(e,t,...r)=>{if(t<e.logLevel)return;let n=new Date().toISOString(),a=C[t];if(a)console[a](`[${n}]  ${e.name}:`,...r);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)};let Logger=class Logger{constructor(e){this.name=e,this._logLevel=D,this._logHandler=defaultLogHandler,this._userLogHandler=null,I.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in g))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?E[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,g.DEBUG,...e),this._logHandler(this,g.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,g.VERBOSE,...e),this._logHandler(this,g.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,g.INFO,...e),this._logHandler(this,g.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,g.WARN,...e),this._logHandler(this,g.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,g.ERROR,...e),this._logHandler(this,g.ERROR,...e)}};let instanceOfAny=(e,t)=>t.some(t=>e instanceof t),S=new WeakMap,T=new WeakMap,A=new WeakMap,k=new WeakMap,B=new WeakMap,O={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return T.get(e);if("objectStoreNames"===t)return e.objectStoreNames||A.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return wrap_idb_value_wrap(e[t])},set:(e,t,r)=>(e[t]=r,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function wrap_idb_value_wrap(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,r)=>{let unlisten=()=>{e.removeEventListener("success",success),e.removeEventListener("error",error)},success=()=>{t(wrap_idb_value_wrap(e.result)),unlisten()},error=()=>{r(e.error),unlisten()};e.addEventListener("success",success),e.addEventListener("error",error)});return t.then(t=>{t instanceof IDBCursor&&S.set(t,e)}).catch(()=>{}),B.set(t,e),t}(e);if(k.has(e))return k.get(e);let r="function"==typeof(t=e)?t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(a||(a=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(unwrap(this),e),wrap_idb_value_wrap(S.get(this))}:function(...e){return wrap_idb_value_wrap(t.apply(unwrap(this),e))}:function(e,...r){let n=t.call(unwrap(this),e,...r);return A.set(n,e.sort?e.sort():[e]),wrap_idb_value_wrap(n)}:(t instanceof IDBTransaction&&function(e){if(T.has(e))return;let t=new Promise((t,r)=>{let unlisten=()=>{e.removeEventListener("complete",complete),e.removeEventListener("error",error),e.removeEventListener("abort",error)},complete=()=>{t(),unlisten()},error=()=>{r(e.error||new DOMException("AbortError","AbortError")),unlisten()};e.addEventListener("complete",complete),e.addEventListener("error",error),e.addEventListener("abort",error)});T.set(e,t)}(t),instanceOfAny(t,n||(n=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,O):t;return r!==e&&(k.set(e,r),B.set(r,e)),r}let unwrap=e=>B.get(e),L=["get","getKey","getAll","getAllKeys","count"],M=["put","add","delete","clear"],x=new Map;function getMethod(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(x.get(t))return x.get(t);let r=t.replace(/FromIndex$/,""),n=t!==r,a=M.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!(a||L.includes(r)))return;let method=async function(e,...t){let i=this.transaction(e,a?"readwrite":"readonly"),o=i.store;return n&&(o=o.index(t.shift())),(await Promise.all([o[r](...t),a&&i.done]))[0]};return x.set(t,method),method}O={...p=O,get:(e,t,r)=>getMethod(e,t)||p.get(e,t,r),has:(e,t)=>!!getMethod(e,t)||p.has(e,t)};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let PlatformLoggerServiceImpl=class PlatformLoggerServiceImpl{constructor(e){this.container=e}getPlatformInfoString(){let e=this.container.getProviders();return e.map(e=>{if(!function(e){let t=e.getComponent();return(null==t?void 0:t.type)==="VERSION"}(e))return null;{let t=e.getImmediate();return`${t.library}/${t.version}`}}).filter(e=>e).join(" ")}};let F="@firebase/app",P="0.9.13",R=new Logger("@firebase/app"),$="[DEFAULT]",j={[F]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},N=new Map,H=new Map;function _registerComponent(e){let t=e.name;if(H.has(t))return R.debug(`There were multiple attempts to register component ${t}.`),!1;for(let r of(H.set(t,e),N.values()))!function(e,t){try{e.container.addComponent(t)}catch(r){R.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,r)}}(r,e);return!0}function index_esm2017_getProvider(e,t){let r=e.container.getProvider("heartbeat").getImmediate({optional:!0});return r&&r.triggerHeartbeat(),e.container.getProvider(t)}let V=new ErrorFactory("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let FirebaseAppImpl=class FirebaseAppImpl{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Component("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw V.create("app-deleted",{appName:this._name})}};function initializeApp(e,t={}){let r=e;if("object"!=typeof t){let e=t;t={name:e}}let n=Object.assign({name:$,automaticDataCollectionEnabled:!1},t),a=n.name;if("string"!=typeof a||!a)throw V.create("bad-app-name",{appName:String(a)});if(r||(r=getDefaultAppConfig()),!r)throw V.create("no-options");let i=N.get(a);if(i){if(deepEqual(r,i.options)&&deepEqual(n,i.config))return i;throw V.create("duplicate-app",{appName:a})}let o=new ComponentContainer(a);for(let e of H.values())o.addComponent(e);let s=new FirebaseAppImpl(r,n,o);return N.set(a,s),s}function registerVersion(e,t,r){var n;let a=null!==(n=j[e])&&void 0!==n?n:e;r&&(a+=`-${r}`);let i=a.match(/\s|\//),o=t.match(/\s|\//);if(i||o){let e=[`Unable to register library "${a}" with version "${t}":`];i&&e.push(`library name "${a}" contains illegal characters (whitespace or "/")`),i&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),R.warn(e.join(" "));return}_registerComponent(new Component(`${a}-version`,()=>({library:a,version:t}),"VERSION"))}let q="firebase-heartbeat-store",z=null;function getDbPromise(){return z||(z=(function(e,t,{blocked:r,upgrade:n,blocking:a,terminated:i}={}){let o=indexedDB.open(e,1),s=wrap_idb_value_wrap(o);return n&&o.addEventListener("upgradeneeded",e=>{n(wrap_idb_value_wrap(o.result),e.oldVersion,e.newVersion,wrap_idb_value_wrap(o.transaction),e)}),r&&o.addEventListener("blocked",e=>r(e.oldVersion,e.newVersion,e)),s.then(e=>{i&&e.addEventListener("close",()=>i()),a&&e.addEventListener("versionchange",e=>a(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s})("firebase-heartbeat-database",0,{upgrade:(e,t)=>{0===t&&e.createObjectStore(q)}}).catch(e=>{throw V.create("idb-open",{originalErrorMessage:e.message})})),z}async function readHeartbeatsFromIndexedDB(e){try{let t=await getDbPromise(),r=await t.transaction(q).objectStore(q).get(computeKey(e));return r}catch(e){if(e instanceof FirebaseError)R.warn(e.message);else{let t=V.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});R.warn(t.message)}}}async function writeHeartbeatsToIndexedDB(e,t){try{let r=await getDbPromise(),n=r.transaction(q,"readwrite"),a=n.objectStore(q);await a.put(t,computeKey(e)),await n.done}catch(e){if(e instanceof FirebaseError)R.warn(e.message);else{let t=V.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});R.warn(t.message)}}}function computeKey(e){return`${e.name}!${e.options.appId}`}let HeartbeatServiceImpl=class HeartbeatServiceImpl{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new HeartbeatStorageImpl(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){let e=this.container.getProvider("platform-logger").getImmediate(),t=e.getPlatformInfoString(),r=getUTCDateString();return(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(e=>e.date===r))?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{let t=new Date(e.date).valueOf(),r=Date.now();return r-t<=2592e6}),this._storage.overwrite(this._heartbeatsCache))}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";let e=getUTCDateString(),{heartbeatsToSend:t,unsentEntries:r}=function(e,t=1024){let r=[],n=e.slice();for(let a of e){let e=r.find(e=>e.agent===a.agent);if(e){if(e.dates.push(a.date),countBytes(r)>t){e.dates.pop();break}}else if(r.push({agent:a.agent,dates:[a.date]}),countBytes(r)>t){r.pop();break}n=n.slice(1)}return{heartbeatsToSend:r,unsentEntries:n}}(this._heartbeatsCache.heartbeats),n=base64urlEncodeWithoutPadding(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),n}};function getUTCDateString(){let e=new Date;return e.toISOString().substring(0,10)}let HeartbeatStorageImpl=class HeartbeatStorageImpl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!index_esm2017_isIndexedDBAvailable()&&index_esm2017_validateIndexedDBOpenable().then(()=>!0).catch(()=>!1)}async read(){let e=await this._canUseIndexedDBPromise;if(!e)return{heartbeats:[]};{let e=await readHeartbeatsFromIndexedDB(this.app);return e||{heartbeats:[]}}}async overwrite(e){var t;let r=await this._canUseIndexedDBPromise;if(r){let r=await this.read();return writeHeartbeatsToIndexedDB(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;let r=await this._canUseIndexedDBPromise;if(r){let r=await this.read();return writeHeartbeatsToIndexedDB(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}}};function countBytes(e){return base64urlEncodeWithoutPadding(JSON.stringify({version:2,heartbeats:e})).length}_registerComponent(new Component("platform-logger",e=>new PlatformLoggerServiceImpl(e),"PRIVATE")),_registerComponent(new Component("heartbeat",e=>new HeartbeatServiceImpl(e),"PRIVATE")),registerVersion(F,P,""),registerVersion(F,P,"esm2017"),registerVersion("fire-js",""),/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */registerVersion("firebase","9.23.0","app");let wrap_idb_value_instanceOfAny=(e,t)=>t.some(t=>e instanceof t),U=new WeakMap,W=new WeakMap,K=new WeakMap,G=new WeakMap,J=new WeakMap,Q={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return W.get(e);if("objectStoreNames"===t)return e.objectStoreNames||K.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return build_wrap_idb_value_wrap(e[t])},set:(e,t,r)=>(e[t]=r,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function build_wrap_idb_value_wrap(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,r)=>{let unlisten=()=>{e.removeEventListener("success",success),e.removeEventListener("error",error)},success=()=>{t(build_wrap_idb_value_wrap(e.result)),unlisten()},error=()=>{r(e.error),unlisten()};e.addEventListener("success",success),e.addEventListener("error",error)});return t.then(t=>{t instanceof IDBCursor&&U.set(t,e)}).catch(()=>{}),J.set(t,e),t}(e);if(G.has(e))return G.get(e);let r="function"==typeof(t=e)?t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(o||(o=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(wrap_idb_value_unwrap(this),e),build_wrap_idb_value_wrap(U.get(this))}:function(...e){return build_wrap_idb_value_wrap(t.apply(wrap_idb_value_unwrap(this),e))}:function(e,...r){let n=t.call(wrap_idb_value_unwrap(this),e,...r);return K.set(n,e.sort?e.sort():[e]),build_wrap_idb_value_wrap(n)}:(t instanceof IDBTransaction&&function(e){if(W.has(e))return;let t=new Promise((t,r)=>{let unlisten=()=>{e.removeEventListener("complete",complete),e.removeEventListener("error",error),e.removeEventListener("abort",error)},complete=()=>{t(),unlisten()},error=()=>{r(e.error||new DOMException("AbortError","AbortError")),unlisten()};e.addEventListener("complete",complete),e.addEventListener("error",error),e.addEventListener("abort",error)});W.set(e,t)}(t),wrap_idb_value_instanceOfAny(t,i||(i=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,Q):t;return r!==e&&(G.set(e,r),J.set(r,e)),r}let wrap_idb_value_unwrap=e=>J.get(e),X=["get","getKey","getAll","getAllKeys","count"],Z=["put","add","delete","clear"],Y=new Map;function build_getMethod(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(Y.get(t))return Y.get(t);let r=t.replace(/FromIndex$/,""),n=t!==r,a=Z.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!(a||X.includes(r)))return;let method=async function(e,...t){let i=this.transaction(e,a?"readwrite":"readonly"),o=i.store;return n&&(o=o.index(t.shift())),(await Promise.all([o[r](...t),a&&i.done]))[0]};return Y.set(t,method),method}Q={...h=Q,get:(e,t,r)=>build_getMethod(e,t)||h.get(e,t,r),has:(e,t)=>!!build_getMethod(e,t)||h.has(e,t)};let ee="@firebase/installations",et="0.6.4",er=`w:${et}`,en="FIS_v2",ea=new ErrorFactory("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function isServerError(e){return e instanceof FirebaseError&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getInstallationsEndpoint({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function extractAuthTokenInfoFromResponse(e){return{token:e.token,requestStatus:2,expiresIn:Number(e.expiresIn.replace("s","000")),creationTime:Date.now()}}async function getErrorFromResponse(e,t){let r=await t.json(),n=r.error;return ea.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function getHeaders({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}async function retryIfServerError(e){let t=await e();return t.status>=500&&t.status<600?e():t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function createInstallationRequest({appConfig:e,heartbeatServiceProvider:t},{fid:r}){let n=getInstallationsEndpoint(e),a=getHeaders(e),i=t.getImmediate({optional:!0});if(i){let e=await i.getHeartbeatsHeader();e&&a.append("x-firebase-client",e)}let o={fid:r,authVersion:en,appId:e.appId,sdkVersion:er},s={method:"POST",headers:a,body:JSON.stringify(o)},l=await retryIfServerError(()=>fetch(n,s));if(l.ok){let e=await l.json(),t={fid:e.fid||r,registrationStatus:2,refreshToken:e.refreshToken,authToken:extractAuthTokenInfoFromResponse(e.authToken)};return t}throw await getErrorFromResponse("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sleep(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ei=/^[cdef][\w-]{21}$/;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getKey(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eo=new Map;function fidChanged(e,t){let r=getKey(e);callFidChangeCallbacks(r,t),function(e,t){let r=(!es&&"BroadcastChannel"in self&&((es=new BroadcastChannel("[Firebase] FID Change")).onmessage=e=>{callFidChangeCallbacks(e.data.key,e.data.fid)}),es);r&&r.postMessage({key:e,fid:t}),0===eo.size&&es&&(es.close(),es=null)}(r,t)}function callFidChangeCallbacks(e,t){let r=eo.get(e);if(r)for(let e of r)e(t)}let es=null,el="firebase-installations-store",ec=null;function index_esm2017_getDbPromise(){return ec||(ec=function(e,t,{blocked:r,upgrade:n,blocking:a,terminated:i}={}){let o=indexedDB.open(e,1),s=build_wrap_idb_value_wrap(o);return n&&o.addEventListener("upgradeneeded",e=>{n(build_wrap_idb_value_wrap(o.result),e.oldVersion,e.newVersion,build_wrap_idb_value_wrap(o.transaction))}),r&&o.addEventListener("blocked",()=>r()),s.then(e=>{i&&e.addEventListener("close",()=>i()),a&&e.addEventListener("versionchange",()=>a())}).catch(()=>{}),s}("firebase-installations-database",0,{upgrade:(e,t)=>{0===t&&e.createObjectStore(el)}})),ec}async function set(e,t){let r=getKey(e),n=await index_esm2017_getDbPromise(),a=n.transaction(el,"readwrite"),i=a.objectStore(el),o=await i.get(r);return await i.put(t,r),await a.done,o&&o.fid===t.fid||fidChanged(e,t.fid),t}async function remove(e){let t=getKey(e),r=await index_esm2017_getDbPromise(),n=r.transaction(el,"readwrite");await n.objectStore(el).delete(t),await n.done}async function update(e,t){let r=getKey(e),n=await index_esm2017_getDbPromise(),a=n.transaction(el,"readwrite"),i=a.objectStore(el),o=await i.get(r),s=t(o);return void 0===s?await i.delete(r):await i.put(s,r),await a.done,s&&(!o||o.fid!==s.fid)&&fidChanged(e,s.fid),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function getInstallationEntry(e){let t;let r=await update(e.appConfig,r=>{let n=function(e){let t=e||{fid:function(){try{let e=new Uint8Array(17),t=self.crypto||self.msCrypto;t.getRandomValues(e),e[0]=112+e[0]%16;let r=function(e){let t=/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t=btoa(String.fromCharCode(...e));return t.replace(/\+/g,"-").replace(/\//g,"_")}(e);return t.substr(0,22)}(e);return ei.test(r)?r:""}catch(e){return""}}(),registrationStatus:0};return clearTimedOutRequest(t)}(r),a=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){let e=Promise.reject(ea.create("app-offline"));return{installationEntry:t,registrationPromise:e}}let r={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},n=registerInstallation(e,r);return{installationEntry:r,registrationPromise:n}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:waitUntilFidRegistration(e)}:{installationEntry:t}}(e,n);return t=a.registrationPromise,a.installationEntry});return""===r.fid?{installationEntry:await t}:{installationEntry:r,registrationPromise:t}}async function registerInstallation(e,t){try{let r=await createInstallationRequest(e,t);return set(e.appConfig,r)}catch(r){throw isServerError(r)&&409===r.customData.serverCode?await remove(e.appConfig):await set(e.appConfig,{fid:t.fid,registrationStatus:0}),r}}async function waitUntilFidRegistration(e){let t=await updateInstallationRequest(e.appConfig);for(;1===t.registrationStatus;)await sleep(100),t=await updateInstallationRequest(e.appConfig);if(0===t.registrationStatus){let{installationEntry:t,registrationPromise:r}=await getInstallationEntry(e);return r||t}return t}function updateInstallationRequest(e){return update(e,e=>{if(!e)throw ea.create("installation-not-found");return clearTimedOutRequest(e)})}function clearTimedOutRequest(e){return 1===e.registrationStatus&&e.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function generateAuthTokenRequest({appConfig:e,heartbeatServiceProvider:t},r){let n=function(e,{fid:t}){return`${getInstallationsEndpoint(e)}/${t}/authTokens:generate`}(e,r),a=function(e,{refreshToken:t}){let r=getHeaders(e);return r.append("Authorization",`${en} ${t}`),r}(e,r),i=t.getImmediate({optional:!0});if(i){let e=await i.getHeartbeatsHeader();e&&a.append("x-firebase-client",e)}let o={installation:{sdkVersion:er,appId:e.appId}},s={method:"POST",headers:a,body:JSON.stringify(o)},l=await retryIfServerError(()=>fetch(n,s));if(l.ok){let e=await l.json(),t=extractAuthTokenInfoFromResponse(e);return t}throw await getErrorFromResponse("Generate Auth Token",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function refreshAuthToken(e,t=!1){let r;let n=await update(e.appConfig,n=>{var a;if(!isEntryRegistered(n))throw ea.create("not-registered");let i=n.authToken;if(!t&&2===(a=i).requestStatus&&!function(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(a))return n;if(1===i.requestStatus)return r=waitUntilAuthTokenRequest(e,t),n;{if(!navigator.onLine)throw ea.create("app-offline");let t=function(e){let t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(n);return r=fetchAuthTokenFromServer(e,t),t}}),a=r?await r:n.authToken;return a}async function waitUntilAuthTokenRequest(e,t){let r=await updateAuthTokenRequest(e.appConfig);for(;1===r.authToken.requestStatus;)await sleep(100),r=await updateAuthTokenRequest(e.appConfig);let n=r.authToken;return 0===n.requestStatus?refreshAuthToken(e,t):n}function updateAuthTokenRequest(e){return update(e,e=>{if(!isEntryRegistered(e))throw ea.create("not-registered");let t=e.authToken;return 1===t.requestStatus&&t.requestTime+1e4<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function fetchAuthTokenFromServer(e,t){try{let r=await generateAuthTokenRequest(e,t),n=Object.assign(Object.assign({},t),{authToken:r});return await set(e.appConfig,n),r}catch(r){if(isServerError(r)&&(401===r.customData.serverCode||404===r.customData.serverCode))await remove(e.appConfig);else{let r=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await set(e.appConfig,r)}throw r}}function isEntryRegistered(e){return void 0!==e&&2===e.registrationStatus}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function getId(e){let{installationEntry:t,registrationPromise:r}=await getInstallationEntry(e);return r?r.catch(console.error):refreshAuthToken(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function getToken(e,t=!1){await completeInstallationRegistration(e);let r=await refreshAuthToken(e,t);return r.token}async function completeInstallationRegistration(e){let{registrationPromise:t}=await getInstallationEntry(e);t&&await t}function getMissingValueError(e){return ea.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eu="installations";_registerComponent(new Component(eu,e=>{let t=e.getProvider("app").getImmediate(),r=/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(!e||!e.options)throw getMissingValueError("App Configuration");if(!e.name)throw getMissingValueError("App Name");for(let t of["projectId","apiKey","appId"])if(!e.options[t])throw getMissingValueError(t);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),n=index_esm2017_getProvider(t,"heartbeat");return{app:t,appConfig:r,heartbeatServiceProvider:n,_delete:()=>Promise.resolve()}},"PUBLIC")),_registerComponent(new Component("installations-internal",e=>{let t=e.getProvider("app").getImmediate(),r=index_esm2017_getProvider(t,eu).getImmediate();return{getId:()=>getId(r),getToken:e=>getToken(r,e)}},"PRIVATE")),registerVersion(ee,et),registerVersion(ee,et,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ed="analytics",ep="https://www.googletagmanager.com/gtag/js",eh=new Logger("@firebase/analytics"),ef=new ErrorFactory("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function createGtagTrustedTypesScriptURL(e){if(!e.startsWith(ep)){let t=ef.create("invalid-gtag-resource",{gtagURL:e});return eh.warn(t.message),""}return e}function promiseAllSettled(e){return Promise.all(e.map(e=>e.catch(e=>e)))}async function gtagOnConfig(e,t,r,n,a,i){let o=n[a];try{if(o)await t[o];else{let e=await promiseAllSettled(r),n=e.find(e=>e.measurementId===a);n&&await t[n.appId]}}catch(e){eh.error(e)}e("config",a,i)}async function gtagOnEvent(e,t,r,n,a){try{let i=[];if(a&&a.send_to){let e=a.send_to;Array.isArray(e)||(e=[e]);let n=await promiseAllSettled(r);for(let r of e){let e=n.find(e=>e.measurementId===r),a=e&&t[e.appId];if(a)i.push(a);else{i=[];break}}}0===i.length&&(i=Object.values(t)),await Promise.all(i),e("event",n,a||{})}catch(e){eh.error(e)}}let eg=new class{constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}};async function fetchDynamicConfig(e){var t;let{appId:r,apiKey:n}=e,a={method:"GET",headers:new Headers({Accept:"application/json","x-goog-api-key":n})},i="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",r),o=await fetch(i,a);if(200!==o.status&&304!==o.status){let e="";try{let r=await o.json();(null===(t=r.error)||void 0===t?void 0:t.message)&&(e=r.error.message)}catch(e){}throw ef.create("config-fetch-failed",{httpStatus:o.status,responseMessage:e})}return o.json()}async function fetchDynamicConfigWithRetry(e,t=eg,r){let{appId:n,apiKey:a,measurementId:i}=e.options;if(!n)throw ef.create("no-app-id");if(!a){if(i)return{measurementId:i,appId:n};throw ef.create("no-api-key")}let o=t.getThrottleMetadata(n)||{backoffCount:0,throttleEndTimeMillis:Date.now()},s=new AnalyticsAbortSignal;return setTimeout(async()=>{s.abort()},void 0!==r?r:6e4),attemptFetchDynamicConfigWithRetry({appId:n,apiKey:a,measurementId:i},o,s,t)}async function attemptFetchDynamicConfigWithRetry(e,{throttleEndTimeMillis:t,backoffCount:r},n,a=eg){var i;let{appId:o,measurementId:s}=e;try{await new Promise((e,r)=>{let a=Math.max(t-Date.now(),0),i=setTimeout(e,a);n.addEventListener(()=>{clearTimeout(i),r(ef.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}catch(e){if(s)return eh.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${null==e?void 0:e.message}]`),{appId:o,measurementId:s};throw e}try{let t=await fetchDynamicConfig(e);return a.deleteThrottleMetadata(o),t}catch(c){if(!function(e){if(!(e instanceof FirebaseError)||!e.customData)return!1;let t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(c)){if(a.deleteThrottleMetadata(o),s)return eh.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${null==c?void 0:c.message}]`),{appId:o,measurementId:s};throw c}let t=503===Number(null===(i=null==c?void 0:c.customData)||void 0===i?void 0:i.httpStatus)?calculateBackoffMillis(r,a.intervalMillis,30):calculateBackoffMillis(r,a.intervalMillis),l={throttleEndTimeMillis:Date.now()+t,backoffCount:r+1};return a.setThrottleMetadata(o,l),eh.debug(`Calling attemptFetch again in ${t} millis`),attemptFetchDynamicConfigWithRetry(e,l,n,a)}}let AnalyticsAbortSignal=class AnalyticsAbortSignal{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}};async function logEvent$1(e,t,r,n,a){if(a&&a.global){e("event",r,n);return}{let a=await t,i=Object.assign(Object.assign({},n),{send_to:a});e("event",r,i)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function validateIndexedDB(){if(!index_esm2017_isIndexedDBAvailable())return eh.warn(ef.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await index_esm2017_validateIndexedDBOpenable()}catch(e){return eh.warn(ef.create("indexeddb-unavailable",{errorInfo:null==e?void 0:e.toString()}).message),!1}return!0}async function _initializeAnalytics(e,t,r,n,a,i,o){var c;let u=fetchDynamicConfigWithRetry(e);u.then(t=>{r[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&eh.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(e=>eh.error(e)),t.push(u);let d=validateIndexedDB().then(e=>e?n.getId():void 0),[p,h]=await Promise.all([u,d]);!function(e){let t=window.document.getElementsByTagName("script");for(let r of Object.values(t))if(r.src&&r.src.includes(ep)&&r.src.includes(e))return r;return null}(i)&&function(e,t){let r;let n=(window.trustedTypes&&(r=window.trustedTypes.createPolicy("firebase-js-sdk-policy",{createScriptURL:createGtagTrustedTypesScriptURL})),r),a=document.createElement("script"),i=`${ep}?l=${e}&id=${t}`;a.src=n?null==n?void 0:n.createScriptURL(i):i,a.async=!0,document.head.appendChild(a)}(i,p.measurementId),l&&(a("consent","default",l),l=void 0),a("js",new Date);let f=null!==(c=null==o?void 0:o.config)&&void 0!==c?c:{};return f.origin="firebase",f.update=!0,null!=h&&(f.firebase_id=h),a("config",p.measurementId,f),s&&(a("set",s),s=void 0),p.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let AnalyticsService=class AnalyticsService{constructor(e){this.app=e}_delete(){return delete em[this.app.options.appId],Promise.resolve()}};let em={},eb=[],ew={},ey="dataLayer",ev=!1,e_="@firebase/analytics",eI="0.10.0";_registerComponent(new Component(ed,(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),n=e.getProvider("installations-internal").getImmediate();return function(e,t,r){!function(){let e=[];if(function(){let e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}()&&e.push("This is a browser extension environment."),"undefined"!=typeof navigator&&navigator.cookieEnabled||e.push("Cookies are not available."),e.length>0){let t=e.map((e,t)=>`(${t+1}) ${e}`).join(" "),r=ef.create("invalid-analytics-context",{errorInfo:t});eh.warn(r.message)}}();let n=e.options.appId;if(!n)throw ef.create("no-app-id");if(!e.options.apiKey){if(e.options.measurementId)eh.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw ef.create("no-api-key")}if(null!=em[n])throw ef.create("already-exists",{id:n});if(!ev){var a,i;let e,t;e=[],Array.isArray(window[ey])?e=window[ey]:window[ey]=e;let{wrappedGtag:r,gtagCore:n}=(a="gtag",t=function(...e){window[ey].push(arguments)},window[a]&&"function"==typeof window[a]&&(t=window[a]),window[a]=(i=t,async function(e,...t){try{if("event"===e){let[e,r]=t;await gtagOnEvent(i,em,eb,e,r)}else if("config"===e){let[e,r]=t;await gtagOnConfig(i,em,eb,ew,e,r)}else if("consent"===e){let[e]=t;i("consent","update",e)}else if("get"===e){let[e,r,n]=t;i("get",e,r,n)}else if("set"===e){let[e]=t;i("set",e)}else i(e,...t)}catch(e){eh.error(e)}}),{gtagCore:t,wrappedGtag:window[a]});u=r,c=n,ev=!0}em[n]=_initializeAnalytics(e,eb,ew,t,c,ey,r);let o=new AnalyticsService(e);return o}(r,n,t)},"PUBLIC")),_registerComponent(new Component("analytics-internal",function(e){try{let t=e.getProvider(ed).getImmediate();return{logEvent:(e,r,n)=>{var a;return a=t,void(a=index_esm2017_getModularInstance(a),logEvent$1(u,em[a.app.options.appId],e,r,n).catch(e=>eh.error(e)))}}}catch(e){throw ef.create("interop-component-reg-failed",{reason:e})}},"PRIVATE")),registerVersion(e_,eI),registerVersion(e_,eI,"esm2017"),Array.from(N.values()).length||(initializeApp({apiKey:"AIzaSyDCMz60fSZWmUamvWoiCm3qnMwWnqo0Ld8",authDomain:"tktcorporation-home.firebaseapp.com",databaseURL:"https://tktcorporation-home.firebaseio.com",projectId:"tktcorporation-home",storageBucket:"tktcorporation-home.appspot.com",messagingSenderId:"30824290023",appId:"1:30824290023:web:45dde016c25c8560a83442",measurementId:"G-JLL4WBFC4D"}),d=function(e=function(e=$){let t=N.get(e);if(!t&&e===$&&getDefaultAppConfig())return initializeApp();if(!t)throw V.create("no-app",{appName:e});return t}()){e=index_esm2017_getModularInstance(e);let t=index_esm2017_getProvider(e,ed);return t.isInitialized()?t.getImmediate():function(e,t={}){let r=index_esm2017_getProvider(e,ed);if(r.isInitialized()){let e=r.getImmediate();if(deepEqual(t,r.getOptions()))return e;throw ef.create("already-initialized")}let n=r.initialize({options:t});return n}(e)}());var _app=function(e){let{Component:t,pageProps:r}=e;return(0,b.useEffect)(()=>{d.app.automaticDataCollectionEnabled=!0},[]),(0,m.jsx)(t,{...r})}},2352:function(){},7663:function(e){!function(){var t={229:function(e){var t,r,n,a=e.exports={};function defaultSetTimout(){throw Error("setTimeout has not been defined")}function defaultClearTimeout(){throw Error("clearTimeout has not been defined")}function runTimeout(e){if(t===setTimeout)return setTimeout(e,0);if((t===defaultSetTimout||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){t=defaultSetTimout}try{r="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){r=defaultClearTimeout}}();var i=[],o=!1,s=-1;function cleanUpNextTick(){o&&n&&(o=!1,n.length?i=n.concat(i):s=-1,i.length&&drainQueue())}function drainQueue(){if(!o){var e=runTimeout(cleanUpNextTick);o=!0;for(var t=i.length;t;){for(n=i,i=[];++s<t;)n&&n[s].run();s=-1,t=i.length}n=null,o=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===defaultClearTimeout||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}a.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];i.push(new Item(e,t)),1!==i.length||o||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=noop,a.addListener=noop,a.once=noop,a.off=noop,a.removeListener=noop,a.removeAllListeners=noop,a.emit=noop,a.prependListener=noop,a.prependOnceListener=noop,a.listeners=function(e){return[]},a.binding=function(e){throw Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(e){throw Error("process.chdir is not supported")},a.umask=function(){return 0}}},r={};function __nccwpck_require__(e){var n=r[e];if(void 0!==n)return n.exports;var a=r[e]={exports:{}},i=!0;try{t[e](a,a.exports,__nccwpck_require__),i=!1}finally{i&&delete r[e]}return a.exports}__nccwpck_require__.ab="//";var n=__nccwpck_require__(229);e.exports=n}()}},function(e){var __webpack_exec__=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return __webpack_exec__(6840),__webpack_exec__(9974)}),_N_E=e.O()}]);