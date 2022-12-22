(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{6840:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return a(1703)}])},1703:function(e,t,a){"use strict";let n,i,r,s,o,l,c;a.r(t),a.d(t,{default:function(){return tD}});var h,u,d,f=a(5893);a(4222);var p=a(7294);/**
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
 */let m=function(e){let t=[],a=0;for(let n=0;n<e.length;n++){let i=e.charCodeAt(n);i<128?t[a++]=i:i<2048?(t[a++]=i>>6|192,t[a++]=63&i|128):(64512&i)==55296&&n+1<e.length&&(64512&e.charCodeAt(n+1))==56320?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++n)),t[a++]=i>>18|240,t[a++]=i>>12&63|128,t[a++]=i>>6&63|128,t[a++]=63&i|128):(t[a++]=i>>12|224,t[a++]=i>>6&63|128,t[a++]=63&i|128)}return t},g=function(e){let t=[],a=0,n=0;for(;a<e.length;){let i=e[a++];if(i<128)t[n++]=String.fromCharCode(i);else if(i>191&&i<224){let r=e[a++];t[n++]=String.fromCharCode((31&i)<<6|63&r)}else if(i>239&&i<365){let s=e[a++],o=e[a++],l=e[a++],c=((7&i)<<18|(63&s)<<12|(63&o)<<6|63&l)-65536;t[n++]=String.fromCharCode(55296+(c>>10)),t[n++]=String.fromCharCode(56320+(1023&c))}else{let h=e[a++],u=e[a++];t[n++]=String.fromCharCode((15&i)<<12|(63&h)<<6|63&u)}}return t.join("")},b={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let a=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<e.length;i+=3){let r=e[i],s=i+1<e.length,o=s?e[i+1]:0,l=i+2<e.length,c=l?e[i+2]:0,h=r>>2,u=(3&r)<<4|o>>4,d=(15&o)<<2|c>>6,f=63&c;l||(f=64,s||(d=64)),n.push(a[h],a[u],a[d],a[f])}return n.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(m(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):g(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let a=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<e.length;){let r=a[e.charAt(i++)],s=i<e.length,o=s?a[e.charAt(i)]:0;++i;let l=i<e.length,c=l?a[e.charAt(i)]:64;++i;let h=i<e.length,u=h?a[e.charAt(i)]:64;if(++i,null==r||null==o||null==c||null==u)throw Error();let d=r<<2|o>>4;if(n.push(d),64!==c){let f=o<<4&240|c>>2;if(n.push(f),64!==u){let p=c<<6&192|u;n.push(p)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},w=function(e){let t=m(e);return b.encodeByteArray(t,!0)},y=function(e){return w(e).replace(/\./g,"")};/**
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
 */class v{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,a)=>{t?this.reject(t):this.resolve(a),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,a))}}}function I(){return"object"==typeof indexedDB}function E(){return new Promise((e,t)=>{try{let a=!0,n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),a||self.indexedDB.deleteDatabase(n),e(!0)},i.onupgradeneeded=()=>{a=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(r){t(r)}})}class C extends Error{constructor(e,t,a){super(t),this.code=e,this.customData=a,this.name="FirebaseError",Object.setPrototypeOf(this,C.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,_.prototype.create)}}class _{constructor(e,t,a){this.service=e,this.serviceName=t,this.errors=a}create(e,...t){let a=t[0]||{},n=`${this.service}/${e}`,i=this.errors[e],r=i?i.replace(D,(e,t)=>{let n=a[t];return null!=n?String(n):`<${t}?>`}):"Error",s=`${this.serviceName}: ${r} (${n}).`,o=new C(n,s,a);return o}}let D=/\{\$([^}]+)}/g;function S(e,t){if(e===t)return!0;let a=Object.keys(e),n=Object.keys(t);for(let i of a){if(!n.includes(i))return!1;let r=e[i],s=t[i];if(A(r)&&A(s)){if(!S(r,s))return!1}else if(r!==s)return!1}for(let o of n)if(!a.includes(o))return!1;return!0}function A(e){return null!==e&&"object"==typeof e}function T(e,t=1e3,a=2){let n=t*Math.pow(a,e);return Math.min(144e5,n+Math.round(.5*n*(Math.random()-.5)*2))}/**
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
 */function O(e){return e&&e._delegate?e._delegate:e}class k{constructor(e,t,a){this.name=e,this.instanceFactory=t,this.type=a,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */let M="[DEFAULT]";/**
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
 */class B{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let a=new v;if(this.instancesDeferred.set(t,a),this.isInitialized(t)||this.shouldAutoInitialize())try{let n=this.getOrInitializeService({instanceIdentifier:t});n&&a.resolve(n)}catch(i){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let a=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),n=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(this.isInitialized(a)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:a})}catch(i){if(n)return null;throw i}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if("EAGER"===e.instantiationMode)try{this.getOrInitializeService({instanceIdentifier:M})}catch(t){}for(let[a,n]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(a);try{let r=this.getOrInitializeService({instanceIdentifier:i});n.resolve(r)}catch(s){}}}}clearInstance(e=M){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=M){return this.instances.has(e)}getOptions(e=M){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,a=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(a))throw Error(`${this.name}(${a}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let n=this.getOrInitializeService({instanceIdentifier:a,options:t});for(let[i,r]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(i);a===s&&r.resolve(n)}return n}onInit(e,t){var a;let n=this.normalizeInstanceIdentifier(t),i=null!==(a=this.onInitCallbacks.get(n))&&void 0!==a?a:new Set;i.add(e),this.onInitCallbacks.set(n,i);let r=this.instances.get(n);return r&&e(r,n),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){let a=this.onInitCallbacks.get(t);if(a)for(let n of a)try{n(e,t)}catch(i){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let a=this.instances.get(e);if(!a&&this.component&&(a=this.component.instanceFactory(this.container,{instanceIdentifier:e===M?void 0:e,options:t}),this.instances.set(e,a),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(a,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,a)}catch(n){}return a||null}normalizeInstanceIdentifier(e=M){return this.component?this.component.multipleInstances?e:M:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}/**
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
 */class ${constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){let t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new B(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */let L=[];(u=d||(d={}))[u.DEBUG=0]="DEBUG",u[u.VERBOSE=1]="VERBOSE",u[u.INFO=2]="INFO",u[u.WARN=3]="WARN",u[u.ERROR=4]="ERROR",u[u.SILENT=5]="SILENT";let N={debug:d.DEBUG,verbose:d.VERBOSE,info:d.INFO,warn:d.WARN,error:d.ERROR,silent:d.SILENT},j=d.INFO,P={[d.DEBUG]:"log",[d.VERBOSE]:"log",[d.INFO]:"info",[d.WARN]:"warn",[d.ERROR]:"error"},F=(e,t,...a)=>{if(t<e.logLevel)return;let n=new Date().toISOString(),i=P[t];if(i)console[i](`[${n}]  ${e.name}:`,...a);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class x{constructor(e){this.name=e,this._logLevel=j,this._logHandler=F,this._userLogHandler=null,L.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in d))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?N[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,d.DEBUG,...e),this._logHandler(this,d.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,d.VERBOSE,...e),this._logHandler(this,d.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,d.INFO,...e),this._logHandler(this,d.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,d.WARN,...e),this._logHandler(this,d.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,d.ERROR,...e),this._logHandler(this,d.ERROR,...e)}}let H=(e,t)=>t.some(t=>e instanceof t),R=new WeakMap,z=new WeakMap,V=new WeakMap,W=new WeakMap,q=new WeakMap,U={get(e,t,a){if(e instanceof IDBTransaction){if("done"===t)return z.get(e);if("objectStoreNames"===t)return e.objectStoreNames||V.get(e);if("store"===t)return a.objectStoreNames[1]?void 0:a.objectStore(a.objectStoreNames[0])}return G(e[t])},set:(e,t,a)=>(e[t]=a,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function G(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,a)=>{let n=()=>{e.removeEventListener("success",i),e.removeEventListener("error",r)},i=()=>{t(G(e.result)),n()},r=()=>{a(e.error),n()};e.addEventListener("success",i),e.addEventListener("error",r)});return t.then(t=>{t instanceof IDBCursor&&R.set(t,e)}).catch(()=>{}),q.set(t,e),t}(e);if(W.has(e))return W.get(e);let a="function"==typeof(t=e)?t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(i||(i=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(K(this),e),G(R.get(this))}:function(...e){return G(t.apply(K(this),e))}:function(e,...a){let n=t.call(K(this),e,...a);return V.set(n,e.sort?e.sort():[e]),G(n)}:(t instanceof IDBTransaction&&function(e){if(z.has(e))return;let t=new Promise((t,a)=>{let n=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",r),e.removeEventListener("abort",r)},i=()=>{t(),n()},r=()=>{a(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",i),e.addEventListener("error",r),e.addEventListener("abort",r)});z.set(e,t)}(t),H(t,n||(n=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,U):t;return a!==e&&(W.set(e,a),q.set(a,e)),a}let K=e=>q.get(e);function J(e,t,{blocked:a,upgrade:n,blocking:i,terminated:r}={}){let s=indexedDB.open(e,t),o=G(s);return n&&s.addEventListener("upgradeneeded",e=>{n(G(s.result),e.oldVersion,e.newVersion,G(s.transaction))}),a&&s.addEventListener("blocked",()=>a()),o.then(e=>{r&&e.addEventListener("close",()=>r()),i&&e.addEventListener("versionchange",()=>i())}).catch(()=>{}),o}let X=["get","getKey","getAll","getAllKeys","count"],Z=["put","add","delete","clear"],Y=new Map;function Q(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(Y.get(t))return Y.get(t);let a=t.replace(/FromIndex$/,""),n=t!==a,i=Z.includes(a);if(!(a in(n?IDBIndex:IDBObjectStore).prototype)||!(i||X.includes(a)))return;let r=async function(e,...t){let r=this.transaction(e,i?"readwrite":"readonly"),s=r.store;return n&&(s=s.index(t.shift())),(await Promise.all([s[a](...t),i&&r.done]))[0]};return Y.set(t,r),r}U={...h=U,get:(e,t,a)=>Q(e,t)||h.get(e,t,a),has:(e,t)=>!!Q(e,t)||h.has(e,t)};/**
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
 */class ee{constructor(e){this.container=e}getPlatformInfoString(){let e=this.container.getProviders();return e.map(e=>{if(!function(e){let t=e.getComponent();return(null==t?void 0:t.type)==="VERSION"}(e))return null;{let t=e.getImmediate();return`${t.library}/${t.version}`}}).filter(e=>e).join(" ")}}let et="@firebase/app",ea="0.7.33",en=new x("@firebase/app"),ei="[DEFAULT]",er={[et]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},es=new Map,eo=new Map;function el(e){let t=e.name;if(eo.has(t))return en.debug(`There were multiple attempts to register component ${t}.`),!1;for(let a of(eo.set(t,e),es.values()))!function(e,t){try{e.container.addComponent(t)}catch(a){en.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,a)}}(a,e);return!0}function ec(e,t){let a=e.container.getProvider("heartbeat").getImmediate({optional:!0});return a&&a.triggerHeartbeat(),e.container.getProvider(t)}let eh=new _("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."});/**
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
 */class eu{constructor(e,t,a){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=a,this.container.addComponent(new k("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw eh.create("app-deleted",{appName:this._name})}}function ed(e,t,a){var n;let i=null!==(n=er[e])&&void 0!==n?n:e;a&&(i+=`-${a}`);let r=i.match(/\s|\//),s=t.match(/\s|\//);if(r||s){let o=[`Unable to register library "${i}" with version "${t}":`];r&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&s&&o.push("and"),s&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),en.warn(o.join(" "));return}el(new k(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}let ef="firebase-heartbeat-store",ep=null;function em(){return ep||(ep=J("firebase-heartbeat-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(ef)}}).catch(e=>{throw eh.create("idb-open",{originalErrorMessage:e.message})})),ep}async function eg(e){try{let t=await em();return t.transaction(ef).objectStore(ef).get(ew(e))}catch(n){if(n instanceof C)en.warn(n.message);else{let a=eh.create("idb-get",{originalErrorMessage:null==n?void 0:n.message});en.warn(a.message)}}}async function eb(e,t){try{let a=await em(),n=a.transaction(ef,"readwrite"),i=n.objectStore(ef);return await i.put(t,ew(e)),n.done}catch(s){if(s instanceof C)en.warn(s.message);else{let r=eh.create("idb-set",{originalErrorMessage:null==s?void 0:s.message});en.warn(r.message)}}}function ew(e){return`${e.name}!${e.options.appId}`}class ey{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new eI(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){let e=this.container.getProvider("platform-logger").getImmediate(),t=e.getPlatformInfoString(),a=ev();return(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(e=>e.date===a))?void 0:(this._heartbeatsCache.heartbeats.push({date:a,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{let t=new Date(e.date).valueOf(),a=Date.now();return a-t<=2592e6}),this._storage.overwrite(this._heartbeatsCache))}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";let e=ev(),{heartbeatsToSend:t,unsentEntries:a}=function(e,t=1024){let a=[],n=e.slice();for(let i of e){let r=a.find(e=>e.agent===i.agent);if(r){if(r.dates.push(i.date),eE(a)>t){r.dates.pop();break}}else if(a.push({agent:i.agent,dates:[i.date]}),eE(a)>t){a.pop();break}n=n.slice(1)}return{heartbeatsToSend:a,unsentEntries:n}}(this._heartbeatsCache.heartbeats),n=y(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,a.length>0?(this._heartbeatsCache.heartbeats=a,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),n}}function ev(){let e=new Date;return e.toISOString().substring(0,10)}class eI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!I()&&E().then(()=>!0).catch(()=>!1)}async read(){let e=await this._canUseIndexedDBPromise;if(!e)return{heartbeats:[]};{let t=await eg(this.app);return t||{heartbeats:[]}}}async overwrite(e){var t;let a=await this._canUseIndexedDBPromise;if(a){let n=await this.read();return eb(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;let a=await this._canUseIndexedDBPromise;if(a){let n=await this.read();return eb(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function eE(e){return y(JSON.stringify({version:2,heartbeats:e})).length}el(new k("platform-logger",e=>new ee(e),"PRIVATE")),el(new k("heartbeat",e=>new ey(e),"PRIVATE")),ed(et,ea,""),ed(et,ea,"esm2017"),ed("fire-js",""),/**
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
 */ed("firebase","9.10.0","app");let eC="@firebase/installations",e_="0.5.12",eD=`w:${e_}`,eS="FIS_v2",eA=new _("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function eT(e){return e instanceof C&&e.code.includes("request-failed")}/**
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
 */function eO({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function ek(e){return{token:e.token,requestStatus:2,expiresIn:Number(e.expiresIn.replace("s","000")),creationTime:Date.now()}}async function eM(e,t){let a=await t.json(),n=a.error;return eA.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function eB({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}async function e$(e){let t=await e();return t.status>=500&&t.status<600?e():t}/**
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
 */async function eL({appConfig:e,heartbeatServiceProvider:t},{fid:a}){let n=eO(e),i=eB(e),r=t.getImmediate({optional:!0});if(r){let s=await r.getHeartbeatsHeader();s&&i.append("x-firebase-client",s)}let o={fid:a,authVersion:eS,appId:e.appId,sdkVersion:eD},l={method:"POST",headers:i,body:JSON.stringify(o)},c=await e$(()=>fetch(n,l));if(c.ok){let h=await c.json(),u={fid:h.fid||a,registrationStatus:2,refreshToken:h.refreshToken,authToken:ek(h.authToken)};return u}throw await eM("Create Installation",c)}/**
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
 */function eN(e){return new Promise(t=>{setTimeout(t,e)})}/**
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
 */let ej=/^[cdef][\w-]{21}$/;/**
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
 */function eP(e){return`${e.appName}!${e.appId}`}/**
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
 */let eF=new Map;function ex(e,t){let a=eP(e);eH(a,t),function(e,t){let a=(!eR&&"BroadcastChannel"in self&&((eR=new BroadcastChannel("[Firebase] FID Change")).onmessage=e=>{eH(e.data.key,e.data.fid)}),eR);a&&a.postMessage({key:e,fid:t}),0===eF.size&&eR&&(eR.close(),eR=null)}(a,t)}function eH(e,t){let a=eF.get(e);if(a)for(let n of a)n(t)}let eR=null,ez="firebase-installations-store",eV=null;function eW(){return eV||(eV=J("firebase-installations-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(ez)}})),eV}async function eq(e,t){let a=eP(e),n=await eW(),i=n.transaction(ez,"readwrite"),r=i.objectStore(ez),s=await r.get(a);return await r.put(t,a),await i.done,s&&s.fid===t.fid||ex(e,t.fid),t}async function eU(e){let t=eP(e),a=await eW(),n=a.transaction(ez,"readwrite");await n.objectStore(ez).delete(t),await n.done}async function eG(e,t){let a=eP(e),n=await eW(),i=n.transaction(ez,"readwrite"),r=i.objectStore(ez),s=await r.get(a),o=t(s);return void 0===o?await r.delete(a):await r.put(o,a),await i.done,o&&(!s||s.fid!==o.fid)&&ex(e,o.fid),o}/**
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
 */async function eK(e){let t;let a=await eG(e.appConfig,a=>{let n=function(e){let t=e||{fid:function(){try{let e=new Uint8Array(17),t=self.crypto||self.msCrypto;t.getRandomValues(e),e[0]=112+e[0]%16;let a=function(e){let t=/**
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
 */function(e){let t=btoa(String.fromCharCode(...e));return t.replace(/\+/g,"-").replace(/\//g,"_")}(e);return t.substr(0,22)}(e);return ej.test(a)?a:""}catch(n){return""}}(),registrationStatus:0};return eY(t)}(a),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){let a=Promise.reject(eA.create("app-offline"));return{installationEntry:t,registrationPromise:a}}let n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=eJ(e,n);return{installationEntry:n,registrationPromise:i}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:eX(e)}:{installationEntry:t}}(e,n);return t=i.registrationPromise,i.installationEntry});return""===a.fid?{installationEntry:await t}:{installationEntry:a,registrationPromise:t}}async function eJ(e,t){try{let a=await eL(e,t);return eq(e.appConfig,a)}catch(n){throw eT(n)&&409===n.customData.serverCode?await eU(e.appConfig):await eq(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function eX(e){let t=await eZ(e.appConfig);for(;1===t.registrationStatus;)await eN(100),t=await eZ(e.appConfig);if(0===t.registrationStatus){let{installationEntry:a,registrationPromise:n}=await eK(e);return n||a}return t}function eZ(e){return eG(e,e=>{if(!e)throw eA.create("installation-not-found");return eY(e)})}function eY(e){return 1===e.registrationStatus&&e.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e}/**
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
 */async function eQ({appConfig:e,heartbeatServiceProvider:t},a){let n=function(e,{fid:t}){return`${eO(e)}/${t}/authTokens:generate`}(e,a),i=function(e,{refreshToken:t}){let a=eB(e);return a.append("Authorization",`${eS} ${t}`),a}(e,a),r=t.getImmediate({optional:!0});if(r){let s=await r.getHeartbeatsHeader();s&&i.append("x-firebase-client",s)}let o={installation:{sdkVersion:eD,appId:e.appId}},l={method:"POST",headers:i,body:JSON.stringify(o)},c=await e$(()=>fetch(n,l));if(c.ok){let h=await c.json(),u=ek(h);return u}throw await eM("Generate Auth Token",c)}/**
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
 */async function e0(e,t=!1){let a;let n=await eG(e.appConfig,n=>{var i;if(!e3(n))throw eA.create("not-registered");let r=n.authToken;if(!t&&2===(i=r).requestStatus&&!function(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(i))return n;if(1===r.requestStatus)return a=e1(e,t),n;{if(!navigator.onLine)throw eA.create("app-offline");let s=function(e){let t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(n);return a=e6(e,s),s}}),i=a?await a:n.authToken;return i}async function e1(e,t){let a=await e2(e.appConfig);for(;1===a.authToken.requestStatus;)await eN(100),a=await e2(e.appConfig);let n=a.authToken;return 0===n.requestStatus?e0(e,t):n}function e2(e){return eG(e,e=>{if(!e3(e))throw eA.create("not-registered");let t=e.authToken;return 1===t.requestStatus&&t.requestTime+1e4<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function e6(e,t){try{let a=await eQ(e,t),n=Object.assign(Object.assign({},t),{authToken:a});return await eq(e.appConfig,n),a}catch(r){if(eT(r)&&(401===r.customData.serverCode||404===r.customData.serverCode))await eU(e.appConfig);else{let i=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await eq(e.appConfig,i)}throw r}}function e3(e){return void 0!==e&&2===e.registrationStatus}/**
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
 */async function e4(e){let{installationEntry:t,registrationPromise:a}=await eK(e);return a?a.catch(console.error):e0(e).catch(console.error),t.fid}/**
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
 */async function e5(e,t=!1){await e8(e);let a=await e0(e,t);return a.token}async function e8(e){let{registrationPromise:t}=await eK(e);t&&await t}function e9(e){return eA.create("missing-app-config-values",{valueName:e})}/**
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
 */let e7="installations",te=e=>{let t=e.getProvider("app").getImmediate(),a=/**
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
 */function(e){if(!e||!e.options)throw e9("App Configuration");if(!e.name)throw e9("App Name");for(let t of["projectId","apiKey","appId"])if(!e.options[t])throw e9(t);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),n=ec(t,"heartbeat");return{app:t,appConfig:a,heartbeatServiceProvider:n,_delete:()=>Promise.resolve()}},tt=e=>{let t=e.getProvider("app").getImmediate(),a=ec(t,e7).getImmediate();return{getId:()=>e4(a),getToken:e=>e5(a,e)}};el(new k(e7,te,"PUBLIC")),el(new k("installations-internal",tt,"PRIVATE")),ed(eC,e_),ed(eC,e_,"esm2017");/**
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
 */let ta="analytics",tn="https://www.googletagmanager.com/gtag/js",ti=new x("@firebase/analytics");/**
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
 */function tr(e){return Promise.all(e.map(e=>e.catch(e=>e)))}async function ts(e,t,a,n,i,r){let s=n[i];try{if(s)await t[s];else{let o=await tr(a),l=o.find(e=>e.measurementId===i);l&&await t[l.appId]}}catch(c){ti.error(c)}e("config",i,r)}async function to(e,t,a,n,i){try{let r=[];if(i&&i.send_to){let s=i.send_to;Array.isArray(s)||(s=[s]);let o=await tr(a);for(let l of s){let c=o.find(e=>e.measurementId===l),h=c&&t[c.appId];if(h)r.push(h);else{r=[];break}}}0===r.length&&(r=Object.values(t)),await Promise.all(r),e("event",n,i||{})}catch(u){ti.error(u)}}let tl=new _("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'}),tc=new class{constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}};async function th(e){var t;let{appId:a,apiKey:n}=e,i={method:"GET",headers:new Headers({Accept:"application/json","x-goog-api-key":n})},r="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",a),s=await fetch(r,i);if(200!==s.status&&304!==s.status){let o="";try{let l=await s.json();(null===(t=l.error)||void 0===t?void 0:t.message)&&(o=l.error.message)}catch(c){}throw tl.create("config-fetch-failed",{httpStatus:s.status,responseMessage:o})}return s.json()}async function tu(e,t=tc,a){let{appId:n,apiKey:i,measurementId:r}=e.options;if(!n)throw tl.create("no-app-id");if(!i){if(r)return{measurementId:r,appId:n};throw tl.create("no-api-key")}let s=t.getThrottleMetadata(n)||{backoffCount:0,throttleEndTimeMillis:Date.now()},o=new tf;return setTimeout(async()=>{o.abort()},void 0!==a?a:6e4),td({appId:n,apiKey:i,measurementId:r},s,o,t)}async function td(e,{throttleEndTimeMillis:t,backoffCount:a},n,i=tc){var r;let{appId:s,measurementId:o}=e;try{await new Promise((e,a)=>{let i=Math.max(t-Date.now(),0),r=setTimeout(e,i);n.addEventListener(()=>{clearTimeout(r),a(tl.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}catch(l){if(o)return ti.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${null==l?void 0:l.message}]`),{appId:s,measurementId:o};throw l}try{let c=await th(e);return i.deleteThrottleMetadata(s),c}catch(d){if(!function(e){if(!(e instanceof C)||!e.customData)return!1;let t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(d)){if(i.deleteThrottleMetadata(s),o)return ti.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${null==d?void 0:d.message}]`),{appId:s,measurementId:o};throw d}let h=503===Number(null===(r=null==d?void 0:d.customData)||void 0===r?void 0:r.httpStatus)?T(a,i.intervalMillis,30):T(a,i.intervalMillis),u={throttleEndTimeMillis:Date.now()+h,backoffCount:a+1};return i.setThrottleMetadata(s,u),ti.debug(`Calling attemptFetch again in ${h} millis`),td(e,u,n,i)}}class tf{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function tp(e,t,a,n,i){if(i&&i.global){e("event",a,n);return}{let r=await t,s=Object.assign(Object.assign({},n),{send_to:r});e("event",a,s)}}/**
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
 */async function tm(){if(!I())return ti.warn(tl.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await E()}catch(e){return ti.warn(tl.create("indexeddb-unavailable",{errorInfo:null==e?void 0:e.toString()}).message),!1}return!0}async function tg(e,t,a,n,i,o,l){var c;let h=tu(e);h.then(t=>{a[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&ti.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(e=>ti.error(e)),t.push(h);let u=tm().then(e=>e?n.getId():void 0),[d,f]=await Promise.all([h,u]);!function(){let e=window.document.getElementsByTagName("script");for(let t of Object.values(e))if(t.src&&t.src.includes(tn))return t;return null}()&&function(e,t){let a=document.createElement("script");a.src=`${tn}?l=${e}&id=${t}`,a.async=!0,document.head.appendChild(a)}(o,d.measurementId),s&&(i("consent","default",s),s=void 0),i("js",new Date);let p=null!==(c=null==l?void 0:l.config)&&void 0!==c?c:{};return p.origin="firebase",p.update=!0,null!=f&&(p.firebase_id=f),i("config",d.measurementId,p),r&&(i("set",r),r=void 0),d.measurementId}/**
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
 */class tb{constructor(e){this.app=e}_delete(){return delete tw[this.app.options.appId],Promise.resolve()}}let tw={},ty=[],tv={},tI="dataLayer",tE=!1,tC="@firebase/analytics",t_="0.8.0";el(new k(ta,(e,{options:t})=>{let a=e.getProvider("app").getImmediate(),n=e.getProvider("installations-internal").getImmediate();return function(e,t,a){!function(){let e=[];if(function(){let e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}()&&e.push("This is a browser extension environment."),"undefined"!=typeof navigator&&navigator.cookieEnabled||e.push("Cookies are not available."),e.length>0){let t=e.map((e,t)=>`(${t+1}) ${e}`).join(" "),a=tl.create("invalid-analytics-context",{errorInfo:t});ti.warn(a.message)}}();let n=e.options.appId;if(!n)throw tl.create("no-app-id");if(!e.options.apiKey){if(e.options.measurementId)ti.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw tl.create("no-api-key")}if(null!=tw[n])throw tl.create("already-exists",{id:n});if(!tE){var i,r;let s,c;s=[],Array.isArray(window[tI])?s=window[tI]:window[tI]=s;let{wrappedGtag:h,gtagCore:u}=(i="gtag",c=function(...e){window[tI].push(arguments)},window[i]&&"function"==typeof window[i]&&(c=window[i]),window[i]=(r=c,async function(e,t,a){try{"event"===e?await to(r,tw,ty,t,a):"config"===e?await ts(r,tw,ty,tv,t,a):"consent"===e?r("consent","update",a):r("set",t)}catch(n){ti.error(n)}}),{gtagCore:c,wrappedGtag:window[i]});l=h,o=u,tE=!0}tw[n]=tg(e,ty,tv,t,o,tI,a);let d=new tb(e);return d}(a,n,t)},"PUBLIC")),el(new k("analytics-internal",function(e){try{let t=e.getProvider(ta).getImmediate();return{logEvent:(e,a,n)=>(function(e,t,a,n){tp(l,tw[(e=O(e)).app.options.appId],t,a,n).catch(e=>ti.error(e))})(t,e,a,n)}}catch(a){throw tl.create("interop-component-reg-failed",{reason:a})}},"PRIVATE")),ed(tC,t_),ed(tC,t_,"esm2017"),Array.from(es.values()).length||(function(e,t={}){if("object"!=typeof t){let a=t;t={name:a}}let n=Object.assign({name:ei,automaticDataCollectionEnabled:!1},t),i=n.name;if("string"!=typeof i||!i)throw eh.create("bad-app-name",{appName:String(i)});let r=es.get(i);if(r){if(S(e,r.options)&&S(n,r.config))return;throw eh.create("duplicate-app",{appName:i})}let s=new $(i);for(let o of eo.values())s.addComponent(o);let l=new eu(e,n,s);es.set(i,l)}({apiKey:"AIzaSyDCMz60fSZWmUamvWoiCm3qnMwWnqo0Ld8",authDomain:"tktcorporation-home.firebaseapp.com",databaseURL:"https://tktcorporation-home.firebaseio.com",projectId:"tktcorporation-home",storageBucket:"tktcorporation-home.appspot.com",messagingSenderId:"30824290023",appId:"1:30824290023:web:45dde016c25c8560a83442",measurementId:"G-JLL4WBFC4D"}),c=function(e=function(e=ei){let t=es.get(e);if(!t)throw eh.create("no-app",{appName:e});return t}()){e=O(e);let t=ec(e,ta);return t.isInitialized()?t.getImmediate():function(e,t={}){let a=ec(e,ta);if(a.isInitialized()){let n=a.getImmediate();if(S(t,a.getOptions()))return n;throw tl.create("already-initialized")}let i=a.initialize({options:t});return i}(e)}());var tD=function(e){let{Component:t,pageProps:a}=e;return(0,p.useEffect)(()=>{c.app.automaticDataCollectionEnabled=!0},[]),(0,f.jsx)(t,{...a})}},4222:function(){}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(6840),t(880)}),_N_E=e.O()}]);