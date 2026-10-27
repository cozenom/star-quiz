import{A as e,B as t,C as n,D as r,E as i,F as a,G as o,H as s,I as c,J as l,K as u,L as d,M as f,N as p,O as m,P as h,R as g,S as _,T as v,U as y,V as b,W as x,Y as S,_ as C,a as w,b as T,c as E,d as D,f as O,g as k,h as A,i as j,j as ee,k as M,l as N,m as te,n as P,o as ne,p as re,q as ie,r as ae,s as F,t as oe,u as se,v as ce,w as le,x as ue,y as de,z as fe}from"./index-DXRA1b_Y.js";var I=S(l(),1),pe={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},L={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},me=1e3,he=1001,ge=1002,_e=1003,ve=1004,ye=1005,R=1006,be=1007,xe=1008,Se=1009,Ce=1010,we=1011,Te=1012,z=1013,Ee=1014,De=1015,Oe=1016,ke=1017,Ae=1018,je=1020,B=35902,V=35899,Me=1021,Ne=1022,Pe=1023,Fe=1026,Ie=1027,Le=1028,Re=1029,ze=1030,Be=1031,Ve=1033,He=33776,H=33777,Ue=33778,We=33779,Ge=35840,Ke=35841,qe=35842,Je=35843,Ye=36196,Xe=37492,Ze=37496,Qe=37488,$e=37489,et=37490,tt=37491,nt=37808,rt=37809,it=37810,at=37811,ot=37812,st=37813,ct=37814,lt=37815,ut=37816,dt=37817,ft=37818,pt=37819,mt=37820,ht=37821,gt=36492,_t=36494,vt=36495,yt=36283,bt=36284,xt=36285,St=36286,Ct=2300,wt=2301,Tt=2302,Et=2303,Dt=2400,Ot=2401,kt=2402,At=3200,U=`srgb`,jt=`srgb-linear`,Mt=`linear`,Nt=`srgb`,Pt=7680,Ft=35044,It=2e3;function Lt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Rt(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function zt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Bt(){let e=zt(`canvas`);return e.style.display=`block`,e}var Vt={};function Ht(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Ut(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function W(...e){e=Ut(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function G(...e){e=Ut(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Wt(...e){let t=e.join(` `);t in Vt||(Vt[t]=!0,W(...e))}function Gt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Kt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},qt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Jt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Yt=1234567,Xt=Math.PI/180,Zt=180/Math.PI;function Qt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Jt[e&255]+Jt[e>>8&255]+Jt[e>>16&255]+Jt[e>>24&255]+`-`+Jt[t&255]+Jt[t>>8&255]+`-`+Jt[t>>16&15|64]+Jt[t>>24&255]+`-`+Jt[n&63|128]+Jt[n>>8&255]+`-`+Jt[n>>16&255]+Jt[n>>24&255]+Jt[r&255]+Jt[r>>8&255]+Jt[r>>16&255]+Jt[r>>24&255]).toLowerCase()}function K(e,t,n){return Math.max(t,Math.min(n,e))}function $t(e,t){return(e%t+t)%t}function en(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function tn(e,t,n){return e===t?0:(n-e)/(t-e)}function nn(e,t,n){return(1-n)*e+n*t}function rn(e,t,n,r){return nn(e,t,1-Math.exp(-n*r))}function an(e,t=1){return t-Math.abs($t(e,t*2)-t)}function on(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function sn(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function cn(e,t){return e+Math.floor(Math.random()*(t-e+1))}function ln(e,t){return e+Math.random()*(t-e)}function un(e){return e*(.5-Math.random())}function dn(e){e!==void 0&&(Yt=e);let t=Yt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function fn(e){return e*Xt}function pn(e){return e*Zt}function mn(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function hn(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function gn(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function _n(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:W(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function vn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function yn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var bn={DEG2RAD:Xt,RAD2DEG:Zt,generateUUID:Qt,clamp:K,euclideanModulo:$t,mapLinear:en,inverseLerp:tn,lerp:nn,damp:rn,pingpong:an,smoothstep:on,smootherstep:sn,randInt:cn,randFloat:ln,randFloatSpread:un,seededRandom:dn,degToRad:fn,radToDeg:pn,isPowerOfTwo:mn,ceilPowerOfTwo:hn,floorPowerOfTwo:gn,setQuaternionFromProperEuler:_n,normalize:yn,denormalize:vn},q=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=K(this.x,e.x,t.x),this.y=K(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=K(this.x,e,t),this.y=K(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(K(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(K(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},xn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:W(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(K(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},J=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cn.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cn.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=K(this.x,e.x,t.x),this.y=K(this.y,e.y,t.y),this.z=K(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=K(this.x,e,t),this.y=K(this.y,e,t),this.z=K(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(K(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Sn.copy(this).projectOnVector(e),this.sub(Sn)}reflect(e){return this.sub(Sn.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(K(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Sn=new J,Cn=new xn,Y=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Wt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(wn.makeScale(e,t)),this}rotate(e){return Wt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(wn.makeRotation(-e)),this}translate(e,t){return Wt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(wn.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},wn=new Y,Tn=new Y().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),En=new Y().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Dn(){let e={enabled:!0,workingColorSpace:jt,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=On(e.r),e.g=On(e.g),e.b=On(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=kn(e.r),e.g=kn(e.g),e.b=kn(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Mt:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Wt(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Wt(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[jt]:{primaries:t,whitePoint:r,transfer:Mt,toXYZ:Tn,fromXYZ:En,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:U},outputColorSpaceConfig:{drawingBufferColorSpace:U}},[U]:{primaries:t,whitePoint:r,transfer:Nt,toXYZ:Tn,fromXYZ:En,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:U}}}),e}var X=Dn();function On(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function kn(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var An,jn=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{An===void 0&&(An=zt(`canvas`)),An.width=e.width,An.height=e.height;let t=An.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=An}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=zt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=On(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(On(t[e]/255)*255):t[e]=On(t[e]);return{data:t,width:e.width,height:e.height}}return W(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Mn=0,Nn=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Mn++}),this.uuid=Qt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Pn(r[t].image)):e.push(Pn(r[t]))}else e=Pn(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Pn(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?jn.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(W(`Texture: Unable to serialize Texture.`),{})}var Fn=0,In=new J,Ln=class e extends qt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=he,i=he,a=R,o=xe,s=Pe,c=Se,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fn++}),this.uuid=Qt(),this.name=``,this.source=new Nn(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new q(0,0),this.repeat=new q(1,1),this.center=new q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Y,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(In).x}get height(){return this.source.getSize(In).y}get depth(){return this.source.getSize(In).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){W(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?W(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case me:e.x-=Math.floor(e.x);break;case he:e.x=e.x<0?0:1;break;case ge:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case me:e.y-=Math.floor(e.y);break;case he:e.y=e.y<0?0:1;break;case ge:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ln.DEFAULT_IMAGE=null,Ln.DEFAULT_MAPPING=300,Ln.DEFAULT_ANISOTROPY=1;var Rn=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=K(this.x,e.x,t.x),this.y=K(this.y,e.y,t.y),this.z=K(this.z,e.z,t.z),this.w=K(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=K(this.x,e,t),this.y=K(this.y,e,t),this.z=K(this.z,e,t),this.w=K(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(K(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},zn=class extends qt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:R,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Rn(0,0,e,t),this.scissorTest=!1,this.viewport=new Rn(0,0,e,t),this.textures=[];let r=new Ln({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:R,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Nn(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Bn=class extends zn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Vn=class extends Ln{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=_e,this.minFilter=_e,this.wrapR=he,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Hn=class extends Ln{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=_e,this.minFilter=_e,this.wrapR=he,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Un=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Wn.setFromMatrixColumn(e,0).length(),i=1/Wn.setFromMatrixColumn(e,1).length(),a=1/Wn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kn,e,qn)}lookAt(e,t,n){let r=this.elements;return Xn.subVectors(e,t),Xn.lengthSq()===0&&(Xn.z=1),Xn.normalize(),Jn.crossVectors(n,Xn),Jn.lengthSq()===0&&(Math.abs(n.z)===1?Xn.x+=1e-4:Xn.z+=1e-4,Xn.normalize(),Jn.crossVectors(n,Xn)),Jn.normalize(),Yn.crossVectors(Xn,Jn),r[0]=Jn.x,r[4]=Yn.x,r[8]=Xn.x,r[1]=Jn.y,r[5]=Yn.y,r[9]=Xn.y,r[2]=Jn.z,r[6]=Yn.z,r[10]=Xn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],N=r[7],te=r[11],P=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*N,i[8]=a*C+o*D+s*j+c*te,i[12]=a*w+o*O+s*ee+c*P,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*N,i[9]=l*C+u*D+d*j+f*te,i[13]=l*w+u*O+d*ee+f*P,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*N,i[10]=p*C+m*D+h*j+g*te,i[14]=p*w+m*O+h*ee+g*P,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*N,i[11]=_*C+v*D+y*j+b*te,i[15]=_*w+v*O+y*ee+b*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Wn.set(r[0],r[1],r[2]).length(),o=Wn.set(r[4],r[5],r[6]).length(),s=Wn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Gn.copy(this);let c=1/a,l=1/o,u=1/s;return Gn.elements[0]*=c,Gn.elements[1]*=c,Gn.elements[2]*=c,Gn.elements[4]*=l,Gn.elements[5]*=l,Gn.elements[6]*=l,Gn.elements[8]*=u,Gn.elements[9]*=u,Gn.elements[10]*=u,t.setFromRotationMatrix(Gn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=It,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=It,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Wn=new J,Gn=new Un,Kn=new J(0,0,0),qn=new J(1,1,1),Jn=new J,Yn=new J,Xn=new J,Zn=new Un,Qn=new xn,$n=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(K(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-K(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(K(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-K(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(K(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-K(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:W(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Zn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Qn.setFromEuler(this),this.setFromQuaternion(Qn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};$n.DEFAULT_ORDER=`XYZ`;var er=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},tr=0,nr=new J,rr=new xn,ir=new Un,ar=new J,or=new J,sr=new J,cr=new xn,lr=new J(1,0,0),ur=new J(0,1,0),dr=new J(0,0,1),fr={type:`added`},pr={type:`removed`},mr={type:`childadded`,child:null},hr={type:`childremoved`,child:null},gr=class e extends qt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tr++}),this.uuid=Qt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new J,n=new $n,r=new xn,i=new J(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Un},normalMatrix:{value:new Y}}),this.matrix=new Un,this.matrixWorld=new Un,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new er,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return rr.setFromAxisAngle(e,t),this.quaternion.multiply(rr),this}rotateOnWorldAxis(e,t){return rr.setFromAxisAngle(e,t),this.quaternion.premultiply(rr),this}rotateX(e){return this.rotateOnAxis(lr,e)}rotateY(e){return this.rotateOnAxis(ur,e)}rotateZ(e){return this.rotateOnAxis(dr,e)}translateOnAxis(e,t){return nr.copy(e).applyQuaternion(this.quaternion),this.position.add(nr.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(lr,e)}translateY(e){return this.translateOnAxis(ur,e)}translateZ(e){return this.translateOnAxis(dr,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ir.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ar.copy(e):ar.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),or.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ir.lookAt(or,ar,this.up):ir.lookAt(ar,or,this.up),this.quaternion.setFromRotationMatrix(ir),r&&(ir.extractRotation(r.matrixWorld),rr.setFromRotationMatrix(ir),this.quaternion.premultiply(rr.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(G(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fr),mr.child=e,this.dispatchEvent(mr),mr.child=null):G(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pr),hr.child=e,this.dispatchEvent(hr),hr.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ir.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ir.multiply(e.parent.matrixWorld)),e.applyMatrix4(ir),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fr),mr.child=e,this.dispatchEvent(mr),mr.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,e,sr),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,cr,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};gr.DEFAULT_UP=new J(0,1,0),gr.DEFAULT_MATRIX_AUTO_UPDATE=!0,gr.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var _r=class extends gr{constructor(){super(),this.isGroup=!0,this.type=`Group`}},vr={type:`move`},yr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _r,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _r,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _r,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vr)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new _r;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},br={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xr={h:0,s:0,l:0},Sr={h:0,s:0,l:0};function Cr(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Z=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=U){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,X.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=X.workingColorSpace){return this.r=e,this.g=t,this.b=n,X.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=X.workingColorSpace){if(e=$t(e,1),t=K(t,0,1),n=K(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Cr(i,r,e+1/3),this.g=Cr(i,r,e),this.b=Cr(i,r,e-1/3)}return X.colorSpaceToWorking(this,r),this}setStyle(e,t=U){function n(t){t!==void 0&&parseFloat(t)<1&&W(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:W(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);W(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=U){let n=br[e.toLowerCase()];return n===void 0?W(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=On(e.r),this.g=On(e.g),this.b=On(e.b),this}copyLinearToSRGB(e){return this.r=kn(e.r),this.g=kn(e.g),this.b=kn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=U){return X.workingToColorSpace(wr.copy(this),e),Math.round(K(wr.r*255,0,255))*65536+Math.round(K(wr.g*255,0,255))*256+Math.round(K(wr.b*255,0,255))}getHexString(e=U){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=X.workingColorSpace){X.workingToColorSpace(wr.copy(this),t);let n=wr.r,r=wr.g,i=wr.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=X.workingColorSpace){return X.workingToColorSpace(wr.copy(this),t),e.r=wr.r,e.g=wr.g,e.b=wr.b,e}getStyle(e=U){X.workingToColorSpace(wr.copy(this),e);let t=wr.r,n=wr.g,r=wr.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(xr),this.setHSL(xr.h+e,xr.s+t,xr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(xr),e.getHSL(Sr);let n=nn(xr.h,Sr.h,t),r=nn(xr.s,Sr.s,t),i=nn(xr.l,Sr.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},wr=new Z;Z.NAMES=br;var Tr=class extends gr{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Er=new J,Dr=new J,Or=new J,kr=new J,Ar=new J,jr=new J,Mr=new J,Nr=new J,Pr=new J,Fr=new J,Ir=new Rn,Lr=new Rn,Rr=new Rn,zr=class e{constructor(e=new J,t=new J,n=new J){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Er.subVectors(e,t),r.cross(Er);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Er.subVectors(r,t),Dr.subVectors(n,t),Or.subVectors(e,t);let a=Er.dot(Er),o=Er.dot(Dr),s=Er.dot(Or),c=Dr.dot(Dr),l=Dr.dot(Or),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,kr)!==null&&kr.x>=0&&kr.y>=0&&kr.x+kr.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,kr)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,kr.x),s.addScaledVector(a,kr.y),s.addScaledVector(o,kr.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Ir.setScalar(0),Lr.setScalar(0),Rr.setScalar(0),Ir.fromBufferAttribute(e,t),Lr.fromBufferAttribute(e,n),Rr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ir,i.x),a.addScaledVector(Lr,i.y),a.addScaledVector(Rr,i.z),a}static isFrontFacing(e,t,n,r){return Er.subVectors(n,t),Dr.subVectors(e,t),Er.cross(Dr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Er.subVectors(this.c,this.b),Dr.subVectors(this.a,this.b),Er.cross(Dr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Ar.subVectors(r,n),jr.subVectors(i,n),Nr.subVectors(e,n);let s=Ar.dot(Nr),c=jr.dot(Nr);if(s<=0&&c<=0)return t.copy(n);Pr.subVectors(e,r);let l=Ar.dot(Pr),u=jr.dot(Pr);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Ar,a);Fr.subVectors(e,i);let f=Ar.dot(Fr),p=jr.dot(Fr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(jr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Mr.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Mr,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Ar,a).addScaledVector(jr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Br=class{constructor(e=new J(1/0,1/0,1/0),t=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Hr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Hr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Hr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Hr):Hr.fromBufferAttribute(r,t),Hr.applyMatrix4(e.matrixWorld),this.expandByPoint(Hr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Ur.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Ur.copy(e.boundingBox)),Ur.applyMatrix4(e.matrixWorld),this.union(Ur)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hr),Hr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xr),Zr.subVectors(this.max,Xr),Wr.subVectors(e.a,Xr),Gr.subVectors(e.b,Xr),Kr.subVectors(e.c,Xr),qr.subVectors(Gr,Wr),Jr.subVectors(Kr,Gr),Yr.subVectors(Wr,Kr);let t=[0,-qr.z,qr.y,0,-Jr.z,Jr.y,0,-Yr.z,Yr.y,qr.z,0,-qr.x,Jr.z,0,-Jr.x,Yr.z,0,-Yr.x,-qr.y,qr.x,0,-Jr.y,Jr.x,0,-Yr.y,Yr.x,0];return!ei(t,Wr,Gr,Kr,Zr)||(t=[1,0,0,0,1,0,0,0,1],!ei(t,Wr,Gr,Kr,Zr))?!1:(Qr.crossVectors(qr,Jr),t=[Qr.x,Qr.y,Qr.z],ei(t,Wr,Gr,Kr,Zr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Vr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vr)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Vr=[new J,new J,new J,new J,new J,new J,new J,new J],Hr=new J,Ur=new Br,Wr=new J,Gr=new J,Kr=new J,qr=new J,Jr=new J,Yr=new J,Xr=new J,Zr=new J,Qr=new J,$r=new J;function ei(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){$r.fromArray(e,a);let o=i.x*Math.abs($r.x)+i.y*Math.abs($r.y)+i.z*Math.abs($r.z),s=t.dot($r),c=n.dot($r),l=r.dot($r);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var ti=ni();function ni(){let e=new ArrayBuffer(4),t=new Float32Array(e),n=new Uint32Array(e),r=new Uint32Array(512),i=new Uint32Array(512);for(let e=0;e<256;++e){let t=e-127;t<-27?(r[e]=0,r[e|256]=32768,i[e]=24,i[e|256]=24):t<-14?(r[e]=1024>>-t-14,r[e|256]=1024>>-t-14|32768,i[e]=-t-1,i[e|256]=-t-1):t<=15?(r[e]=t+15<<10,r[e|256]=t+15<<10|32768,i[e]=13,i[e|256]=13):t<128?(r[e]=31744,r[e|256]=64512,i[e]=24,i[e|256]=24):(r[e]=31744,r[e|256]=64512,i[e]=13,i[e|256]=13)}let a=new Uint32Array(2048),o=new Uint32Array(64),s=new Uint32Array(64);for(let e=1;e<1024;++e){let t=e<<13,n=0;for(;!(t&8388608);)t<<=1,n-=8388608;t&=-8388609,n+=947912704,a[e]=t|n}for(let e=1024;e<2048;++e)a[e]=939524096+(e-1024<<13);for(let e=1;e<31;++e)o[e]=e<<23;o[31]=1199570944,o[32]=2147483648;for(let e=33;e<63;++e)o[e]=2147483648+(e-32<<23);o[63]=3347054592;for(let e=1;e<64;++e)e!==32&&(s[e]=1024);return{floatView:t,uint32View:n,baseTable:r,shiftTable:i,mantissaTable:a,exponentTable:o,offsetTable:s}}function ri(e){Math.abs(e)>65504&&W(`DataUtils.toHalfFloat(): Value out of range.`),e=K(e,-65504,65504),ti.floatView[0]=e;let t=ti.uint32View[0],n=t>>23&511;return ti.baseTable[n]+((t&8388607)>>ti.shiftTable[n])}function ii(e){let t=e>>10;return ti.uint32View[0]=ti.mantissaTable[ti.offsetTable[t]+(e&1023)]+ti.exponentTable[t],ti.floatView[0]}var ai=class{static toHalfFloat(e){return ri(e)}static fromHalfFloat(e){return ii(e)}},oi=new J,si=new q,ci=0,li=class extends qt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ci++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ft,this.updateRanges=[],this.gpuType=De,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)si.fromBufferAttribute(this,t),si.applyMatrix3(e),this.setXY(t,si.x,si.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)oi.fromBufferAttribute(this,t),oi.applyMatrix3(e),this.setXYZ(t,oi.x,oi.y,oi.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)oi.fromBufferAttribute(this,t),oi.applyMatrix4(e),this.setXYZ(t,oi.x,oi.y,oi.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)oi.fromBufferAttribute(this,t),oi.applyNormalMatrix(e),this.setXYZ(t,oi.x,oi.y,oi.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)oi.fromBufferAttribute(this,t),oi.transformDirection(e),this.setXYZ(t,oi.x,oi.y,oi.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=vn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vn(t,this.array)),t}setX(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vn(t,this.array)),t}setY(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vn(t,this.array)),t}setW(e,t){return this.normalized&&(t=yn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array),r=yn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array),r=yn(r,this.array),i=yn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},ui=class extends li{constructor(e,t,n){super(new Uint16Array(e),t,n)}},di=class extends li{constructor(e,t,n){super(new Uint32Array(e),t,n)}},fi=class extends li{constructor(e,t,n){super(new Float32Array(e),t,n)}},pi=new Br,mi=new J,hi=new J,gi=class{constructor(e=new J,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?pi.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;mi.subVectors(e,this.center);let t=mi.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(mi,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(hi.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(mi.copy(e.center).add(hi)),this.expandByPoint(mi.copy(e.center).sub(hi))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},_i=0,vi=new Un,yi=new gr,bi=new J,xi=new Br,Si=new Br,Ci=new J,wi=class e extends qt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_i++}),this.uuid=Qt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Lt(e)?di:ui)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Y().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return vi.makeRotationFromQuaternion(e),this.applyMatrix4(vi),this}rotateX(e){return vi.makeRotationX(e),this.applyMatrix4(vi),this}rotateY(e){return vi.makeRotationY(e),this.applyMatrix4(vi),this}rotateZ(e){return vi.makeRotationZ(e),this.applyMatrix4(vi),this}translate(e,t,n){return vi.makeTranslation(e,t,n),this.applyMatrix4(vi),this}scale(e,t,n){return vi.makeScale(e,t,n),this.applyMatrix4(vi),this}lookAt(e){return yi.lookAt(e),yi.updateMatrix(),this.applyMatrix4(yi.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bi).negate(),this.translate(bi.x,bi.y,bi.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new fi(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&W(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Br);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)G(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];xi.setFromBufferAttribute(n),this.morphTargetsRelative?(Ci.addVectors(this.boundingBox.min,xi.min),this.boundingBox.expandByPoint(Ci),Ci.addVectors(this.boundingBox.max,xi.max),this.boundingBox.expandByPoint(Ci)):(this.boundingBox.expandByPoint(xi.min),this.boundingBox.expandByPoint(xi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&G(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)G(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new J,1/0);else if(e){let n=this.boundingSphere.center;if(xi.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Si.setFromBufferAttribute(n),this.morphTargetsRelative?(Ci.addVectors(xi.min,Si.min),xi.expandByPoint(Ci),Ci.addVectors(xi.max,Si.max),xi.expandByPoint(Ci)):(xi.expandByPoint(Si.min),xi.expandByPoint(Si.max))}xi.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Ci.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Ci));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Ci.fromBufferAttribute(a,t),o&&(bi.fromBufferAttribute(e,t),Ci.add(bi)),r=Math.max(r,n.distanceToSquared(Ci))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&G(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){G(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new li(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new J,s[e]=new J;let c=new J,l=new J,u=new J,d=new q,f=new q,p=new q,m=new J,h=new J;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new J,y=new J,b=new J,x=new J;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new li(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new J,i=new J,a=new J,o=new J,s=new J,c=new J,l=new J,u=new J;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ci.fromBufferAttribute(e,t),Ci.normalize(),e.setXYZ(t,Ci.x,Ci.y,Ci.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new li(a,r,i)}if(this.index===null)return W(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ti=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Ft,this.updateRanges=[],this.version=0,this.uuid=Qt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Ei=new J,Di=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ei.fromBufferAttribute(this,t),Ei.applyMatrix4(e),this.setXYZ(t,Ei.x,Ei.y,Ei.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ei.fromBufferAttribute(this,t),Ei.applyNormalMatrix(e),this.setXYZ(t,Ei.x,Ei.y,Ei.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ei.fromBufferAttribute(this,t),Ei.transformDirection(e),this.setXYZ(t,Ei.x,Ei.y,Ei.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=vn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yn(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=yn(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=yn(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=yn(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=yn(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=vn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=vn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=vn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=vn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array),r=yn(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=yn(t,this.array),n=yn(n,this.array),r=yn(r,this.array),i=yn(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Ht(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new li(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ht(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Oi=new J,ki=new J,Ai=new Y,ji=class{constructor(e=new J(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Oi.subVectors(n,t).cross(ki.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Oi),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Ai.getNormalMatrix(e),r=this.coplanarPoint(Oi).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Mi=0,Ni=class extends qt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mi++}),this.uuid=Qt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Z(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pt,this.stencilZFail=Pt,this.stencilZPass=Pt,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){W(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?W(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Z().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new ji().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new q().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new q().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Pi=new J,Fi=new J,Ii=new J,Li=new J,Ri=class{constructor(e=new J,t=new J(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pi.copy(this.origin).addScaledVector(this.direction,t),Pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Fi.copy(e).add(t).multiplyScalar(.5),Ii.copy(t).sub(e).normalize(),Li.copy(this.origin).sub(Fi);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Ii),o=Li.dot(this.direction),s=-Li.dot(Ii),c=Li.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Fi).addScaledVector(Ii,d),f}intersectSphere(e,t){if(e.radius<0)return null;Pi.subVectors(e.center,this.origin);let n=Pi.dot(this.direction),r=Pi.dot(Pi)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Pi)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,ee,M;if(y>=b&&y>=x?(w=s,D=u,A=p,M=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,ee=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,ee=_)):b>=x?(w=c,D=d,A=m,M=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,ee=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,ee=v)):(w=l,D=f,A=h,M=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,ee=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,ee=g)),w===0)return null;let N=S/w,te=C/w,P=1/w,ne=T-N*D,re=E-te*D,ie=O-N*A,ae=k-te*A,F=j-N*M,oe=ee-te*M,se=F*ae-oe*ie,ce=ne*oe-re*F,le=ie*re-ae*ne;if(r){if(se<0||ce<0||le<0)return null}else if((se<0||ce<0||le<0)&&(se>0||ce>0||le>0))return null;let ue=se+ce+le;if(ue===0)return null;let de=P*(se*D+ce*A+le*M);return(ue>0?de<0:de>0)?null:this.at(de/ue,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},zi=class extends Ni{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Z(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Bi=new Un,Vi=new Ri,Hi=new gi,Ui=new J,Wi=new J,Gi=new J,Ki=new J,qi=new J,Ji=new J,Yi=new J,Xi=new J,Zi=class extends gr{constructor(e=new wi,t=new zi){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Ji.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(qi.fromBufferAttribute(s,e),a?Ji.addScaledVector(qi,r):Ji.addScaledVector(qi.sub(t),r))}t.add(Ji)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hi.copy(n.boundingSphere),Hi.applyMatrix4(i),Vi.copy(e.ray).recast(e.near),!(Hi.containsPoint(Vi.origin)===!1&&(Vi.intersectSphere(Hi,Ui)===null||Vi.origin.distanceToSquared(Ui)>(e.far-e.near)**2))&&(Bi.copy(i).invert(),Vi.copy(e.ray).applyMatrix4(Bi),(n.boundingBox===null||Vi.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Vi)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=$i(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=$i(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=$i(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=$i(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Qi(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Xi.copy(s),Xi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Xi);return l<n.near||l>n.far?null:{distance:l,point:Xi.clone(),object:e}}function $i(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Wi),e.getVertexPosition(c,Gi),e.getVertexPosition(l,Ki);let u=Qi(e,t,n,r,Wi,Gi,Ki,Yi);if(u){let e=new J;zr.getBarycoord(Yi,Wi,Gi,Ki,e),i&&(u.uv=zr.getInterpolatedAttribute(i,s,c,l,e,new q)),a&&(u.uv1=zr.getInterpolatedAttribute(a,s,c,l,e,new q)),o&&(u.normal=zr.getInterpolatedAttribute(o,s,c,l,e,new J),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new J,materialIndex:0};zr.getNormal(Wi,Gi,Ki,t.normal),u.face=t,u.barycoord=e}return u}var ea=class extends Ln{constructor(e=null,t=1,n=1,r,i,a,o,s,c=_e,l=_e,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ta=new gi,na=new q(.5,.5),ra=new J,ia=class{constructor(e=new ji,t=new ji,n=new ji,r=new ji,i=new ji,a=new ji){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=It,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ta.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ta.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ta)}intersectsSprite(e){return ta.center.set(0,0,0),ta.radius=.7071067811865476+na.distanceTo(e.center),ta.applyMatrix4(e.matrixWorld),this.intersectsSphere(ta)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ra.x=r.normal.x>0?e.max.x:e.min.x,ra.y=r.normal.y>0?e.max.y:e.min.y,ra.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ra)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},aa=class extends Ni{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new Z(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},oa=new J,sa=new J,ca=new Un,la=new Ri,ua=new gi,da=new J,fa=new J,pa=class extends gr{constructor(e=new wi,t=new aa){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)oa.fromBufferAttribute(t,e-1),sa.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=oa.distanceTo(sa);e.setAttribute(`lineDistance`,new fi(n,1))}else W(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ua.copy(n.boundingSphere),ua.applyMatrix4(r),ua.radius+=i,e.ray.intersectsSphere(ua)===!1)return;ca.copy(r).invert(),la.copy(e.ray).applyMatrix4(ca);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=ma(this,e,la,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=ma(this,e,la,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=ma(this,e,la,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=ma(this,e,la,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ma(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(oa.fromBufferAttribute(s,i),sa.fromBufferAttribute(s,a),n.distanceSqToSegment(oa,sa,da,fa)>r)return;da.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(da);if(!(c<t.near||c>t.far))return{distance:c,point:fa.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var ha=new J,ga=new J,_a=class extends pa{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)ha.fromBufferAttribute(t,e),ga.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+ha.distanceTo(ga);e.setAttribute(`lineDistance`,new fi(n,1))}else W(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},va=class extends pa{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type=`LineLoop`}},ya=class extends Ni{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new Z(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ba=new Un,xa=new Ri,Sa=new gi,Ca=new J,wa=class extends gr{constructor(e=new wi,t=new ya){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sa.copy(n.boundingSphere),Sa.applyMatrix4(r),Sa.radius+=i,e.ray.intersectsSphere(Sa)===!1)return;ba.copy(r).invert(),xa.copy(e.ray).applyMatrix4(ba);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Ca.fromBufferAttribute(l,n),Ta(Ca,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Ca.fromBufferAttribute(l,a),Ta(Ca,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Ta(e,t,n,r,i,a,o){let s=xa.distanceSqToPoint(e);if(s<n){let n=new J;xa.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ea=class extends Ln{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Da=class extends Ln{constructor(e,t,n=Ee,r,i,a,o=_e,s=_e,c,l=Fe,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Nn(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Oa=class extends Da{constructor(e,t=Ee,n=301,r,i,a=_e,o=_e,s,c=Fe){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ka=class extends Ln{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Aa=class e extends wi{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new fi(c,3)),this.setAttribute(`normal`,new fi(l,3)),this.setAttribute(`uv`,new fi(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new J;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},ja=class e extends wi{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new fi(p,3)),this.setAttribute(`normal`,new fi(m,3)),this.setAttribute(`uv`,new fi(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Ma=class e extends wi{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new J,p=new q;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new fi(s,3)),this.setAttribute(`normal`,new fi(c,3)),this.setAttribute(`uv`,new fi(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Na=class e extends wi{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new J,d=new J,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new fi(p,3)),this.setAttribute(`normal`,new fi(m,3)),this.setAttribute(`uv`,new fi(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Pa(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Ia(i))i.isRenderTargetTexture?(W(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Ia(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Fa(e){let t={};for(let n=0;n<e.length;n++){let r=Pa(e[n]);for(let e in r)t[e]=r[e]}return t}function Ia(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function La(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Ra(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:X.workingColorSpace}var za={clone:Pa,merge:Fa},Ba=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Va=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ha=class extends Ni{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ba,this.fragmentShader=Va,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Pa(e.uniforms),this.uniformsGroups=La(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Z().setHex(r.value);break;case`v2`:this.uniforms[n].value=new q().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new J().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Rn().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Y().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Un().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ua=class extends Ha{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Wa=class extends Ni{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type=`MeshPhongMaterial`,this.color=new Z(16777215),this.specular=new Z(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Z(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ga=class extends Ni{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new Z(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Z(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ka=class extends Ni{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=At,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},qa=class extends Ni{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ja(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Ya(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Xa=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Za=class extends Xa{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Dt,endingEnd:Dt}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ot:i=e,o=2*t-n;break;case kt:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Ot:a=e,s=2*n-t;break;case kt:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Qa=class extends Xa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},$a=class extends Xa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},eo=class extends Xa{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=ro(n,t,g,y,r);i[p]=to(x,o,_,b,m)}return i}};function to(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function no(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function ro(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=to(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=no(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var io=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Ja(t,this.TimeBufferType),this.values=Ja(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ja(e.times,Array),values:Ja(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Ya(e.settings)&&(n.settings={inTangents:Ja(e.settings.inTangents,Array),outTangents:Ja(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new $a(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Za(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new eo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ct:t=this.InterpolantFactoryMethodDiscrete;break;case wt:t=this.InterpolantFactoryMethodLinear;break;case Tt:t=this.InterpolantFactoryMethodSmooth;break;case Et:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return W(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ct;case this.InterpolantFactoryMethodLinear:return wt;case this.InterpolantFactoryMethodSmooth:return Tt;case this.InterpolantFactoryMethodBezier:return Et}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Ya(this.settings)&&(ao(this.settings.inTangents,e),ao(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(G(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(G(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){G(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){G(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Rt(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){G(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Tt,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ya(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function ao(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}io.prototype.ValueTypeName=``,io.prototype.TimeBufferType=Float32Array,io.prototype.ValueBufferType=Float32Array,io.prototype.DefaultInterpolation=wt;var oo=class extends io{constructor(e,t,n){super(e,t,n)}};oo.prototype.ValueTypeName=`bool`,oo.prototype.ValueBufferType=Array,oo.prototype.DefaultInterpolation=Ct,oo.prototype.InterpolantFactoryMethodLinear=void 0,oo.prototype.InterpolantFactoryMethodSmooth=void 0;var so=class extends io{constructor(e,t,n,r){super(e,t,n,r)}};so.prototype.ValueTypeName=`color`;var co=class extends io{constructor(e,t,n,r){super(e,t,n,r)}};co.prototype.ValueTypeName=`number`;var lo=class extends Xa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)xn.slerpFlat(i,0,a,c-o,a,c,s);return i}},uo=class extends io{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new lo(this.times,this.values,this.getValueSize(),e)}};uo.prototype.ValueTypeName=`quaternion`,uo.prototype.InterpolantFactoryMethodSmooth=void 0;var fo=class extends io{constructor(e,t,n){super(e,t,n)}};fo.prototype.ValueTypeName=`string`,fo.prototype.ValueBufferType=Array,fo.prototype.DefaultInterpolation=Ct,fo.prototype.InterpolantFactoryMethodLinear=void 0,fo.prototype.InterpolantFactoryMethodSmooth=void 0;var po=class extends io{constructor(e,t,n,r){super(e,t,n,r)}};po.prototype.ValueTypeName=`vector`;var mo={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(ho(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!ho(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function ho(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var go=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},_o=class{constructor(e){this.manager=e===void 0?go:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};_o.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var vo=new WeakMap,yo=class extends _o{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=mo.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=vo.get(a);e===void 0&&(e=[],vo.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=zt(`img`);function s(){l(),t&&t(this);let n=vo.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}vo.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),mo.remove(`image:${e}`);let n=vo.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}vo.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),mo.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},bo=class extends _o{constructor(e){super(e)}load(e,t,n,r){let i=new Ln,a=new yo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},xo=class extends gr{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Z(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},So=new Un,Co=new J,wo=new J,To=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new q(512,512),this.mapType=Se,this.map=null,this.mapPass=null,this.matrix=new Un,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ia,this._frameExtents=new q(1,1),this._viewportCount=1,this._viewports=[new Rn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Co.setFromMatrixPosition(e.matrixWorld),t.position.copy(Co),wo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wo),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){So.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(So,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(So)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Eo=new J,Do=new xn,Oo=new J,ko=class extends gr{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Un,this.projectionMatrix=new Un,this.projectionMatrixInverse=new Un,this.coordinateSystem=It,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Eo,Do,Oo),Oo.x===1&&Oo.y===1&&Oo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Eo,Do,Oo.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Eo,Do,Oo),Oo.x===1&&Oo.y===1&&Oo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Eo,Do,Oo.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ao=new J,jo=new q,Mo=new q,No=class extends ko{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Zt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Xt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zt*2*Math.atan(Math.tan(Xt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ao.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ao.x,Ao.y).multiplyScalar(-e/Ao.z),Ao.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ao.x,Ao.y).multiplyScalar(-e/Ao.z)}getViewSize(e,t){return this.getViewBounds(e,jo,Mo),t.subVectors(Mo,jo)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Xt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Po=class extends To{constructor(){super(new No(90,1,.5,500)),this.isPointLightShadow=!0}},Fo=class extends xo{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Po}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Io=class extends ko{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Lo=class extends xo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},Ro=-90,zo=1,Bo=class extends gr{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new No(Ro,zo,e,t);r.layers=this.layers,this.add(r);let i=new No(Ro,zo,e,t);i.layers=this.layers,this.add(i);let a=new No(Ro,zo,e,t);a.layers=this.layers,this.add(a);let o=new No(Ro,zo,e,t);o.layers=this.layers,this.add(o);let s=new No(Ro,zo,e,t);s.layers=this.layers,this.add(s);let c=new No(Ro,zo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Vo=class extends No{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ho=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Uo.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Uo(){this._document.hidden===!1&&this.reset()}var Wo=`\\[\\]\\.:\\/`,Go=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ko=`[^\\[\\]\\.:\\/]`,qo=`[^`+Wo.replace(`\\.`,``)+`]`,Jo=`((?:WC+[\\/:])*)`.replace(`WC`,Ko),Yo=`(WCOD+)?`.replace(`WCOD`,qo),Xo=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ko),Zo=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ko),Qo=RegExp(`^`+Jo+Yo+Xo+Zo+`$`),$o=[`material`,`materials`,`bones`,`map`],es=class{constructor(e,t,n){let r=n||ts.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ts=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Go,``)}static parseTrackName(e){let t=Qo.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);$o.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){W(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){G(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){G(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){G(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){G(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){G(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){G(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){G(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;G(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){G(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){G(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ts.Composite=es,ts.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ts.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ts.prototype.GetterByBindingType=[ts.prototype._getValue_direct,ts.prototype._getValue_array,ts.prototype._getValue_arrayElement,ts.prototype._getValue_toArray],ts.prototype.SetterByBindingTypeAndVersioning=[[ts.prototype._setValue_direct,ts.prototype._setValue_direct_setNeedsUpdate,ts.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ts.prototype._setValue_array,ts.prototype._setValue_array_setNeedsUpdate,ts.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ts.prototype._setValue_arrayElement,ts.prototype._setValue_arrayElement_setNeedsUpdate,ts.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ts.prototype._setValue_fromArray,ts.prototype._setValue_fromArray_setNeedsUpdate,ts.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ns=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=K(this.phi,e,Math.PI-e),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(K(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});var rs=class extends qt{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function is(e,t,n,r){let i=as(r);switch(n){case Me:return e*t;case Le:return e*t/i.components*i.byteLength;case Re:return e*t/i.components*i.byteLength;case ze:return e*t*2/i.components*i.byteLength;case Be:return e*t*2/i.components*i.byteLength;case Ne:return e*t*3/i.components*i.byteLength;case Pe:return e*t*4/i.components*i.byteLength;case Ve:return e*t*4/i.components*i.byteLength;case He:case H:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ue:case We:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ke:case Je:return Math.max(e,16)*Math.max(t,8)/4;case Ge:case qe:return Math.max(e,8)*Math.max(t,8)/2;case Ye:case Xe:case Qe:case $e:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ze:case et:case tt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case nt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case rt:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case it:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case at:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ot:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case st:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ct:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case lt:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ut:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case dt:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ft:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case pt:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case mt:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case ht:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case gt:case _t:case vt:return Math.ceil(e/4)*Math.ceil(t/4)*16;case yt:case bt:return Math.ceil(e/4)*Math.ceil(t/4)*8;case xt:case St:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function as(e){switch(e){case Se:case Ce:return{byteLength:1,components:1};case Te:case we:case Oe:return{byteLength:2,components:1};case ke:case Ae:return{byteLength:2,components:4};case Ee:case z:case De:return{byteLength:4,components:1};case B:case V:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?W(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function os(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function ss(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var cs={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Q={common:{diffuse:{value:new Z(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Y},alphaMap:{value:null},alphaMapTransform:{value:new Y},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Y}},envmap:{envMap:{value:null},envMapRotation:{value:new Y},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Y}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Y}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Y},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Y},normalScale:{value:new q(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Y},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Y}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Y}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Y}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Z(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new Z(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Y},alphaTest:{value:0},uvTransform:{value:new Y}},sprite:{diffuse:{value:new Z(16777215)},opacity:{value:1},center:{value:new q(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Y},alphaMap:{value:null},alphaMapTransform:{value:new Y},alphaTest:{value:0}}},ls={basic:{uniforms:Fa([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.fog]),vertexShader:cs.meshbasic_vert,fragmentShader:cs.meshbasic_frag},lambert:{uniforms:Fa([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new Z(0)},envMapIntensity:{value:1}}]),vertexShader:cs.meshlambert_vert,fragmentShader:cs.meshlambert_frag},phong:{uniforms:Fa([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new Z(0)},specular:{value:new Z(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:cs.meshphong_vert,fragmentShader:cs.meshphong_frag},standard:{uniforms:Fa([Q.common,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.roughnessmap,Q.metalnessmap,Q.fog,Q.lights,{emissive:{value:new Z(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:cs.meshphysical_vert,fragmentShader:cs.meshphysical_frag},toon:{uniforms:Fa([Q.common,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.gradientmap,Q.fog,Q.lights,{emissive:{value:new Z(0)}}]),vertexShader:cs.meshtoon_vert,fragmentShader:cs.meshtoon_frag},matcap:{uniforms:Fa([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,{matcap:{value:null}}]),vertexShader:cs.meshmatcap_vert,fragmentShader:cs.meshmatcap_frag},points:{uniforms:Fa([Q.points,Q.fog]),vertexShader:cs.points_vert,fragmentShader:cs.points_frag},dashed:{uniforms:Fa([Q.common,Q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:cs.linedashed_vert,fragmentShader:cs.linedashed_frag},depth:{uniforms:Fa([Q.common,Q.displacementmap]),vertexShader:cs.depth_vert,fragmentShader:cs.depth_frag},normal:{uniforms:Fa([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,{opacity:{value:1}}]),vertexShader:cs.meshnormal_vert,fragmentShader:cs.meshnormal_frag},sprite:{uniforms:Fa([Q.sprite,Q.fog]),vertexShader:cs.sprite_vert,fragmentShader:cs.sprite_frag},background:{uniforms:{uvTransform:{value:new Y},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:cs.background_vert,fragmentShader:cs.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Y}},vertexShader:cs.backgroundCube_vert,fragmentShader:cs.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:cs.cube_vert,fragmentShader:cs.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:cs.equirect_vert,fragmentShader:cs.equirect_frag},distance:{uniforms:Fa([Q.common,Q.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:cs.distance_vert,fragmentShader:cs.distance_frag},shadow:{uniforms:Fa([Q.lights,Q.fog,{color:{value:new Z(0)},opacity:{value:1}}]),vertexShader:cs.shadow_vert,fragmentShader:cs.shadow_frag}};ls.physical={uniforms:Fa([ls.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Y},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Y},clearcoatNormalScale:{value:new q(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Y},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Y},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Y},sheen:{value:0},sheenColor:{value:new Z(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Y},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Y},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Y},transmissionSamplerSize:{value:new q},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Y},attenuationDistance:{value:0},attenuationColor:{value:new Z(0)},specularColor:{value:new Z(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Y},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Y},anisotropyVector:{value:new q},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Y}}]),vertexShader:cs.meshphysical_vert,fragmentShader:cs.meshphysical_frag};var us={r:0,b:0,g:0},ds=new Un,fs=new Y;fs.set(-1,0,0,0,1,0,0,0,1);function ps(e,t,n,r,i,a){let o=new Z(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Zi(new Aa(1,1,1),new Ha({name:`BackgroundCubeMaterial`,uniforms:Pa(ls.backgroundCube.uniforms),vertexShader:ls.backgroundCube.vertexShader,fragmentShader:ls.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ds.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(fs),l.material.toneMapped=X.getTransfer(i.colorSpace)!==Nt,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Zi(new ja(2,2),new Ha({name:`BackgroundMaterial`,uniforms:Pa(ls.background.uniforms),vertexShader:ls.background.vertexShader,fragmentShader:ls.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=X.getTransfer(i.colorSpace)!==Nt,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(us,Ra(e)),n.buffers.color.setClear(us.r,us.g,us.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function ms(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function hs(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function gs(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(W(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&W(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function _s(e){let t=this,n=null,r=0,i=!1,a=!1,o=new ji,s=new Y,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var vs=4,ys=6,bs=20,xs=256,Ss=new Io,Cs=new Z,ws=null,Ts=0,Es=0,Ds=!1,Os=new J,ks=new J,As=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Os}=i;ws=this._renderer.getRenderTarget(),Ts=this._renderer.getActiveCubeFace(),Es=this._renderer.getActiveMipmapLevel(),Ds=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ls(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Is(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ws,Ts,Es),this._renderer.xr.enabled=Ds,e.scissorTest=!1,Ns(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ws=this._renderer.getRenderTarget(),Ts=this._renderer.getActiveCubeFace(),Es=this._renderer.getActiveMipmapLevel(),Ds=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:R,minFilter:R,generateMipmaps:!1,type:Oe,format:Pe,colorSpace:jt,depthBuffer:!1},r=Ms(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ms(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=js(r)),this._blurMaterial=Fs(r,e,t),this._ggxMaterial=Ps(r,e,t)}return r}_compileMaterial(e){let t=new Zi(new wi,e);this._renderer.compile(t,Ss)}_sceneToCubeUV(e,t,n,r,i){let a=new No(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Cs),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Zi(new Aa,new zi({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Cs),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Ns(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ls()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Is());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Ns(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Ss)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-vs?n-d+vs:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Ns(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Ss),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Ns(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Ss)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Ns(t,3*l*(r>this._lodMax-vs?r-this._lodMax+vs:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Ss)}};function js(e){let t=[],n=[],r=e,i=e-vs+1+ys;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?ks.set(1,r,n):e===1?ks.set(-n,1,-r):e===2?ks.set(-n,r,1):e===3?ks.set(-1,r,-n):e===4?ks.set(-n,-1,r):ks.set(n,r,-1),ks.toArray(l,(e*6+t)*3)}}let u=new wi;u.setAttribute(`position`,new li(c,3)),u.setAttribute(`outputDirection`,new li(l,3)),n.push(new Zi(u,null)),r>vs&&r--}return{lodMeshes:n,sizeLods:t}}function Ms(e,t,n){let r=new Bn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Ns(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Ps(e,t,n){return new Ha({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:xs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Rs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Fs(e,t,n){return new Ha({name:`SphericalGaussianBlur`,defines:{SAMPLES:bs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Rs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Is(){return new Ha({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Rs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ls(){return new Ha({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Rs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Rs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var zs=class extends Bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ea(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Aa(5,5,5),i=new Ha({name:`CubemapFromEquirect`,uniforms:Pa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Zi(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=R),new Bo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Bs(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new zs(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new As(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new As(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Vs(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Wt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Hs(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?di:ui)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Us(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Ws(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:G(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Gs(e,t,n){let r=new WeakMap,i=new Rn;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Vn(h,p,m,u);g.type=De,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new q(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Ks(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var qs={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Js(e,t,n,r,i,a){let o=new Bn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new wi;l.setAttribute(`position`,new fi([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new fi([0,2,0,0,2,0],2));let u=new Ua({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Zi(l,u),f=new Io(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Bn(t,n,{type:Oe,depthBuffer:!1,stencilBuffer:!1}),c=new Bn(t,n,{type:Oe,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},X.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=qs[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Ys=new Ln,Xs=new Da(1,1),Zs=new Vn,Qs=new Hn,$s=new Ea,ec=[],tc=[],nc=new Float32Array(16),rc=new Float32Array(9),ic=new Float32Array(4);function ac(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=ec[i];if(a===void 0&&(a=new Float32Array(i),ec[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function oc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function sc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function cc(e,t){let n=tc[t];n===void 0&&(n=new Int32Array(t),tc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function lc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function uc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(oc(n,t))return;e.uniform2fv(this.addr,t),sc(n,t)}}function dc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(oc(n,t))return;e.uniform3fv(this.addr,t),sc(n,t)}}function fc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(oc(n,t))return;e.uniform4fv(this.addr,t),sc(n,t)}}function pc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(oc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),sc(n,t)}else{if(oc(n,r))return;ic.set(r),e.uniformMatrix2fv(this.addr,!1,ic),sc(n,r)}}function mc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(oc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),sc(n,t)}else{if(oc(n,r))return;rc.set(r),e.uniformMatrix3fv(this.addr,!1,rc),sc(n,r)}}function hc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(oc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),sc(n,t)}else{if(oc(n,r))return;nc.set(r),e.uniformMatrix4fv(this.addr,!1,nc),sc(n,r)}}function gc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function _c(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(oc(n,t))return;e.uniform2iv(this.addr,t),sc(n,t)}}function vc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(oc(n,t))return;e.uniform3iv(this.addr,t),sc(n,t)}}function yc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(oc(n,t))return;e.uniform4iv(this.addr,t),sc(n,t)}}function bc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function xc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(oc(n,t))return;e.uniform2uiv(this.addr,t),sc(n,t)}}function Sc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(oc(n,t))return;e.uniform3uiv(this.addr,t),sc(n,t)}}function Cc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(oc(n,t))return;e.uniform4uiv(this.addr,t),sc(n,t)}}function wc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Xs.compareFunction=n.isReversedDepthBuffer()?518:515,a=Xs):a=Ys,n.setTexture2D(t||a,i)}function Tc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Qs,i)}function Ec(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||$s,i)}function Dc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Zs,i)}function Oc(e){switch(e){case 5126:return lc;case 35664:return uc;case 35665:return dc;case 35666:return fc;case 35674:return pc;case 35675:return mc;case 35676:return hc;case 5124:case 35670:return gc;case 35667:case 35671:return _c;case 35668:case 35672:return vc;case 35669:case 35673:return yc;case 5125:return bc;case 36294:return xc;case 36295:return Sc;case 36296:return Cc;case 35678:case 36198:case 36298:case 36306:case 35682:return wc;case 35679:case 36299:case 36307:return Tc;case 35680:case 36300:case 36308:case 36293:return Ec;case 36289:case 36303:case 36311:case 36292:return Dc}}function kc(e,t){e.uniform1fv(this.addr,t)}function Ac(e,t){let n=ac(t,this.size,2);e.uniform2fv(this.addr,n)}function jc(e,t){let n=ac(t,this.size,3);e.uniform3fv(this.addr,n)}function Mc(e,t){let n=ac(t,this.size,4);e.uniform4fv(this.addr,n)}function Nc(e,t){let n=ac(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Pc(e,t){let n=ac(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Fc(e,t){let n=ac(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Ic(e,t){e.uniform1iv(this.addr,t)}function Lc(e,t){e.uniform2iv(this.addr,t)}function Rc(e,t){e.uniform3iv(this.addr,t)}function zc(e,t){e.uniform4iv(this.addr,t)}function Bc(e,t){e.uniform1uiv(this.addr,t)}function Vc(e,t){e.uniform2uiv(this.addr,t)}function Hc(e,t){e.uniform3uiv(this.addr,t)}function Uc(e,t){e.uniform4uiv(this.addr,t)}function Wc(e,t,n){let r=this.cache,i=t.length,a=cc(n,i);oc(r,a)||(e.uniform1iv(this.addr,a),sc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Xs:Ys;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Gc(e,t,n){let r=this.cache,i=t.length,a=cc(n,i);oc(r,a)||(e.uniform1iv(this.addr,a),sc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Qs,a[e])}function Kc(e,t,n){let r=this.cache,i=t.length,a=cc(n,i);oc(r,a)||(e.uniform1iv(this.addr,a),sc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||$s,a[e])}function qc(e,t,n){let r=this.cache,i=t.length,a=cc(n,i);oc(r,a)||(e.uniform1iv(this.addr,a),sc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Zs,a[e])}function Jc(e){switch(e){case 5126:return kc;case 35664:return Ac;case 35665:return jc;case 35666:return Mc;case 35674:return Nc;case 35675:return Pc;case 35676:return Fc;case 5124:case 35670:return Ic;case 35667:case 35671:return Lc;case 35668:case 35672:return Rc;case 35669:case 35673:return zc;case 5125:return Bc;case 36294:return Vc;case 36295:return Hc;case 36296:return Uc;case 35678:case 36198:case 36298:case 36306:case 35682:return Wc;case 35679:case 36299:case 36307:return Gc;case 35680:case 36300:case 36308:case 36293:return Kc;case 36289:case 36303:case 36311:case 36292:return qc}}var Yc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Oc(t.type)}},Xc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Jc(t.type)}},Zc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Qc=/(\w+)(\])?(\[|\.)?/g;function $c(e,t){e.seq.push(t),e.map[t.id]=t}function el(e,t,n){let r=e.name,i=r.length;for(Qc.lastIndex=0;;){let a=Qc.exec(r),o=Qc.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){$c(n,l===void 0?new Yc(s,e,t):new Xc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Zc(s),$c(n,e)),n=e}}}var tl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);el(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function nl(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var rl=37297,il=0;function al(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var ol=new Y;function sl(e){X._getMatrix(ol,X.workingColorSpace,e);let t=`mat3( ${ol.elements.map(e=>e.toFixed(4))} )`;switch(X.getTransfer(e)){case Mt:return[t,`LinearTransferOETF`];case Nt:return[t,`sRGBTransferOETF`];default:return W(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function cl(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+al(e.getShaderSource(t),r)}return i}function ll(e,t){let n=sl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var ul={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function dl(e,t){let n=ul[t];return n===void 0?(W(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var fl=new J;function pl(){return X.getLuminanceCoefficients(fl),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${fl.x.toFixed(4)}, ${fl.y.toFixed(4)}, ${fl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function ml(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(_l).join(`
`)}function hl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function gl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function _l(e){return e!==``}function vl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function yl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var bl=/^[ \t]*#include +<([\w\d./]+)>/gm;function xl(e){return e.replace(bl,Cl)}var Sl=new Map;function Cl(e,t){let n=cs[t];if(n===void 0){let e=Sl.get(t);if(e!==void 0)n=cs[e],W(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return xl(n)}var wl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tl(e){return e.replace(wl,El)}function El(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Dl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Ol={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function kl(e){return Ol[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Al={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function jl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Al[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Ml={302:`ENVMAP_MODE_REFRACTION`};function Nl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Ml[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Pl={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Fl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Pl[e.combine]||`ENVMAP_BLENDING_NONE`}function Il(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Ll(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=kl(n),l=jl(n),u=Nl(n),d=Fl(n),f=Il(n),p=ml(n),m=hl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(_l).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(_l).join(`
`),_.length>0&&(_+=`
`)):(g=[Dl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(_l).join(`
`),_=[Dl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:cs.tonemapping_pars_fragment,n.toneMapping===0?``:dl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,cs.colorspace_pars_fragment,ll(`linearToOutputTexel`,n.outputColorSpace),pl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(_l).join(`
`)),o=xl(o),o=vl(o,n),o=yl(o,n),s=xl(s),s=vl(s,n),s=yl(s,n),o=Tl(o),s=Tl(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=nl(i,i.VERTEX_SHADER,y),S=nl(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=cl(i,x,`vertex`),n=cl(i,S,`fragment`);G(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):W(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new tl(i,h),T=gl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,rl)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=il++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Rl=0,zl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Bl(e),t.set(e,n)),n}},Bl=class{constructor(e){this.id=Rl++,this.code=e,this.usedTimes=0}};function Vl(e){return e===1030||e===37490||e===36285}function Hl(e,t,n,r,i,a){let o=new er,s=new zl,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&W(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=ls[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),ee=e.state.buffers.depth.getReversed(),M=h.isInstancedMesh===!0,N=h.isBatchedMesh===!0,te=!!i.map,P=!!i.matcap,ne=!!x,re=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,F=!!i.normalMap,oe=!!i.displacementMap,se=!!i.emissiveMap,ce=!!i.metalnessMap,le=!!i.roughnessMap,ue=i.anisotropy>0,de=i.clearcoat>0,fe=i.dispersion>0,I=i.retroreflectivity>0,pe=i.iridescence>0,L=i.sheen>0,me=i.transmission>0,he=ue&&!!i.anisotropyMap,ge=de&&!!i.clearcoatMap,_e=de&&!!i.clearcoatNormalMap,ve=de&&!!i.clearcoatRoughnessMap,ye=pe&&!!i.iridescenceMap,R=pe&&!!i.iridescenceThicknessMap,be=L&&!!i.sheenColorMap,xe=L&&!!i.sheenRoughnessMap,Se=!!i.specularMap,Ce=!!i.specularColorMap,we=!!i.specularIntensityMap,Te=me&&!!i.transmissionMap,z=me&&!!i.thicknessMap,Ee=!!i.gradientMap,De=!!i.alphaMap,Oe=i.alphaTest>0,ke=!!i.alphaHash,Ae=!!i.extensions,je=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(je=e.toneMapping);let B={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:N,batchingColor:N&&h._colorsTexture!==null,instancing:M,instancingColor:M&&h.instanceColor!==null,instancingMorph:M&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:X.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:te,matcap:P,envMap:ne,envMapMode:ne&&x.mapping,envMapCubeUVHeight:S,aoMap:re,lightMap:ie,bumpMap:ae,normalMap:F,displacementMap:oe,emissiveMap:se,normalMapObjectSpace:F&&i.normalMapType===1,normalMapTangentSpace:F&&i.normalMapType===0,packedNormalMap:F&&i.normalMapType===0&&Vl(i.normalMap.format),metalnessMap:ce,roughnessMap:le,anisotropy:ue,anisotropyMap:he,clearcoat:de,clearcoatMap:ge,clearcoatNormalMap:_e,clearcoatRoughnessMap:ve,dispersion:fe,retroreflection:I,iridescence:pe,iridescenceMap:ye,iridescenceThicknessMap:R,sheen:L,sheenColorMap:be,sheenRoughnessMap:xe,specularMap:Se,specularColorMap:Ce,specularIntensityMap:we,transmission:me,transmissionMap:Te,thicknessMap:z,gradientMap:Ee,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:De,alphaTest:Oe,alphaHash:ke,combine:i.combine,mapUv:te&&m(i.map.channel),aoMapUv:re&&m(i.aoMap.channel),lightMapUv:ie&&m(i.lightMap.channel),bumpMapUv:ae&&m(i.bumpMap.channel),normalMapUv:F&&m(i.normalMap.channel),displacementMapUv:oe&&m(i.displacementMap.channel),emissiveMapUv:se&&m(i.emissiveMap.channel),metalnessMapUv:ce&&m(i.metalnessMap.channel),roughnessMapUv:le&&m(i.roughnessMap.channel),anisotropyMapUv:he&&m(i.anisotropyMap.channel),clearcoatMapUv:ge&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:_e&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:R&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:be&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:xe&&m(i.sheenRoughnessMap.channel),specularMapUv:Se&&m(i.specularMap.channel),specularColorMapUv:Ce&&m(i.specularColorMap.channel),specularIntensityMapUv:we&&m(i.specularIntensityMap.channel),transmissionMapUv:Te&&m(i.transmissionMap.channel),thicknessMapUv:z&&m(i.thicknessMap.channel),alphaMapUv:De&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(F||ue),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(te||De),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&F===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:je,decodeVideoTexture:te&&i.map.isVideoTexture===!0&&X.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:se&&i.emissiveMap.isVideoTexture===!0&&X.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ae&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ae&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return B.vertexUv1s=c.has(1),B.vertexUv2s=c.has(2),B.vertexUv3s=c.has(3),c.clear(),B}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=ls[t];n=za.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Ll(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Ul(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Wl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Gl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Kl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Wl),r.length>1&&r.sort(t||Gl),i.length>1&&i.sort(t||Gl)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function ql(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Kl,e.set(t,[i])):n>=r.length?(i=new Kl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Jl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new J,color:new Z};break;case`SpotLight`:n={position:new J,direction:new J,color:new Z,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new J,color:new Z,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new J,skyColor:new Z,groundColor:new Z};break;case`RectAreaLight`:n={color:new Z,position:new J,halfWidth:new J,halfHeight:new J}}return e[t.id]=n,n}}}function Yl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Xl=0;function Zl(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Ql(e){let t=new Jl,n=Yl(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new J);let i=new J,a=new Un,o=new Un;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Zl);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Q.LTC_FLOAT_1,r.rectAreaLTC2=Q.LTC_FLOAT_2):(r.rectAreaLTC1=Q.LTC_HALF_1,r.rectAreaLTC2=Q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Xl++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function $l(e){let t=new Ql(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function eu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new $l(e),t.set(n,[a])):r>=i.length?(a=new $l(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var tu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ru=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],iu=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],au=new Un,ou=new J,su=new J;function cu(e,t,n){let r=new ia,i=new q,a=new q,o=new Rn,s=new Ka,c=new qa,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new Ha({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new q},radius:{value:4}},vertexShader:tu,fragmentShader:nu}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new wi;m.setAttribute(`position`,new li(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Zi(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(W(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){W(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){W(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Bn(i.x,i.y,{format:ze,type:Oe,minFilter:R,magFilter:R,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Da(i.x,i.y,De),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Fe,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=_e,d.map.depthTexture.magFilter=_e}else l.isPointLight?(d.map=new zs(i.x),d.map.depthTexture=new Oa(i.x,Ee)):(d.map=new Bn(i.x,i.y),d.map.depthTexture=new Da(i.x,i.y,Ee)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Fe,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=R,d.map.depthTexture.magFilter=R):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=_e,d.map.depthTexture.magFilter=_e);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),ou.setFromMatrixPosition(l.matrixWorld),e.position.copy(ou),su.copy(e.position),su.add(ru[t]),e.up.copy(iu[t]),e.lookAt(su),e.updateMatrixWorld(),n.makeTranslation(-ou.x,-ou.y,-ou.z),au.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(au,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Bn(i.x,i.y,{format:ze,type:Oe}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function lu(e,t){function n(){let t=!1,n=new Rn,r=null,i=new Rn(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ce(e.DEPTH_TEST):le(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Kt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ce(e.STENCIL_TEST):le(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Z(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,N=0,te=e.getParameter(e.VERSION);te.indexOf(`WebGL`)===-1?te.indexOf(`OpenGL ES`)!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),M=N>=2):(N=parseFloat(/^WebGL (\d)/.exec(te)[1]),M=N>=1);let P=null,ne={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new Rn().fromArray(re),F=new Rn().fromArray(ie);function oe(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let se={};se[e.TEXTURE_2D]=oe(e.TEXTURE_2D,e.TEXTURE_2D,1),se[e.TEXTURE_CUBE_MAP]=oe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[e.TEXTURE_2D_ARRAY]=oe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),se[e.TEXTURE_3D]=oe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ce(e.DEPTH_TEST),o.setFunc(3),he(!1),ge(1),ce(e.CULL_FACE),L(0);function ce(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function le(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ue(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function de(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function fe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let I={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};I[103]=e.MIN,I[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function L(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(le(e.BLEND),g=!1);else if(g===!1&&(ce(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:G(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:G(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:G(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:G(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(I[n],I[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function me(t,n){t.side===2?le(e.CULL_FACE):ce(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?L(0):L(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ve(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ce(e.SAMPLE_ALPHA_TO_COVERAGE):le(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ge(t){t===0?le(e.CULL_FACE):(ce(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function _e(t){t!==k&&(M&&e.lineWidth(t),k=t)}function ve(t,n,r){t?(ce(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):le(e.POLYGON_OFFSET_FILL)}function ye(t){t?ce(e.SCISSOR_TEST):le(e.SCISSOR_TEST)}function R(t){t===void 0&&(t=e.TEXTURE0+ee-1),P!==t&&(e.activeTexture(t),P=t)}function be(t,n,r){r===void 0&&(r=P===null?e.TEXTURE0+ee-1:P);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(P!==r&&(e.activeTexture(r),P=r),e.bindTexture(t,n||se[t]),i.type=t,i.texture=n)}function xe(){let t=ne[P];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Se(){try{e.compressedTexImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Ce(){try{e.compressedTexImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function we(){try{e.texSubImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Te(){try{e.texSubImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function z(){try{e.compressedTexSubImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function De(){try{e.texStorage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Oe(){try{e.texStorage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function ke(){try{e.texImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Ae(){try{e.texImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function je(t){return d[t]===void 0?e.getParameter(t):d[t]}function B(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function V(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function Me(t){F.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),F.copy(t))}function Ne(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Pe(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},P=null,ne={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Z(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ae.set(0,0,e.canvas.width,e.canvas.height),F.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ce,disable:le,bindFramebuffer:ue,drawBuffers:de,useProgram:fe,setBlending:L,setMaterial:me,setFlipSided:he,setCullFace:ge,setLineWidth:_e,setPolygonOffset:ve,setScissorTest:ye,activeTexture:R,bindTexture:be,unbindTexture:xe,compressedTexImage2D:Se,compressedTexImage3D:Ce,texImage2D:ke,texImage3D:Ae,pixelStorei:B,getParameter:je,updateUBOMapping:Ne,uniformBlockBinding:Pe,texStorage2D:De,texStorage3D:Oe,texSubImage2D:we,texSubImage3D:Te,compressedTexSubImage2D:z,compressedTexSubImage3D:Ee,scissor:V,viewport:Me,reset:Fe}}function uu(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new q,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):zt(`canvas`)}function g(e,t,n){let r=1,i=Ae(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),W(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&W(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];W(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||W(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Mt:X.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,W(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function ee(){let e=O;return e>=i.maxTextures&&W(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function M(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function N(t,i){let a=r.get(t);if(t.isVideoTexture&&Oe(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)W(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)W(`WebGLRenderer: Texture marked for update but image is incomplete`);else{le(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function te(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?le(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function P(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?le(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?ue(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let re={[me]:e.REPEAT,[he]:e.CLAMP_TO_EDGE,[ge]:e.MIRRORED_REPEAT},ie={[_e]:e.NEAREST,[ve]:e.NEAREST_MIPMAP_NEAREST,[ye]:e.NEAREST_MIPMAP_LINEAR,[R]:e.LINEAR,[be]:e.LINEAR_MIPMAP_NEAREST,[xe]:e.LINEAR_MIPMAP_LINEAR},ae={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function F(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&W(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,re[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,re[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,re[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ie[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ie[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ae[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function oe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=M(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function se(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ce(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=se(n.start,r.width,4),c=se(t.start,r.width,4);n.start<=i+1&&a===c&&se(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function le(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=oe(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=X.getPrimaries(X.workingColorSpace),r=o.colorSpace===``?null:X.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=ke(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);F(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===Ie,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&ce(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=is(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else W(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?W(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=is(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Ae(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Ae(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ue(t,o,s){if(o.image.length!==6)return;let c=oe(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=X.getPrimaries(X.workingColorSpace),r=o.colorSpace===``?null:X.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=ke(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);F(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?W(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Ae(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function de(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),De(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ee(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function fe(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;De(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ee(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ee(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);De(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ee(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ee(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function I(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),F(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else N(i.depthTexture,0);let u=l.__webglTexture,d=Ee(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)De(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)De(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function pe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)I(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?I(i.__webglFramebuffer[0],t,0):I(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),fe(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),fe(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function L(t,n,i){let a=r.get(t);n!==void 0&&de(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&pe(t)}function Se(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&De(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ee(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),fe(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),F(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)de(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else de(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),F(c,a),de(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),F(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)de(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else de(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&pe(t)}function Ce(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let we=[],Te=[];function z(t){if(t.samples>0){if(De(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(we.length=0,Te.length=0,we.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(we.push(l),Te.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Te)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,we))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ee(e){return Math.min(i.maxSamples,e.samples)}function De(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Oe(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function ke(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(X.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&W(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):G(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ae(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=ee,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=N,this.setTexture2DArray=te,this.setTexture3D=P,this.setTextureCube=ne,this.rebindTextures=L,this.setupRenderTarget=Se,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=z,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=de,this.useMultisampledRTT=De,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function du(e,t){function n(n,r=``){let i,a=X.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var fu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,pu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,mu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ka(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ha({vertexShader:fu,fragmentShader:pu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Zi(new ja(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},hu=class extends qt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new mu,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new q,C=null,w=null,T=new No;T.viewport=new Rn;let E=new No;E.viewport=new Rn;let D=[T,E],O=new Vo,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new yr,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new yr,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new yr,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,M);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,F.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&W(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&W(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,M),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Ie:Fe,a=_.stencil?je:Ee);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Bn(d.textureWidth,d.textureHeight,{format:Pe,type:Se,depthTexture:new Da(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Bn(f.framebufferWidth,f.framebufferHeight,{format:Pe,type:Se,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),F.setContext(r),F.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function M(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let N=new J,te=new J;function P(e,t,n){N.setFromMatrixPosition(t.matrixWorld),te.setFromMatrixPosition(n.matrixWorld);let r=N.distanceTo(te),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ne(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;ne(O,i);for(let e=0;e<a.length;e++)ne(a[e],i);a.length===2?P(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),re(e,O,i)};function re(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Zt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let ie=null;function ae(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new No,o.layers.enable(n),o.viewport=new Rn,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new ka,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ie&&ie(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let F=new os;F.setAnimationLoop(ae),this.setAnimationLoop=function(e){ie=e},this.dispose=function(){}}},gu=new Un,_u=new Y;_u.set(-1,0,0,0,1,0,0,0,1);function vu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Ra(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(gu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(_u),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function yu(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return G(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?W(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):W(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var bu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),xu=null;function Su(){return xu===null&&(xu=new ea(bu,16,16,ze,Oe),xu.name=`DFG_LUT`,xu.minFilter=R,xu.magFilter=R,xu.wrapS=he,xu.wrapT=he,xu.generateMipmaps=!1,xu.needsUpdate=!0),xu}var Cu=class{constructor(e={}){let{canvas:t=Bt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Se}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Ve,Be,Re]),g=new Set([Se,Ee,Te,je,ke,Ae]),_=new Uint32Array(4),v=new Int32Array(4),y=new J,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=U;let j=0,ee=0,M=null,N=-1,te=null,P=new Rn,ne=new Rn,re=null,ie=new Z(0),ae=0,F=t.width,oe=t.height,se=1,ce=null,le=null,ue=new Rn(0,0,F,oe),de=new Rn(0,0,F,oe),fe=!1,I=new ia,pe=!1,L=!1,me=new Un,he=new J,ge=new Rn,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ve=!1;function ye(){return M===null?se:1}let R=n;function be(e,n){return t.getContext(e,n)}let Ce,we,z,De,B,V,Me,Ne,Pe,Fe,Ie,Le,ze,He,H,Ue,We,Ge,Ke,qe,Je,Ye,Xe;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,$e,!1),t.addEventListener(`webglcontextrestored`,et,!1),t.addEventListener(`webglcontextcreationerror`,tt,!1),R===null){let t=`webgl2`;if(R=be(t,e),R===null)throw be(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Ze()}catch(e){throw t.removeEventListener(`webglcontextlost`,$e,!1),t.removeEventListener(`webglcontextrestored`,et,!1),t.removeEventListener(`webglcontextcreationerror`,tt,!1),G(`WebGLRenderer: `+e.message),e}function Ze(){Ce=new Vs(R),Ce.init(),Je=new du(R,Ce),we=new gs(R,Ce,e,Je),z=new lu(R,Ce),we.reversedDepthBuffer&&d&&z.buffers.depth.setReversed(!0),O=R.createFramebuffer(),k=R.createFramebuffer(),A=R.createFramebuffer(),De=new Ws(R),B=new Ul,V=new uu(R,Ce,z,B,we,Je,De),Me=new Bs(T),Ne=new ss(R),Ye=new ms(R,Ne),Pe=new Hs(R,Ne,De,Ye),Fe=new Ks(R,Pe,Ne,Ye,De),Ge=new Gs(R,we,V),H=new _s(B),Ie=new Hl(T,Me,Ce,we,Ye,H),Le=new vu(T,B),ze=new ql,He=new eu(Ce),We=new ps(T,Me,z,Fe,p,s),Ue=new cu(T,Fe,we),Xe=new yu(R,De,we,z),Ke=new hs(R,Ce,De),qe=new Us(R,Ce,De),De.programs=Ie.programs,T.capabilities=we,T.extensions=Ce,T.properties=B,T.renderLists=ze,T.shadowMap=Ue,T.state=z,T.info=De}m!==1009&&(w=new Js(m,t.width,t.height,o,r,i));let Qe=new hu(T,R);this.xr=Qe,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let e=Ce.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ce.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(e){e!==void 0&&(se=e,this.setSize(F,oe,!1))},this.getSize=function(e){return e.set(F,oe)},this.setSize=function(e,n,r=!0){Qe.isPresenting?W(`WebGLRenderer: Can't change size while VR device is presenting.`):(F=e,oe=n,t.width=Math.floor(e*se),t.height=Math.floor(n*se),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(F*se,oe*se).floor()},this.setDrawingBufferSize=function(e,n,r){F=e,oe=n,se=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)G(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){W(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(P)},this.getViewport=function(e){return e.copy(ue)},this.setViewport=function(e,t,n,r){e.isVector4?ue.set(e.x,e.y,e.z,e.w):ue.set(e,t,n,r),z.viewport(P.copy(ue).multiplyScalar(se).round())},this.getScissor=function(e){return e.copy(de)},this.setScissor=function(e,t,n,r){e.isVector4?de.set(e.x,e.y,e.z,e.w):de.set(e,t,n,r),z.scissor(ne.copy(de).multiplyScalar(se).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(e){z.setScissorTest(fe=e)},this.setOpaqueSort=function(e){ce=e},this.setTransparentSort=function(e){le=e},this.getClearColor=function(e){return e.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=h.has(t)}if(e){let e=M.texture.type,t=g.has(e),n=We.getClearColor(),r=We.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,R.clearBufferuiv(R.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,R.clearBufferiv(R.COLOR,0,v))}else r|=R.COLOR_BUFFER_BIT}t&&(r|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&R.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,$e,!1),t.removeEventListener(`webglcontextrestored`,et,!1),t.removeEventListener(`webglcontextcreationerror`,tt,!1),We.dispose(),ze.dispose(),He.dispose(),B.dispose(),Me.dispose(),Fe.dispose(),Ye.dispose(),Xe.dispose(),Ie.dispose(),Qe.dispose(),Qe.removeEventListener(`sessionstart`,ct),Qe.removeEventListener(`sessionend`,lt),ut.stop()};function $e(e){e.preventDefault(),Ht(`WebGLRenderer: Context Lost.`),E=!0}function et(){Ht(`WebGLRenderer: Context Restored.`),E=!1;let e=De.autoReset,t=Ue.enabled,n=Ue.autoUpdate,r=Ue.needsUpdate,i=Ue.type;Ze(),De.autoReset=e,Ue.enabled=t,Ue.autoUpdate=n,Ue.needsUpdate=r,Ue.type=i}function tt(e){G(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function nt(e){let t=e.target;t.removeEventListener(`dispose`,nt),rt(t)}function rt(e){it(e),B.remove(e)}function it(e){let t=B.get(e).programs;t!==void 0&&(t.forEach(function(e){Ie.releaseProgram(e)}),e.isShaderMaterial&&Ie.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=_e);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=bt(e,t,n,r,i);z.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Pe.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ye.setup(i,r,s,n,c);let h,g=Ke;if(c!==null&&(h=Ne.get(c),g=qe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(z.setLineWidth(r.wireframeLinewidth*ye()),g.setMode(R.LINES)):g.setMode(R.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),z.setLineWidth(e*ye()),i.isLineSegments?g.setMode(R.LINES):i.isLineLoop?g.setMode(R.LINE_LOOP):g.setMode(R.LINE_STRIP)}else i.isPoints?g.setMode(R.POINTS):i.isSprite&&g.setMode(R.TRIANGLES);if(i.isBatchedMesh){if(Ce.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ne.get(c).bytesPerElement:1,o=B.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(R,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function at(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),pe===!0&&H.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,gt(e,t,r),e.side=0,e.needsUpdate=!0,gt(e,t,r),e.side=2):gt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=He.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),L=this.localClippingEnabled,pe=H.init(this.clippingPlanes,L),pe===!0&&H.setGlobalState(this.clippingPlanes,t),D!==null&&Ue.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];at(o,n,t,e),r.add(o)}else at(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=B.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Ce.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ot=null;function st(e){ot&&ot(e)}function ct(){ut.stop()}function lt(){ut.start()}let ut=new os;ut.setAnimationLoop(st),typeof self<`u`&&ut.setContext(self),this.setAnimationLoop=function(e){ot=e,Qe.setAnimationLoop(e),e===null?ut.stop():ut.start()},Qe.addEventListener(`sessionstart`,ct),Qe.addEventListener(`sessionend`,lt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){G(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Qe.enabled===!0&&Qe.isPresenting===!0,r=w!==null&&(M===null||n)&&w.begin(T,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Qe.enabled===!0&&Qe.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Qe.cameraAutoUpdate===!0&&Qe.updateCamera(t),t=Qe.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,M),x=He.get(e,C.length),x.init(t),x.state.textureUnits=V.getTextureUnits(),C.push(x),me.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),I.setFromProjectionMatrix(me,It,t.reversedDepth),L=this.localClippingEnabled,pe=H.init(this.clippingPlanes,L),b=ze.get(e,S.length),b.init(),S.push(b),Qe.enabled===!0&&Qe.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&dt(e,t,-1/0,T.sortObjects)}dt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(ce,le),ve=Qe.enabled===!1||Qe.isPresenting===!1||Qe.hasDepthSensing()===!1,ve&&We.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),pe===!0&&H.beginShadows();let i=x.state.shadowsArray;if(Ue.render(i,e,t),pe===!0&&H.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];pt(n,r,e,a)}ve&&We.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ft(b,e,n,n.viewport)}}else r.length>0&&pt(n,r,e,t),ve&&We.render(e),ft(b,e,t)}M!==null&&ee===0&&(V.updateMultisampleRenderTarget(M),V.updateRenderTargetMipmap(M)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ye.resetDefaultState(),N=-1,te=null,C.pop(),C.length>0?(x=C[C.length-1],V.setTextureUnits(x.state.textureUnits),pe===!0&&H.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function dt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(I)){r&&ge.setFromMatrixPosition(e.matrixWorld).applyMatrix4(me);let i=Fe.update(e),a=e.material;a.visible&&b.push(e,i,a,n,ge.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(I))){let i=Fe.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),ge.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ge.copy(e.boundingSphere.center)),ge.applyMatrix4(e.matrixWorld).applyMatrix4(me)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,ge.z,s,t)}}else a.visible&&b.push(e,i,a,n,ge.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)dt(i[e],t,n,r)}function ft(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),pe===!0&&H.setGlobalState(T.clippingPlanes,n),r&&z.viewport(P.copy(r)),i.length>0&&mt(i,t,n),a.length>0&&mt(a,t,n),o.length>0&&mt(o,t,n),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function pt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Ce.has(`EXT_color_buffer_half_float`)||Ce.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Bn(1,1,{generateMipmaps:!0,type:e?Oe:Se,minFilter:xe,samples:Math.max(4,we.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:X.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||P;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ie),ae=T.getClearAlpha(),ae<1&&T.setClearColor(16777215,.5),T.clear(),ve&&We.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),pe===!0&&H.setGlobalState(T.clippingPlanes,r),mt(e,n,r),V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a),Ce.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,ht(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ie,ae),d!==void 0&&(r.viewport=d),T.toneMapping=u}function mt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&ht(o,t,n,s,l,c)}}function ht(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function gt(e,t,n){t.isScene!==!0&&(t=_e);let r=B.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ie.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ie.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Me.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,nt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return vt(e,s),d}else s.uniforms=Ie.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ie.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=H.uniform),vt(e,s),r.needsLights=St(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function _t(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=tl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function vt(e,t){let n=B.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function yt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function bt(e,t,n,r,i){t.isScene!==!0&&(t=_e),V.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?T.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:X.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Me.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=B.get(r),y=x.state.lights;if(pe===!0&&(L===!0||e!==te)){let t=e===te&&r.id===N;H.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==H.numPlanes||v.numIntersection!==H.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=gt(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(z.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==N&&(N=r.id,w=!0),v.needsLights){let e=yt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||te!==e){z.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(R,`projectionMatrix`,e.projectionMatrix),O.setValue(R,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(R,he.setFromMatrixPosition(e.matrixWorld)),we.logarithmicDepthBuffer&&O.setValue(R,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(R,`isOrthographic`,e.isOrthographicCamera===!0),te!==e&&(te=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(R,`sunShadowMap`,y.state.sunShadowMap,V),y.state.directionalShadowMap.length>0&&O.setValue(R,`directionalShadowMap`,y.state.directionalShadowMap,V),y.state.spotShadowMap.length>0&&O.setValue(R,`spotShadowMap`,y.state.spotShadowMap,V),y.state.pointShadowMap.length>0&&O.setValue(R,`pointShadowMap`,y.state.pointShadowMap,V)),i.isSkinnedMesh){O.setOptional(R,i,`bindMatrix`),O.setOptional(R,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(R,`boneTexture`,e.boneTexture,V))}i.isBatchedMesh&&(O.setOptional(R,i,`batchingTexture`),O.setValue(R,`batchingTexture`,i._matricesTexture,V),O.setOptional(R,i,`batchingIdTexture`),O.setValue(R,`batchingIdTexture`,i._indirectTexture,V),O.setOptional(R,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(R,`batchingColorTexture`,i._colorsTexture,V));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Ge.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(R,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Su()),w){if(O.setValue(R,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&xt(k,E),a&&r.fog===!0&&Le.refreshFogUniforms(k,a),Le.refreshMaterialUniforms(k,r,se,oe,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}tl.upload(R,_t(v),k,V)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(tl.upload(R,_t(v),k,V),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(R,`center`,i.center),O.setValue(R,`modelViewMatrix`,i.modelViewMatrix),O.setValue(R,`normalMatrix`,i.normalMatrix),O.setValue(R,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Xe.update(n,S),Xe.bind(n,S)}}return S}function xt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function St(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=B.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),B.get(e.texture).__webglTexture=t,B.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=B.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,j=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=B.get(e);if(o.__useDefaultFramebuffer!==void 0){z.bindFramebuffer(R.FRAMEBUFFER,o.__webglFramebuffer),P.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest,z.viewport(P),z.scissor(ne),z.setScissorTest(re),N=-1;return}if(o.__webglFramebuffer===void 0)V.setupRenderTarget(e);else if(o.__hasExternalTextures)V.rebindTextures(e,B.get(e.texture).__webglTexture,B.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&B.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);V.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=B.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&V.useMultisampledRTT(e)===!1?B.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,P.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest}else P.copy(ue).multiplyScalar(se).floor(),ne.copy(de).multiplyScalar(se).floor(),re=fe;if(n!==0&&(r=O),z.bindFramebuffer(R.FRAMEBUFFER,r)&&z.drawBuffers(e,r),z.viewport(P),z.scissor(ne),z.setScissorTest(re),i){let r=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=B.get(e.textures[t]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,t.__webglTexture,n)}N=-1};function Ct(e){let t=B.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=we.textureFormatReadable(e.format),t.__typeReadable=we.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){z.bindFramebuffer(R.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let u=Ct(o);if(u.__formatReadable===!1){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&R.readPixels(t,n,r,i,Je.convert(c),Je.convert(l),a)}finally{let e=M===null?null:B.get(M).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){z.bindFramebuffer(R.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let d=Ct(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.bufferData(R.PIXEL_PACK_BUFFER,a.byteLength,R.STREAM_READ),R.readPixels(t,n,r,i,Je.convert(l),Je.convert(u),0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null);let p=M===null?null:B.get(M).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,p);let m=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Gt(R,m,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,a),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.deleteBuffer(f),R.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;V.setTexture2D(e,0),R.copyTexSubImage2D(R.TEXTURE_2D,n,0,0,o,s,i,a),z.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Je.convert(t.format),_=Je.convert(t.type),v;t.isData3DTexture?(V.setTexture3D(t,0),v=R.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(V.setTexture2DArray(t,0),v=R.TEXTURE_2D_ARRAY):(V.setTexture2D(t,0),v=R.TEXTURE_2D),z.activeTexture(R.TEXTURE0),z.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,t.flipY),z.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),z.pixelStorei(R.UNPACK_ALIGNMENT,t.unpackAlignment);let y=z.getParameter(R.UNPACK_ROW_LENGTH),b=z.getParameter(R.UNPACK_IMAGE_HEIGHT),x=z.getParameter(R.UNPACK_SKIP_PIXELS),S=z.getParameter(R.UNPACK_SKIP_ROWS),C=z.getParameter(R.UNPACK_SKIP_IMAGES);z.pixelStorei(R.UNPACK_ROW_LENGTH,h.width),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,h.height),z.pixelStorei(R.UNPACK_SKIP_PIXELS,l),z.pixelStorei(R.UNPACK_SKIP_ROWS,u),z.pixelStorei(R.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=B.get(e),r=B.get(t),h=B.get(n.__renderTarget),g=B.get(r.__renderTarget);z.bindFramebuffer(R.READ_FRAMEBUFFER,h.__webglFramebuffer),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(e).__webglTexture,i,d+n),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(t).__webglTexture,a,m+n)),R.blitFramebuffer(l,u,o,s,f,p,o,s,R.DEPTH_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||B.has(e)){let n=B.get(e),r=B.get(t);z.bindFramebuffer(R.READ_FRAMEBUFFER,k),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,n.__webglTexture,i),T?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,r.__webglTexture,a),i===0?T?R.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):R.copyTexSubImage2D(v,a,f,p,l,u,o,s):R.blitFramebuffer(l,u,o,s,f,p,o,s,R.COLOR_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?R.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h);z.pixelStorei(R.UNPACK_ROW_LENGTH,y),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,b),z.pixelStorei(R.UNPACK_SKIP_PIXELS,x),z.pixelStorei(R.UNPACK_SKIP_ROWS,S),z.pixelStorei(R.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&R.generateMipmap(v),z.unbindTexture()},this.initRenderTarget=function(e){B.get(e).__webglFramebuffer===void 0&&V.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?V.setTextureCube(e,0):e.isData3DTexture?V.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?V.setTexture2DArray(e,0):V.setTexture2D(e,0),z.unbindTexture()},this.resetState=function(){j=0,ee=0,M=null,z.reset(),Ye.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return It}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=X._getDrawingBufferColorSpace(e),t.unpackColorSpace=X._getUnpackColorSpace()}},wu={type:`change`},Tu={type:`start`},Eu={type:`end`},Du=new Ri,Ou=new ji,ku=Math.cos(70*bn.DEG2RAD),Au=new J,ju=2*Math.PI,Mu={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Nu=1e-6,Pu=class extends rs{constructor(e,t=null){super(e,t),this.state=Mu.NONE,this.target=new J,this.cursor=new J,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:pe.ROTATE,MIDDLE:pe.DOLLY,RIGHT:pe.PAN},this.touches={ONE:L.ROTATE,TWO:L.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new J,this._lastQuaternion=new xn,this._lastTargetPosition=new J,this._quat=new xn().setFromUnitVectors(e.up,new J(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ns,this._sphericalDelta=new ns,this._scale=1,this._panOffset=new J,this._rotateStart=new q,this._rotateEnd=new q,this._rotateDelta=new q,this._panStart=new q,this._panEnd=new q,this._panDelta=new q,this._dollyStart=new q,this._dollyEnd=new q,this._dollyDelta=new q,this._dollyDirection=new J,this._mouse=new q,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Iu.bind(this),this._onPointerDown=Fu.bind(this),this._onPointerUp=Lu.bind(this),this._onContextMenu=Wu.bind(this),this._onMouseWheel=Bu.bind(this),this._onKeyDown=Vu.bind(this),this._onTouchStart=Hu.bind(this),this._onTouchMove=Uu.bind(this),this._onMouseDown=Ru.bind(this),this._onMouseMove=zu.bind(this),this._interceptControlDown=Gu.bind(this),this._interceptControlUp=Ku.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=Mu.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),e.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(wu),this.update(),this.state=Mu.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Au.copy(t).sub(this.target),Au.applyQuaternion(this._quat),this._spherical.setFromVector3(Au),this.autoRotate&&this.state===Mu.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=ju:n>Math.PI&&(n-=ju),r<-Math.PI?r+=ju:r>Math.PI&&(r-=ju),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(Au.setFromSpherical(this._spherical),Au.applyQuaternion(this._quatInverse),t.copy(this.target).add(Au),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=Au.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new J(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new J(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=Au.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(Du.origin.copy(this.object.position),Du.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Du.direction))<ku?this.object.lookAt(this.target):(Ou.setFromNormalAndCoplanarPoint(this.object.up,this.target),Du.intersectPlane(Ou,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>Nu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Nu||this._lastTargetPosition.distanceToSquared(this.target)>Nu?(this.dispatchEvent(wu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?ju/60/60*this.autoRotateSpeed:ju/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Au.setFromMatrixColumn(t,0),Au.multiplyScalar(-e),this._panOffset.add(Au)}_panUp(e,t){this.screenSpacePanning===!0?Au.setFromMatrixColumn(t,1):(Au.setFromMatrixColumn(t,0),Au.crossVectors(this.object.up,Au)),Au.multiplyScalar(e),this._panOffset.add(Au)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Au.copy(r).sub(this.target);let i=Au.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ju*this._rotateDelta.x/t.clientHeight),this._rotateUp(ju*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ju*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ju*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ju*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ju*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ju*this._rotateDelta.x/t.clientHeight),this._rotateUp(ju*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new q,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Fu(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function Iu(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function Lu(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(Eu),this.state=Mu.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function Ru(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case pe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=Mu.DOLLY;break;case pe.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Mu.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Mu.ROTATE}break;case pe.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Mu.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Mu.PAN}break;default:this.state=Mu.NONE}this.state!==Mu.NONE&&this.dispatchEvent(Tu)}function zu(e){switch(this.state){case Mu.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case Mu.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case Mu.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function Bu(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===Mu.NONE&&(e.preventDefault(),this.dispatchEvent(Tu),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Eu))}function Vu(e){this.enabled!==!1&&this._handleKeyDown(e)}function Hu(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case L.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=Mu.TOUCH_ROTATE;break;case L.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=Mu.TOUCH_PAN;break;default:this.state=Mu.NONE}break;case 2:switch(this.touches.TWO){case L.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=Mu.TOUCH_DOLLY_PAN;break;case L.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=Mu.TOUCH_DOLLY_ROTATE;break;default:this.state=Mu.NONE}break;default:this.state=Mu.NONE}this.state!==Mu.NONE&&this.dispatchEvent(Tu)}function Uu(e){switch(this._trackPointer(e),this.state){case Mu.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case Mu.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case Mu.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case Mu.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=Mu.NONE}}function Wu(e){this.enabled!==!1&&e.preventDefault()}function Gu(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function Ku(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}var qu={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Ju=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Yu=new Io(-1,1,1,-1,0,1),Xu=new class extends wi{constructor(){super(),this.setAttribute(`position`,new fi([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new fi([0,2,0,0,2,0],2))}},Zu=class{constructor(e){this._mesh=new Zi(Xu,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Yu)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Qu=class extends Ju{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ha?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=za.clone(e.uniforms),this.material=new Ha({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Zu(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},$u=class extends Ju{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},ed=class extends Ju{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},td=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new q);this._width=n.width,this._height=n.height,t=new Bn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Oe}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Qu(qu),this.copyPass.material.blending=0,this.timer=new Ho}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}$u!==void 0&&(r instanceof $u?n=!0:r instanceof ed&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new q);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},nd={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Z(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},rd=class e extends Ju{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new q(256,256):new q(e.x,e.y),this.clearColor=new Z(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Bn(i,a,{type:Oe,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new Bn(i,a,{type:Oe,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new Bn(i,a,{type:Oe,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=nd;this.highPassUniforms=za.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ha({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new q(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new J(1,1,1),new J(1,1,1),new J(1,1,1),new J(1,1,1),new J(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=za.clone(qu.uniforms),this.blendMaterial=new Ha({uniforms:this.copyUniforms,vertexShader:qu.vertexShader,fragmentShader:qu.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Z,this._oldClearAlpha=1,this._basic=new zi,this._fsQuad=new Zu(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new q(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new Ha({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new q(.5,.5)},direction:{value:new q(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Ha({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};rd.BlurDirectionX=new q(1,0),rd.BlurDirectionY=new q(0,1);var id={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},ad=class extends Ju{constructor(){super(),this.isOutputPass=!0,this.uniforms=za.clone(id.uniforms),this.material=new Ua({name:id.name,uniforms:this.uniforms,vertexShader:id.vertexShader,fragmentShader:id.fragmentShader}),this._fsQuad=new Zu(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},X.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},od=class extends Ju{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Z}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},sd=new J;function cd({name:e,unit:t=1,origin:n=()=>sd,near:r,far:i}){let a=new No(60,1,r,i);return{name:e,unit:t,origin:n,near:r,far:i,scene:new Tr,camera:a,visible:!0}}function ld(e,t){let n=e.camera;n.position.subVectors(t.position,e.origin()).divideScalar(e.unit),n.quaternion.copy(t.quaternion),(n.fov!==t.fov||n.aspect!==t.aspect||n.near!==e.near||n.far!==e.far)&&(n.fov=t.fov,n.aspect=t.aspect,n.near=e.near,n.far=e.far,n.updateProjectionMatrix()),n.updateMatrixWorld()}function ud(e,t){let n=t.map(t=>{let n=new od(t.scene,t.camera);return e.addPass(n),n});return dd(n,t),n}function dd(e,t){let n=!0;e.forEach((e,r)=>{e.enabled=t[r].visible,e.clear=e.enabled&&n,e.clearDepth=e.enabled&&!n,e.enabled&&(n=!1)})}var fd=695700,pd=.5,md=.6,hd=`
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
    }
`,gd=`
    uniform vec3 uColor;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        float mu = clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0);
        vec3 color = uColor * (1.0 - ${md.toFixed(2)} * (1.0 - mu));
        gl_FragColor = vec4(pow(color, vec3(2.2)), 1.0);
    }
`,_d=e=>e*fd/r/i;function vd(e){let t=new J,n=cd({name:`star disc`,unit:1/i,origin:()=>t,near:1e-6,far:1});n.visible=!1;let r=new Ha({uniforms:{uColor:{value:new Z}},vertexShader:hd,fragmentShader:gd}),a=new Zi(new Na(1,64,32),r);n.scene.add(a);let{positions:o,colors:s,radius:c,count:l}=e,u=c.map(_d);return{layer:n,index:null,update(e,c){let{x:d,y:f,z:p}=e.position,m=-1,h=0,g=0;for(let e=0;e<l;e++){let t=Math.hypot(o[e*3]-d,o[e*3+1]-f,o[e*3+2]-p),n=u[e]/Math.max(t,u[e]);n>h&&(m=e,h=n,g=t)}let _=c/bn.degToRad(e.fov);if(m<0||h*_<pd){n.visible=!1,this.index=null;return}t.fromArray(o,m*3);let v=u[m]*i,y=g*i;a.scale.setScalar(v),n.near=Math.max((y-v)*.5,v*1e-4),n.far=y+v*2,this.index!==m&&(r.uniforms.uColor.value.fromArray(s,m*3),this.index=m),n.visible=!0},dispose(){a.geometry.dispose(),r.dispose()}}}var yd=.12,bd=10,xd=50,Sd=2,Cd=`
    varying vec3 vColor;
    varying float vAlpha;
    varying float vGlow;
    varying float vGlare;
    varying float vSize;
`,wd=`
    uniform float uPixelRatio;
    uniform float uMaxSize;
    uniform float uMinAlpha;
    uniform float uGlare;  // the spike's peak while glow follows brightness, else 0
    uniform float uGlareMag;
    ${Cd}

    void spriteFromMagnitude(float mag, vec3 tint) {
        vGlow = clamp((2.0 - mag) / 5.0, 0.0, 1.0);
        float size = clamp(2.0 + (6.5 - mag) * 1.3, 1.5, uMaxSize) * (1.0 + vGlow * 2.0);
        gl_PointSize = size * uPixelRatio;
        vSize = gl_PointSize;
        vAlpha = max(smoothstep(7.5, 5.0, mag), uMinAlpha);
        // The light relative to a point at uGlareMag, levelling off above
        // the knee, phased in over the magnitude above uGlareMag
        float light = pow(10.0, -0.4 * (mag - uGlareMag));
        if (light > ${bd.toFixed(1)}) light = ${bd.toFixed(1)} * (1.0 + log(light / ${bd.toFixed(1)}));
        vGlare = uGlare * min(light, ${xd.toFixed(1)})
            * (1.0 - smoothstep(uGlareMag - 1.0, uGlareMag, mag));
        vColor = pow(tint, vec3(2.2));  // sRGB tint -> linear
    }
`,Td=`
    ${Cd}

    vec4 sprite() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        // Sprite grows with vGlow, so tighten the core to keep it the same size
        float coreScale = (1.0 + vGlow * 2.0) * (1.0 + vGlow * 2.0);
        float core = exp(-r * r * 8.0 * coreScale);
        float halo = 0.35 * exp(-r * r * 2.5 * coreScale) + vGlow * 0.3 * exp(-r * r * 4.0);
        float alpha = (core + halo) * vAlpha;
        // Glare spike, brighter than white: the screen clips it, so only the
        // bloom shows it. rPx in device px.
        float rPx = r * vSize * 0.5;
        float spike = vGlare * exp(-rPx * rPx * ${(1/(2*Sd**2)).toFixed(4)});
        if (alpha + spike < 0.01) return vec4(0.0);
        // The sprite plus the spike
        return vec4(vColor * (1.0 + spike / max(alpha, 1e-6)), alpha);
    }
`;function Ed(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new wi,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Dd(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Dd(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Dd(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new li(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var Od=(e,t,n,r=0)=>[e-t/2,e+t/2,n,r],kd=(e,t,n,r,i,a)=>{let o=3*Math.PI*r;return{kind:`wake`,km:e,moon:t,side:n,amplitudeKm:i,wavelengthKm:o,dampingKm:4*o,windowKm:a}},Ad=2006.06;function jd(e){let t=1970+e.getTime()/315576e5;return(Math.floor((t-Ad)/4)%2+2)%2==0}var Md={Jupiter:{pole:[268.057,64.495],strips:[{km:[92e3,226e3],color:`#8c7a66`,bands:[[92e3,122500,.05,1],[122500,129e3,.22,1],[129e3,182e3,.04,1],[182e3,226e3,.02,1]]}]},Saturn:{pole:[40.589,83.537],strips:[{texture:`2k_saturn_ring_alpha.png`,stops:[[0,70613],[107.5,74490],[592.5,91980],[1375.5,117580],[1448.5,122170],[1835,133590],[1926.5,136780],[2048,141016]].map(([e,t])=>[e/2048,t]),carve:[[136484,136526],[133423,133745]],edges:[{kind:`resonance`,km:117580,moon:`Mimas`,m:2,amplitudeKm:37,windowKm:200},{kind:`resonance`,km:136780,moon:`Janus`,m:7,amplitudeKm:12,windowKm:60,active:jd},kd(133423,`Pan`,1,161,2,80),kd(133745,`Pan`,-1,161,2,80),kd(136484,`Daphnis`,1,21,1.5,12),kd(136526,`Daphnis`,-1,21,1.5,12)]},{km:[139500,48e4],color:`#c9c2b4`,bands:[Od(140180,50,.6,.5),[166e3,175e3,.05,1],[18e4,48e4,.015,1]],channels:{km:140180,windowKm:60,moon:`Prometheus`,spacingDeg:3.2,count:15}}]},Uranus:{pole:[257.311,-15.175],strips:[{km:[37e3,52e3],color:`#77736c`,bands:[[37850,41350,.05,1],Od(41837,2,.7),Od(42234,2.5,.7),Od(42571,2.5,.7),Od(44718,7,.7),Od(45661,8,.7),Od(47175,1.5,.7),Od(47627,2.5,.7),Od(48300,6,.7),Od(50023,1.5,.5,1),Od(51149,58,.85)]},{km:[6e4,104e3],color:`#8fa7c9`,bands:[[64200,68e3,.05,1],[86e3,103e3,.04,1]]}]},Neptune:{pole:[299.36,43.46],strips:[{km:[4e4,64e3],color:`#7a6f69`,bands:[[40900,42900,.06,1],Od(53200,113,.35,.5),[53200,57200,.04,1],Od(57200,50,.25,1),Od(62932,35,.4,.5)]}]}};function Nd(e){let[t,n]=Md[e].pole;return y(t/15,n,1)}var Pd=(e,t)=>[e-t/2,e+t/2],Fd=[{id:`saturn-c`,name:`C ring`,kind:`ring`,km:[74490,91980],madeOf:`Water ice, dirtier and darker than the B and A rings`,discovered:`1850, by William and George Bond (William Dawes and Johann Galle also saw it)`,note:`Also called the Crepe Ring for its faint, see-through look: Saturn shows through it.`},{id:`saturn-b`,name:`B ring`,kind:`ring`,km:[91980,117580],madeOf:`Almost pure water ice, in pieces from grains to boulders several metres across`,discovered:`Part of the ring Christiaan Huygens described in 1655`,note:`The brightest and most massive ring, so packed that almost no starlight gets through. Like the other main rings it is astonishingly thin: typically about 10 metres thick.`},{id:`saturn-cassini`,name:`Cassini Division`,kind:`gap`,km:[117580,122170],madeOf:`Not empty: thin ringlets of darker, dustier ice`,discovered:`1675, by Giovanni Cassini`,note:`Kept mostly clear by Mimas. A particle at its inner edge would go round Saturn exactly twice for each orbit of Mimas, and those regular tugs pull its orbit out of shape.`},{id:`saturn-a`,name:`A ring`,kind:`ring`,km:[122170,136780],madeOf:`Water ice`,discovered:`Part of Huygens' ring (1655); Cassini split it from the B ring in 1675`,note:`Holds the Encke Gap (cleared by Pan) and the narrow Keeler Gap (cleared by Daphnis), plus "propeller" moonlets too small to clear a gap. Its sharp outer edge is held by Janus and Epimetheus.`},{id:`saturn-encke`,name:`Encke Gap`,kind:`gap`,km:[133423,133745],madeOf:`Thin, wavy ringlets of dust`,discovered:`1888, by James Keeler (named after Johann Encke)`,note:`Pan, a 28 km moon shaped like a ravioli, orbits inside it and sweeps it clear. Its pull leaves waves along both edges.`},{id:`saturn-keeler`,name:`Keeler Gap`,kind:`gap`,km:[136484,136526],width:`35-42 km (sources differ)`,madeOf:`Empty, apart from Daphnis`,note:`Daphnis, an 8 km moon, orbits inside it and keeps it clear, raising waves on both edges as it goes. Ripples on the edges pointed to a moon there before Cassini found Daphnis on 1 May 2005. Named after James Keeler, who found the Encke Gap.`},{id:`saturn-f`,name:`F ring`,kind:`ring`,km:Pd(140180,50),scaleKm:3400,width:`A few hundred km, with a bright core tens of km wide`,madeOf:`Icy particles and lots of fine dust`,discovered:`1979, by Pioneer 11`,note:`A narrow, knotted, braided-looking ring kept in place by two shepherd moons: Prometheus just inside it and Pandora just outside.`},{id:`saturn-g`,name:`G ring`,kind:`ring`,km:[166e3,175e3],madeOf:`Fine dust`,discovered:`1979-80: sources credit Pioneer 11 (1979) or Voyager 1 (1980)`,note:`Fed by a bright arc of debris around the tiny moonlet Aegaeon, chipped off by small impacts.`},{id:`saturn-e`,name:`E ring`,kind:`ring`,km:[18e4,48e4],labelKm:3e5,madeOf:`Microscopic ice grains`,discovered:`Spotted by Walter Feibelman in 1967 on a 1966 photograph; confirmed by Pioneer 11 in 1979`,note:`Saturn's widest ring, starting near Mimas' orbit. Enceladus orbits inside it and keeps it supplied: the ice it sprays from geysers at its south pole drifts out into the ring.`}].map(e=>({...e,planet:`Saturn`})),Id=[{id:`jupiter-halo`,name:`Halo ring`,kind:`ring`,km:[92e3,122500],madeOf:`Very fine dust`,discovered:`1979, by Voyager 1, with the main ring`,note:`A thick, doughnut-shaped cloud: dust from the main ring drifting inwards, puffed up by Jupiter's magnetic field.`},{id:`jupiter-main`,name:`Main ring`,kind:`ring`,km:[122500,129e3],madeOf:`Dark red-brown dust and rocky debris`,discovered:`1979, by Voyager 1`,note:`Debris knocked off the small moons Metis and Adrastea by meteorite impacts; they orbit inside it, and Adrastea marks its outer edge. So faint it shows best when lit from behind.`},{id:`jupiter-amalthea`,name:`Amalthea gossamer ring`,kind:`ring`,km:[129e3,182e3],madeOf:`Fine dust from Amalthea`,discovered:`In a Voyager image (reported 1985); Galileo images showed in 1998 that there are two gossamer rings`,note:`Really a thick sheet, as tall as Amalthea's slightly tilted orbit carries it above and below Jupiter's equator. Drawn flat here.`},{id:`jupiter-thebe`,name:`Thebe gossamer ring`,kind:`ring`,km:[129e3,226e3],labelKm:205e3,scaleKm:44e3,madeOf:`Fine dust from Thebe`,discovered:`In a Voyager image (reported 1985); Galileo images showed in 1998 that there are two gossamer rings`,note:`Even fainter than Amalthea's, and thicker; it reaches a little past Thebe's orbit (222,000 km). Drawn flat here, beyond Amalthea's ring.`}].map(e=>({...e,planet:`Jupiter`})),Ld={madeOf:`Dark chunks, centimetres to metres across, with little dust`,discovered:`1977, from Earth, when a star dimmed five times before Uranus covered it, and five times after`},Rd=[{id:`uranus-zeta`,name:`ζ ring`,kind:`ring`,km:[37850,41350],madeOf:`Dust`,discovered:`1986, by Voyager 2`,note:`A faint dusty sheet inside the narrow rings, reaching in towards the planet.`},{id:`uranus-654`,name:`Rings 6, 5 and 4`,kind:`group`,km:[41836,42573],scaleKm:2100,width:`A few km each`,...Ld,note:`The innermost of the narrow rings, numbered in the order they were found.`},{id:`uranus-alpha-beta`,name:`α and β rings`,kind:`group`,km:[44714,45665],scaleKm:1500,width:`About 5-10 km each, varying around the ring`,...Ld,note:`Slightly oval, so their widths change around the ring.`},{id:`uranus-eta-gamma-delta`,name:`η, γ and δ rings`,kind:`group`,km:[47174,48303],scaleKm:1500,width:`1-9 km each`,...Ld,note:`η has a faint, broad skirt of dust on its outside; δ one on its inside.`},{id:`uranus-lambda`,name:`λ ring`,kind:`ring`,km:Pd(50023,1.5),scaleKm:1100,width:`1-2 km`,madeOf:`Mostly dust`,discovered:`1986, by Voyager 2`,note:`Like Jupiter's dusty rings, it shows best when lit from behind.`},{id:`uranus-epsilon`,name:`ε ring`,kind:`ring`,km:Pd(51149,58),scaleKm:1100,width:`20-96 km: it is slightly oval, widest farthest from Uranus`,madeOf:`Dark chunks 0.2-20 m across, with almost no dust`,discovered:`1977, from Earth (James Elliot, Edward Dunham, Jessica Mink)`,note:`Uranus' densest and widest ring, held in place by two shepherd moons: Cordelia inside it and Ophelia outside. Its material reflects only about 2% of sunlight, like charcoal.`},{id:`uranus-nu`,name:`ν ring`,kind:`ring`,km:[64200,68e3],madeOf:`Reddish dust`,discovered:`In Hubble images from 2003-05 (Mark Showalter, Jack Lissauer)`,note:`A faint dusty ring well outside the narrow rings, between the orbits of the moons Portia and Rosalind.`},{id:`uranus-mu`,name:`μ ring`,kind:`ring`,km:[86e3,103e3],madeOf:`Very fine grains, blue`,discovered:`In Hubble images from 2003-05 (Mark Showalter, Jack Lissauer)`,note:`Fed by the small moon Mab, which orbits in its brightest part. It is blue, like Saturn's E ring fed by Enceladus.`}].map(e=>({...e,planet:`Uranus`})),zd=`Dark dust and small particles`,Bd=[{id:`neptune-galle`,name:`Galle ring`,kind:`ring`,km:[40900,42900],madeOf:zd,discovered:`1989, by Voyager 2`,note:`Broad and very faint. Named after Johann Galle, who first saw Neptune, in 1846.`},{id:`neptune-le-verrier`,name:`Le Verrier ring`,kind:`ring`,km:Pd(53200,113),scaleKm:2e3,madeOf:zd,discovered:`1989, by Voyager 2`,note:`Narrow; the moon Despina orbits about 700 km inside it. Named after Urbain Le Verrier, who worked out where Neptune would be found.`},{id:`neptune-lassell`,name:`Lassell ring`,kind:`ring`,km:[53200,57200],madeOf:zd,discovered:`1989, by Voyager 2`,note:`A broad, very faint sheet between the Le Verrier and Arago rings. Named after William Lassell, who discovered Triton.`},{id:`neptune-arago`,name:`Arago ring`,kind:`ring`,km:Pd(57200,50),scaleKm:2e3,madeOf:zd,discovered:`1989, by Voyager 2`,note:`Faint and narrow, on the Lassell ring's outer edge. Named after François Arago.`},{id:`neptune-adams`,name:`Adams ring`,kind:`ring`,km:Pd(62932,35),scaleKm:5e3,madeOf:zd,discovered:`Its arcs in 1984, from Earth; the whole ring in 1989, by Voyager 2`,note:`Neptune's outermost ring, with four bright clumpy arcs named Courage, Liberté, Égalité and Fraternité (not drawn here), held together by the moon Galatea just inside it. Named after John Couch Adams.`}].map(e=>({...e,planet:`Neptune`})),Vd=[...Fd,...Id,...Rd,...Bd],Hd=new Map(Vd.map(e=>[e.id,e]));function Ud(e){return e.kind===`gap`?`Gap in ${e.planet}'s rings`:`${e.kind===`group`?`Rings`:`Ring`} of ${e.planet}`}var Wd=e=>e.scaleKm??e.km[1]-e.km[0],Gd=e=>e.labelKm??(e.km[0]+e.km[1])/2,Kd={Mercury:[-.6,4.98,-4.88,3.02],Earth:[-3.99,-.106,2.054],Mars:[-1.52,1.6],Jupiter:[-9.4,.5],Uranus:[-7.19,.25],Neptune:[-6.87],Pluto:[-1,4]},qd=[-4.47,1.03,.57,.13],Jd=[.98,-1.02],Yd=163.6,Xd=385000.6/r,Zd=new J(...y(Md.Saturn.pole[0]/15,Md.Saturn.pole[1],1)),Qd=180/Math.PI,$d=new Set([...Object.keys(Kd),`Venus`,`Saturn`,`Moon`]),ef=new J,tf=new J,nf=(e,t)=>e.reduceRight((e,n)=>e*t+n,0);function rf(e,t,n){ef.copy(t).negate(),tf.subVectors(n,t);let r=Math.max(ef.length(),1e-9),i=Math.max(tf.length(),1e-9),a=ef.angleTo(tf),o=a*Qd;if(e===`Moon`)return-12.717+1.49*a+.0431*a**4+5*Math.log10(r*i/Xd);let s=5*Math.log10(r*i);if(e===`Saturn`){let e=Math.abs(tf.dot(Zd))/i;return-9+.044*o+e*(-2.6+1.2*e)+s}return nf(e===`Venus`?o<Yd?qd:Jd:Kd[e],o/100)+s}var af=300,of=5e3,sf=6,cf=-5,lf=2,uf=3,df=Math.PI/180,ff=.35,pf=1/200,mf=4,hf=[6,14],gf=[150,450],_f=5,vf=1,yf=`#9a948b`,bf=`#c2b5a8`,xf=`#7fd6ea`,Sf=new Set([`dwarf planet`,`centaur`,`trans-Neptunian object`]),Cf=`#aaa49b`,wf={Io:`#d8c46f`,Europa:`#cdbea2`,Ganymede:`#9f978b`,Callisto:`#6e665d`,Titan:`#d6a25a`,Enceladus:`#e8eef2`,Iapetus:`#8f8676`,Triton:`#cdbcb3`,Phobos:`#7d7268`,Deimos:`#9a8f82`,Charon:`#9b958f`},Tf={by:`Solar System Scope`,href:`https://www.solarsystemscope.com/textures/`,widthPx:2048},Ef={by:`USGS Astrogeology`,href:`https://astrogeology.usgs.gov/`,widthPx:1024},Df={by:`NASA 3D Resources`,href:`https://github.com/nasa/NASA-3D-Resources`,widthPx:1440},Of=`Greyscale map, tinted with its usual colour`,kf=`Voyager 2 saw only the southern half (the north was in darkness); the rest is filled in`,Af=`South of about 30° S was in darkness during the flyby; it is filled in`,jf=3,Mf=1.2;function Nf(e,t){if(!e)return Mf;let n=2*Math.PI/(e.widthPx*jf*t);return Math.max(Mf,1+n)}var Pf={Sun:{file:`2k_sun.jpg`,...Tf,from:`Artwork`,note:`The real surface changes by the minute`},Mercury:{file:`2k_mercury.jpg`,...Tf,from:`Based on NASA spacecraft images`},Venus:{file:`2k_venus_atmosphere.jpg`,...Tf,from:`Based on NASA spacecraft images`,note:`The cloud tops: thick clouds hide the surface`},Earth:{file:`2k_earth_daymap.jpg`,...Tf,from:`Based on NASA satellite images`,note:`A cloud-free day map, with city lights from a night map. The clouds are a separate layer from one snapshot, drifting slowly east: not the real weather`},Moon:{file:`moon_color_4k.jpg`,normal:`moon_normal_4k.jpg`,by:`NASA SVS (CGI Moon Kit)`,href:`https://svs.gsfc.nasa.gov/4720`,widthPx:4096,from:`Lunar Reconnaissance Orbiter colour mosaic, with relief from its laser altimeter`,note:`Relief is exaggerated 2×. The glow on the night side is earthshine (sunlight bounced off Earth), brightest near new Moon; drawn far brighter than the real thing so it shows`},Mars:{file:`2k_mars.jpg`,...Tf,from:`Based on NASA spacecraft images`},Jupiter:{file:`2k_jupiter.jpg`,...Tf,from:`Based on NASA spacecraft images`,note:`Cloud bands: they shift over weeks`},Saturn:{file:`2k_saturn.jpg`,...Tf,from:`Based on NASA spacecraft images`},Uranus:{file:`2k_uranus.jpg`,...Tf,from:`Based on NASA spacecraft images`},Neptune:{file:`2k_neptune.jpg`,...Tf,from:`Based on NASA spacecraft images`},Pluto:{file:`pluto.jpg`,...Ef,from:`New Horizons mosaic (2015 flyby)`,note:`${Af}. ${Of}`},Io:{file:`io.jpg`,...Ef,from:`Galileo and Voyager colour mosaic`},Europa:{file:`europa.jpg`,...Ef,from:`Galileo and Voyager mosaic`,note:Of},Ganymede:{file:`ganymede.jpg`,...Ef,from:`Galileo and Voyager colour mosaic`},Callisto:{file:`callisto.jpg`,...Ef,from:`Galileo and Voyager mosaic`,note:Of},Mimas:{file:`mimas.jpg`,...Df,from:`Spacecraft map with gaps`,note:`Unmapped areas are filled in. ${Of}`},Enceladus:{file:`enceladus.jpg`,...Ef,from:`Cassini mosaic`,note:Of},Tethys:{file:`tethys.jpg`,...Df,from:`Spacecraft map with gaps`,note:`Unmapped areas are filled in. ${Of}`},Dione:{file:`dione.jpg`,...Ef,from:`Cassini and Voyager mosaic`,note:Of},Rhea:{file:`rhea.jpg`,...Ef,from:`Cassini and Voyager mosaic`,note:Of},Titan:{file:`titan.jpg`,...Ef,from:`Cassini near-infrared mosaic`,note:`The surface under the haze, which hides it from ordinary cameras. ${Of}`},Iapetus:{file:`iapetus.jpg`,...Df,from:`Spacecraft map`,note:`Keeps its dark leading and bright trailing halves. ${Of}`},Phobos:{file:`phobos.jpg`,...Df,from:`Spacecraft map`,note:`Drawn as a sphere: the real Phobos is potato-shaped. ${Of}`},Deimos:{file:`deimos.jpg`,...Df,from:`Spacecraft map`,note:`Drawn as a sphere: the real Deimos is potato-shaped. ${Of}`},Miranda:{file:`miranda.jpg`,...Df,from:`Voyager 2 map (1986 flyby)`,note:`${kf}. ${Of}`},Ariel:{file:`ariel.jpg`,...Df,from:`Voyager 2 map (1986 flyby)`,note:`${kf}. ${Of}`},Umbriel:{file:`umbriel.jpg`,...Df,from:`Voyager 2 map (1986 flyby)`,note:`${kf}. ${Of}`},Titania:{file:`titania.jpg`,...Df,from:`Voyager 2 map (1986 flyby)`,note:`${kf}. ${Of}`},Oberon:{file:`oberon.jpg`,...Df,from:`Voyager 2 map (1986 flyby)`,note:`${kf}. ${Of}`},Triton:{file:`triton.jpg`,...Ef,from:`Voyager 2 colour mosaic (1989 flyby)`,note:`Voyager 2 saw mostly the southern half; the rest is filled in`},Charon:{file:`charon.jpg`,...Ef,from:`New Horizons mosaic (2015 flyby)`,note:`${Af}. ${Of}`},Ceres:{file:`ceres.jpg`,...Ef,from:`Dawn mosaic (2015, made by DLR)`,note:`Around the south pole is filled in. Its bright spots are salt deposits in Occator crater`},Vesta:{file:`vesta.jpg`,...Ef,from:`Dawn mosaic (2011-2012, made by DLR)`,note:`The north was in winter darkness while Dawn mapped it, so it shows dark. Drawn as a sphere: the real Vesta is squashed, with a giant crater at its south pole`}},Ff={night:`2k_earth_nightmap.jpg`,clouds:`2k_earth_clouds.jpg`,ocean:`2k_earth_specular.jpg`},If=1.5,Lf=.8,Rf=2500134,zf=30,Bf=1.004,Vf=1.025,Hf=8,Uf=2,Wf=.06,Gf=new Set([`Nereid`]),Kf=6e5,qf=e=>`/star-quiz/textures/${e}`,Jf=2048,Yf=8,Xf=new J(...y(18,66.56,1)),Zf=`
    float separationPx(vec4 a, vec4 b) {
        vec2 pa = a.xy / max(-a.z, 1e-30);
        vec2 pb = b.xy / max(-b.z, 1e-30);
        return length(pa - pb) * projectionMatrix[1][1] * uViewportHeight * 0.5;
    }
`,Qf=`
    uniform float uSize;
    uniform float uRadius;
    uniform float uViewportHeight;
    uniform float uFade;
    uniform float uHasParent;
    uniform vec3 uParentOffset;
    ${Zf}

    float dotFade(vec4 mvPosition) {
        float radiusPx = uRadius / max(-mvPosition.z, 1e-30) * projectionMatrix[1][1] * uViewportHeight * 0.5;
        float fade = uFade * (1.0 - smoothstep(uSize * 0.25, uSize * 0.5, radiusPx));
        if (uHasParent > 0.5) {
            vec4 parent = modelViewMatrix * vec4(uParentOffset, 1.0);
            fade *= smoothstep(${hf[0].toFixed(1)}, ${hf[1].toFixed(1)}, separationPx(mvPosition, parent));
        }
        return fade;
    }
`,$f=`
    varying float vAlpha;
    ${Qf}

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        vAlpha = dotFade(mvPosition);
        gl_PointSize = vAlpha > 0.0 ? uSize : 0.0;
        gl_Position = projectionMatrix * mvPosition;
    }
`,ep=`
    uniform float uMag;
    uniform vec3 uColor;
    ${wd}
    ${Qf}

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        float fade = dotFade(mvPosition);
        spriteFromMagnitude(uMag, uColor);
        vAlpha *= fade;
        vGlare *= fade;
        if (fade <= 0.0) gl_PointSize = 0.0;
        gl_Position = projectionMatrix * mvPosition;
    }
`,tp=`
    ${Td}

    void main() {
        vec4 light = sprite();
        if (light.a <= 0.0) discard;
        gl_FragColor = light;
    }
`,np=`
    uniform vec3 uColor;
    varying float vAlpha;

    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float alpha = (1.0 - smoothstep(0.55, 1.0, r)) * vAlpha;
        if (alpha < 0.01) discard;
        vec3 color = pow(uColor, vec3(2.2));  // sRGB tint -> linear, like the star shader
        gl_FragColor = vec4(color, alpha);
    }
`,rp=`
    uniform float uSize;
    uniform float uViewportHeight;
    uniform float uFade;
    uniform float uCloudFade;
    varying float vAlpha;
    ${Zf}

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vec4 parent = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        vAlpha = uFade * uCloudFade * 0.55 * smoothstep(${hf[0].toFixed(1)}, ${hf[1].toFixed(1)}, separationPx(mvPosition, parent));
        gl_PointSize = vAlpha > 0.0 ? uSize : 0.0;
        gl_Position = projectionMatrix * mvPosition;
    }
`,ip=e=>({value:new Z().setHex(e,jt)}),ap=(e,t,n)=>({uSize:{value:sf*t},uRadius:{value:e},uViewportHeight:{value:1},uFade:{value:1},uHasParent:{value:+!!n},uParentOffset:{value:new J}});function op(e,t,n,r){let i=new wi;i.setAttribute(`position`,new li(new Float32Array(3),3));let a=new wa(i,new Ha({uniforms:{...ap(t,n,r),uColor:ip(e)},vertexShader:$f,fragmentShader:np,transparent:!0,depthWrite:!1}));return a.frustumCulled=!1,a}function sp(e,t,n,r){let i=new wi;i.setAttribute(`position`,new li(new Float32Array(3),3));let a=ip(e);a.value.lerp(new Z(1,1,1),.35);let o=new wa(i,new Ha({uniforms:{...ap(t,n,r),uMag:{value:0},uColor:a,uPixelRatio:{value:n},uMaxSize:{value:24},uMinAlpha:{value:yd},uGlare:{value:0},uGlareMag:{value:0}},vertexShader:ep,fragmentShader:tp,transparent:!0,depthWrite:!1,blending:2}));return o.frustumCulled=!1,o}function cp(e,t){let n=new wi;n.setAttribute(`position`,new li(new Float32Array(e*3),3));let r=new wa(n,new Ha({uniforms:{uSize:{value:uf*t},uViewportHeight:{value:1},uFade:{value:1},uCloudFade:{value:0},uColor:ip(new Z(Cf).getHex())},vertexShader:rp,fragmentShader:np,transparent:!0,depthWrite:!1}));return r.frustumCulled=!1,r}function lp(e,t,n=ff,r=!0){let i=new wi;i.setAttribute(`position`,new li(e,3));let a=new aa({color:t,transparent:!0,opacity:n}),o=r?new va(i,a):new pa(i,a);return o.userData.baseOpacity=n,o}function up(e){e.parent?.remove(e),e.geometry.dispose(),e.material.dispose()}function dp(e,[t,n]){let r=new Uint8Array(Jf*4),i=(n-t)/Jf;for(let n=0;n<Jf;n++){let a=t+n*i,o=0,s=0;for(let[t,n,r,c=0]of e){let e=Math.min(a+i,n)-Math.max(a,t);e>0&&(o+=r*e/i,s+=c*r*e/i)}let c=o>0?s/o:0;r.set([Math.round(c*255),255,255,Math.round(Math.min(o,1)*255)],n*4)}let a=new ea(r,Jf,1);return a.magFilter=R,a.minFilter=xe,a.generateMipmaps=!0,a.anisotropy=Yf,a.needsUpdate=!0,a}var fp=.9,pp=8,mp=6,hp=2,gp=.3,_p=.85,vp={value:1},yp=`
    #define RING_PI 3.141592653589793
    varying vec3 vRingPos;
    uniform vec3 uSunDir;
    uniform float uPlanetRadius;
    uniform vec2 uStops[${pp}];   // (u, r)
    uniform int uStopCount;
    uniform vec4 uEdgeA[${mp}];   // (radius, window, amplitude, kind: 1 resonance, 2 wake)
    uniform vec4 uEdgeB[${mp}];   // resonance: (m, -, -, moon angle); wake: (wavelength, damping, side, moon angle)
    uniform int uEdgeCount;
    uniform float uEdgeScale;                 // 1 = true size; more exaggerates (setRingWaveScale)
    uniform vec2 uCarves[${hp}];
    uniform int uCarveCount;
    uniform vec4 uChannels;                   // (radius, window, newest channel's angle, count; 0 = none)
    uniform float uChannelSpacing;            // radians
    uniform float uBandData;                  // 1: map is a band strip (red = dust, alpha = opacity)
    uniform vec3 uCameraLocal;                // the camera, in this frame (set each frame)

    // Henyey-Greenstein phase function relative to side lighting:
    // cosScatter 1 = light passing straight on to the camera (backlit)
    float dustPhase(float cosScatter) {
        float g = ${.6.toFixed(2)};
        float hg = (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * cosScatter, 1.5);
        float side = (1.0 - g * g) / pow(1.0 + g * g, 1.5);
        return hg / side;
    }

    float ringU(float r) {
        for (int i = 0; i < 7; i++) {
            if (i + 2 >= uStopCount || r <= uStops[i + 1].y) {
                return mix(uStops[i].x, uStops[i + 1].x, (r - uStops[i].y) / (uStops[i + 1].y - uStops[i].y));
            }
        }
        return uStops[0].x;
    }

    float edgeShift(float r, float theta) {
        float shift = 0.0;
        for (int i = 0; i < ${mp}; i++) {
            if (i >= uEdgeCount) break;
            vec4 a = uEdgeA[i];
            vec4 b = uEdgeB[i];
            float amplitude = a.z * uEdgeScale;
            // The window grows with the amplitude so the moved material
            // never folds over itself (shift changes slower than radius)
            float window = 1.0 - smoothstep(0.0, max(a.y, 2.0 * amplitude), abs(r - a.x));
            if (window <= 0.0 || amplitude == 0.0) continue;
            float psi = mod(theta - b.w + RING_PI, 2.0 * RING_PI) - RING_PI;  // from the moon, forwards
            float s = 0.0;
            if (a.w < 1.5) {
                s = -cos(b.x * psi);
            } else {
                float x = b.z * psi * a.x;  // downstream distance
                if (x > 0.0) s = exp(-x / b.y) * sin(2.0 * RING_PI * x / b.x);
            }
            shift += window * amplitude * s;
        }
        return shift;
    }
`;function bp(e,t,n){let i=e=>e/r,a=n.stops??[[0,n.km[0]],[1,n.km[1]]],o=n.edges??[],s=n.carve??[],c=(e,t,n)=>[...e,...Array.from({length:t-e.length},n)],l={uSunDir:{value:new J(1,0,0)},uPlanetRadius:{value:t},uStops:{value:c(a.map(([e,t])=>new q(e,i(t))),pp,()=>new q)},uStopCount:{value:a.length},uEdgeA:{value:c(o.map(e=>new Rn(i(e.km),i(e.windowKm),i(e.amplitudeKm),e.kind===`wake`?2:1)),mp,()=>new Rn)},uEdgeB:{value:c(o.map(e=>e.kind===`wake`?new Rn(i(e.wavelengthKm),i(e.dampingKm),e.side,0):new Rn(e.m,0,0,0)),mp,()=>new Rn)},uEdgeCount:{value:o.length},uEdgeScale:vp,uCarves:{value:c(s.map(([e,t])=>new q(i(e),i(t))),hp,()=>new q)},uCarveCount:{value:s.length},uChannels:{value:n.channels?new Rn(i(n.channels.km),i(n.channels.windowKm),0,n.channels.count):new Rn},uChannelSpacing:{value:(n.channels?.spacingDeg??1)*df},uBandData:{value:+!!n.bands},uCameraLocal:{value:new J}};return e.onBeforeCompile=e=>{Object.assign(e.uniforms,l),e.vertexShader=`varying vec3 vRingPos;
`+e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
    vRingPos = position;`),e.fragmentShader=yp+e.fragmentShader.replace(`#include <map_fragment>`,`
    float ringR = length(vRingPos.xy);
    float ringTheta = atan(vRingPos.y, vRingPos.x);
    float ringREff = ringR - edgeShift(ringR, ringTheta);
    #ifdef USE_MAP
        vec4 ringTexel = texture2D(map, vec2(ringU(ringREff), 0.5));
        if (uBandData > 0.5) {
            // Dust scatters forwards: faint lit from the front, glowing backlit
            vec3 toCamera = normalize(uCameraLocal - vRingPos);
            float boost = mix(1.0, dustPhase(dot(-uSunDir, toCamera)), ringTexel.r);
            diffuseColor.a *= min(1.0, ringTexel.a * boost);
        } else {
            diffuseColor *= ringTexel;
        }
    #endif
    float ringW = fwidth(ringR);
    for (int i = 0; i < ${hp}; i++) {
        if (i >= uCarveCount) break;
        diffuseColor.a *= 1.0 - smoothstep(uCarves[i].x - ringW, uCarves[i].x + ringW, ringREff)
            * (1.0 - smoothstep(uCarves[i].y - ringW, uCarves[i].y + ringW, ringREff));
    }
    if (uChannels.w > 0.0) {
        float chNear = 1.0 - smoothstep(0.0, uChannels.y, abs(ringR - uChannels.x));
        float chBack = mod(uChannels.z - ringTheta, 2.0 * RING_PI) / uChannelSpacing;  // channels behind the newest
        float chK = floor(chBack + 0.5);
        if (chNear > 0.0 && chK < uChannels.w) {
            float chD = abs(chBack - chK) * uChannelSpacing / ${(gp*df).toFixed(6)};
            float chAge = min(1.0, (chK + 1.0) / 2.0) * exp(-chK / 10.0);  // newest still opening, oldest fading
            diffuseColor.a *= 1.0 - ${_p.toFixed(2)} * chNear * chAge * exp(-chD * chD);
        }
    }
    float along = dot(vRingPos, uSunDir);
    float off = length(vRingPos - along * uSunDir);
    float shadow = along < 0.0 ? 1.0 - smoothstep(uPlanetRadius * 0.98, uPlanetRadius * 1.02, off) : 0.0;
    diffuseColor.rgb *= 1.0 - ${fp.toFixed(2)} * shadow;`)},l}function xp(e,t,n){let i=[];for(let t=0;t+1<e.length;t++){let[n,a]=e[t],[o,s]=e[t+1],c=a/r,l=s/r,u=new Ma(c,l,256),d=u.attributes.position,f=u.attributes.uv;for(let e=0;e<d.count;e++){let t=(Math.hypot(d.getX(e),d.getY(e))-c)/(l-c);f.setXY(e,n+t*(o-n),.5)}i.push(u)}let a=i.length>1?Ed(i):i[0];i.length>1&&i.forEach(e=>e.dispose());let o=new Zi(a,n),[s,c]=t;return o.quaternion.setFromUnitVectors(new J(0,0,1),new J(...y(s/15,c,1))),o}function Sp(e){return{id:`moon-${e.code}`,name:e.name,type:`moon`,parent:e.planet,diameter_km:e.radius_km?e.radius_km*2:null,orbit_days:k(e),orbit_radius_km:te(e).aKm,position:ce(e)}}function Cp(e,t,n,i,a=null){let o=new Map(t.bodies.map(e=>[e.id,e])),s=[],c=e=>(s.push(e),e);e.add(new Fo(16777215,Math.PI,0,0)),e.add(new Lo(16777215,.06));let l=new _r;e.add(l);let u=new bo,d=[],f=[],p=!1,m=(e,t,n=U)=>{u.load(qf(e),e=>{p?e.dispose():(e.colorSpace=n,d.push(e),t(e))})},h=(e,t,n)=>m(t,t=>{e.map=t,e.color.set(16777215),e.needsUpdate=!0,n?.(t)}),g={uSunDir:{value:new J(1,0,0)},uNightMap:{value:null},uCloudMap:{value:null},uCloudShift:{value:0}},y=null,b=(e,t,n,r,i)=>{e.onBeforeCompile=e=>{Object.assign(e.uniforms,g),e.vertexShader=`varying vec3 vWorldNormal;
`+e.vertexShader.replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
    vWorldNormal = normalize(mat3(modelMatrix) * objectNormal);`),e.fragmentShader=`
                varying vec3 vWorldNormal;
                uniform vec3 uSunDir;
                uniform sampler2D uNightMap;
                uniform sampler2D uCloudMap;
                uniform float uCloudShift;
            `+e.fragmentShader.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
                #ifdef USE_MAP
                    float sunHeight = dot(normalize(vWorldNormal), uSunDir);
                    float night = 1.0 - smoothstep(-0.12, 0.08, sunHeight);
                    float cloud = texture2D(uCloudMap, vec2(vMapUv.x - uCloudShift, vMapUv.y)).g;
                    totalEmissiveRadiance += texture2D(uNightMap, vMapUv).rgb * night
                        * (1.0 - ${Lf.toFixed(2)} * cloud) * ${If.toFixed(2)};
                #endif`)},i.push(()=>m(Ff.night,e=>{g.uNightMap.value=e}),()=>m(Ff.ocean,t=>{e.specularMap=t,e.specular.set(Rf),e.needsUpdate=!0},``));let a=new Ga({color:16777215,transparent:!0,opacity:0,depthWrite:!1});y=c(new Zi(new Na(r*Bf,64,32),a)),t.add(y),i.push(()=>m(Ff.clouds,e=>{a.alphaMap=e,a.opacity=.95,a.needsUpdate=!0,g.uCloudMap.value=e},``));let o=c(new Zi(new Na(r*Vf,64,32),new Ha({uniforms:{uSunDir:g.uSunDir},vertexShader:`
                    varying vec3 vNormalView;
                    varying vec3 vViewPos;
                    void main() {
                        vec4 mv = modelViewMatrix * vec4(position, 1.0);
                        vViewPos = mv.xyz;
                        vNormalView = normalize(normalMatrix * normal);
                        gl_Position = projectionMatrix * mv;
                    }
                `,fragmentShader:`
                    uniform vec3 uSunDir;
                    varying vec3 vNormalView;
                    varying vec3 vViewPos;
                    void main() {
                        vec3 n = normalize(vNormalView);
                        float rim = pow(1.0 - max(dot(n, normalize(-vViewPos)), 0.0), 3.0);
                        vec3 sun = normalize((viewMatrix * vec4(uSunDir, 0.0)).xyz);
                        float lit = smoothstep(-0.25, 0.35, dot(n, sun));
                        gl_FragColor = vec4(vec3(0.35, 0.6, 1.0) * rim * lit * 1.2, 1.0);
                    }
                `,transparent:!0,blending:2,depthWrite:!1})));n.add(o)},x={uEarthDir:{value:new J(1,0,0)},uEarthshine:{value:0}},S=(e,t,n)=>{e.onBeforeCompile=e=>{Object.assign(e.uniforms,x),e.fragmentShader=e.fragmentShader.replace(`#include <lights_lambert_pars_fragment>`,`
                #include <lights_lambert_pars_fragment>
                uniform vec3 uEarthDir;
                uniform float uEarthshine;
                // Lunar-Lambert: f = 2 L mu0 / (mu0 + mu) + (1 - L) mu0, with
                // L(phase angle) from McEwen's fit (degrees)
                void RE_Direct_Lunar(const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight) {
                    float mu0 = dot(geometryNormal, directLight.direction);
                    if (mu0 <= 0.0) return;
                    float mu = max(dot(geometryNormal, geometryViewDir), 0.0);
                    float a = degrees(acos(clamp(dot(directLight.direction, geometryViewDir), -1.0, 1.0)));
                    float L = clamp(1.0 + a * (-0.019 + a * (2.42e-4 - a * 1.46e-6)), 0.0, 1.0);
                    float f = 2.0 * L * mu0 / (mu0 + mu) + (1.0 - L) * mu0;
                    reflectedLight.directDiffuse += f * directLight.color * BRDF_Lambert(material.diffuseColor);
                }
                #undef RE_Direct
                #define RE_Direct RE_Direct_Lunar
            `).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
                vec3 earthView = normalize((viewMatrix * vec4(uEarthDir, 0.0)).xyz);
                reflectedLight.indirectDiffuse += uEarthshine * saturate(dot(normal, earthView)) * material.diffuseColor;
            `)},n.push(()=>m(t.normal,t=>{e.normalMap=t,e.normalScale.set(Uf,Uf),e.needsUpdate=!0},``))},w=[],O=(e,t,n,r,i,a,o)=>{let s=new zi({color:e.color??n,transparent:!0,side:2,depthWrite:!1}),l=bp(s,a,e);e.texture?(s.opacity=.55,r.push(()=>h(s,e.texture,e=>{e.anisotropy=Yf,s.opacity=1}))):(s.map=dp(e.bands,e.km),d.push(s.map));let u=e.stops??[[0,e.km[0]],[1,e.km[1]]],f=c(xp(u,t,s));return w.push({uniforms:l,strip:e,planetId:i,position:o,inverse:f.quaternion.clone().invert()}),f},j=({id:t,name:n,type:a,facts:o,radiusAu:s,color:l,isSun:u=!1,parentId:d=null,major:p=!0})=>{let m=t===`Earth`,g=u?new zi({color:l}):m?new Wa({color:l,specular:0,shininess:zf}):new Ga({color:l}),_=Pf[n]??null,v=_?[()=>h(g,_.file)]:[],y=new _r;e.add(y);let x=c(new Zi(new Na(s,64,32),g));y.add(x);let C=u?null:c(($d.has(t)?sp:op)(l,s,i,d!==null));C&&y.add(C),m&&b(g,x,y,s,v),t===`Moon`&&S(g,_,v);let w=Md[t],T=s;for(let e of w?.strips??[])y.add(O(e,w.pole,l,v,t,s,y.position)),e.texture&&(T=Math.max(T,e.stops.at(-1)[1]/r));return v.length&&f.push({position:y.position,extentAu:T,loads:v}),{id:t,name:n,type:a,facts:o,radiusAu:s,color:l,mesh:x,dot:C,position:y.position,parentId:d,major:p,surfaceMap:_}},ee=[`Sun`,...de,`Moon`].filter(e=>o.has(e)).map(e=>{let t=o.get(e);return j({id:e,name:t.name,type:t.type,facts:t,radiusAu:t.diameter_km/2/r,color:new Z(t.color).getHex(),isSun:e===`Sun`,parentId:t.parent??null})}),M=new Set(ee.map(e=>e.id)),P=[...ee],ne=(n?.moons??[]).filter(e=>M.has(e.planet));for(let e of ne.filter(e=>e.major)){let t=j({id:`moon-${e.code}`,name:e.name,type:`moon`,facts:Sp(e),radiusAu:(e.radius_km??_f)/r,color:new Z(wf[e.name]??Cf).getHex(),parentId:e.planet});t.moon=e,ee.push(t)}let ie=new Map;for(let e of ne.filter(e=>!e.major)){let t={id:`moon-${e.code}`,name:e.name,type:`moon`,facts:Sp(e),radiusAu:(e.radius_km??_f)/r,color:new Z(Cf).getHex(),mesh:null,dot:null,position:new J,parentId:e.planet,major:!1,moon:e};ee.push(t),ie.has(e.planet)||ie.set(e.planet,{moons:[]}),ie.get(e.planet).moons.push(t)}for(let t of ie.values()){t.cloud=c(cp(t.moons.length,i)),e.add(t.cloud);let n=t.moons.map(e=>te(e.moon).aKm/r).sort((e,t)=>e-t);t.spreadAu=n[Math.floor(n.length/2)],t.fade=0}let ae=[];for(let e of a?.named??[]){let t=e.type===`comet`||e.type===`interstellar`&&e.diameter_km===null,n=j({id:e.id,name:e.name,type:e.type,facts:{id:e.id,name:e.name,type:e.type},radiusAu:(e.diameter_km?e.diameter_km/2:vf)/r,color:new Z(t?xf:Sf.has(e.type)?bf:yf).getHex()});n.smallBody=e,n.isComet=t,ee.push(n),ae.push(n)}let F=!0,oe=new Set,ce=e=>e.smallBody.group?`${e.smallBody.group}:${e.smallBody.subgroup}`:`comet:once`;function fe(e){return!e.smallBody||F&&!oe.has(ce(e))}function I(){for(let e of ae)e.mesh.parent.visible=fe(e);for(let e of ge)e.body&&(e.line.visible=e.sampledAt!==null&&fe(e.body))}let pe=ae.filter(e=>e.smallBody.spin),L=new Map(ee.map(e=>[e.id,e])),me=ee.filter(e=>e.parentId&&e.id!==`Moon`),he=me.filter(e=>e.mesh&&!Gf.has(e.name)),ge=[],_e={planets:new _r,moons:new _r,smallBodies:new _r};l.add(...Object.values(_e));let ve=new Map,ye=e=>{if(!ve.has(e)){let t=new _r;_e.moons.add(t),ve.set(e,t)}return ve.get(e)},R=({sample:e,periodDays:t,color:n,opacity:r,parent:i=_e.planets,segments:a,closed:o=!0,everyFrame:s=!1,bodyAt:c=null,body:l=null})=>{let u=c?a+1:a,d=lp(new Float32Array(u*3),n,r,o);d.frustumCulled=!1,d.visible=!1,i.add(d);let f={line:d,sample:e,periodDays:t,segments:a,everyFrame:s,bodyAt:c,body:l,sampledAt:null,loop:null,origin:null};return ge.push(f),f},be=(e,t)=>{let n=e.sample(t),r=n.length/6|0;if(e.loop=n,e.origin=[n[r*3],n[r*3+1],n[r*3+2]],e.line.position.set(...e.origin),e.line.visible=!e.body||fe(e.body),e.sampledAt=t.getTime(),e.bodyAt){xe(e,t);return}let[i,a,o]=e.origin,s=e.line.geometry.attributes.position.array;for(let e=0;e<n.length;e+=3)s[e]=n[e]-i,s[e+1]=n[e+1]-a,s[e+2]=n[e+2]-o;e.line.geometry.attributes.position.needsUpdate=!0},xe=(e,t)=>{let{loop:n,segments:r,origin:[i,a,o]}=e,s=e.periodDays*864e5/2,c=Math.cbrt((t.getTime()-e.sampledAt)/s),l=bn.clamp(Math.floor((c+1)*r/2),0,r-1),u=e.bodyAt(),d=e.line.geometry.attributes.position.array,f=0;for(let e=0;e<r;e++)d[f++]=n[e*3]-i,d[f++]=n[e*3+1]-a,d[f++]=n[e*3+2]-o,e===l&&(d[f++]=u.x-i,d[f++]=u.y-a,d[f++]=u.z-o);e.line.geometry.attributes.position.needsUpdate=!0},Se=new J,Ce=e=>()=>Se.subVectors(e.position,L.get(e.parentId).position),we=(e,t)=>R({sample:t=>A(e.moon,t),periodDays:k(e.moon),color:e.color,opacity:t,parent:ye(e.parentId),segments:256,bodyAt:Ce(e)});for(let e of de){let t=L.get(e);t&&R({sample:t=>le(e,t),periodDays:v(e),color:t.color,segments:512,bodyAt:()=>t.position,parent:t.type===`dwarf planet`?_e.smallBodies:_e.planets})}L.has(`Moon`)&&R({sample:e=>_(e),periodDays:v(`Moon`),color:L.get(`Moon`).color,parent:ye(`Earth`),segments:512,bodyAt:Ce(L.get(`Moon`))});for(let e of me.filter(e=>e.major))we(e);let Te=(e,t)=>R({sample:t=>E(e.smallBody,t,512),periodDays:N(e.smallBody),color:e.color,opacity:t,parent:_e.smallBodies,segments:513,closed:!1,everyFrame:!0,body:e});for(let e of ae.filter(e=>e.type===`dwarf planet`))Te(e);let z=null,Ee=e=>{let t=e.getTime();for(let n of ge)n.everyFrame&&n.sampledAt!==t&&be(n,e);let n=ge.filter(e=>!e.everyFrame).map(e=>({o:e,age:e.sampledAt===null?1/0:Math.abs(t-e.sampledAt)/(e.periodDays*864e5*pf)})).filter(e=>e.age>=1).sort((e,t)=>t.age-e.age),r=performance.now(),i=new Set;for(let{o:t}of n)if(be(t,e),i.add(t),z!==null&&performance.now()-r>mf)break;for(let n of ge)n.bodyAt&&n.loop&&!i.has(n)&&n.sampledAt!==t&&xe(n,e)},De=[],Oe=e=>{if(e!==De.length>0){if(e)De=ae.filter(e=>e.isComet).map(e=>{let t=Te(e,.5);return z&&be(t,z),t});else{for(let e of De)ge.splice(ge.indexOf(e),1),up(e.line);De=[]}Je()}},ke=null,Ae=null,je=null,B=t=>{if(Ae&&=(ge.splice(ge.indexOf(Ae),1),up(Ae.line),null),je){let{mesh:t,dot:n}=je;e.remove(t),Ue.splice(Ue.indexOf(n.material),1),[t,n].forEach(e=>{e.geometry.dispose(),e.material.dispose()}),je=null}ke=t;let n=t&&L.get(t);if(n?.smallBody&&n.type!==`dwarf planet`&&(Ae=Te(n,.6),z&&be(Ae,z),Je()),n&&n.moon&&!n.major){Ae=we(n,.6),z&&be(Ae,z),Je();let t=new Zi(new Na(n.radiusAu,24,12),new Ga({color:n.color})),r=op(n.color,n.radiusAu,i,!0),a=r.material.uniforms;a.uFade.value=Ke,a.uViewportHeight.value=qe,t.add(r),e.add(t),Ue.push(r.material),je={body:n,mesh:t,dot:r},V()}};function V(){if(!je)return;let{body:e,mesh:t,dot:n}=je;t.position.copy(e.position),n.material.uniforms.uParentOffset.value.subVectors(L.get(e.parentId).position,e.position)}let Me=new J,Ne=new Un,Pe=new J,Fe=new J,Ie=new J,Le=new J,Re=new J,ze=new Map(ee.filter(e=>e.moon).map(e=>[`${e.parentId}/${e.name}`,e])),Be=new J,Ve=(e,t)=>(Be.copy(t).applyQuaternion(e.inverse),Math.atan2(Be.y,Be.x)),He=e=>{for(let t of w){let n=t.uniforms;n.uSunDir.value.copy(t.position).negate().normalize().applyQuaternion(t.inverse),(t.strip.edges??[]).forEach((i,a)=>{let o=ze.get(`${t.planetId}/${i.moon}`),s=o&&(!i.active||i.active(e));n.uEdgeA.value[a].z=s?i.amplitudeKm/r:0,o&&(n.uEdgeB.value[a].w=Ve(t,Le.subVectors(o.position,t.position)))});let i=t.strip.channels,a=i&&ze.get(`${t.planetId}/${i.moon}`);if(a){let r=a.moon,o=((re(r,e)-180)%360+360)%360/r.n,s=C(r,new Date(e.getTime()-o*864e5)),c=r.n*(1-i.spacingDeg/360);n.uChannels.value.z=Ve(t,Be.set(s[0],s[1],s[2]))+c*o*df}else i&&(n.uChannels.value.w=0)}},H=e=>{for(let t of ee)t.id===`Sun`||t.moon||t.smallBody||t.position.set(...ue(t.id,e));for(let t of ae)t.position.set(...se(t.smallBody,e));if(L.has(`Earth`)&&g.uSunDir.value.copy(L.get(`Earth`).position).negate().normalize(),y){let t=e.getTime()/864e5*Hf/360,n=t-Math.floor(t);y.rotation.y=n*2*Math.PI,g.uCloudShift.value=n}for(let t of[...P,...pe]){let{pole:n,meridian:r}=t.smallBody?D(t.smallBody.spin,e):T(t.id,e);Pe.set(...r),Fe.set(...n),Ie.crossVectors(Pe,Fe),t.mesh.quaternion.setFromRotationMatrix(Ne.makeBasis(Pe,Fe,Ie))}for(let t of me){let n=L.get(t.parentId).position,r=C(t.moon,e);t.position.set(r[0],r[1],r[2]).add(n),t.dot&&t.dot.material.uniforms.uParentOffset.value.set(-r[0],-r[1],-r[2])}let t=new Date(e.getTime()+Kf);for(let e of he){Le.subVectors(e.position,L.get(e.parentId).position);let n=C(e.moon,t);Re.set(n[0],n[1],n[2]).sub(Le),Fe.crossVectors(Le,Re).normalize(),e.parentId!==`Pluto`&&Fe.dot(Xf)<0&&Fe.negate(),Pe.copy(Le).negate().normalize(),Ie.crossVectors(Pe,Fe),e.mesh.quaternion.setFromRotationMatrix(Ne.makeBasis(Pe,Fe,Ie))}if(He(e),L.has(`Moon`)&&L.has(`Earth`)){let e=L.get(`Earth`).position;Me.subVectors(e,L.get(`Moon`).position),L.get(`Moon`).dot.material.uniforms.uParentOffset.value.copy(Me),x.uEarthDir.value.copy(Me).normalize();let t=Re.copy(e).negate().angleTo(Le.copy(Me).negate());x.uEarthshine.value=Wf*(Math.sin(t)+(Math.PI-t)*Math.cos(t))/Math.PI}for(let[e,{cloud:t,moons:n}]of ie){let r=L.get(e).position;t.position.copy(r);let i=t.geometry.attributes.position.array;n.forEach((e,t)=>{let n=e.id===ke;i[t*3]=n?0:e.position.x-r.x,i[t*3+1]=n?0:e.position.y-r.y,i[t*3+2]=n?0:e.position.z-r.z}),t.geometry.attributes.position.needsUpdate=!0}V(),Ee(e),z===null&&Je(),z=e;for(let[e,t]of ve)t.position.copy(L.get(e).position)},Ue=[...ee.filter(e=>e.dot).map(e=>e.dot.material),...[...ie.values()].map(e=>e.cloud.material)],We=ee.filter(e=>e.dot&&$d.has(e.id)),Ge=!0,Ke=1,qe=1;function Je(){l.visible=Ke>0,ge.forEach(({line:e})=>{e.material.opacity=e.userData.baseOpacity*Ke})}return{bodies:ee,byId:L,isShown:fe,partKey:e=>e.smallBody?ce(e):null,setHiddenParts:e=>{oe=new Set(e),I()},setCometOrbits:Oe,update:H,setShowSmallBodies:e=>{F=e,I()},fadeForDistance:e=>1-bn.smoothstep(Math.log10(Math.max(e,1e-9)),Math.log10(af),Math.log10(of)),setFade:e=>{e!==Ke&&(Ke=e,Ue.forEach(t=>{t.uniforms.uFade.value=e}),Je())},setShowOrbits:e=>{for(let[t,n]of Object.entries(_e))n.visible=!!e[t]},updateTextures:(e,t,n)=>{if(!f.length)return;let r=t/2/Math.tan(n*df/2);for(let t=f.length-1;t>=0;t--){let n=f[t];n.extentAu/Math.max(e.distanceTo(n.position),1e-12)*r<lf||(n.loads.forEach(e=>e()),f.splice(t,1))}},updateMinorMoonFade:(e,t,n)=>{let r=t/2/Math.tan(n*df/2);for(let[t,n]of ie){let i=e.distanceTo(L.get(t).position),a=n.spreadAu/Math.max(i,1e-12)*r;n.fade=Ge?bn.smoothstep(a,gf[0],gf[1]):0,n.cloud.material.uniforms.uCloudFade.value=n.fade,n.cloud.visible=n.fade>0}},minorMoonFade:e=>ie.get(e)?.fade??0,setShowMinorMoons:e=>{Ge=e},setRingWaveScale:e=>{vp.value=e},updateRingView:e=>{for(let t of w)t.uniforms.uCameraLocal.value.subVectors(e,t.position).applyQuaternion(t.inverse)},updateBrightness:e=>{for(let t of We){let n=rf(t.id,t.position,e);t.dot.material.uniforms.uMag.value=Math.max(n,cf)}},setGlare:(e,t)=>{for(let n of We)n.dot.material.uniforms.uGlare.value=e,n.dot.material.uniforms.uGlareMag.value=t},setHighlightOrbit:e=>{e!==ke&&B(e)},setViewportHeight:e=>{qe=e,Ue.forEach(t=>{t.uniforms.uViewportHeight.value=e})},dispose:()=>{p=!0,d.forEach(e=>e.dispose()),B(null),ge.forEach(({line:e})=>up(e)),s.forEach(e=>{e.geometry.dispose(),e.material.dispose()})}}}var wp={main:`#b9a98f`,hilda:`#e6a04f`,trojan:`#7fc97f`,neo:`#ff6b6b`,centaur:`#c792ea`,tno:`#7aa2f7`,comet:`#67e8f9`,other:`#9ca3af`},Tp=[{sizePx:2,alpha:.55},{sizePx:1.5,alpha:.22}],Ep={main:2.7,hilda:4,trojan:5.2,neo:1.5,centaur:15,tno:43,comet:5,other:3},Dp=2,Op=.008,kp=2*Math.PI/4332.59,Ap={trojan:1,hilda:1.5},jp=6,Mp=8,Np=.3,Pp=`
    #define TWO_PI 6.283185307179586
    // position (three.js declares it): ln a, e, i (0..1 over their ranges).
    // Named so attribute 0 is always bound (some drivers are slow without).
    attribute vec3 elementsB;  // node, w, M at epoch (0..1 of a turn)
    attribute float aPart;     // part of its group (small_bodies.json subgroup_ids), 255 none
    uniform float uPartHidden[${Mp}];  // 1: that part is switched off
    uniform vec2 uLogA;        // ln a range (AU)
    uniform float uDays;       // days since the elements' epoch
    uniform float uSize;
    uniform float uMeanMotion; // rad/day; 0: its own (Kepler's third law)
    uniform float uAlpha;
    uniform float uDim;
    // Integer hash of the point's index -> 0..1
    float pointHash() {
        uint x = uint(gl_VertexID);
        x ^= x >> 16; x *= 0x7feb352du;
        x ^= x >> 15; x *= 0x846ca68bu;
        x ^= x >> 16;
        return float(x) / 4294967296.0;
    }
    void main() {
        bool thinned = pointHash() * ${Op} >= uAlpha * uDim;  // see MIN_ALPHA
        if (thinned || (aPart < ${Mp}.0 && uPartHidden[int(aPart)] > 0.5)) {
            gl_PointSize = 0.0;
            gl_Position = vec4(2.0, 2.0, 2.0, 1.0);  // outside the view
            return;
        }
        float a = exp(mix(uLogA.x, uLogA.y, position.x));
        float e = position.y;
        float inc = position.z * 3.141592653589793;
        float node = elementsB.x * TWO_PI;
        float w = elementsB.y * TWO_PI;
        float n = uMeanMotion > 0.0 ? uMeanMotion : ${oe} / (a * sqrt(a));
        float M = mod(elementsB.z * TWO_PI + n * uDays, TWO_PI);

        // Kepler's equation M = E - e sin E (Newton)
        float E = e < 0.8 ? M : 3.141592653589793;
        for (int k = 0; k < 20; k++) {
            float dE = (E - e * sin(E) - M) / (1.0 - e * cos(E));
            E -= dE;
            if (abs(dE) < 1e-6) break;
        }
        float px = a * (cos(E) - e);
        float py = a * sqrt(1.0 - e * e) * sin(E);

        // Orbit plane -> ecliptic: turn by w, tilt by i, turn by node
        float cw = cos(w), sw = sin(w), ci = cos(inc), si = sin(inc), cn = cos(node), sn = sin(node);
        float x1 = cw * px - sw * py;
        float y1 = sw * px + cw * py;
        float y2 = ci * y1;
        float x = cn * x1 - sn * y2;
        float y = sn * x1 + cn * y2;
        float z = si * y1;
        // Ecliptic -> equator, then the scene frame (north = +Y)
        float ce = ${Math.cos(P).toFixed(9)}, se = ${Math.sin(P).toFixed(9)};
        vec3 scenePos = vec3(x, se * y + ce * z, -(ce * y - se * z));

        gl_PointSize = uSize;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(scenePos, 1.0);
    }
`,Fp=`
    uniform vec3 uColor;
    uniform float uAlpha;
    uniform float uDim;
    uniform float uFade;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float alpha = (1.0 - smoothstep(0.6, 1.0, r)) * max(uAlpha * uDim, ${Op}) * uFade;
        if (alpha < 0.001) discard;
        vec3 color = pow(uColor, vec3(2.2));  // sRGB tint -> linear, like the planet dots
        gl_FragColor = vec4(color, alpha);
    }
`,Ip=Math.cos(P),Lp=Math.sin(P);function Rp(e,t,n){let r=t*jp;return{a:Math.exp(n[0]+(n[1]-n[0])*e[r]/65535),e:e[r+1]/65535,inc:e[r+2]/65535*Math.PI,node:e[r+3]/65535*2*Math.PI,w:e[r+4]/65535*2*Math.PI,M0:e[r+5]/65535*2*Math.PI}}function zp(e,t,n,r){let i=e.a*(Math.cos(t)-e.e),a=e.a*Math.sqrt(1-e.e*e.e)*Math.sin(t),o=Math.cos(e.w),s=Math.sin(e.w),c=Math.cos(e.inc),l=Math.sin(e.inc),u=Math.cos(e.node),d=Math.sin(e.node),f=o*i-s*a,p=s*i+o*a,m=c*p,h=u*f-d*m,g=d*f+u*m,_=l*p;n[r]=h,n[r+1]=Lp*g+Ip*_,n[r+2]=-(Ip*g-Lp*_)}function Bp(e,t,n,r,i,a,o){let s=Rp(e,t,n),c=r||.01720209895/(s.a*Math.sqrt(s.a)),l=((s.M0+c*i)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);zp(s,O(l,s.e),a,o)}var Vp=64,Hp=.1,Up=(e,t)=>Math.min(1,Dp*Ep[e]/Math.max(t,1e-9)),Wp=[{id:`jupiter`,name:`Jupiter-family`,maxYears:20,color:`#67e8f9`},{id:`halley`,name:`Halley-type`,maxYears:200,color:`#c4b5fd`},{id:`long`,name:`Long-period`,maxYears:1/0,color:`#fbbf24`}];function Gp(e){return e===`comet`?Wp.map((e,t)=>({sub:e.id,color:e.color,test:n=>{let r=n.a**1.5;return r<e.maxYears&&(t===0||r>=Wp[t-1].maxYears)}})):[{sub:``,color:wp[e],test:()=>!0}]}function Kp(e,t,n){let r=new _r;e.add(r);let i=t.encoding.ranges[t.encoding.fields.indexOf(`log_a`)],a={uLogA:{value:new q(i[0],i[1])},uDays:{value:0},uFade:{value:1}},o=[],s=new Set,c=new Set,l=new Set,u=new Set,d=new Map(t.groups.map(({id:e})=>[e,{value:Array(Mp).fill(0)}])),f=null,p=()=>{for(let e of o)e.points.visible=!s.has(e.groupId)&&!c.has(e.tier);for(let[e,t]of f??[])for(let{sub:n,lines:r}of t)r.visible=l.has(e)&&!s.has(e)&&!u.has(`${e}:${n}`)},m=null,h=null,g=null,_=()=>{let e=a.uDays.value;if(g?.days===e)return g.positions;let n=g?.positions??new Float32Array(t.tiers[0].count*3),r=0;return t.groups.forEach(({id:a},o)=>{let s=t.tiers[0].group_counts[o],c=(Ap[a]??0)*kp;for(let t=r;t<r+s;t++)Bp(m,t,i,c,e,n,t*3);r+=s}),g={days:e,positions:n},n},v=new Un,y=(e,n,i,o,c,l)=>{if(!m||!r.visible||a.uFade.value<Np)return null;let u=_();v.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse);let f=v.elements,p=null,g=l,y=0;return t.groups.forEach(({id:e},r)=>{let a=t.tiers[0].group_counts[r];if(!s.has(e)){let t=d.get(e).value;for(let r=y;r<y+a;r++){if(h[r]<Mp&&t[h[r]])continue;let a=u[r*3],s=u[r*3+1],l=u[r*3+2],d=f[3]*a+f[7]*s+f[11]*l+f[15];if(d<=0)continue;let m=((f[0]*a+f[4]*s+f[8]*l+f[12])/d+1)/2*n,_=(1-(f[1]*a+f[5]*s+f[9]*l+f[13])/d)/2*i,v=Math.hypot(m-o,_-c);v<g&&(g=v,p={index:r,groupId:e})}}y+=a}),p&&(p.position=Array.from(u.subarray(p.index*3,p.index*3+3))),p};f=new Map;let b=1,x=0,S=e=>Hp*b*Up(e,x),C=()=>{for(let[e,t]of f)t.forEach(({lines:t})=>{t.material.opacity=S(e)})},T=e=>{let n=t.groups.findIndex(t=>t.id===e),a=t.tiers[0].group_counts.slice(0,n).reduce((e,t)=>e+t,0),o=t.tiers[0].group_counts[n],s=new Float64Array(3),c=new Float64Array(3),l=Gp(e).map(e=>({...e,positions:[]}));for(let e=a;e<a+o;e++){let t=Rp(m,e,i),n=l.find(e=>e.test(t)).positions;zp(t,0,s,0);for(let e=1;e<=Vp;e++)zp(t,2*Math.PI*e/Vp,c,0),n.push(s[0],s[1],s[2],c[0],c[1],c[2]),s.set(c)}f.set(e,l.map(({sub:t,color:n,positions:i})=>{let a=new wi;a.setAttribute(`position`,new li(new Float32Array(i),3));let o=new _a(a,new aa({color:n,transparent:!0,opacity:S(e),depthWrite:!1,blending:2}));return o.frustumCulled=!1,r.add(o),{sub:t,lines:o}}))};return{addTier:(e,i,s)=>{if(o.some(t=>t.tier===e))return;e===0&&(m=i,h=s);let{group_counts:c}=t.tiers[e],l=Tp[e],u=0;t.groups.forEach(({id:t},f)=>{let p=c[f];if(!p)return;let m=i.subarray(u*jp,(u+p)*jp),h=s.subarray(u,u+p);u+=p;let g=new Ti(m,jp),_=new wi;_.setAttribute(`position`,new Di(g,3,0,!0)),_.setAttribute(`elementsB`,new Di(g,3,3,!0)),_.setAttribute(`aPart`,new li(h,1));let v=new wa(_,new Ha({uniforms:{...a,uSize:{value:l.sizePx*n},uAlpha:{value:l.alpha},uDim:{value:1},uMeanMotion:{value:(Ap[t]??0)*kp},uPartHidden:d.get(t),uColor:{value:new Z().setHex(new Z(wp[t]).getHex(),jt)}},vertexShader:Pp,fragmentShader:Fp,transparent:!0,depthWrite:!1,blending:2}));v.frustumCulled=!1,r.add(v),o.push({points:v,tier:e,groupId:t})}),p()},hasTier:e=>o.some(t=>t.tier===e),update:e=>{a.uDays.value=w(e)-t.epoch_jd},setFade:e=>{a.uFade.value=e,b=e,C()},setCameraDistance:e=>{for(let{points:t,groupId:n}of o){let r=Dp*Ep[n]/Math.max(e,1e-9);t.material.uniforms.uDim.value=Math.min(1,r*r)}x=e,C()},setVisible:e=>{r.visible=e},setGroupVisible:(e,t)=>{t?s.delete(e):s.add(e),p()},setTierVisible:(e,t)=>{t?c.delete(e):c.add(e),p()},pick:y,setGroupOrbits:(e,t)=>{t?l.add(e):l.delete(e),t&&!f.has(e)&&m&&T(e),p()},setPartVisible:(e,n,r)=>{let i=t.subgroup_ids?.[e]?.indexOf(n)??-1;i<0||(r?u.delete(`${e}:${n}`):u.add(`${e}:${n}`),d.get(e).value[i]=+!r,p())},dispose:()=>{for(let e of f.values())for(let{lines:t}of e)t.geometry.dispose(),t.material.dispose();e.remove(r);for(let{points:e}of o)e.geometry.dispose(),e.material.dispose()}}}var qp=2e3,Jp=2e4,Yp=1e5,Xp=2e4,Zp=.3,Qp=[.02,.1],$p=[20,60],em=10466520,tm=1.6,nm=.35,rm=23.4392911*Math.PI/180;function im(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function am(){let e=im(1987),t=new Float32Array(Xp*3),n=-.5,r=qp**n,a=Yp**n,o=Math.cos(rm),s=Math.sin(rm);for(let c=0;c<Xp;c++){let l=(r+(a-r)*e())**(1/n),u=2*e()-1,d=2*Math.PI*e(),f=Math.sqrt(1-u*u),p=l<Jp?Zp+.7*(l-qp)/18e3:1,m=f*Math.cos(d),h=f*Math.sin(d),g=u*p,_=Math.hypot(m,h,g);m/=_,h/=_,g/=_;let v=o*h-s*g,y=s*h+o*g,b=l/i;t.set([m*b,y*b,-v*b],c*3)}return t}var om=`
    uniform float uSize;
    void main() {
        gl_PointSize = uSize;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,sm=`
    uniform vec3 uColor;
    uniform float uAlpha;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float alpha = (1.0 - smoothstep(0.5, 1.0, r)) * uAlpha;
        if (alpha < 0.004) discard;
        gl_FragColor = vec4(uColor, alpha);
    }
`;function cm(e,t){let n=new wi;n.setAttribute(`position`,new li(am(),3));let r=new Ha({uniforms:{uSize:{value:tm*t},uAlpha:{value:0},uColor:{value:new Z().setHex(em,jt)}},vertexShader:om,fragmentShader:sm,transparent:!0,depthWrite:!1,blending:2}),i=new wa(n,r);i.frustumCulled=!1,e.add(i);let a=!0,o=0;return{update:e=>{o=bn.smoothstep(e,...Qp)*(1-bn.smoothstep(e,...$p)),r.uniforms.uAlpha.value=nm*o,i.visible=a&&o>0},fade:()=>a?o:0,setVisible:e=>{a=e},dispose:()=>{e.remove(i),n.dispose(),r.dispose()}}}var lm=(()=>{let e=Jp/i;return[0,Math.cos(rm)*e,Math.sin(rm)*e]})(),um=[2e3,12e3],dm=1e3,fm={thin:36e4,thick:3e4,bulge:7e4,bar:6e4,arms:26e4,hii:1400},pm=.35,mm=24,hm=22,gm=.35,_m=.5,vm=5e3,ym=.06,bm=.04,xm=.06,Sm={major:1,local:.7,bar:.5,spur:.35},Cm=.7,wm=.8,Tm={thin:[16771012,.1],thick:[16767400,.06],bulge:[16765066,.06],bar:[16766106,.05],arms:[12374783,.05],clumps:[13951743,.07],hii:[16740252,.18]},Em={thin:1.6,arms:1.8,clumps:2.2,hii:2.6},Dm=6220500,Om=8,km=.35,Am=.25,jm=[1e3,3e3],Mm=4e3,Nm=.4,Pm=`
    attribute vec3 color;
    attribute float size;
    uniform float uPixelRatio;
    varying vec3 vColor;
    void main() {
        vColor = color;
        gl_PointSize = size * uPixelRatio;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,Fm=`
    uniform float uFade;
    varying vec3 vColor;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float a = 1.0 - smoothstep(0.3, 1.0, r);
        if (a <= 0.0) discard;
        gl_FragColor = vec4(vColor * uFade, a);
    }
`,Im=`
    attribute float group;
    uniform float uPixelRatio;
    uniform float uHighlight;
    uniform float uDimmed;
    varying float vBright;
    void main() {
        vBright = uHighlight < 0.0 || abs(group - uHighlight) < 0.5 ? 1.0 : uDimmed;
        gl_PointSize = ${Om.toFixed(1)} * uPixelRatio;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,Lm=`
    uniform vec3 uColor;
    uniform float uFade;
    varying float vBright;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float ring = smoothstep(0.45, 0.6, r) * (1.0 - smoothstep(0.85, 1.0, r));
        float a = ring * uFade * vBright;
        if (a < 0.01) discard;
        gl_FragColor = vec4(uColor, a);
    }
`,Rm=`
    attribute float group;
    uniform float uHighlight;
    uniform float uDimmed;
    varying float vBright;
    void main() {
        vBright = uHighlight < 0.0 || abs(group - uHighlight) < 0.5 ? 1.0 : uDimmed;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,zm=`
    uniform vec3 uColor;
    uniform float uOpacity;
    varying float vBright;
    void main() {
        gl_FragColor = vec4(uColor, uOpacity * vBright);
    }
`,Bm=bn.smoothstep;function Vm(e){return e.map(e=>{let t=e.xy_kpc,n=t.length/2,r=new Float64Array(n);for(let e=1;e<n;e++)r[e]=r[e-1]+Math.hypot(t[2*e]-t[2*e-2],t[2*e+1]-t[2*e-1]);return{...e,n,cum:r,length:r[n-1]}})}function Hm(e,t,n){let{cum:r,n:i}=e,a=e.xy_kpc,o=0,s=i-1;for(;s-o>1;){let e=o+s>>1;r[e]<=t?o=e:s=e}let c=r[s]-r[o]||1,l=(t-r[o])/c,u=a[2*o],d=a[2*o+1],f=a[2*s],p=a[2*s+1];n.x=u+(f-u)*l,n.y=d+(p-d)*l;let m=-(p-d),h=f-u,g=Math.hypot(m,h)||1;m/=g,h/=g,m*n.x+h*n.y>0&&(m=-m,h=-h),n.nx=m,n.ny=h,n.w=e.width_kpc[o]+(e.width_kpc[s]-e.width_kpc[o])*l,n.endFade=Bm(t,0,xm*e.length)*Bm(e.length-t,0,xm*e.length)}function Um(e,t){let n=im(2019),r=()=>{let e=Math.max(n(),1e-12);return Math.sqrt(-2*Math.log(e))*Math.cos(2*Math.PI*n())},i=e=>(n()<.5?-1:1)*-e*Math.log(Math.max(n(),1e-12)),a=e=>Math.round(fm[e]*(t?pm:1)),o={pos:[],col:[],size:[]},s=new Z,c=t?1/pm:1,l=(e,t,n,r,i)=>{let a=Tm[r][0],l=Tm[r][1]*(r===`hii`?1:c);s.setHex(a,jt),o.pos.push(e,t,n),o.col.push(s.r*l,s.g*l,s.b*l),o.size.push(Em[i]??Em.thin)},u=(e,t,r,a)=>{for(let o=0;o<e;o++){let e=-t*Math.log(Math.max(n()*n(),1e-12));if(e>hm){o--;continue}let s=2*Math.PI*n();l(e*Math.cos(s),e*Math.sin(s),i(r),a,`thin`)}},d=e.disc;u(a(`thin`),d.thin_scale_length_kpc,d.thin_scale_height_pc/1e3,`thin`),u(a(`thick`),d.thick_scale_length_kpc,d.thick_scale_height_pc/1e3,`thick`);let f=e.bar,p=bn.degToRad(f.angle_deg),m=-Math.cos(p),h=Math.sin(p),g=-h,_=m,[v,y,b]=f.bulge_axis_ratio.map(e=>e/f.bulge_axis_ratio[0]*1);for(let e=0,t=a(`bulge`);e<t;e++){let e=-Math.log(Math.max(n()*n()*n(),1e-12)),t=2*n()-1,r=2*Math.PI*n(),i=Math.sqrt(1-t*t),a=e*i*Math.cos(r)*v,o=e*i*Math.sin(r)*y;l(a*m+o*g,a*h+o*_,e*t*b,`bulge`,`thin`)}let x=f.half_length_kpc,S=f.long_bar_scale_height_pc.thin/1e3,C=f.long_bar_scale_height_pc.super_thin/1e3;for(let e=0,t=a(`bar`);e<t;e++){let t=(2*n()-1)*x,a=Math.abs(t)/x;if(n()>1-Bm(a,.8,1)){e--;continue}let o=r()*gm*(1-.5*a),s=i(n()<.4*a?C:S);l(t*m+o*g,t*h+o*_,s,`bar`,`thin`)}let w=Vm(e.arms),T=e.arm_sigma_z,E=e=>(T.inner_pc+T.pc_per_kpc*Math.max(e-T.from_kpc,0))/1e3,D=w.map(e=>e.length*Sm[e.kind]),O=D.reduce((e,t)=>e+t,0),k=e=>{for(;;){let t=n()*O,r=0;for(;t>D[r]&&r<w.length-1;)t-=D[r++];if(!e||w[r].kind===`major`)return w[r]}},A={},j=(e,t=1)=>{Hm(e,n()*e.length,A);let i=Math.hypot(A.x,A.y),a=A.endFade*Math.exp(-Math.max(i-11,0)/3);if(n()>a)return null;let o=r()*A.w*t;return{x:A.x+A.nx*o,y:A.y+A.ny*o,z:r()*E(i),R:i,nx:A.nx,ny:A.ny,w:A.w}},ee=[];for(;ee.length<vm;){let e=j(k(!1));e&&ee.push(e)}for(let e=0,t=a(`arms`);e<t;e++){if(n()<_m){let e=ee[Math.floor(n()*ee.length)];l(e.x+r()*ym,e.y+r()*ym,e.z+r()*ym*.5,`clumps`,`clumps`);continue}let t=j(k(!1));t?l(t.x,t.y,t.z,`arms`,`arms`):e--}for(let e=0,t=a(`hii`);e<t;e++){let t=j(k(!0),.5);if(!t)e--;else for(let e=0;e<mm;e++)l(t.x+r()*bm,t.y+r()*bm,t.z+r()*bm*.5,`hii`,`hii`)}return{stars:o,arms:w}}function Wm(e){let t=e.matrix,n=e.offset_ly;return new Un().set(t[0][0],t[0][1],t[0][2],n[0],t[1][0],t[1][1],t[1][2],n[1],t[2][0],t[2][1],t[2][2],n[2],0,0,0,1)}var Gm={"Norma-Outer":`Norma–Outer Arm`,"Scutum-Centaurus-OSC":`Scutum–Centaurus Arm`,"Sagittarius-Carina":`Sagittarius–Carina Arm`,Perseus:`Perseus Arm`,Local:`Local (Orion) Arm`},Km=`Galactic Centre (Sgr A*)`,qm=[{id:`milky_way`,label:`Milky Way`,sublabel:`Our galaxy (model)`,terms:[`galaxy`,`our galaxy`,`the galaxy`]},{id:`centre`,label:`Galactic Centre`,sublabel:`Sagittarius A*, a supermassive black hole`,terms:[`galactic center`,`sgr a*`,`sgr a`,`sagittarius a*`,`sagittarius a`,`black hole`,`centre of the galaxy`]},{id:`Local`,label:Gm.Local,sublabel:`The Sun's arm`,terms:[`orion arm`,`orion spur`,`local arm`,`orion-cygnus arm`]},{id:`Perseus`,label:Gm.Perseus,sublabel:`Spiral arm`,terms:[`perseus arm`]},{id:`Sagittarius-Carina`,label:Gm[`Sagittarius-Carina`],sublabel:`Spiral arm`,terms:[`sagittarius arm`,`carina arm`]},{id:`Scutum-Centaurus-OSC`,label:Gm[`Scutum-Centaurus-OSC`],sublabel:`Spiral arm`,terms:[`scutum arm`,`centaurus arm`,`scutum-crux arm`,`outer scutum-centaurus arm`,`osc arm`]},{id:`Norma-Outer`,label:Gm[`Norma-Outer`],sublabel:`Spiral arm`,terms:[`norma arm`,`outer arm`,`cygnus arm`]}],Jm={milky_way:[14e4,35],centre:[3e4,40],arm:[45e3,30]};function Ym(e,t){let n=e.to_scene.matrix,r=e=>new J(n[0][e],n[1][e],n[2][e]).normalize(),i=r(2),a=new J(...e.to_scene.offset_ly),o=Wm(e.to_scene),s=a,c=r(0).negate(),l=Jm[t];if(!l){let n=e.arms.find(e=>e.name===t);if(!n||n.label<0)return null;s=new J(n.xy_kpc[2*n.label],n.xy_kpc[2*n.label+1],0).applyMatrix4(o),c=s.clone().sub(a).projectOnPlane(i).normalize(),l=Jm.arm}let[u,d]=l,f=bn.degToRad(d),p=i.clone().multiplyScalar(Math.cos(f)).addScaledVector(c,Math.sin(f));return{position:s.clone().addScaledVector(p,u).toArray(),target:s.toArray(),minDistance:100}}var Xm=[`centre`,...Object.keys(Gm)];function Zm(e,t){let n=e.title[t]||e.alias[t]||e.name[t],r=e.card[t]===`centre`?`Galactic Centre`:Gm[e.card[t]]??e.arm[t]??`arm unclear`;return{index:t,name:n,gname:e.name[t],alias:e.alias[t],note:e.note[t],card:e.card[t],armName:r,position:e.xyz_ly.slice(3*t,3*t+3),distance:e.distance_ly[t],errorPct:e.error_pct[t],range:e.range_ly[t],plx:e.plx[t],rGc:e.r_gc_ly[t],constellation:e.constellation[t],motion:e.motion[t],refs:e.refs[t].map(t=>e.ref_list[t]),label:`${n}${n===e.name[t]?``:` (${e.name[t]})`} · maser, ${e.distance_ly[t].toLocaleString()} ly ± ${e.error_pct[t]}% · ${r}`}}function Qm(e,t){let n=e.to_scene.matrix,r=new J(n[0][2],n[1][2],n[2][2]).normalize(),i=new J().fromArray(e.masers.xyz_ly,3*t),a=i.clone().negate().projectOnPlane(r).normalize(),o=Math.max(Mm,i.length()*Nm),s=r.clone().multiplyScalar(.6).addScaledVector(a,.8).normalize();return{position:i.clone().addScaledVector(s,o).toArray(),target:i.toArray(),minDistance:10}}function $m(e,t){let n=e.name.length,r=e.card.map(e=>Xm.indexOf(e)),i=new Z().setHex(Dm,jt),a={value:-1},o={value:Am},s=new wi;s.setAttribute(`position`,new fi(e.xyz_ly,3)),s.setAttribute(`group`,new fi(r,1));let c=new Ha({uniforms:{uPixelRatio:{value:t},uColor:{value:i},uFade:{value:0},uHighlight:a,uDimmed:o},vertexShader:Im,fragmentShader:Lm,transparent:!0,depthWrite:!1,depthTest:!1}),l=new wa(s,c);l.renderOrder=-1,l.frustumCulled=!1;let u=new Float32Array(n*6),d=new Float32Array(n*2);for(let t=0;t<n;t++){let[n,i]=e.range_ly[t];for(let r=0;r<3;r++)u[6*t+r]=e.unit[3*t+r]*n,u[6*t+3+r]=e.unit[3*t+r]*i;d[2*t]=d[2*t+1]=r[t]}let f=new wi;f.setAttribute(`position`,new li(u,3)),f.setAttribute(`group`,new li(d,1));let p=new Ha({uniforms:{uColor:{value:i},uOpacity:{value:0},uHighlight:a,uDimmed:o},vertexShader:Rm,fragmentShader:zm,transparent:!0,depthWrite:!1,depthTest:!1}),m=new _a(f,p);m.renderOrder=-1,m.frustumCulled=!1;let h=new J;return{objects:[m,l],geometries:[s,f],materials:[c,p],setFade:e=>{c.uniforms.uFade.value=e,p.uniforms.uOpacity.value=e*km},setHighlight:e=>{a.value=e?Xm.indexOf(e):-1},setRangesVisible:e=>{m.visible=e},info:t=>Zm(e,t),pick:(t,r,i,a,o,s)=>{let c=null,l=s;for(let s=0;s<n;s++){if(h.fromArray(e.xyz_ly,3*s).project(t),h.z>1||h.z<-1)continue;let n=Math.hypot((h.x+1)/2*r-a,(1-h.y)/2*i-o);n<l&&(l=n,c=s)}return c}}}function eh(e,t,n,{lite:r=!1}={}){let i=new _r;i.matrixAutoUpdate=!1,e.add(i);let a=new _r;e.add(a);let o=null,s=!0,c=!0,l=null,u=new Ha({uniforms:{uPixelRatio:{value:t},uFade:{value:0}},vertexShader:Pm,fragmentShader:Fm,transparent:!0,depthWrite:!1,blending:2}),d=[],f=[],p=`idle`,m=!0,h=0,g=e=>{let{stars:n,arms:s}=Um(e,r);i.matrix.copy(Wm(e.to_scene)),i.matrixWorldNeedsUpdate=!0;let m=new wi;m.setAttribute(`position`,new fi(n.pos,3)),m.setAttribute(`color`,new fi(n.col,3)),m.setAttribute(`size`,new fi(n.size,1));let h=new wa(m,u);h.renderOrder=-3,h.frustumCulled=!1,i.add(h),d.push(m);let g=(e,t,n)=>new J(e,t,n).applyMatrix4(i.matrix);f=[{id:`centre`,name:Km,position:g(0,0,0)}];for(let e of s)e.label<0||!Gm[e.name]||f.push({id:e.name,name:Gm[e.name],position:g(e.xy_kpc[2*e.label],e.xy_kpc[2*e.label+1],0)});e.masers&&(o=$m(e.masers,t),a.add(...o.objects),o.setHighlight(l),o.setRangesVisible(c)),p=`ready`},_=0,v=()=>o!==null&&m&&s&&_>0;return{update:e=>{let t=e.length();p===`idle`&&m&&t>dm&&(p=`loading`,n().then(g).catch(e=>{console.error(`Error loading the galaxy model:`,e),p=`failed`})),h=p===`ready`?Bm(t,...um):0,i.visible=m&&h>0,u.uniforms.uFade.value=h,_=p===`ready`?Bm(t,...jm):0,a.visible=v(),o?.setFade(_)},fade:()=>m?h:0,labels:()=>f,setVisible:e=>{m=e},setMasersVisible:e=>{s=e},setMaserRangesVisible:e=>{c=e,o?.setRangesVisible(e)},highlightMasers:e=>{l=e,o?.setHighlight(e)},pickMaser:(e,t,n,r,i,a)=>v()&&_>.3?o.pick(e,t,n,r,i,a):null,maser:e=>o?o.info(e):null,maserFade:()=>v()?_:0,dispose:()=>{e.remove(i,a),d.forEach(e=>e.dispose()),u.dispose(),o?.geometries.forEach(e=>e.dispose()),o?.materials.forEach(e=>e.dispose())}}}var th=4,nh=2.5/Math.LN10,rh=`
    uniform float uDustOn;       // 1 once the boxes are in and the dust is wanted
    uniform vec4 uDustFade;      // xy edge from, to; |z| from, to (pc)
    uniform mat3 uGcToHel;       // Galactocentric kpc -> Galactic pc from the Sun
    uniform vec3 uGcToHelOffset;
    float measuredShare(vec3 p) {
        float xy = max(abs(p.x), abs(p.y));
        return uDustOn * (1.0 - smoothstep(uDustFade.x, uDustFade.y, xy))
            * (1.0 - smoothstep(uDustFade.z, uDustFade.w, abs(p.z)));
    }
`,ih=e=>`
        if (uDustHalf[${e}].w > 0.0 && all(lessThanEqual(abs(p), uDustHalf[${e}].xyz - uDustHalf[${e}].w))) {
            return dustDecode(texture(uDustBox${e}, ((p + uDustHalf[${e}].xyz) / uDustHalf[${e}].w + 0.5) / uDustSize[${e}]).r);
        }`,ah=`
    precision highp sampler3D;
    ${rh}
    ${Array.from({length:th},(e,t)=>`uniform sampler3D uDustBox${t};`).join(`
    `)}
    uniform vec4 uDustHalf[${th}];   // half-extents (pc), voxel (pc); w = 0: not loaded
    uniform vec3 uDustSize[${th}];   // voxels per axis
    uniform vec2 uDustCode;                 // log10 A_V per pc at codes 1 and 255
    uniform vec3 uSlabHalf;                 // the outer box's half-extents (pc)
    uniform sampler3D uDustSphere;          // (l, b, ln r) round the Sun
    uniform vec4 uSphereR;                  // ln r inner, ln r outer; fade to the boxes from, to (pc); x = 0: none
    float dustDecode(float v) {
        float k = v * 255.0;
        // Between an empty voxel and its neighbour: fade from the floor
        if (k < 1.0) return k * pow(10.0, uDustCode.x);
        return pow(10.0, uDustCode.x + (k - 1.0) / 254.0 * (uDustCode.y - uDustCode.x));
    }
    float boxDust(vec3 p) {
        ${Array.from({length:th},(e,t)=>ih(t)).join(``)}
        return 0.0;
    }
    float measuredDust(vec3 p) {
        if (uDustOn <= 0.0) return 0.0;
        if (uSphereR.x > 0.0) {
            float r = length(p);
            if (r <= uSphereR.w) {
                float lnr = log(max(r, 1e-3));
                // Inside the map's first shell: empty (Edenhofer has no data there)
                if (lnr < uSphereR.x) return 0.0;
                vec3 uvw = vec3(atan(p.y, p.x) / 6.2831853, asin(clamp(p.z / r, -1.0, 1.0)) / 3.1415927 + 0.5,
                                (lnr - uSphereR.x) / (uSphereR.y - uSphereR.x));
                float s = dustDecode(texture(uDustSphere, uvw).r);
                return r <= uSphereR.z ? s : mix(s, boxDust(p), smoothstep(uSphereR.z, uSphereR.w, r));
            }
        }
        return boxDust(p);
    }
    // Does the segment a-b (Galactic pc) touch the measured dust? (its
    // bounding box touches the slab or the sphere's cube)
    bool dustSegment(vec3 a, vec3 b) {
        vec3 lo = min(a, b), hi = max(a, b);
        vec3 sph = vec3(uSphereR.w);
        return uDustOn > 0.0 && ((all(lessThanEqual(lo, uSlabHalf)) && all(greaterThanEqual(hi, -uSlabHalf)))
            || (all(lessThanEqual(lo, sph)) && all(greaterThanEqual(hi, -sph))));
    }
`,oh=nh;function sh(e,t){let n=null,r=new Map,i=()=>(n||=e(`dust_map.json`).catch(e=>{throw n=null,e}),n);return{meta:i,load:e=>(r.has(e)||r.set(e,i().then(n=>Promise.all([...n.boxes.map((e,t)=>({box:e,index:t})),...n.sphere?[{box:n.sphere,index:-1}]:[]].filter(({box:t})=>t.tier===e).map(({box:e,index:n})=>t(e.file).then(t=>({index:n,box:e,buffer:t}))))).catch(t=>{throw r.delete(e),t})),r.get(e))}}function ch(e,t,n=!1){let[r,i,a]=t.size,o=new Hn(new Uint8Array(e),r,i,a);return o.format=Le,o.type=Se,o.minFilter=o.magFilter=R,o.wrapS=o.wrapT=o.wrapR=he,n&&(o.wrapS=me),o.unpackAlignment=1,o.generateMipmaps=!1,o.needsUpdate=!0,o}function lh(e){let t={uDustOn:{value:0},uDustFade:{value:new Rn(1,2,1,2)},uGcToHel:{value:new Y},uGcToHelOffset:{value:new J},uDustHalf:{value:Array.from({length:th},()=>new Rn)},uDustSize:{value:Array.from({length:th},()=>new J(1,1,1))},uDustCode:{value:new q},uSlabHalf:{value:new J},uDustSphere:{value:null},uSphereR:{value:new Rn}};for(let e=0;e<th;e++)t[`uDustBox${e}`]={value:null};let n=[],r=new Set,i=new Set,a=null,o=null,s=!0,c=!1,l=new Un,u=new Un,d=()=>r.forEach(e=>e()),f=()=>{let e=s&&c&&o!==null?1:0;e!==t.uDustOn.value&&(t.uDustOn.value=e,d())},p=()=>{if(!a||!o)return;let e=o.matrix,n=o.offset_ly,r=new Un().set(e[0][0],e[0][1],e[0][2],n[0],e[1][0],e[1][1],e[1][2],n[1],e[2][0],e[2][1],e[2][2],n[2],0,0,0,1),i=u.clone().multiply(r);t.uGcToHel.value.setFromMatrix4(i),t.uGcToHelOffset.value.setFromMatrixPosition(i)},m=e=>{if(a)return;if(e.boxes.length>th)throw Error(`dust_map.json has ${e.boxes.length} boxes, the shader ${th}`);a=e;let n=e.to_scene.matrix;l.set(n[0][0],n[0][1],n[0][2],0,n[1][0],n[1][1],n[1][2],0,n[2][0],n[2][1],n[2][2],0,0,0,0,1),u.copy(l).invert();let r=e.fade_pc;t.uDustFade.value.set(...r.measured_to_model_xy,...r.measured_to_model_z),t.uDustCode.value.set(e.encoding.log_lo,e.encoding.log_hi),t.uSlabHalf.value.fromArray(e.boxes[e.boxes.length-1].half_pc),p()};return{uniforms:t,load:r=>e.load(r).then(a=>e.meta().then(e=>{if(m(e),!i.has(r)){i.add(r);for(let{index:r,box:i,buffer:o}of a){let a=ch(o,i,r<0);n.push(a),r<0?(t.uDustSphere.value=a,t.uSphereR.value.set(Math.log(i.r_pc[0]),Math.log(i.r_pc[1]),...i.fade_pc)):(t[`uDustBox${r}`].value=a,t.uDustHalf.value[r].set(...i.half_pc,i.step_pc),t.uDustSize.value[r].fromArray(i.size),r===e.boxes.length-1&&(c=!0))}f(),d()}})),loaded:e=>i.has(e),setGalaxyFrame:e=>{o||(o=e,p(),f())},setEnabled:e=>{s=e,f()},enabled:()=>t.uDustOn.value>0,onChange:e=>(r.add(e),()=>r.delete(e)),dispose:()=>{n.forEach(e=>e.dispose()),r.clear()}}}var uh=20,dh=512,fh=.05,ph=25,mh=.03,hh={full:96,lite:56},gh={full:4,lite:6},_h={full:384,lite:192},vh=.01,yh=.02,bh={thick:.04,bulge:5,bar:2.5,arms:.4},xh=[1.5,4],Sh=.15,Ch=.5,wh=1,Th=[.643,.85,1.056],Eh={disc:16052198,bulge:16767392,arms:13162751},Dh={log_lo:-.5305,log_hi:.6168,y:[.031,.0533,.0533,.0821,.1018,.1238,.146,.1688,.1898,.219,.2365,.2536,.2784,.3069,.3265,.3528,.3746,.4088,.4279,.4546,.4788,.5079,.5318,.5591,.6,.6286,.6609,.7052,.7451,.7714,.8088,.8399]},Oh=.4,kh=[3e3,16e3],Ah=3261.563777,jh=`
    ${ah}
    uniform int uDustSub;        // measured-dust samples per step
    uniform sampler2D uArms;     // r: young-star light, g: arm dust (face-on)
    uniform float uArmsHalf;     // the texture spans +-this (kpc)
    uniform float uR0;
    uniform vec4 uThin;          // scale length, scale height
    uniform vec4 uThick;         // scale length, scale height, amplitude
    uniform vec2 uDiscHole;      // the discs taper off inside this (kpc): from, to
    uniform vec2 uBarAxis;       // unit vector to the bar's near end (x, y)
    uniform vec4 uBulge;         // a, b, c (kpc), amplitude
    uniform vec4 uBar;           // half-length, half-width, height (kpc), amplitude
    uniform vec4 uDust;          // scale length, base height, flare per kpc, flare start
    uniform vec3 uDustAmp;       // disc, arms, tau per kpc
    uniform vec2 uArmLight;      // amplitude, sigma_z
    uniform vec3 uDustColor;     // extinction per channel relative to V
    uniform vec3 uColDisc;
    uniform vec3 uColBulge;
    uniform vec3 uColArms;
    uniform float uGalaxyRadius;
    uniform float uNear;
    uniform int uSteps;

    float sech2(float x) { float c = cosh(clamp(x, -20.0, 20.0)); return 1.0 / (c * c); }

    // The model's dust at p (Galactocentric kpc), V-band optical depth per
    // kpc: the Drimmel & Spergel disc (flaring, a hole inside R0 / 2) plus
    // lanes on the arms' inner edges (lane: the arm texture's g there)
    float modelDust(vec3 p, float lane) {
        float R = length(p.xy);
        float hz = uDust.y + uDust.z * max(R - uDust.w, 0.0);
        float x = R / uR0;
        float hole = x < 0.5 ? exp(-(x - 0.5) * (x - 0.5) / 0.0625) : 1.0;
        return (exp(-(max(R, 0.5 * uR0) - uR0) / uDust.x) * hole * uDustAmp.x + uDustAmp.y * lane)
            * sech2(p.z / hz) * uDustAmp.z;
    }
    vec2 armTexel(vec3 p) {
        vec2 uv = p.xy / (2.0 * uArmsHalf) + 0.5;
        return all(greaterThanEqual(uv, vec2(0.0))) && all(lessThanEqual(uv, vec2(1.0))) ? texture2D(uArms, uv).rg : vec2(0.0);
    }

    vec3 bandLight(vec3 origin, vec3 dir) {
        // The part of the ray inside the galaxy's sphere
        float b = dot(origin, dir);
        float c = dot(origin, origin) - uGalaxyRadius * uGalaxyRadius;
        float h = b * b - c;
        if (h <= 0.0) return vec3(0.0);
        h = sqrt(h);
        float t0 = max(-b - h, uNear);
        float t1 = -b + h;
        if (t1 <= t0) return vec3(0.0);
        vec2 barSide = vec2(-uBarAxis.y, uBarAxis.x);
        vec3 light = vec3(0.0);
        vec3 tau = vec3(0.0);
        float ratio = t1 / t0;
        float tPrev = t0;
        for (int i = 1; i <= 160; i++) {
            if (i > uSteps) break;
            float t = t0 * pow(ratio, float(i) / float(uSteps));
            float ds = t - tPrev;
            vec3 p = origin + dir * (0.5 * (t + tPrev));
            // The step's ends, Galactic pc from the Sun (for the measured dust)
            vec3 ha = uGcToHel * (origin + dir * tPrev) + uGcToHelOffset;
            vec3 hb = uGcToHel * (origin + dir * t) + uGcToHelOffset;
            tPrev = t;
            float R = length(p.xy);
            float az = abs(p.z);
            // Old discs
            float disc = (exp(-(R - uR0) / uThin.x - az / uThin.y)
                + uThick.z * exp(-(R - uR0) / uThick.x - az / uThick.y))
                * smoothstep(uDiscHole.x, uDiscHole.y, R);
            // Bulge and bar, in the bar's frame
            float u = dot(p.xy, uBarAxis), v = dot(p.xy, barSide);
            float bulge = uBulge.w * exp(-length(vec3(u / uBulge.x, v / uBulge.y, p.z / uBulge.z)))
                + uBar.w * (1.0 - smoothstep(0.8 * uBar.x, uBar.x, abs(u)))
                    * exp(-0.5 * v * v / (uBar.y * uBar.y) - az / uBar.z);
            // Arms (face-on texture)
            vec2 arm = armTexel(p);
            float young = uArmLight.x * arm.r * exp(-0.5 * az * az / (uArmLight.y * uArmLight.y));
            // The measured dust where it is (tau_V over the step), the
            // model's for the rest
            float measured = 0.0;
            if (dustSegment(ha, hb)) {
                float av = 0.0;
                for (int k = 0; k < 16; k++) {
                    if (k >= uDustSub) break;
                    av += measuredDust(mix(ha, hb, (float(k) + 0.5) / float(uDustSub)));
                }
                measured = av / float(uDustSub) * ds * 1000.0 / ${oh.toFixed(6)};
            }
            float modelShare = 1.0 - measuredShare(0.5 * (ha + hb));
            vec3 emit = uColDisc * disc + uColBulge * bulge + uColArms * young;
            vec3 dtau = uDustColor * (modelDust(p, arm.g) * ds * modelShare + measured);
            // Light from this step, dimmed by the dust in front of it and
            // (half) by its own
            light += emit * ds * exp(-tau - 0.5 * dtau);
            tau += dtau;
        }
        return light;
    }
`,Mh=new WeakMap;function Nh(e){return Mh.has(e)||Mh.set(e,Ph(e)),Mh.get(e)}function Ph(e){let t=dh,n=40/t,r=new Float32Array(t*t),i=new Float32Array(t*t),a=(e,r,i,a,o)=>{let s=3*a,c=Math.max(0,Math.floor((r-s+uh)/n)),l=Math.min(511,Math.ceil((r+s+uh)/n)),u=Math.max(0,Math.floor((i-s+uh)/n)),d=Math.min(511,Math.ceil((i+s+uh)/n)),f=o/(2*Math.PI*a*a);for(let o=u;o<=d;o++){let s=(o+.5)*n-uh-i;for(let i=c;i<=l;i++){let c=(i+.5)*n-uh-r;e[o*t+i]+=f*Math.exp(-.5*(c*c+s*s)/(a*a))}}},o={};for(let t of Vm(e.arms)){let e=Sm[t.kind];for(let s=0;s<t.length;s+=fh){Hm(t,s,o);let c=Math.hypot(o.x,o.y),l=o.endFade*Math.exp(-Math.max(c-11,0)/3);if(l<=0)continue;let u=fh*e*l;a(r,o.x,o.y,o.w,u);let d=Cm*o.w;a(i,o.x+o.nx*d,o.y+o.ny*d,Math.max(wm*o.w,n),u)}}let s=new Uint16Array(t*t*2);for(let e=0;e<t*t;e++)s[2*e]=ai.toHalfFloat(r[e]),s[2*e+1]=ai.toHalfFloat(i[e]);let c=new ea(s,t,t,ze,Oe);return c.magFilter=R,c.minFilter=R,c.wrapS=c.wrapT=he,c.needsUpdate=!0,c}var Fh=e=>new Z().setHex(e,jt);function Ih(e,t=!1){let n=e.disc,r=e.bar,i=e.dust_disc,a=Math.hypot(e.sun_kpc[0],e.sun_kpc[1]),o=bn.degToRad(r.angle_deg),s=r.bulge_axis_ratio.map(e=>e/r.bulge_axis_ratio[0]*1);return{uArms:{value:Nh(e)},uArmsHalf:{value:uh},uR0:{value:a},uThin:{value:new Rn(n.thin_scale_length_kpc,n.thin_scale_height_pc/1e3,1,0)},uThick:{value:new Rn(n.thick_scale_length_kpc,n.thick_scale_height_pc/1e3,bh.thick,0)},uDiscHole:{value:new q(...xh)},uBarAxis:{value:new q(-Math.cos(o),Math.sin(o))},uBulge:{value:new Rn(...s,bh.bulge)},uBar:{value:new Rn(r.half_length_kpc,gm,r.long_bar_scale_height_pc.thin/1e3,bh.bar)},uDust:{value:new Rn(i.scale_length_kpc,i.base_scale_height_pc/1e3,i.flare_pc_per_kpc/1e3,i.flare_start_kpc)},uDustAmp:{value:new J(1,wh,Ch)},uArmLight:{value:new q(bh.arms,Sh)},uDustColor:{value:new J(...Th)},uColDisc:{value:Fh(Eh.disc)},uColBulge:{value:Fh(Eh.bulge)},uColArms:{value:Fh(Eh.arms)},uGalaxyRadius:{value:ph},uNear:{value:mh},uSteps:{value:t?hh.lite:hh.full},uDustSub:{value:t?gh.lite:gh.full},uCurve:{value:Dh.y},uCurveRange:{value:new q(Dh.log_lo,Dh.log_hi)}}}var Lh=`
    varying vec3 vDir;
    void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,Rh=`
    uniform vec3 uCam;      // camera, Galactocentric kpc
    uniform mat3 uToGc;     // scene direction -> Galactocentric direction
    uniform float uCurve[${Dh.y.length}];
    uniform vec2 uCurveRange;  // log10(light) at the first and last knot
    varying vec3 vDir;
    ${jh}
    float curve(float light) {
        float x = clamp((log(max(light, 1e-30)) * 0.4342945 - uCurveRange.x) / (uCurveRange.y - uCurveRange.x), 0.0, 1.0)
            * ${(Dh.y.length-1).toFixed(1)};
        int i = int(min(floor(x), ${(Dh.y.length-2).toFixed(1)}));
        return mix(uCurve[i], uCurve[i + 1], x - float(i));
    }
    void main() {
        vec3 light = bandLight(uCam, normalize(uToGc * normalize(vDir)));
        gl_FragColor = vec4(curve(light.r), curve(light.g), curve(light.b), 1.0);
    }
`,zh=Lh,Bh=`
    uniform samplerCube uCube;
    uniform float uFade;
    uniform float uBrightness;
    varying vec3 vDir;
    void main() {
        vec3 c = textureCube(uCube, normalize(vDir)).rgb * uFade * uBrightness;
        gl_FragColor = vec4(pow(c, vec3(2.2)), 1.0);  // display value -> linear (see Universe3D)
    }
`;function Vh(e,t,n,{lite:r=!1,dust:i=null}={}){let a=i??lh(null),o=Wm(n.to_scene).clone().invert(),s=new Y().setFromMatrix4(o);s.multiplyScalar(Ah);let c={...Ih(n,r),...a.uniforms,uCam:{value:new J},uToGc:{value:s}},l=new Tr,u=new Ha({uniforms:c,vertexShader:Lh,fragmentShader:Rh,side:1,depthWrite:!1,depthTest:!1}),d=new Na(10,48,24);l.add(new Zi(d,u));let f=new zs(r?_h.lite:_h.full,{type:Oe,generateMipmaps:!1}),p=new Bo(.1,100,f),m=new Ha({uniforms:{uCube:{value:f.texture},uFade:{value:0},uBrightness:{value:Oh}},vertexShader:zh,fragmentShader:Bh,side:1,depthWrite:!1,depthTest:!1}),h=new Zi(d,m);h.renderOrder=-10,h.frustumCulled=!1,t.add(h);let g=new J,_=new J(1/0,0,0),v=a.onChange(()=>_.set(1/0,0,0)),y=!0,b=0;return{update:t=>{let n=t.length();if(b=y?1-bn.smoothstep(n,...kh):0,m.uniforms.uFade.value=b,h.visible=b>0,b<=0)return;g.copy(t).applyMatrix4(o);let r=Math.abs(g.z)+yh;g.distanceTo(_)<vh*r||(_.copy(g),c.uCam.value.copy(g),p.update(e,l))},fade:()=>b,setVisible:e=>{y=e},dispose:()=>{v(),i||a.dispose(),t.remove(h),d.dispose(),u.dispose(),m.dispose(),c.uArms.value.dispose(),f.dispose()}}}var Hh=[ph,ph,1.5],Uh=.04,Wh={full:256,lite:96},Gh=.002,Kh=`
    varying vec3 vLocal;
    void main() {
        vLocal = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,qh=`
    uniform vec3 uCamGc;       // camera, Galactocentric kpc
    uniform vec3 uBoxHalf;
    uniform float uFade;
    uniform int uMaxSteps;
    uniform float uStepKpc;
    uniform float uNearKpc;
    varying vec3 vLocal;
    ${jh}
    void main() {
        vec3 dir = normalize(vLocal - uCamGc);
        vec3 inv = 1.0 / (dir + vec3(1e-9));
        vec3 ta = (-uBoxHalf - uCamGc) * inv;
        vec3 tb = (uBoxHalf - uCamGc) * inv;
        vec3 tmin = min(ta, tb), tmax = max(ta, tb);
        float t0 = max(max(tmin.x, tmin.y), max(tmin.z, uNearKpc));
        float t1 = min(min(tmax.x, tmax.y), tmax.z);
        if (t1 <= t0) discard;
        int n = int(clamp(ceil((t1 - t0) / uStepKpc), 8.0, float(uMaxSteps)));
        float ratio = t1 / t0;
        float jitter = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        float tauV = 0.0;
        for (int i = 0; i < 512; i++) {
            if (i >= n) break;
            float ta0 = t0 * pow(ratio, float(i) / float(n));
            float ta1 = t0 * pow(ratio, float(i + 1) / float(n));
            float ds = ta1 - ta0;
            vec3 p = uCamGc + dir * mix(ta0, ta1, jitter);
            vec3 h = uGcToHel * p + uGcToHelOffset;
            tauV += modelDust(p, armTexel(p).g) * ds * (1.0 - measuredShare(h))
                + measuredDust(h) * ds * 1000.0 / ${oh.toFixed(6)};
        }
        vec3 lost = (1.0 - exp(-tauV * uDustColor)) * uFade;
        if (max(lost.r, max(lost.g, lost.b)) < 0.002) discard;
        gl_FragColor = vec4(lost, 1.0);
    }
`;function Jh(e,t,{lite:n=!1,dust:r=null,background:i=new Z(0,0,0)}={}){let a=r??lh(null),o=Wm(t.to_scene),s=o.clone().invert(),c={...Ih(t,n),...a.uniforms,uCamGc:{value:new J},uBoxHalf:{value:new J(...Hh)},uFade:{value:0},uMaxSteps:{value:n?Wh.lite:Wh.full},uStepKpc:{value:Uh},uNearKpc:{value:Gh}},l=new Ha({uniforms:c,vertexShader:Kh,fragmentShader:qh,side:1,transparent:!0,depthWrite:!1,depthTest:!1,blending:5,blendEquation:100,blendSrc:211,blendDst:203,blendSrcAlpha:200,blendDstAlpha:201});l.blendColor.copy(i);let u=new Aa(...Hh.map(e=>2*e)),d=new Zi(u,l);return d.matrixAutoUpdate=!1,d.matrix.copy(o),d.matrixWorldNeedsUpdate=!0,d.renderOrder=-2.5,d.frustumCulled=!1,d.visible=!1,e.add(d),{update:e=>{d.visible=c.uFade.value>0,d.visible&&c.uCamGc.value.copy(e).applyMatrix4(s)},setFade:e=>{c.uFade.value=e},dispose:()=>{e.remove(d),u.dispose(),l.dispose(),r||a.dispose()}}}function Yh(e){let t=new Float32Array(768);for(let n=0;n<256;n++){let r=n===e.bv.missing?null:e.bv.min+n*e.bv.step;t.set(a(r),n*3)}return t}function Xh(e,t,n){let r=new Int16Array(e,0,n*3),i=new Uint8Array(e,n*6),a=i.subarray(0,n),o=i.subarray(n,2*n),s=t.pos_unit_ly??1,c=Float32Array.from(r,e=>e*s),l=new Float32Array(n*3),u=new Float32Array(n),d=Yh(t);for(let e=0;e<n;e++){let n=o[e]*3;l[e*3]=d[n],l[e*3+1]=d[n+1],l[e*3+2]=d[n+2],u[e]=t.abs_mag.min+a[e]*t.abs_mag.step}return{positions:c,colors:l,absMags:u,count:n}}function Zh(e,t,n=`stars_far.json`){let r=null,i=new Map,a=()=>(r||=e(n).catch(e=>{throw r=null,e}),r);return{meta:a,load:e=>(i.has(e)||i.set(e,a().then(n=>t(n.tiers[e].file).then(t=>Xh(t,n,n.tiers[e].count))).catch(t=>{throw i.delete(e),t})),i.get(e))}}var Qh=16769709,$h=[[6.5,10470655],[7.7,15265535],[8.7,16769184],[9.7,16752224]],eg=16754294,tg={globulars:{markerPx:[3.5,8],sizeRange:[4,6.5],brightness:.9,glow:!0},open_clusters:{markerPx:[2.5,5.5],sizeRange:[1,3.5],brightness:.7,glow:!1},nebulae:{markerPx:[4,4],sizeRange:[0,1],brightness:.8,glow:!1}},ng=Object.keys(tg),rg=3,ig=900,ag=[1e3,3e3],og=25,sg=60,cg=4,lg=.05,ug=.08,dg=.3,fg=.36,pg=.15,mg=28,hg=`
    attribute vec3 color;
    attribute float radius;      // half-light / half-member radius (ly)
    attribute float marker;      // marker diameter (px)
    attribute float unresolved;  // share of its light Gaia's stars don't hold
    uniform float uFocalPx;      // px per unit at distance 1
    uniform float uPixelRatio;
    uniform float uStarsOn;      // 1 while its stars are drawn
    uniform float uGlow;         // 1: a Plummer glow at its true size (globulars)
    varying vec3 vColor;
    varying float vBright;
    void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float world = 2.0 * ${rg.toFixed(1)} * radius * uFocalPx / max(-mv.z, 1e-3);
        float m = marker * uPixelRatio;
        gl_PointSize = clamp(uGlow > 0.5 ? max(m, world) : m, 1.0, ${ig.toFixed(1)});
        // Once it's bigger than its marker its stars show: a glow keeps the
        // light they don't hold, a dot goes
        float near = smoothstep(m, 4.0 * m, world) * uStarsOn;
        vBright = uGlow > 0.5 ? mix(1.0, unresolved, near) : 1.0 - near;
        vColor = color;
        gl_Position = projectionMatrix * mv;
    }
`,gg=`
    uniform float uFade;
    uniform float uBrightness;
    varying vec3 vColor;
    varying float vBright;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float x = r * ${rg.toFixed(1)};
        float glow = vBright / ((1.0 + x * x) * (1.0 + x * x)) * (1.0 - smoothstep(0.8, 1.0, r));
        if (glow * uFade < 0.003) discard;
        gl_FragColor = vec4(vColor * glow * uFade * uBrightness, 1.0);
    }
`,_g=e=>Math.round(e).toLocaleString(),vg=e=>[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255];function yg(e){let t=Math.log10(Math.max(e??300,.1)*1e6),n=$h;if(t<=n[0][0])return vg(n[0][1]);for(let e=1;e<n.length;e++)if(t<=n[e][0]){let r=(t-n[e-1][0])/(n[e][0]-n[e-1][0]),i=vg(n[e-1][1]),a=vg(n[e][1]);return i.map((e,t)=>e+(a[t]-e)*r)}return vg(n[n.length-1][1])}function bg(e,t,n){return{kind:e,index:n,name:t.name[n],title:t.title[n],ids:t.ids[n],messier:t.messier[n],position:t.xyz_ly.slice(3*n,3*n+3),distance:t.distance_ly[n],constellation:t.constellation[n],note:t.note[n],noteRef:t.note_ref[n],superlative:t.superlative[n],starCount:t.stars?.clusters.find(e=>e.cluster===n)?.count??0,starsRef:t.stars?.ref??null,labelled:t.label[n]}}function xg(e,t,n){let r=bg(e,t,n);return e===`nebulae`?{...r,distanceErr:t.distance_err_ly[n],type:t.type[n],about:t.about[n],models:t.models[n],refs:t.refs[n],radius:t.radius_ly[n],label:`${t.name[n]} · ${t.type[n].toLowerCase()}, ${_g(t.distance_ly[n])} ly`}:e===`globulars`?{...r,distanceErr:t.distance_err_ly[n],rGc:t.r_gc_ly[n],mass:t.mass_msun[n],rh:t.rh_ly[n],rt:t.rt_ly[n],vmag:t.vmag[n],resolved:t.resolved?.[n]??null,radius:t.rh_ly[n],label:`${t.name[n]} · globular cluster, ${_g(t.distance_ly[n])} ly`}:{...r,distanceRange:t.distance_range_ly[n],age:t.age_myr[n],ageRange:t.age_range_myr[n],members:t.members[n],r50:t.r50_ly[n],rt:t.rt_ly[n],av:t.av[n],radius:t.r50_ly[n],label:`${t.name[n]} · open cluster, ${_g(t.distance_ly[n])} ly`}}var Sg={globulars:[`Globular cluster`,`Globular clusters`],open_clusters:[`Open cluster`,`Open clusters`],nebulae:[`Nebula`,`Nebulae`]},Cg=(e,t,n)=>e===`globulars`?t.rh_ly[n]:e===`nebulae`?t.radius_ly[n]:t.r50_ly[n];function wg(e,t,n){let r=new J().fromArray(t.xyz_ly,3*n),i=Cg(e,t,n)??10;if(e===`nebulae`){let e=cg*i;return{position:r.clone().addScaledVector(r.clone().normalize(),-e).toArray(),target:r.toArray(),minDistance:i*.3}}let a=Math.max(og*i,sg);return{position:r.clone().addScaledVector(r.clone().normalize(),-a).toArray(),target:r.toArray(),minDistance:i}}function Tg(e,t){let n=t.stars,r=n.count,i=new Int16Array(e,0,r*3),o=new Uint8Array(e,r*6),s=new Float32Array(r*3),c=new Float32Array(r*3),l=new Float32Array(r);for(let e of n.clusters){let n=t.xyz_ly[3*e.cluster],r=t.xyz_ly[3*e.cluster+1],a=t.xyz_ly[3*e.cluster+2];for(let t=e.start;t<e.start+e.count;t++)s[3*t]=n+i[3*t]*e.scale_ly,s[3*t+1]=r+i[3*t+1]*e.scale_ly,s[3*t+2]=a+i[3*t+2]*e.scale_ly}let u=new Float32Array(768);for(let e=0;e<256;e++)u.set(a(e===n.bv.missing?null:n.bv.min+e*n.bv.step),e*3);for(let e=0;e<r;e++)l[e]=n.abs_mag.min+o[e]*n.abs_mag.step,c.set(u.subarray(o[r+e]*3,o[r+e]*3+3),3*e);return{positions:s,colors:c,absMags:l,count:r}}var Eg=`
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalMatrix * normal;
        vView = -mv.xyz;
        gl_Position = projectionMatrix * mv;
    }
`,Dg=`
    uniform vec3 uColor;
    uniform float uFade;
    uniform float uEdge;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        // A thin shell's light grows with the path through it: 1 / |cos|
        float mu = abs(dot(normalize(vNormal), normalize(vView)));
        float glow = ${lg.toFixed(3)} / max(mu, uEdge);
        gl_FragColor = vec4(uColor * glow * uFade, 1.0);
    }
`,Og=`
    uniform float uOccOn;
    uniform vec3 uOccC0;
    uniform mat3 uOccM0;
    uniform vec3 uOccC1;
    uniform mat3 uOccM1;
    float behind(vec3 p, vec3 c, mat3 m) {
        vec3 a = m * (cameraPosition - c);
        vec3 d = m * (p - c) - a;
        float qa = dot(d, d), qb = 2.0 * dot(a, d), qc = dot(a, a) - 1.0;
        float disc = qb * qb - 4.0 * qa * qc;
        if (qc <= 0.0 || disc <= 0.0) return 0.0;  // camera inside, or missed
        float s = (-qb - sqrt(disc)) / (2.0 * qa);
        return s > 0.0 && s < 1.0 ? 1.0 : 0.0;
    }
`,kg=`
    float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1) * 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }
    float noise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
                   mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
    }
`,Ag=`
    attribute float flux;
    attribute vec3 rgb;
    uniform float uFocalPx;
    uniform float uPointLy;
    varying float vFlux;
    varying vec3 vRgb;
    ${Og}
    void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vec4 mv = viewMatrix * world;
        float size = uPointLy * uFocalPx / max(-mv.z, 1e-6);  // device px
        gl_PointSize = clamp(size, 1.0, 64.0);
        float hidden = uOccOn > 0.5 ? max(behind(world.xyz, uOccC0, uOccM0), behind(world.xyz, uOccC1, uOccM1)) : 0.0;
        vFlux = flux * min(size * size, 1.0) * mix(1.0, ${pg.toFixed(3)}, hidden);
        vRgb = rgb;
        gl_Position = projectionMatrix * mv;
    }
`,jg=`
    uniform vec3 uColor;
    uniform float uRgbOn;
    uniform float uBright;
    uniform float uFade;
    varying float vFlux;
    varying vec3 vRgb;
    void main() {
        vec2 p = (gl_PointCoord - 0.5) * 2.0;
        float r2 = dot(p, p);
        if (r2 > 1.0) discard;
        // Gaussian, to 0 at the edge: neighbours blend
        float soft = (exp(-3.0 * r2) - 0.0498) / 0.9502;
        vec3 color = uRgbOn > 0.5 ? vRgb * uBright : uColor;
        gl_FragColor = vec4(color * vFlux * soft * uFade, 1.0);
    }
`,Mg=`
    uniform float uLocalScale;  // 1 / the model's half-length (its units)
    varying vec3 vWorld;
    varying vec3 vNormal;
    varying vec3 vLocal;
    varying float vLobe;
    void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        vNormal = normalize(mat3(modelMatrix) * normal);  // a rotation x scale
        vLocal = position * uLocalScale;
        vLobe = position.z >= 0.0 ? 1.0 : 0.0;
        gl_Position = projectionMatrix * viewMatrix * world;
    }
`,Ng=`
    uniform vec3 uColor;
    uniform vec3 uStar;
    uniform float uFade;
    varying vec3 vWorld;
    varying vec3 vNormal;
    varying vec3 vLocal;
    varying float vLobe;
    ${Og}
    ${kg}
    void main() {
        vec3 view = normalize(cameraPosition - vWorld);
        float cosT = dot(normalize(vWorld - uStar), view);  // star -> dust -> camera
        float g = ${dg.toFixed(2)};
        float hg = (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * cosT, 1.5);
        vec3 x = vLocal * ${mg.toFixed(1)};
        float n = (noise(x) * 0.5 + noise(2.0 * x) * 0.25 + noise(4.0 * x) * 0.125) / 0.875 * 2.0 - 1.0;
        // Brighter and darker patches, and thin dark lanes between cells
        float mottle = clamp(0.85 + 0.35 * n, 0.5, 1.2) * mix(0.65, 1.0, smoothstep(0.02, 0.08, abs(n)));
        float slant = mix(0.55, 1.0, abs(dot(normalize(vNormal), view)));
        float hidden = uOccOn > 0.5 ? (vLobe > 0.5 ? behind(vWorld, uOccC0, uOccM0) : behind(vWorld, uOccC1, uOccM1)) : 0.0;
        float glow = ${fg.toFixed(3)} * hg * mottle * slant * mix(1.0, ${pg.toFixed(3)}, hidden);
        gl_FragColor = vec4(clamp(uColor * glow * uFade, 0.0, 4.0), 1.0);
    }
`;function Pg(e,t){let n={uOccOn:{value:+!!e}};return[0,1].forEach(r=>{let i=e?.[r];n[`uOccC${r}`]={value:i?t.clone().add(new J().fromArray(i.centre)):new J};let a=new Y;i&&a.set(...i.inverse.flat()),n[`uOccM${r}`]={value:a}}),n}function Fg(e,t,n){let r=t.matrix;return e.matrixAutoUpdate=!1,e.matrix.set(r[0][0],r[0][1],r[0][2],n.x,r[1][0],r[1][1],r[1][2],n.y,r[2][0],r[2][1],r[2][2],n.z,0,0,0,1),e.renderOrder=-1,e.frustumCulled=!1,e.visible=!1,e}function Ig(e,t,n,r,i){let a=t.count,o=new Int16Array(e,0,a*3),s=new Uint8Array(e,a*6,a),c=new Float32Array(o),l=new Float32Array(a);for(let e=0;e<a;e++)l[e]=10**(t.flux.min+s[e]*t.flux.step-t.flux.max);let u=new wi;return u.setAttribute(`position`,new li(c,3)),u.setAttribute(`flux`,new li(l,1)),t.rgb&&u.setAttribute(`rgb`,new li(new Uint8Array(e,a*7,a*3),3,!0)),Fg(new wa(u,new Ha({uniforms:{uColor:{value:new Z().fromArray(vg(t.color).map(e=>e*t.brightness))},uRgbOn:{value:+!!t.rgb},uBright:{value:t.brightness},uFade:{value:0},uFocalPx:{value:1},uPointLy:{value:t.point_ly*r},...Pg(i,n)},vertexShader:Ag,fragmentShader:jg,transparent:!0,depthWrite:!1,depthTest:!1,blending:2})),t,n)}function Lg(e,t,n,r){let i=new Float32Array(e,0,t.vertices*3),a=new(t.index===`uint32`?Uint32Array:Uint16Array)(e,t.vertices*12,t.triangles*3),o=new wi;return o.setAttribute(`position`,new li(i,3)),o.setIndex(new li(a,1)),o.computeVertexNormals(),t.shading===`dusty`?(o.computeBoundingBox(),Fg(new Zi(o,new Ha({uniforms:{uColor:{value:new Z(t.color).multiplyScalar(t.brightness)},uStar:{value:n.clone()},uFade:{value:0},uLocalScale:{value:2/(o.boundingBox.max.z-o.boundingBox.min.z)},...Pg(r,n)},vertexShader:Mg,fragmentShader:Ng,transparent:!0,depthWrite:!1,depthTest:!1,side:0,blending:2})),t,n)):Fg(new Zi(o,new Ha({uniforms:{uColor:{value:new Z().fromArray(vg(t.color).map(e=>e*t.brightness))},uFade:{value:0},uEdge:{value:t.edge??ug}},vertexShader:Eg,fragmentShader:Dg,transparent:!0,depthWrite:!1,depthTest:!1,side:2,blending:2})),t,n)}function Rg(e,t,n,r){let i=tg[t],a=n.name.length,o=new Float32Array(a),s=new Float32Array(a),c=new Float32Array(a),l=new Float32Array(a*3),u=vg(Qh);for(let e=0;e<a;e++){o[e]=(t===`nebulae`?Cg(t,n,e)/rg:Cg(t,n,e))??0;let r=t===`globulars`?Math.log10(n.mass_msun[e]??1e4):t===`nebulae`?0:Math.log10(n.members[e]||10),a=bn.clamp((r-i.sizeRange[0])/(i.sizeRange[1]-i.sizeRange[0]),0,1);s[e]=i.markerPx[0]+(i.markerPx[1]-i.markerPx[0])*a,c[e]=1-(n.resolved?.[e]??0),l.set(t===`globulars`?u:t===`nebulae`?vg(n.color[e]):yg(n.age_myr[e]),3*e)}let d=new wi;d.setAttribute(`position`,new fi(n.xyz_ly,3)),d.setAttribute(`color`,new li(l,3)),d.setAttribute(`radius`,new li(o,1)),d.setAttribute(`marker`,new li(s,1)),d.setAttribute(`unresolved`,new li(c,1));let f=new Ha({uniforms:{uFocalPx:{value:1},uPixelRatio:{value:r},uFade:{value:0},uStarsOn:{value:0},uGlow:{value:+!!i.glow},uBrightness:{value:i.brightness}},vertexShader:hg,fragmentShader:gg,transparent:!0,depthWrite:!1,depthTest:!1,blending:2}),p=new wa(d,f);p.renderOrder=-1,p.frustumCulled=!1,p.visible=!1,e.add(p);let m=[];for(let e=0;e<a;e++)n.label[e]&&m.push({index:e,name:n.name[e],position:new J().fromArray(n.xyz_ly,3*e)});let h=[],g=!0,_=0,v=new J;return{update:(e,t,n)=>{_=g?bn.smoothstep(e.length(),...ag):0,p.visible=_>0,f.uniforms.uFade.value=_;let i=t/(2*Math.tan(bn.degToRad(n)/2));f.uniforms.uFocalPx.value=i*r;for(let t of h){let n=2*t.radius*i/Math.max(t.centre.distanceTo(e),1e-9),r=g?bn.smoothstep(n,s[t.index],4*s[t.index]):0;t.mesh.material.uniforms.uFade.value=r,t.mesh.material.uniforms.uFocalPx&&(t.mesh.material.uniforms.uFocalPx.value=i),t.mesh.visible=r>0}},fade:()=>_,setVisible:e=>{g=e},setStarsOn:e=>{f.uniforms.uStarsOn.value=e||h.length?1:0},addModels:t=>{let i=0;n.models.forEach((a,o)=>{let s=new J().fromArray(n.xyz_ly,3*o),c=a.find(e=>e.occluders)?.occluders;for(let l of a){let a=l.kind===`cloud`?Ig(t[i++],l,s,r,c):Lg(t[i++],l,s,c);e.add(a),h.push({index:o,mesh:a,centre:s,radius:n.radius_ly[o]})}}),f.uniforms.uStarsOn.value=h.length?1:f.uniforms.uStarsOn.value},nearest:e=>{let t=1/0;for(let r=0;r<a;r++){let i=n.xyz_ly[3*r]-e.x,a=n.xyz_ly[3*r+1]-e.y,o=n.xyz_ly[3*r+2]-e.z;t=Math.min(t,i*i+a*a+o*o)}return Math.sqrt(t)},labels:()=>m,info:e=>xg(t,n,e),pick:(e,t,r,s,c,l)=>{if(_<.3)return null;let u=null,d=1/0,f=r/(2*Math.tan(bn.degToRad(e.fov)/2));for(let p=0;p<a;p++){v.fromArray(n.xyz_ly,3*p);let a=v.distanceTo(e.position);if(v.project(e),v.z>1||v.z<-1)continue;let m=Math.hypot((v.x+1)/2*t-s,(1-v.y)/2*r-c);m<(i.glow?Math.max(l,rg*o[p]*f/a*.5):l)&&m<d&&(d=m,u=p)}return u},dispose:()=>{for(let t of h)e.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material.dispose();e.remove(p),d.dispose(),f.dispose()}}}var $=ie(),zg=e=>{try{let t=localStorage.getItem(e);if(t!==null)return t===`1`}catch{}return!window.matchMedia(`(pointer: coarse)`).matches};function Bg({title:e,onTitle:t,items:n,storageKey:r}){let[i,a]=(0,I.useState)(()=>zg(r)),o=()=>{a(e=>{try{localStorage.setItem(r,e?`0`:`1`)}catch{}return!e})};return i?(0,$.jsxs)(`div`,{className:`map-legend`,children:[(0,$.jsxs)(`div`,{className:`map-legend-head`,children:[t?(0,$.jsxs)(`button`,{className:`map-legend-title map-legend-link`,onClick:t,children:[e,` ›`]}):(0,$.jsx)(`span`,{className:`map-legend-title`,children:e}),(0,$.jsx)(`button`,{className:`map-legend-fold`,onClick:o,"aria-label":`Hide the key`,title:`Hide the key`,children:`×`})]}),n.map(e=>e.onClick?(0,$.jsxs)(`button`,{className:`map-legend-row map-legend-link`,onClick:e.onClick,children:[e.swatch,e.name]},e.key):(0,$.jsxs)(`div`,{className:`map-legend-row`,children:[e.swatch,e.name]},e.key))]}):(0,$.jsxs)(`button`,{className:`map-legend map-legend-chip`,onClick:o,title:`Show the key: ${e}`,children:[e,` ▸`]})}var Vg=e=>`#${e.toString(16).padStart(6,`0`)}`,Hg=[{band:!0,name:`Band on the sky`,about:`The Milky Way as seen from inside the disc: this model's starlight added up along each line of sight and dimmed by the dust in front (the measured dust near the Sun, the model's further out), worked out from wherever you are (not a photo). The band turns into the disc as you fly out.`},{color:Vg(Tm.thin[0]),name:`Old disc stars`,about:`Most of the disc's stars: long-lived, cooler and yellower than the Sun on average, spread smoothly round the whole disc.`},{color:Vg(Tm.bulge[0]),name:`Bar and bulge`,about:`The oldest stars, with hardly any new ones forming, so the most orange.`},{color:Vg(Tm.arms[0]),name:`Young stars`,about:`Massive stars are hot and blue-white, and burn out within a few million years, before drifting far from the arm they formed in. That is why the arms stand out.`},{color:Vg(Tm.clumps[0]),name:`Star clusters`,about:`Young stars born together in groups (OB associations), still close to one another.`},{color:Vg(Tm.hii[0]),name:`Glowing gas`,about:`Hydrogen lit up by young hot stars glows red-pink (H II regions), like the Orion Nebula.`},{color:`#15110d`,name:`Dust`,about:`Grains of rock and soot that block light, thickest along the inner edge of each arm and in the middle of the disc. Within about 15,000 ly of the Sun it is the measured 3D map (below), not drawn to match.`},{color:Vg(Dm),ring:!0,name:`Masers`,about:`Real, not drawn to match: the measured masers at their distances. The faint line through each spans its distance's uncertainty, along our line of sight (cut at twice the distance when the far end is open).`},{color:`#f6f0e2`,halo:!0,name:`Halo stars`,about:`Real, not drawn to match: about 134,000 RR Lyrae stars, old giants that pulse every half day or so. They all shine with nearly the same brightness, so how bright each looks tells how far it is, out past 450,000 ly, far beyond where parallaxes work (Li et al. 2023, from Gaia). They trace the faint halo of old stars round the disc, the Sagittarius stream (a small galaxy being torn apart as it orbits ours), the bulge, and the Large and Small Magellanic Clouds. The halo holds only a few percent of the Milky Way's stars (about 1.4 billion Suns' worth, Deason et al. 2019), spread over a volume far bigger than the disc: each dot stands in for many thousands of stars too faint to see from out here.`},{color:Vg(Qh),globular:!0,name:`Globular clusters`,about:`Real, not drawn to match: 167 globular clusters at their measured distances, balls of hundreds of thousands of stars swarming round the centre in a halo, far above and below the disc. Each glows out to its true size when you get close.`},{color:Vg(eg),nebula:!0,name:`Nebulae`,about:`Real, not drawn to match: the few nebulae whose 3D shape has been measured, each drawn from its published model at its measured distance. A dot from afar; fly close to see its shape: glowing gas, or dust lit by its star.`},{gradient:$h.map(([,e])=>Vg(e)),open:!0,name:`Open clusters`,about:`Real, not drawn to match: 4,000 open clusters found by Gaia, at their measured distances, coloured by age: blue for the young ones (a few million years), white, yellow, then orange for the old (billions). The youngest trace the spiral arms they formed in.`}];function Ug({k:e}){if(e.line)return(0,$.jsx)(`span`,{className:`galaxy-legend-line`,style:{background:e.color}});if(e.band)return(0,$.jsx)(`span`,{className:`galaxy-legend-band`});if(e.gradient)return(0,$.jsx)(`span`,{className:`universe-3d-swatch`,style:{background:`linear-gradient(90deg, ${e.gradient.join(`, `)})`}});let t=e.ring?{background:`transparent`,border:`2px solid ${e.color}`}:{background:e.color,border:e.name===`Dust`?`1px solid #64748b`:void 0};return(0,$.jsx)(`span`,{className:`universe-3d-swatch`,style:t})}var Wg=[...Hg.filter(e=>!e.ring&&!e.band&&!e.halo&&!e.globular&&!e.open&&!e.nebula),{...Hg.find(e=>e.ring),name:`Masers (measured)`,maser:!0},{color:Vg(Dm),line:!0,name:`Maser distance uncertainty range`,maser:!0},{...Hg.find(e=>e.halo),name:`Halo stars: RR Lyrae (measured)`},{...Hg.find(e=>e.globular),name:`Globular clusters (measured)`},{...Hg.find(e=>e.open),name:`Open clusters, young → old (measured)`},{...Hg.find(e=>e.nebula),name:`Nebulae in 3D (measured)`}];function Gg({showModel:e,showMasers:t,showRanges:n=!0,showGlobulars:r=!1,showOpenClusters:i=!1,showNebulae:a=!1,showHalo:o=!1,onOpen:s}){return(0,$.jsx)(Bg,{title:`Milky Way (model)`,onTitle:s,storageKey:`universe3d.legend.galaxy`,items:Wg.filter(s=>s.globular?r:s.open?i:s.nebula?a:s.halo?o&&e:s.maser?t&&(!s.line||n):e).map(e=>({key:e.name,swatch:(0,$.jsx)(Ug,{k:e}),name:e.name}))})}var Kg=e=>Math.round(e).toLocaleString(),qg=e=>e.join(`, `);function Jg({rows:e}){return(0,$.jsx)(`dl`,{className:`star-info-facts`,children:e.filter(Boolean).map(([e,t])=>(0,$.jsxs)(I.Fragment,{children:[(0,$.jsx)(`dt`,{children:e}),(0,$.jsx)(`dd`,{children:t})]},e))})}function Yg({objects:e,onSelectMaser:t}){return e?.length?(0,$.jsxs)(`div`,{className:`region-part`,children:[(0,$.jsx)(`div`,{className:`region-part-head static`,children:(0,$.jsx)(`strong`,{children:`Well-known masers here`})}),(0,$.jsx)(`ul`,{className:`region-members`,children:e.map(e=>(0,$.jsx)(`li`,{children:(0,$.jsxs)(`button`,{className:`region-member galaxy-object`,onClick:()=>t(e.maser),children:[(0,$.jsxs)(`div`,{className:`galaxy-object-head`,children:[(0,$.jsx)(`span`,{children:e.name}),(0,$.jsxs)(`span`,{className:`star-info-muted`,children:[Kg(e.distance),` ly · `,e.constellation,` ›`]})]}),(0,$.jsx)(`div`,{className:`star-info-muted`,children:e.note})]})},e.name))})]}):null}function Xg({refs:e}){let t=[...new Set(e.filter(Boolean))];return(0,$.jsxs)(`p`,{className:`star-info-muted star-info-origin`,children:[`Sources: `,t.join(`; `),`.`]})}function Zg({current:e,cards:t,onSelect:n}){let r=[`milky_way`,`centre`,...Object.keys(t.arms)].filter(t=>t!==e),i=e=>e===`milky_way`?`Milky Way`:e===`centre`?`Galactic Centre`:Gm[e];return(0,$.jsx)(`div`,{className:`region-part`,children:(0,$.jsx)(`ul`,{className:`region-members`,children:r.map(e=>(0,$.jsx)(`li`,{children:(0,$.jsxs)(`button`,{className:`region-member`,onClick:()=>n(e),children:[(0,$.jsx)(`span`,{children:i(e)}),(0,$.jsx)(`span`,{className:`star-info-muted`,children:`›`})]})},e))})})}function Qg({card:e}){return(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`h3`,{className:`star-info-title`,children:`Milky Way`}),(0,$.jsx)(`div`,{className:`star-info-subtitle`,children:`Our galaxy · barred spiral · drawn as a model`}),(0,$.jsx)(`p`,{className:`star-info-origin`,children:e.about}),(0,$.jsx)(Jg,{rows:[[`The Sun`,`${Kg(e.sun_distance)} ly from the centre, ${e.sun_height} ly above the middle of the disc`],[`Its orbit`,`once round every ~${e.orbit_myr} million years, at ${e.orbit_speed_km_s} km/s`],[`Bar`,`${Kg(e.bar_half_length*2)} ly long, ${e.bar_angle_deg}° from the line to the Sun`],...e.facts.map(e=>[e.label,e.value])]}),(0,$.jsxs)(`div`,{className:`region-part`,children:[(0,$.jsx)(`div`,{className:`region-part-head static`,children:(0,$.jsx)(`strong`,{children:`What the colours mean`})}),Hg.map(e=>(0,$.jsxs)(`div`,{className:`galaxy-key-row`,children:[(0,$.jsx)(Ug,{k:e}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`strong`,{children:e.name}),` `,(0,$.jsx)(`span`,{className:`star-info-muted`,children:e.about})]})]},e.name))]}),(0,$.jsxs)(`div`,{className:`region-part`,children:[(0,$.jsx)(`div`,{className:`region-part-head static`,children:(0,$.jsx)(`strong`,{children:`What is a maser?`})}),(0,$.jsx)(`p`,{className:`star-info-muted region-part-about`,children:e.maser})]}),e.dust&&(0,$.jsxs)(`div`,{className:`region-part`,children:[(0,$.jsx)(`div`,{className:`region-part-head static`,children:(0,$.jsx)(`strong`,{children:`The dust near the Sun is measured`})}),(0,$.jsx)(`p`,{className:`star-info-muted region-part-about`,children:e.dust.about}),(0,$.jsx)(`p`,{className:`star-info-muted region-part-about`,children:e.dust.check})]}),(0,$.jsxs)(`div`,{className:`region-part`,children:[(0,$.jsx)(`div`,{className:`region-part-head static`,children:(0,$.jsx)(`strong`,{children:`How we know`})}),e.history.map(e=>(0,$.jsxs)(`div`,{className:`galaxy-key-row`,children:[(0,$.jsx)(`span`,{className:`galaxy-year`,children:e.year}),(0,$.jsx)(`span`,{className:`star-info-muted`,children:e.text})]},e.year))]}),(0,$.jsx)(Xg,{refs:[e.orbit_speed_ref,...e.facts.map(e=>e.ref),e.maser_ref,...e.history.map(e=>e.ref),...e.dust?.refs??[]]})]})}function $g({card:e,bar:t,onSelectMaser:n}){return(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`h3`,{className:`star-info-title`,children:`Galactic Centre`}),(0,$.jsx)(`div`,{className:`star-info-subtitle`,children:`Sagittarius A* · supermassive black hole`}),(0,$.jsx)(`p`,{className:`star-info-origin`,children:e.about}),(0,$.jsx)(Jg,{rows:[[`Distance`,`${Kg(e.distance)} ly, in ${e.constellation}`],[`Mass`,`${(e.mass_msun/1e6).toFixed(1)} million Suns`],[`Event horizon`,(0,$.jsxs)($.Fragment,{children:[(e.horizon_km/1e6).toFixed(1),` million km in radius (`,e.horizon_au,` AU) `,(0,$.jsx)(`span`,{className:`star-info-muted`,children:`· worked out from its mass`})]})],[`Bar`,`${Kg(t.bar_half_length*2)} ly long, around it`],...e.facts.map(e=>[e.label,e.value])]}),(0,$.jsx)(Yg,{objects:e.objects,onSelectMaser:n}),(0,$.jsx)(Xg,{refs:[e.mass_ref,...e.facts.map(e=>e.ref),`Reid et al. 2019, ApJ 885, 131 (Table 1)`]})]})}function e_({id:e,card:t,maserShort:n,onSelectMaser:r}){let i=t.nearest<t.width/2,a=t.pitch.map(e=>(t.pitch.length>1?`${e.segment} `:``)+e.deg.map(e=>`${e}°`).join(` then `)).join(`; `);return(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`h3`,{className:`star-info-title`,children:Gm[e]}),(0,$.jsx)(`div`,{className:`star-info-subtitle`,children:e===`Local`?`Arm segment · the Sun is in it`:`Major spiral arm`}),(0,$.jsx)(`p`,{className:`star-info-origin`,children:t.about}),(0,$.jsx)(Jg,{rows:[i?[`The Sun`,`inside it, ${Kg(t.nearest)} ly from its middle`]:[`Nearest`,`${Kg(t.nearest)} ly from the Sun`],[`Length`,`about ${Kg(t.length)} ly as drawn`],[`From the centre`,`${Kg(t.r_range[0])} to ${Kg(t.r_range[1])} ly`],[`Width`,`about ${Kg(t.width)} ly near the Sun`],[`Winds out at`,(0,$.jsxs)($.Fragment,{children:[a,` `,(0,$.jsx)(`span`,{className:`star-info-muted`,children:`· angle to a circle round the centre`})]})],[`Measured`,(0,$.jsxs)($.Fragment,{children:[t.measured,` maser sources (mostly newborn massive stars), with parallaxes`,(0,$.jsx)(`div`,{className:`star-info-muted`,children:n})]})],[`In the sky`,(0,$.jsxs)($.Fragment,{children:[qg(t.constellations),` `,(0,$.jsx)(`span`,{className:`star-info-muted`,children:`· where it lies within ~20,000 ly`})]})]]}),(0,$.jsx)(Yg,{objects:t.objects,onSelectMaser:r}),(0,$.jsx)(Xg,{refs:[t.ref,`Reid et al. 2019, ApJ 885, 131 (Tables 1 and 2, arm tracks and widths)`]}),(0,$.jsx)(`p`,{className:`star-info-muted`,children:`The dots are scattered to match the measured arm, not real stars; the rings are the real masers.`})]})}function t_({id:e,cards:t,onSelect:n,onSelectMaser:r,onView:i,onClose:a}){let o=t.arms[e];return(0,$.jsxs)(`div`,{className:`star-info region-info`,children:[(0,$.jsx)(`button`,{className:`star-info-close`,onClick:a,"aria-label":`Close`,children:`×`}),e===`milky_way`&&(0,$.jsx)(Qg,{card:t.milky_way}),e===`centre`&&(0,$.jsx)($g,{card:t.centre,bar:t.milky_way,onSelectMaser:r}),o&&(0,$.jsx)(e_,{id:e,card:o,maserShort:t.milky_way.maser_short,onSelectMaser:r}),(0,$.jsx)(`button`,{className:`button-primary star-info-fly`,onClick:i,children:e===`milky_way`?`View the whole galaxy`:`Fly there`}),(0,$.jsx)(Zg,{current:e,cards:t,onSelect:n})]})}var n_=e=>{let t=/^G(\d{3}\.\d{2})([+-])(\d{2}\.\d{2})$/.exec(e);return t?[String(Number(t[1]).toFixed(2)),`${t[2]===`-`?`−`:``}${Number(t[3]).toFixed(2)}`]:null},r_=(e,t)=>Number(e.toPrecision(t));function i_({motion:e,sunSpeed:t,distanceTooUncertain:n}){if(!e)return(0,$.jsx)(`span`,{className:`star-info-muted`,children:n?`too uncertain: its parallax is under twice its error, so its distance (and speed) could be far off`:`not known: part of its motion wasn't measured`});let[[r,i],[a,o],[s,c]]=e;return(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`div`,{children:[`round the centre at `,r,` ± `,i,` km/s`]}),(0,$.jsxs)(`div`,{children:[a<0?`inwards`:`outwards`,` `,Math.abs(a),` ± `,o,` km/s, `,s<0?`south`:`north`,` `,Math.abs(s),` ± `,c,` km/s`]}),(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[`The Sun goes round at `,t,` km/s. Worked out from its parallax, proper motion (its drift across the sky) and radial velocity, with their errors.`]})]})}function a_({info:e,cards:t,onArm:n,onView:r,onClose:i}){let a=n_(e.gname),[o,s]=e.plx,[c,l]=e.range,u=o-s<=0,d=e.errorPct>=10?2:3,f=e=>Kg(r_(e,d));return(0,$.jsxs)(`div`,{className:`star-info region-info`,children:[(0,$.jsx)(`button`,{className:`star-info-close`,onClick:i,"aria-label":`Close`,children:`×`}),(0,$.jsx)(`h3`,{className:`star-info-title`,children:e.name}),(0,$.jsxs)(`div`,{className:`star-info-subtitle`,children:[`Maser · `,e.armName]}),e.note&&(0,$.jsx)(`p`,{className:`star-info-origin`,children:e.note}),(0,$.jsx)(Jg,{rows:[[`Distance`,(0,$.jsxs)($.Fragment,{children:[f(e.distance),` ly `,(0,$.jsxs)(`span`,{className:`star-info-muted`,children:[`± `,e.errorPct,`%`]}),(0,$.jsx)(`div`,{className:`star-info-muted`,children:u?`at least ${f(c)} ly: its parallax is within its error of zero`:`likely ${f(c)}–${f(l)} ly (1σ)`})]})],[`Parallax`,(0,$.jsxs)($.Fragment,{children:[o,` ± `,s,` mas `,(0,$.jsx)(`span`,{className:`star-info-muted`,children:`· its tiny yearly shift as Earth goes round the Sun (1 mas = 1/3,600,000°); distance = 1 / parallax`})]})],[`Name`,(0,$.jsxs)($.Fragment,{children:[e.gname,a&&(0,$.jsxs)(`span`,{className:`star-info-muted`,children:[` · its place in Galactic coordinates: longitude `,a[0],`°, latitude `,a[1],`°`]}),e.alias&&e.alias!==e.name&&(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[`also `,e.alias]})]})],[`In the sky`,e.constellation],[`Arm`,e.card?(0,$.jsxs)(`button`,{className:`star-info-link`,onClick:n,children:[e.armName,` ›`]}):e.armName],[`From the centre`,`${Kg(e.rGc)} ly`],[`Motion`,(0,$.jsx)(i_,{motion:e.motion,sunSpeed:t.milky_way.orbit_speed_km_s,distanceTooUncertain:o<2*s})],[`Measured by`,e.refs.join(`; `)]]}),(0,$.jsx)(`p`,{className:`star-info-muted star-info-origin`,children:t.milky_way.maser_short}),(0,$.jsx)(`p`,{className:`star-info-muted`,children:`From Reid et al. 2019, ApJ 885, 131, Table 1, which collects these measurements; the motion uses the Sun's own from their fit A5.`}),(0,$.jsx)(`button`,{className:`button-primary star-info-fly`,onClick:r,children:`Fly there`})]})}function o_({info:e,text:t,onView:n,onClose:r}){let i=e=>Kg(r_(e,3)),a=e=>e>=1e3?`${r_(e/1e3,2)} billion`:`${r_(e,2)} million`,o=e.kind===`nebulae`?[[`Distance`,(0,$.jsxs)($.Fragment,{children:[i(e.distance),` ly `,(0,$.jsxs)(`span`,{className:`star-info-muted`,children:[`± `,i(e.distanceErr),` ly`]})]})],[`Size`,`${(e=>e<10?r_(e,2).toLocaleString():i(e))(2*e.radius)} ly across`],[`In our sky`,e.constellation],...e.models.filter((e,t,n)=>n.findIndex(t=>t.name===e.name)===t).map(e=>[e.name,(0,$.jsxs)($.Fragment,{children:[e.shape[0].toUpperCase()+e.shape.slice(1),e.unknown&&(0,$.jsx)(`div`,{className:`star-info-muted`,children:e.unknown})]})])]:e.kind===`globulars`?[[`Distance`,(0,$.jsxs)($.Fragment,{children:[i(e.distance),` ly `,(0,$.jsxs)(`span`,{className:`star-info-muted`,children:[`± `,i(e.distanceErr),` ly`]})]})],[`From the centre`,`${i(e.rGc)} ly`],e.mass&&[`Mass`,`about ${Kg(r_(e.mass,2))} Suns`],e.rh&&[`Size`,(0,$.jsxs)($.Fragment,{children:[`half its light within `,i(e.rh),` ly of the middle`,e.rt&&(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[`its gravity holds stars out to about `,i(e.rt),` ly (tidal radius)`]})]})],e.vmag!==null&&[`In our sky`,(0,$.jsxs)($.Fragment,{children:[`magnitude `,e.vmag.toFixed(1),(0,$.jsx)(`span`,{className:`star-info-muted`,children:e.vmag<=6?` · visible to the naked eye from a dark site`:` · binoculars or a telescope`}),(0,$.jsx)(`div`,{children:e.constellation})]})],e.starCount>0&&[`Stars drawn`,(0,$.jsxs)($.Fragment,{children:[Kg(e.starCount),` real ones, measured by Gaia`,(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[e.resolved!==null&&`holding ${Math.round(e.resolved*100)}% of its light; `,`the glow is the rest: stars too faint for Gaia, or too crowded in the core to pick out. Each sits at its place in the sky; its depth is drawn from the cluster's measured profile`]})]})]]:[[`Distance`,(0,$.jsxs)($.Fragment,{children:[i(e.distance),` ly `,(0,$.jsxs)(`span`,{className:`star-info-muted`,children:[`likely `,i(e.distanceRange[0]),`–`,i(e.distanceRange[1]),` ly`]})]})],e.age&&[`Age`,(0,$.jsxs)($.Fragment,{children:[`about `,a(e.age),` years`,e.ageRange&&(0,$.jsxs)(`span`,{className:`star-info-muted`,children:[` · likely `,a(e.ageRange[0]),`–`,a(e.ageRange[1])]})]})],[`Stars`,(0,$.jsxs)($.Fragment,{children:[Kg(e.members),` found by Gaia`,e.r50&&(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[`half of them within `,i(e.r50),` ly of the middle`,e.rt?`, held out to about ${i(e.rt)} ly`:``]})]})],e.av!==null&&[`Dust in front`,`${e.av.toFixed(1)} mag (dims it ${Math.round((1-10**(-.4*e.av))*100)}% to the eye)`],[`In our sky`,e.constellation],e.starCount>0&&[`Stars drawn`,(0,$.jsxs)($.Fragment,{children:[Kg(e.starCount),` measured by Gaia, besides any already among the catalogue's stars`,(0,$.jsx)(`div`,{className:`star-info-muted`,children:`each at its own measured distance where that's precise enough (nearby clusters keep their real shape); else at the cluster's, with a depth drawn from its size`})]})]];return(0,$.jsxs)(`div`,{className:`star-info region-info`,children:[(0,$.jsx)(`button`,{className:`star-info-close`,onClick:r,"aria-label":`Close`,children:`×`}),(0,$.jsx)(`h3`,{className:`star-info-title`,children:e.name}),(0,$.jsxs)(`div`,{className:`star-info-subtitle`,children:[Sg[e.kind][0],e.title?` · ${e.title}`:``]}),e.superlative&&(0,$.jsx)(`p`,{className:`star-info-origin`,children:(0,$.jsxs)(`strong`,{children:[e.superlative,`.`]})}),e.note&&(0,$.jsx)(`p`,{className:`star-info-origin`,children:e.note}),e.about&&(0,$.jsx)(`p`,{className:`star-info-origin`,children:e.about}),(0,$.jsx)(Jg,{rows:o}),(0,$.jsx)(`p`,{className:`star-info-muted star-info-origin`,children:t.about}),(0,$.jsx)(Xg,{refs:[...t.refs,...e.refs??[],e.starCount>0&&e.starsRef,e.noteRef]}),(0,$.jsx)(`button`,{className:`button-primary star-info-fly`,onClick:n,children:`Fly there`})]})}var s_={star:`The star at the centre of the Solar System`,planet:`Planet`,"dwarf planet":`Dwarf planet`,moon:`Moon`},c_=(e,t=3)=>Number(e.toPrecision(t)).toLocaleString();function l_(e){return e<.1?`${c_(e*r)} km`:`${e<10?e.toFixed(2):e.toFixed(1)} AU`}function u_(e){let t=Math.abs(e);return t<48?`${c_(t)} hours`:`${c_(t/24)} days`}function d_(e){return e<730?`${c_(e)} days`:`${c_(e/365.25)} years`}var f_=e=>e==null?``:` (within ~${c_(e,2)} km)`;function p_(e){return e.kind===`fit`?`Position from JPL Horizons' orbit for ${e.years[0]}-${e.years[1]}${f_(e.worstKm)}; carried on outside those years, less exactly.`:e.kind===`fit+engine`?`Position from JPL Horizons' orbit for ${e.years[0]}-${e.years[1]}${f_(e.worstKm)}; outside those years from astronomy-engine (within ~2,000 km).`:e.kind===`engine`?`Position from astronomy-engine (within ~1,000 km).`:`Position from one orbit fitted for 2026: approximate away from that year.`}var m_=e=>e.toLocaleDateString(void 0,{year:`numeric`,month:`short`,day:`numeric`,timeZone:`UTC`});function h_({body:e,distances:t,time:r,onClose:i,onFlyTo:a}){let o=e.facts,s=e.id===`Sun`,c=e.surfaceMap,l=o.parent?`${s_[o.type]} of ${o.parent}`:s_[o.type],u=e.id===`Moon`?n(new Date(r)):null;return(0,$.jsxs)(`div`,{className:`star-info`,children:[(0,$.jsx)(`button`,{className:`star-info-close`,onClick:i,"aria-label":`Close`,children:`×`}),(0,$.jsx)(`h3`,{className:`star-info-title`,children:e.name}),(0,$.jsx)(`div`,{className:`star-info-subtitle`,children:l}),(0,$.jsxs)(`dl`,{className:`star-info-facts`,children:[!s&&e.id!==`Earth`&&o.parent!==`Earth`&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:`From Earth`}),(0,$.jsxs)(`dd`,{children:[l_(t.earth),` `,(0,$.jsx)(`span`,{className:`star-info-muted`,children:`now`})]})]}),o.parent&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`dt`,{children:[`From `,o.parent]}),(0,$.jsxs)(`dd`,{children:[l_(t.parent),` `,(0,$.jsx)(`span`,{className:`star-info-muted`,children:`now`}),(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[c_(o.orbit_radius_km??o.distance_mkm*1e6),` km on average`]})]})]}),!s&&!o.parent&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:`From the Sun`}),(0,$.jsxs)(`dd`,{children:[l_(t.sun),` `,(0,$.jsx)(`span`,{className:`star-info-muted`,children:`now`})]})]}),u&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:`Phase`}),(0,$.jsxs)(`dd`,{children:[u.name,` `,(0,$.jsxs)(`span`,{className:`star-info-muted`,children:[`· `,Math.round(u.lit*100),`% lit`]}),u.ageDays!==null&&(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[u.ageDays.toFixed(1),` days since new Moon`]}),(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[u.next.name,`: `,m_(u.next.date)]})]})]}),(0,$.jsx)(`dt`,{children:`Diameter`}),(0,$.jsx)(`dd`,{children:o.diameter_km?(0,$.jsxs)($.Fragment,{children:[c_(o.diameter_km,o.diameter_km<100?2:4),` km`,e.id!==`Earth`&&o.diameter_km>1e3&&(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[c_(o.diameter_km/12756,2),`× Earth`]})]}):(0,$.jsxs)($.Fragment,{children:[`Unknown `,(0,$.jsx)(`span`,{className:`star-info-muted`,children:`(likely a few km)`})]})}),o.mass_earth!=null&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:`Mass`}),(0,$.jsx)(`dd`,{children:e.id===`Earth`?`5.97 × 10²⁴ kg`:`${c_(o.mass_earth,3)}× Earth`})]}),o.gravity_ms2!=null&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:`Gravity`}),(0,$.jsxs)(`dd`,{children:[o.gravity_ms2,` m/s²`,e.id!==`Earth`&&(0,$.jsxs)(`span`,{className:`star-info-muted`,children:[` (`,c_(o.gravity_ms2/9.8,2),`× Earth)`]})]})]}),o.day_h!=null&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:`Day`}),(0,$.jsxs)(`dd`,{children:[u_(o.day_h),o.rotation_h<0&&(0,$.jsx)(`div`,{className:`star-info-muted`,children:`spins backwards (retrograde)`})]})]}),o.orbit_days!=null&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:o.parent?`Orbit`:`Year`}),(0,$.jsx)(`dd`,{children:o.orbit_days<2?u_(o.orbit_days*24):d_(o.orbit_days)})]}),o.temp_c!=null&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:s?`Surface`:`Temperature`}),(0,$.jsxs)(`dd`,{children:[o.temp_c,` °C`,[`Jupiter`,`Saturn`,`Uranus`,`Neptune`].includes(e.id)&&(0,$.jsx)(`div`,{className:`star-info-muted`,children:`at the cloud tops (1 bar)`})]})]}),o.moons!=null&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:`Moons`}),(0,$.jsxs)(`dd`,{children:[o.moons,o.rings&&(0,$.jsx)(`span`,{className:`star-info-muted`,children:` · has rings`})]})]}),c&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:`Surface map`}),(0,$.jsxs)(`dd`,{children:[c.from,(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[`by `,(0,$.jsx)(`a`,{href:c.href,target:`_blank`,rel:`noopener noreferrer`,children:c.by})]}),c.note&&(0,$.jsx)(`div`,{className:`star-info-muted`,children:c.note})]})]})]}),o.position&&(0,$.jsx)(`p`,{className:`star-info-muted star-info-origin`,children:p_(o.position)}),(0,$.jsx)(`button`,{className:`button-primary star-info-fly`,onClick:a,children:s?`View the Solar System`:`Fly to ${e.name}`})]})}var g_={main:{about:`Between Mars and Jupiter, 2.1 to 3.3 AU from the Sun. Jupiter clears gaps in it (the Kirkwood gaps) where an asteroid would go round in step with it. All of it together has about 3% of the Moon's mass, over a third of that in Ceres.`,parts:[{id:`inner`,name:`Inner belt`,about:`Inside the gap at 2.50 AU, where an asteroid would orbit 3 times to Jupiter's 1. Home of Vesta and its family.`},{id:`middle`,name:`Middle belt`,about:`2.50 to 2.82 AU, up to the 5:2 gap.`},{id:`outer`,name:`Outer belt`,about:`2.82 to 3.28 AU, up to the 2:1 gap. Mostly dark, carbon-rich asteroids.`},{id:`cybele`,name:`Cybeles`,about:`Beyond the 2:1 gap, out to about 3.7 AU.`}]},hilda:{about:`Locked in step with Jupiter at about 4 AU: 3 orbits for every 2 of Jupiter's. Seen with Jupiter held still, they crowd into a triangle with corners ahead of, behind and opposite Jupiter.`,parts:[]},trojan:{about:`They share Jupiter's orbit, gathered 60° ahead of it and 60° behind, where the pulls of the Sun and Jupiter balance (the L4 and L5 points). Each rocks slowly around its point, over about 150 years.`,parts:[{id:`l4`,name:`Greek camp (L4)`,about:`Ahead of Jupiter, named after Greek heroes of the Trojan War. About 1.7 times as many as behind.`},{id:`l5`,name:`Trojan camp (L5)`,about:`Behind Jupiter, named after the Trojans. Patroclus and Hector were named before the rule and sit in each other's camps.`}]},neo:{about:`Asteroids that come within 1.3 AU of the Sun, most knocked out of the belt by Jupiter's gaps. Surveys have found most of the ones bigger than 1 km; none of those is known to be on course to hit Earth.`,parts:[{id:`apollo`,name:`Apollos`,about:`Cross Earth's orbit, on orbits bigger than Earth's.`},{id:`aten`,name:`Atens`,about:`Cross Earth's orbit, on orbits smaller than Earth's.`},{id:`amor`,name:`Amors`,about:`Come close but stay just outside Earth's orbit.`},{id:`atira`,name:`Atiras`,about:`Stay inside Earth's orbit all the way round.`}]},centaur:{about:`Icy bodies between Jupiter and Neptune, on orbits the giant planets keep reshaping: each lasts only a few million years before being thrown in or out. They come from the Kuiper belt, and some end up as Jupiter-family comets.`,parts:[]},tno:{about:`Icy bodies beyond Neptune, mostly 30 to 50 AU from the Sun: leftovers from when the planets formed. The split below is by orbit size, so it is rough.`,parts:[{id:`classical`,name:`Classical belt`,about:`40 to 47 AU, on calm orbits Neptune never disturbed: the original belt.`},{id:`plutino`,name:`Plutinos`,about:`3 orbits for every 2 of Neptune's, like Pluto, which keeps them from ever meeting it.`},{id:`twotino`,name:`Twotinos`,about:`1 orbit for every 2 of Neptune's, at about 48 AU.`},{id:`scattered`,name:`Scattered disc`,about:`Flung by Neptune onto long, tilted orbits reaching far beyond the belt.`},{id:`detached`,name:`Detached`,about:`Far out and never coming near Neptune, like Sedna: how they got there is still a puzzle.`},{id:`other`,name:`Others`,about:`In other steps with Neptune, or between these groups.`}]},comet:{about:`Icy bodies that grow a glowing coma and tails as they near the Sun. Grouped by how long they take to go round.`,parts:Wp.map(e=>({id:e.id,name:e.name,color:e.color,about:{jupiter:`Under 20 years (typically 7). Jupiter's pull has shaped their orbits; they come from the Kuiper belt.`,halley:`20 to 200 years (typically 50), often steeply tilted or going round backwards.`,long:`Hundreds to millions of years. They fall in from the Oort cloud.`}[e.id]}))},oort:{about:`A vast cloud of icy bodies thought to surround the Solar System from about 2,000 to 100,000 AU (1.6 light-years), over a third of the way to the nearest star. Nobody has seen it: it is inferred from long-period comets, which fall in from all directions. Drawn here from the usual model (Duncan, Quinn & Tremaine 1987).`,parts:[]}},__={"Halley's Comet":`Eta Aquariids, Orionids`,"109P/Swift-Tuttle":`Perseids`,"55P/Tempel-Tuttle":`Leonids`,Phaethon:`Geminids`},v_=e=>{let t=e/365.25;return t<100?`${Number(t.toPrecision(2))} yr`:`~${Math.round(t).toLocaleString()} yr`};function y_({regionId:e,meta:t,bodies:n,time:r,hiddenParts:i,onTogglePart:a,onSelectBody:o,onClose:s}){let c=g_[e],l=t.regions?.[e]??{},u=e===`oort`?null:t.tiers.reduce((n,r)=>n+r.group_counts[t.groups.findIndex(t=>t.id===e)],0),d=new Date(r),f=t=>n.filter(n=>n.smallBody?n.smallBody.group===e&&(t===null||n.smallBody.subgroup===t):n.id===`Pluto`&&e===`tno`&&(t===null||t===`plutino`)),p=e===`comet`,m=e=>{let t=e.smallBody,n=t?ae(t,d):null,r=n&&N(n),i=p&&r?`${v_(r)}${r<73050?` · next ${ne(n,d).getUTCFullYear()}`:``}`:__[e.name]??(t?.diameter_km?`${t.diameter_estimated?`~`:``}${Number(t.diameter_km.toPrecision(3)).toLocaleString()} km across`:``),a=p&&__[e.name];return(0,$.jsx)(`li`,{children:(0,$.jsxs)(`button`,{className:`region-member`,onClick:()=>o(e.id),children:[(0,$.jsx)(`span`,{children:e.name}),(0,$.jsxs)(`span`,{className:`star-info-muted`,children:[i,a?` · ${a}`:``,` ›`]})]})},e.id)},h=p?n.filter(e=>e.smallBody&&e.smallBody.group===null):[];return(0,$.jsxs)(`div`,{className:`star-info region-info`,children:[(0,$.jsx)(`button`,{className:`star-info-close`,onClick:s,"aria-label":`Close`,children:`×`}),(0,$.jsx)(`h3`,{className:`star-info-title`,children:M[e].label}),(0,$.jsx)(`div`,{className:`star-info-subtitle`,children:e===`oort`?`A model: never seen directly`:`${u.toLocaleString()} with known orbits`}),(0,$.jsx)(`p`,{className:`star-info-origin`,children:c.about}),c.parts.length===0&&f(null).length>0&&(0,$.jsx)(`ul`,{className:`region-members`,children:f(null).map(m)}),c.parts.map(t=>{let n=t.color??wp[e],r=`${e}:${t.id}`,o=i.has(r);return(0,$.jsxs)(`div`,{className:`region-part`,children:[(0,$.jsxs)(`button`,{className:`region-part-head ${o?`off`:``}`,onClick:()=>a(r),title:o?`Show these again`:`Hide these`,"aria-pressed":!o,children:[(0,$.jsx)(`span`,{className:`universe-3d-swatch`,style:{background:n}}),(0,$.jsx)(`strong`,{children:t.name}),(0,$.jsx)(`span`,{className:`region-count`,children:(l[t.id]??0).toLocaleString()})]}),(0,$.jsx)(`div`,{className:`star-info-muted region-part-about`,children:t.about}),f(t.id).length>0&&(0,$.jsx)(`ul`,{className:`region-members`,children:f(t.id).map(m)})]},t.id)}),p&&(0,$.jsxs)(`div`,{className:`region-part`,children:[(0,$.jsxs)(`button`,{className:`region-part-head ${i.has(`comet:once`)?`off`:``}`,onClick:()=>a(`comet:once`),title:i.has(`comet:once`)?`Show these again`:`Hide these`,"aria-pressed":!i.has(`comet:once`),children:[(0,$.jsx)(`span`,{className:`universe-3d-swatch`,style:{background:`transparent`,border:`1px solid #94a3b8`}}),(0,$.jsx)(`strong`,{children:`Seen once`}),(0,$.jsx)(`span`,{className:`region-count`,children:(t.unbound_comets?.count??0).toLocaleString()})]}),(0,$.jsxs)(`div`,{className:`star-info-muted region-part-about`,children:[`Not drawn: their orbits are open, or they were seen too briefly to tell.`,` `,(t.unbound_comets?.sungrazers??0).toLocaleString(),` are tiny sungrazers the SOHO telescope caught diving into the Sun, most of them pieces of one great comet that broke up (the Kreutz family). Most others are Oort cloud comets on their first visit, a few were flung out by Jupiter, and just three came from other stars.`]}),h.length>0&&(0,$.jsx)(`ul`,{className:`region-members`,children:h.map(m)})]}),(0,$.jsx)(`p`,{className:`star-info-muted star-info-origin`,children:e===`oort`?`The dots are scattered to match the model, not real objects.`:`Counts: every object with an orbit in JPL's Small-Body Database; more are found every night.`})]})}var b_=e=>Math.round(e).toLocaleString();function x_({feature:e,onClose:t,onView:n}){let[r,i]=e.km,a=i-r<200&&e.kind!==`group`;return(0,$.jsxs)(`div`,{className:`star-info`,children:[(0,$.jsx)(`button`,{className:`star-info-close`,onClick:t,"aria-label":`Close`,children:`×`}),(0,$.jsx)(`h3`,{className:`star-info-title`,children:e.name}),(0,$.jsx)(`div`,{className:`star-info-subtitle`,children:Ud(e)}),(0,$.jsxs)(`dl`,{className:`star-info-facts`,children:[(0,$.jsxs)(`dt`,{children:[`From `,e.planet]}),(0,$.jsxs)(`dd`,{children:[a?`${b_((r+i)/2)} km`:`${b_(r)} – ${b_(i)} km`,(0,$.jsx)(`div`,{className:`star-info-muted`,children:`from its centre`})]}),(0,$.jsx)(`dt`,{children:`Width`}),(0,$.jsx)(`dd`,{children:e.width??`${b_(i-r)} km`}),(0,$.jsx)(`dt`,{children:`Made of`}),(0,$.jsx)(`dd`,{children:e.madeOf}),e.discovered&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:`Discovered`}),(0,$.jsx)(`dd`,{children:e.discovered})]})]}),(0,$.jsx)(`p`,{className:`star-info-origin`,children:e.note}),(0,$.jsx)(`button`,{className:`button-primary star-info-fly`,onClick:n,children:e.kind===`gap`?`View the gap`:e.kind===`group`?`View the rings`:`View the ring`})]})}var S_={"Main-belt Asteroid":`main belt`,Apollo:`Apollo group`,Aten:`Aten group`,Amor:`Amor group`,"Halley-type Comet":`Halley-type`,"Jupiter-family Comet":`Jupiter-family`,"Encke-type Comet":`Encke-type`},C_=(e,t=3)=>Number(e.toPrecision(t)).toLocaleString();function w_(e){return e<.1?`${C_(e*r)} km`:`${e<10?e.toFixed(2):e.toFixed(1)} AU`}function T_(e){return e<48?`${C_(e)} hours`:`${C_(e/24)} days`}function E_(e){return e<730?`${C_(e)} days`:`${C_(e/365.25)} years`}function D_(e){return e<1?`${C_(e*1e3,2)} m`:`${C_(e,e<100?2:4)} km`}var O_=e=>e.toLocaleDateString(void 0,{year:`numeric`,month:`short`,day:`numeric`,timeZone:`UTC`});function k_({body:t,distances:n,time:r,onClose:i,onFlyTo:a}){let o=t.smallBody,s=ae(o,new Date(r)),c=s.e<1,l=N(s),u=ne(s,new Date(r)),d=u.getTime()<r,f=j(o),p=S_[o.class];return(0,$.jsxs)(`div`,{className:`star-info`,children:[(0,$.jsx)(`button`,{className:`star-info-close`,onClick:i,"aria-label":`Close`,children:`×`}),(0,$.jsx)(`h3`,{className:`star-info-title`,children:o.name}),(0,$.jsxs)(`div`,{className:`star-info-subtitle`,children:[e[o.type],p&&` · ${p}`,o.fullname!==o.name&&(0,$.jsx)(`div`,{className:`star-info-muted`,children:o.fullname})]}),(0,$.jsxs)(`dl`,{className:`star-info-facts`,children:[(0,$.jsx)(`dt`,{children:`From Earth`}),(0,$.jsxs)(`dd`,{children:[w_(n.earth),` `,(0,$.jsx)(`span`,{className:`star-info-muted`,children:`now`})]}),(0,$.jsx)(`dt`,{children:`From the Sun`}),(0,$.jsxs)(`dd`,{children:[w_(n.sun),` `,(0,$.jsx)(`span`,{className:`star-info-muted`,children:`now`})]}),(0,$.jsx)(`dt`,{children:o.type===`comet`||o.type===`interstellar`&&!o.diameter_km?`Nucleus`:`Size`}),(0,$.jsx)(`dd`,{children:o.diameter_km?(0,$.jsxs)($.Fragment,{children:[o.diameter_estimated&&`~`,D_(o.diameter_km),o.diameter_estimated&&(0,$.jsx)(`div`,{className:`star-info-muted`,children:`estimated from its brightness`}),o.size_note&&(0,$.jsx)(`div`,{className:`star-info-muted`,children:o.size_note})]}):(0,$.jsxs)($.Fragment,{children:[`Unknown `,(0,$.jsx)(`span`,{className:`star-info-muted`,children:`(hidden in its glowing coma)`})]})}),o.rotation_h!=null&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:`Day`}),(0,$.jsx)(`dd`,{children:T_(o.rotation_h)})]}),(0,$.jsx)(`dt`,{children:`Orbit`}),(0,$.jsxs)(`dd`,{children:[c?(0,$.jsxs)($.Fragment,{children:[E_(l),(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[w_(s.q),` to `,w_(F(s)*(1+s.e)),` from the Sun`]})]}):(0,$.jsxs)($.Fragment,{children:[`Not bound to the Sun`,(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[`passing through once, `,w_(s.q),` from the Sun at closest`]})]}),s.i>90&&(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[`goes round backwards (tilted `,Math.round(s.i),`°)`]})]}),(0,$.jsx)(`dt`,{children:d?`Closest to Sun`:`Next closest`}),(0,$.jsx)(`dd`,{children:O_(u)}),t.surfaceMap&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:`Surface map`}),(0,$.jsxs)(`dd`,{children:[t.surfaceMap.from,(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[`by `,(0,$.jsx)(`a`,{href:t.surfaceMap.href,target:`_blank`,rel:`noopener noreferrer`,children:t.surfaceMap.by})]}),t.surfaceMap.note&&(0,$.jsx)(`div`,{className:`star-info-muted`,children:t.surfaceMap.note})]})]}),o.discovery&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:`Found`}),(0,$.jsx)(`dd`,{className:`star-info-muted`,children:o.discovery.replace(/^Discovered /,``)})]})]}),o.note&&(0,$.jsx)(`p`,{className:`star-info-origin`,children:o.note}),o.name_origin&&(0,$.jsxs)(`p`,{className:`star-info-muted star-info-origin`,children:[`Name: `,o.name_origin]}),(0,$.jsx)(`p`,{className:`star-info-muted star-info-origin`,children:f?`Orbit from JPL Horizons, which includes the planets' pull, ${f[0]}-${f[1]}`+(o.orbit?.check?` (within ~${Number(o.orbit.check.worst_km.toPrecision(2)).toLocaleString()} km)`:``)+(f[0]>1600||f[1]<2499?`: only approximate outside those years.`:`.`):`Position from its orbit around the Sun alone (JPL Small-Body Database): close for years around now, drifting over decades as the planets tug it.`}),(0,$.jsxs)(`button`,{className:`button-primary star-info-fly`,onClick:a,children:[`Fly to `,o.name]})]})}var A_=[[`Mercury`,.387],[`Venus`,.723],[`Earth`,1],[`Mars`,1.524],[`Jupiter`,5.203],[`Saturn`,9.537]];function j_({radiusRef:e,radiusMethod:t,radiusBib:n}){return e?t===`diam`?(0,$.jsxs)($.Fragment,{children:[`measured diameter ·`,` `,(0,$.jsx)(`a`,{href:`https://ui.adsabs.harvard.edu/abs/${n}`,target:`_blank`,rel:`noopener noreferrer`,children:e})]}):e:`estimated from its brightness and colour`}function M_({radius:e,radiusRef:t,radiusMethod:n,radiusBib:i}){let a=e*fd,o=a/r,s=t?3:2,c=e>=10**s?Math.round(e).toLocaleString():Number(e.toPrecision(s)).toLocaleString(),l=o>=.1?`${Number(o.toPrecision(s))} AU`:`${Number(a.toPrecision(s)).toLocaleString()} km`,u=A_.filter(([,e])=>o>e).pop();return(0,$.jsxs)($.Fragment,{children:[t?``:`~`,c,`× the Sun's`,(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[l,` · `,(0,$.jsx)(j_,{radiusRef:t,radiusMethod:n,radiusBib:i})]}),u&&(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[`In the Sun's place it would reach past `,u[0],`'s orbit`]})]})}var N_=.25;function P_(e){return e<10?e.toFixed(1):e<1e3?String(Math.round(e)):(Math.round(e/10)*10).toLocaleString()}function F_(e){return e>=1?`${Number(e.toPrecision(2)).toLocaleString()}× the Sun`:`1/${Number((1/e).toPrecision(2)).toLocaleString()} of the Sun`}function I_({dist:e,err:t}){let{low:n,high:r}=fe(e,t);if(t<.1){let n=t<.01?`<1`:Math.round(t*100);return(0,$.jsxs)($.Fragment,{children:[P_(e),` ly `,(0,$.jsxs)(`span`,{className:`star-info-muted`,children:[`± `,n,`%`]})]})}return r===null?(0,$.jsxs)($.Fragment,{children:[`over `,P_(n),` ly`,(0,$.jsx)(`div`,{className:`star-info-muted`,children:`too far for its parallax to be measured well`})]}):(0,$.jsxs)($.Fragment,{children:[`~`,P_(e),` ly`,(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[`likely `,P_(n),`–`,P_(r),` ly`]})]})}function L_({star:e,lineInfo:n,onClose:r,onFlyTo:i,onFocus:a}){let o=t(n?.bayer),s=e.name||o||`HIP ${e.hip}`,c=[e.name&&o,n?.constellations.join(`, `),`HIP ${e.hip}`].filter(Boolean).join(` · `),l=e.err>=N_,u=g(e.spect);return(0,$.jsxs)(`div`,{className:`star-info`,children:[(0,$.jsx)(`button`,{className:`star-info-close`,onClick:r,"aria-label":`Close`,children:`×`}),(0,$.jsx)(`h3`,{className:`star-info-title`,children:s}),(0,$.jsx)(`div`,{className:`star-info-subtitle`,children:c}),(0,$.jsxs)(`dl`,{className:`star-info-facts`,children:[(0,$.jsxs)(`dt`,{children:[`Distance `,l&&(0,$.jsx)(`span`,{className:`star-info-approx`,children:`approx.`})]}),(0,$.jsxs)(`dd`,{children:[(0,$.jsx)(I_,{dist:e.dist,err:e.err}),(0,$.jsx)(`div`,{className:`star-info-muted`,children:e.src===`lit`?`Published estimate (its own parallax is too uncertain)`:`${e.src===`gaia`?`Gaia DR3`:`Hipparcos`} parallax`})]}),e.spect&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`dt`,{children:`Type`}),(0,$.jsxs)(`dd`,{children:[u?`${u[0].toUpperCase()}${u.slice(1)}`:`Star`,(0,$.jsxs)(`span`,{className:`star-info-muted`,children:[` (`,e.spect,`)`]})]})]}),e.radius&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`dt`,{children:[`Radius `,!e.radiusRef&&(0,$.jsx)(`span`,{className:`star-info-approx`,children:`est.`})]}),(0,$.jsx)(`dd`,{children:(0,$.jsx)(M_,{radius:e.radius,radiusRef:e.radiusRef,radiusMethod:e.radiusMethod,radiusBib:e.radiusBib})})]}),(0,$.jsx)(`dt`,{children:`Brightness`}),(0,$.jsxs)(`dd`,{children:[`Magnitude `,e.mag.toFixed(2),` from Earth`,(0,$.jsxs)(`div`,{className:`star-info-muted`,children:[l?`~`:``,F_(b(e.mag,e.dist)),` in visible light`]})]})]}),n?.origin&&(0,$.jsxs)(`p`,{className:`star-info-origin`,children:[(0,$.jsxs)(`strong`,{children:[`Name origin`,n.culturalGroup?` (${n.culturalGroup})`:``,`:`]}),` `,n.origin]}),(0,$.jsxs)(`div`,{className:`star-info-actions`,children:[(0,$.jsx)(`button`,{className:`button-secondary star-info-fly`,onClick:a,title:`Turn to face it without moving`,children:`Focus on`}),(0,$.jsx)(`button`,{className:`button-primary star-info-fly`,onClick:i,children:`Fly to star`})]})]})}var R_={constellation:`✧`,star:`★`,planet:`●`,region:`∴`,galaxy:`◎`,maser:`◌`};function z_({items:e,starBuffers:t,onSelect:n}){let[r,i]=(0,I.useState)(``),[a,s]=(0,I.useState)(0),[c,l]=(0,I.useState)(!1),u=(0,I.useRef)(null),d=(0,I.useMemo)(()=>o(e,t,r),[e,t,r]);(0,I.useEffect)(()=>s(0),[r]),(0,I.useEffect)(()=>{let e=e=>{e.key===`/`&&document.activeElement!==u.current&&(e.preventDefault(),u.current.focus())};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[]);let f=e=>{n(e),i(``),u.current.blur()},p=e=>{e.stopPropagation(),e.key===`ArrowDown`?(e.preventDefault(),s(e=>Math.min(e+1,d.length-1))):e.key===`ArrowUp`?(e.preventDefault(),s(e=>Math.max(e-1,0))):e.key===`Enter`&&d[a]?f(d[a]):e.key===`Escape`&&(i(``),u.current.blur())},m=c&&r.trim()!==``;return(0,$.jsxs)(`div`,{className:`universe-3d-search`,children:[(0,$.jsx)(`input`,{ref:u,type:`text`,value:r,placeholder:`Search stars, planets, constellations  ( / )`,"aria-label":`Search stars, planets or constellations`,onChange:e=>i(e.target.value),onKeyDown:p,onFocus:()=>l(!0),onBlur:()=>l(!1)}),m&&(0,$.jsxs)(`ul`,{className:`universe-3d-search-results`,role:`listbox`,children:[d.length===0&&(0,$.jsx)(`li`,{className:`universe-3d-search-empty`,children:`No matches`}),d.map((e,t)=>(0,$.jsxs)(`li`,{role:`option`,"aria-selected":t===a,className:t===a?`active`:``,onMouseDown:t=>{t.preventDefault(),f(e)},onMouseEnter:()=>s(t),children:[(0,$.jsx)(`span`,{className:`universe-3d-search-icon`,children:R_[e.type]}),(0,$.jsxs)(`span`,{className:`universe-3d-search-text`,children:[(0,$.jsx)(`span`,{className:`universe-3d-search-label`,children:e.label}),(0,$.jsx)(`span`,{className:`universe-3d-search-sublabel`,children:e.sublabel})]})]},`${e.type}-${e.abbrev??e.starIndex??e.id}`))]})]})}var B_=31557600,V_=[1,60,3600,86400,604800,2629800,B_],H_=B_;function U_(e,t){let n=[...V_.map(e=>-e).reverse(),...V_],r=1e-6*Math.max(1,Math.abs(e));return(t>0?n.find(t=>t>e+r):[...n].reverse().find(t=>t<e-r))??(t>0?H_:-31557600)}var W_=.06,G_=.025,K_=Math.log10(H_),q_=e=>W_+.94*Math.log10(e)/K_;function J_(e){return e===0?0:Math.sign(e)*q_(Math.min(Math.abs(e),H_))}function Y_(e){let t=Math.abs(e);if(t<W_)return 0;let n=V_.find(e=>Math.abs(q_(e)-t)<G_)??10**((t-W_)/.94*K_);return Math.sign(e)*n}var X_=[[B_,`year`],[2629800,`month`],[604800,`week`],[86400,`day`],[3600,`hour`],[60,`min`],[1,`sec`]];function Z_(e){let t=Math.abs(e);if(t===0)return`Stopped`;if(Math.abs(t-1)<1e-9)return`Real time`;let[n,r]=X_.find(([e])=>t>=e*.999)??X_[X_.length-1],i=t/n,a=i<9.95?Number(i.toFixed(1)):Math.round(i);return`${a} ${r}${a===1||r===`min`||r===`sec`?``:`s`}/s`}var Q_=[1800,2200],$_=[Date.UTC(1600,0,1),Date.UTC(2500,0,1)],ev=864e5,tv=[{id:`day`,label:`Day`,half:ev,ends:{month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`}},{id:`month`,label:`Month`,half:30.44*ev,ends:{month:`short`,day:`numeric`,year:`numeric`}},{id:`year`,label:`Year`,half:B_*1e3,ends:{month:`short`,year:`numeric`}},{id:`decade`,label:`Decade`,half:10*B_*1e3,ends:{year:`numeric`}},{id:`century`,label:`Century`,half:100*B_*1e3,ends:{year:`numeric`}},{id:`all`,label:`All`,half:null,ends:{year:`numeric`}}],nv=1e4,rv=e=>String(e).padStart(2,`0`),iv=e=>{let t=new Date(e);return`${String(t.getFullYear()).padStart(4,`0`)}-${rv(t.getMonth()+1)}-${rv(t.getDate())}T${rv(t.getHours())}:${rv(t.getMinutes())}`},av=e=>Math.min($_[1],Math.max($_[0],e));function ov(e,t){if(!e.half)return $_;let n=Math.min(e.half,($_[1]-$_[0])/2),r=Math.min($_[1]-2*n,Math.max($_[0],t-n));return[r,r+2*n]}function sv({time:e,rate:t,playing:n,onTogglePlay:r,onSetRate:i,onStep:a,onNow:o,onSetTime:s}){let c=(0,I.useRef)(null),[l,u]=(0,I.useState)(`year`),d=tv.find(e=>e.id===l),[f,p]=(0,I.useState)(e),[m,h]=ov(d,f),g=(0,I.useRef)(!1);(0,I.useEffect)(()=>{!g.current&&(e<m||e>h)&&p(e)},[e,m,h]);let _=e=>new Date(e).toLocaleString(void 0,d.ends),v=new Date(e),y=n&&Math.abs(t)<=60,b=v.toLocaleString(void 0,{weekday:`short`,year:`numeric`,month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`,...y?{second:`2-digit`}:{}}),x=v.getFullYear(),S=x<Q_[0]||x>Q_[1],C=n&&t===1&&Math.abs(e-Date.now())<6e4,w=n?`${t<0?`◀ `:``}${Z_(t)}`:`Paused`;return(0,$.jsxs)(`div`,{className:`universe-3d-time`,children:[(0,$.jsxs)(`div`,{className:`universe-3d-time-row`,children:[(0,$.jsx)(`button`,{onClick:()=>a(-1),title:`Slower / backwards ( [ )`,"aria-label":`Slower`,children:`«`}),(0,$.jsx)(`button`,{onClick:r,title:`Play / pause (Space)`,"aria-label":n?`Pause`:`Play`,children:n?`❚❚`:`▶`}),(0,$.jsx)(`button`,{onClick:()=>a(1),title:`Faster ( ] )`,"aria-label":`Faster`,children:`»`}),(0,$.jsx)(`span`,{className:`universe-3d-time-speed`,children:w}),(0,$.jsx)(`button`,{className:`universe-3d-time-now`,onClick:o,disabled:C,title:`Back to now (T)`,children:`Now`})]}),(0,$.jsxs)(`div`,{className:`universe-3d-time-slider`,children:[(0,$.jsx)(`span`,{"aria-hidden":`true`,children:`◀`}),(0,$.jsx)(`input`,{type:`range`,className:`universe-3d-time-speed-slider`,min:-1e3,max:1e3,step:1,value:Math.round(J_(t)*1e3),onChange:e=>i(Y_(Number(e.target.value)/1e3)),"aria-label":`Time speed`,title:`Speed: drag right to run forwards, left to run backwards`}),(0,$.jsx)(`span`,{"aria-hidden":`true`,children:`▶`})]}),(0,$.jsxs)(`div`,{className:`universe-3d-time-date`,children:[(0,$.jsx)(`button`,{title:`Jump to a date`,onClick:()=>{try{c.current.showPicker()}catch{c.current.focus()}},children:b}),(0,$.jsx)(`input`,{ref:c,type:`datetime-local`,tabIndex:-1,"aria-label":`Date and time`,value:iv(e),min:iv($_[0]),max:iv($_[1]),onChange:e=>{let t=new Date(e.target.value).getTime();Number.isNaN(t)||s(t)}})]}),(0,$.jsxs)(`div`,{className:`universe-3d-time-slider universe-3d-time-scrub`,children:[(0,$.jsx)(`div`,{className:`universe-3d-time-spans`,role:`group`,"aria-label":`Scrubber reach`,children:tv.map(t=>(0,$.jsx)(`button`,{className:t.id===l?`active`:``,"aria-pressed":t.id===l,onClick:()=>{u(t.id),p(e)},title:t.half?`Scrub a ${t.label.toLowerCase()} either side`:`Scrub the whole of 1600-2500`,children:t.label},t.id))}),(0,$.jsx)(`input`,{type:`range`,min:0,max:nv,step:1,value:Math.round((e-m)/(h-m)*nv),onPointerDown:()=>{g.current=!0},onPointerUp:()=>{g.current=!1},onChange:e=>s(av(m+Number(e.target.value)/nv*(h-m))),"aria-label":`Date`,title:`Drag to move through time`}),(0,$.jsxs)(`div`,{className:`universe-3d-time-scrub-ends`,"aria-hidden":`true`,children:[(0,$.jsx)(`span`,{children:_(m)}),(0,$.jsx)(`span`,{children:_(h)})]})]}),S&&(0,$.jsx)(`div`,{className:`universe-3d-time-note`,children:`Some moons extrapolated (past JPL's orbits)`})]})}var cv=4.83,lv=30,uv=2e3,dv=.65,fv=7,pv=1,mv=.35,hv=1.6,gv=2.5,_v=1.6,vv=5,yv=.01,bv=6,xv=1.2,Sv=6378/r/i,Cv=.3,wv=10,Tv=12,Ev=.3,Dv=1e-9,Ov=60,kv=18,Av=6,jv=24,Mv=48,Nv={planet:0,"dwarf planet":1,moon:2},Pv=4,Fv=5,Iv=2e3,Lv={main:9,hilda:12,trojan:16,neo:4,centaur:70,tno:140,comet:14,other:10,oort:4e5},Rv=[{kind:`constellation`,label:`Selected constellation`,title:`The figure of the constellation picked in search, in blue`},{kind:`allConstellations`,label:`All constellations`,title:`All 88 figures, faint, with their names`},{kind:`planetOrbits`,label:`Planet orbits`,needs:`planets`},{kind:`moonOrbits`,label:`Moon orbits`,needs:`planets`,title:`The larger moons' orbits, and a selected small moon's`},{kind:`smallBodyOrbits`,label:`Asteroid & comet orbits`,needs:`planets`,title:`Pluto and the other dwarf planets, a selected asteroid or comet, and every comet when viewing the Comets region`},{kind:`maserRanges`,label:`Maser distance ranges`,needs:`masers`,title:`The faint line through each measured maser: its distance's uncertainty`}],zv=`
    attribute float absMag;
    attribute vec3 color;
    uniform vec3 uCamHigh;
    uniform vec3 uCamLow;
    ${wd}

    void main() {
        vec3 relative = (position - uCamHigh) - uCamLow;
        vec4 mvPosition = vec4(mat3(modelViewMatrix) * relative, 1.0);
        float distPc = max(length(mvPosition.xyz) / ${m}, 1e-9);
        float mag = absMag + 5.0 * log(distPc) / log(10.0) - 5.0;
        spriteFromMagnitude(mag, color);
        gl_Position = projectionMatrix * mvPosition;
    }
`,Bv=`
    ${Td}

    void main() {
        vec4 light = sprite();
        if (light.a <= 0.0) discard;
        gl_FragColor = light;
    }
`,Vv=`
    uniform sampler2D tDiffuse;
    uniform float luminosityThreshold;
    varying vec2 vUv;
    void main() {
        vec4 texel = texture2D(tDiffuse, vUv);
        float v = luminance(texel.rgb);
        gl_FragColor = vec4(texel.rgb * max(v - luminosityThreshold, 0.0) / max(v, 1e-4), 1.0);
    }
`,Hv=`
    uniform float uSize;
    void main() {
        gl_PointSize = uSize;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,Uv=`
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uSize;
    uniform float uWidth;
    void main() {
        float d = length(gl_PointCoord - 0.5) * uSize;  // px from the centre
        float outer = uSize * 0.47;
        float inner = outer - uWidth;
        float alpha = smoothstep(inner - 1.0, inner, d) * (1.0 - smoothstep(outer, outer + 1.0, d)) * uOpacity;
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(uColor, alpha);
    }
`;function Wv(){return{uCamHigh:{value:new J},uCamLow:{value:new J}}}function Gv(e,t){let n=e.uCamHigh.value.set(Math.fround(t.x),Math.fround(t.y),Math.fround(t.z));e.uCamLow.value.subVectors(t,n)}function Kv(e,t,n,r,i,a=24){let o=new wi;return o.setAttribute(`position`,new li(e,3)),o.setAttribute(`color`,new li(t,3)),o.setAttribute(`absMag`,new li(n,1)),new wa(o,new Ha({uniforms:{uPixelRatio:{value:r},uMaxSize:{value:a},uMinAlpha:{value:yd},uGlare:{value:0},uGlareMag:{value:pv},...i},vertexShader:zv,fragmentShader:Bv,transparent:!0,depthWrite:!1,blending:2}))}function qv(e,t,n){let r=new wi;r.setAttribute(`position`,new li(new Float32Array(3),3));let i=new wa(r,new Ha({uniforms:{uSize:{value:n},uWidth:{value:n*.1},uColor:{value:new Z().setHex(e,jt)},uOpacity:{value:t}},vertexShader:Hv,fragmentShader:Uv,transparent:!0,depthTest:!1,depthWrite:!1}));return i.renderOrder=10,i.visible=!1,i.frustumCulled=!1,i.userData={minSize:n,opacity:t},i}var Jv=[90,150];function Yv(e,t,n){let{minSize:r,opacity:i}=e.userData,a=(t*2*1.25+10)*n;e.material.uniforms.uSize.value=Math.max(r,a),e.material.uniforms.uOpacity.value=i*(1-bn.smoothstep(t,...Jv))}function Xv(e,t){e.visible=t!==null,t&&e.position.set(t[0],t[1],t[2])}function Zv(e,t,n){let r=new wi;return r.setAttribute(`position`,new fi(e,3)),new _a(r,new aa({color:t,transparent:!0,opacity:n,depthWrite:!1}))}function Qv(e){e&&(e.geometry.dispose(),e.material.dispose())}function $v(e){let t=e*i;return t<.01?`${Number((t*r).toPrecision(3)).toLocaleString()} km`:e<.05?`${t<10?t.toFixed(2):Math.round(t).toLocaleString()} AU`:e<10?`${e.toFixed(2)} ly`:`${Math.round(e).toLocaleString()} ly`}function ey(e,t){return e.distanceTo(t)<Sv?`Earth`:`${$v(e.length())} from the Sun`}var ty=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2;function ny({constellationData:n,stars3d:o,planetFacts:l,moonsData:g,smallBodies:_,onBack:v}){let[y,b]=(0,I.useState)(null),[S,C]=(0,I.useState)(!0),[w,T]=(0,I.useState)({constellation:!0,allConstellations:!1,planetOrbits:!0,moonOrbits:!0,smallBodyOrbits:!0,maserRanges:!0}),E=e=>S&&w[e],[D,O]=(0,I.useState)(!0),[k,A]=(0,I.useState)(!0),[j,N]=(0,I.useState)(!0),[te,P]=(0,I.useState)(!0),[ne,re]=(0,I.useState)(()=>new Set),[ie,ae]=(0,I.useState)(!1),[F,oe]=(0,I.useState)(!0),[se,ce]=(0,I.useState)(!1),[le,ue]=(0,I.useState)(`idle`),[de,fe]=(0,I.useState)(null),[pe,L]=(0,I.useState)(!0),[me,he]=(0,I.useState)(null),[ge,_e]=(0,I.useState)(!0),ve=(0,I.useRef)(null),ye=(0,I.useRef)(null),R=(0,I.useRef)(null);if(!ve.current){let e=e=>fetch(`/star-quiz/data/`+e).then(t=>{if(!t.ok)throw Error(`Failed to load ${e}: ${t.statusText}`);return t});ve.current=Zh(t=>e(t).then(e=>e.json()),t=>e(t).then(e=>e.arrayBuffer())),ye.current=Zh(t=>e(t).then(e=>e.json()),t=>e(t).then(e=>e.arrayBuffer()),`stars_rrlyrae.json`),R.current=sh(t=>e(t).then(e=>e.json()),t=>e(t).then(e=>e.arrayBuffer()))}let[be,xe]=(0,I.useState)(`idle`),[Se,Ce]=(0,I.useState)(!0),[we,Te]=(0,I.useState)(!0),[z,Ee]=(0,I.useState)(!0),[De,Oe]=(0,I.useState)(!0),[ke,Ae]=(0,I.useState)(!1),[je,B]=(0,I.useState)(!1),[V,Me]=(0,I.useState)(null),[Ne,Pe]=(0,I.useState)(null),[Fe,Ie]=(0,I.useState)(null),[Le,Re]=(0,I.useState)(null),[ze,Be]=(0,I.useState)(!1),Ve=Object.fromEntries(ng.map(e=>[e,!1])),[He,H]=(0,I.useState)(()=>Object.fromEntries(ng.map(e=>[e,!0]))),[Ue,We]=(0,I.useState)(null),[Ge,Ke]=(0,I.useState)(null),[qe,Je]=(0,I.useState)(Ve),Ye=(e,t)=>H(n=>({...n,[e]:t})),Xe=(0,I.useRef)(null),Ze=()=>{if(!Xe.current){let e=e=>fetch(`/star-quiz/data/${e}`).then(t=>{if(!t.ok)throw Error(`Failed to load ${e}: ${t.statusText}`);return t.json()}),t=e(`landmarks.json`).catch(e=>(console.error(`Error loading the landmarks:`,e),null));Xe.current=Promise.all([e(`galaxy.json`),t]).then(([e,t])=>(e.landmarks=t,Pe(e.cards),Re(e.masers),Ke(t),e)).catch(e=>{throw Xe.current=null,e})}return Xe.current},[Qe,$e]=(0,I.useState)(null),[et,tt]=(0,I.useState)(null),[nt,rt]=(0,I.useState)(null),[it,at]=(0,I.useState)(null),[ot,st]=(0,I.useState)(()=>new Set),[ct,lt]=(0,I.useState)(()=>{try{let e=localStorage.getItem(`universe3d.panelOpen`);if(e!==null)return e===`1`}catch{}return window.innerWidth>767}),ut=()=>lt(e=>{try{localStorage.setItem(`universe3d.panelOpen`,e?`0`:`1`)}catch{}return!e}),dt=(0,I.useRef)(null),ft=(0,I.useRef)(null),[pt,mt]=(0,I.useState)(!1);(0,I.useEffect)(()=>{let e=dt.current,t=ft.current;if(!e||!t)return;let n=()=>{let n=t.offsetParent;if(!ct||!n||t.offsetHeight===0||window.matchMedia(`(max-width: 767px)`).matches){mt(!1);return}let r=n.getBoundingClientRect().top,i=e.getBoundingClientRect().bottom-r,a=n.clientHeight-parseFloat(getComputedStyle(t).bottom)-t.offsetHeight;mt(a<i+8)};n();let r=new ResizeObserver(n);return r.observe(e),r.observe(t),window.addEventListener(`resize`,n),()=>{r.disconnect(),window.removeEventListener(`resize`,n)}},[ct,o]);let[ht,gt]=(0,I.useState)(()=>l?{type:`body`,id:`Earth`}:{type:`none`}),[_t,vt]=(0,I.useState)(!1),[yt,bt]=(0,I.useState)(()=>!window.matchMedia(`(pointer: coarse)`).matches),[xt,St]=(0,I.useState)(pv),[Ct,wt]=(0,I.useState)(1),Tt=(0,I.useRef)(null),Et=(0,I.useRef)(null),Dt=(0,I.useRef)(null),Ot=(0,I.useRef)(null),kt=(0,I.useRef)(null),At=(0,I.useRef)(null),U=(0,I.useRef)(null),jt=(0,I.useRef)(null);jt.current||={time:Date.now(),rate:1,playing:!0};let[Mt,Nt]=(0,I.useState)(()=>({...jt.current})),Pt=(0,I.useRef)({}),Ft=(0,I.useMemo)(()=>o?h(o):null,[o]),It=(0,I.useMemo)(()=>o?.gaia?ee(o.gaia):null,[o]),Lt=(0,I.useMemo)(()=>f(n),[n]),Rt=(0,I.useMemo)(()=>Ft?[...p(n,Ft,Lt,l,g,_?.meta),...qm.map(e=>({...e,type:`galaxy`,terms:[e.label,...e.terms].map(s),sortKey:-11})),...Le?Le.name.map((e,t)=>{let n=Zm(Le,t);return{type:`maser`,id:t,label:n.name,sublabel:`Maser · ${n.armName}`,terms:[...new Set([n.name,n.gname,n.alias].filter(Boolean))].map(s),sortKey:5}}):[],...ng.flatMap(e=>Ge?.[e]?Ge[e].name.map((t,n)=>{let r=xg(e,Ge[e],n);return{type:`cluster`,kind:e,id:n,label:r.name,sublabel:`${Sg[e][0]}${r.title?` · ${r.title}`:``}`,terms:r.ids.map(s),sortKey:r.labelled?-5:15}}):[])]:[],[n,Ft,Lt,l,g,_,Le,Ge]);Pt.current={showLines:S,lineKinds:w,showLabels:D,showPlanets:k,showSmallBodies:te,showOort:Se,showGalaxy:we,showMasers:z,showClusters:He,showBand:De,showDust:ge,showFarStars:F,showAllFarStars:se,showHaloStars:pe,selectedAbbrev:y,selectedHips:(0,I.useMemo)(()=>new Set(y?n[y].stars.map(e=>Number(e.hip)):[]),[n,y]),selectedRing:nt,selectedRegion:it,selectedGalaxy:V,selectedMaser:Fe,selectedCluster:Ue};let zt=e=>{tt(null),rt(null),at(null),Me(null),Ie(null),We(null),$e(e)},Bt=e=>{$e(null),rt(null),at(null),Me(null),Ie(null),We(null),tt(e)};(0,I.useEffect)(()=>{let e=setTimeout(()=>Ze().catch(()=>{}),0);return()=>clearTimeout(e)},[]),(0,I.useEffect)(()=>{if(!Ft)return;let e=Tt.current,o=Et.current,s=Dt.current,d=Math.min(window.devicePixelRatio,2),f=new Cu({antialias:!0});f.setPixelRatio(d),f.setClearColor(132106),e.appendChild(f.domElement);let p=new No(Ov,1,1e-4,1e6);p.up.set(0,1,0);let h=cd({name:`universe`,unit:1,near:Dv,far:1e6}),v=vd(Ft),y=cd({name:`solar system`,unit:1/i,near:1e-7,far:1e5}),b=cd({name:`sky`,unit:1,origin:()=>p.position,near:.1,far:1e3});b.visible=!1;let S=[b,h,v.layer,y],C=h.scene,w=h.camera,T=y.camera,E=()=>S.forEach(e=>ld(e,p)),D=l?Cp(y.scene,l,g,d,_?.meta):null;D?.update(new Date(jt.current.time));let O=D&&_?Kp(y.scene,_.meta,d):null;O?.addTier(0,_.points,_.parts),O?.update(new Date(jt.current.time));let k=new J;D?.byId.has(`Earth`)&&k.copy(D.byId.get(`Earth`).position).divideScalar(i);let A=t=>{let n=D?.byId.get(t);if(!n)return null;let r=n.position.clone().divideScalar(i),a=bn.degToRad(p.fov)/Math.max(e.clientHeight,1),o=Nf(n.surfaceMap,a),s;if(t===`Sun`)s=k.clone().normalize().add(Xf.clone().multiplyScalar(1.2)).normalize().multiplyScalar(60/i);else{let e=Math.max(t===`Saturn`?9:6,o*1.5);s=r.clone().normalize().negate().add(Xf.clone().multiplyScalar(.35)).normalize().multiplyScalar(n.radiusAu*e/i)}return{position:r.clone().add(s).toArray(),target:r.toArray(),minDistance:n.radiusAu*o/i}},j=e=>{let t=Hd.get(e),n=t&&D?.byId.get(t.planet);if(!n)return null;let a=new J(...Nd(t.planet)),o=n.position.clone().negate().normalize();a.dot(o)<0&&a.negate();let s=new J().crossVectors(a,o).normalize(),c=n.position.clone().addScaledVector(s,Gd(t)/r),l=Math.max(Wd(t)*Fv,Iv)/r;return{position:c.clone().addScaledVector(o.multiplyScalar(.5).add(a).normalize(),l).divideScalar(i).toArray(),target:c.divideScalar(i).toArray(),minDistance:l*.02/i}},ee=e=>({position:(k.lengthSq()>0?k.clone().normalize():new J(1,0,0)).add(Xf.clone().multiplyScalar(1.2)).normalize().multiplyScalar(e/i).toArray(),target:[0,0,0],minDistance:e*.01/i}),N=new Pu(p,f.domElement);N.enableDamping=!0,N.dampingFactor=.08,N.rotateSpeed=.5,N.zoomSpeed=vv,N.minDistance=yv,N.maxDistance=3e5;let te=A(`Earth`);te?(p.position.set(...te.position),N.target.set(...te.target),N.minDistance=te.minDistance):N.target.set(0,0,-500);let P=Wv(),ne=Kv(Ft.positions,Ft.colors,Ft.absMags,d,P);C.add(ne);let re=It?Kv(It.bright.positions,It.bright.colors,It.bright.absMags,d,P):null;re&&C.add(re);let ie=It?Kv(It.faint.positions,It.faint.colors,It.faint.absMags,d,P):null;ie&&(ie.material.uniforms.uMinAlpha.value=0,C.add(ie));let ae=[],F=new Set,oe=!1,se=e=>{if(F.has(e))return;F.add(e),e>0&&ue(`loading`);let t=ve.current;t.meta().then(e=>{oe||fe(e)}).catch(()=>{}),t.load(e).then(t=>{if(oe)return;let n=Kv(t.positions,t.colors,t.absMags,d,P);n.material.uniforms.uMinAlpha.value=ne.material.uniforms.uMinAlpha.value,ae[e]=n,C.add(n),Ue(),e>0&&ue(`loaded`)}).catch(t=>{console.error(`Error loading Gaia stars:`,t),F.delete(e),e>0&&ue(`error`)})},ce=null,le=!1,de=()=>{le||(le=!0,ye.current.load(0).then(e=>{oe||(ce=Kv(e.positions,e.colors,e.absMags,d,P),C.add(ce),he(e.count),Ue())}).catch(e=>{console.error(`Error loading the RR Lyrae stars:`,e),le=!1}))},I=()=>[ne,re,ie,Oe,...ae,ce,...Object.values(Te)].filter(Boolean),pe=cm(C,d),L=window.matchMedia(`(pointer: coarse)`).matches,me=lh(R.current),ge=!1,_e=()=>{ge||(ge=!0,me.load(0).catch(e=>{console.error(`Error loading the dust map:`,e),ge=!1}))},be=eh(C,d,Ze,{lite:L}),xe=null,Se=null,Ce={},we={},Te={},z=new Set,Ee=!1,De=e=>{let t=we[e],n=e===`nebulae`?t?.models.flat().map(e=>e.file)??[]:[t?.stars?.file];!z.has(e)&&n.some(Boolean)&&(z.add(e),Promise.all(n.map(e=>e&&fetch(`/star-quiz/data/${e}`).then(t=>{if(!t.ok)throw Error(`Failed to load ${e}: ${t.statusText}`);return t.arrayBuffer()}))).then(n=>{if(Ee)return;if(e===`nebulae`){Ce[e].addModels(n);return}let r=Tg(n[0],t),i=Kv(r.positions,r.colors,r.absMags,d,P);i.material.uniforms.uMinAlpha.value=ne.material.uniforms.uMinAlpha.value,Te[e]=i,C.add(i),Ue()}).catch(t=>{console.error(t),z.delete(e)}))};Ze().then(e=>{if(!Ee){me.setGalaxyFrame(e.to_scene),xe=Vh(f,b.scene,e,{lite:L,dust:me}),Se=Jh(C,e,{lite:L,dust:me,background:f.getClearColor(new Z)});for(let t of ng)e.landmarks?.[t]&&(we[t]=e.landmarks[t],Ce[t]=Rg(C,t,we[t],d))}}).catch(e=>console.error(`Error loading the galaxy model:`,e));let Oe=Kv(new Float32Array([0,0,0]),new Float32Array(a(dv)),new Float32Array([cv]),d,P,40);C.add(Oe);let ke=qv(13358561,.6,26*d),je=qv(16436245,.9,30*d);C.add(ke,je);let V=qv(13358561,.6,26*d),Ne=qv(16436245,.9,30*d),Pe=qv(6333946,.9,18*d),Fe=qv(6333946,.9,18*d);y.scene.add(V,Ne,Pe),C.add(Fe);let Le=new td(f),Re=ud(Le,S),ze=new rd(new q(1,1),.6,.4,.6),He=new rd(new q(1,1),.6,.4,hv);He.materialHighPassFilter.fragmentShader=Vv,Le.addPass(ze),Le.addPass(He),Le.addPass(new ad);let H={scene:C,camera:p,controls:N,selectedRing:je,bodySelectedRing:Ne,solar:D,cloud:O,selectedLines:null,allLines:null,flight:null,haze:!1,glare:!1,glareMag:pv,glarePeak:mv,earthPosition:k,bodyPose:A,ringPose:j,regionPose:ee,follow:{id:te?`Earth`:null,moveTarget:!0},selectedBodyId:null};H.setFollow=(e,t=!0)=>{H.follow={id:e&&D?.byId.has(e)?e:null,moveTarget:t},H.focused=!0},H.focused=!0;let Ue=()=>{ze.enabled=H.haze,He.enabled=H.glare;let e=H.glare?H.glarePeak:0;I().forEach(t=>{t.material.uniforms.uGlare.value=e,t.material.uniforms.uGlareMag.value=H.glareMag}),D?.setGlare(e,H.glareMag)};H.setHaze=e=>{H.haze=e,Ue()},H.setGlare=e=>{H.glare=e,Ue()},H.setGlareTuning=(e,t)=>{H.glareMag=e,H.glarePeak=t,Ue()},U.current=H,H.flyTo=(e,t,n=yv)=>{let r=new J(...e),i=new J(...t);N.minDistance=Math.min(N.minDistance,n),H.flight={fromTarget:N.target.clone(),toTarget:i,fromOffset:p.position.clone().sub(N.target),toOffset:r.clone().sub(i),pivot:r,minDistance:n,start:performance.now()}},N.addEventListener(`start`,()=>{H.flight=null});let Ge=new J,Ke=new J,qe=new xn,Ye=new xn,Xe=new xn,Qe=(e,t,n,r,i,a)=>{Ge.subVectors(t,i),Ke.subVectors(n,i);let o=Ge.length(),s=Ke.length();return o<1e-12&&s<1e-12?e.lerpVectors(t,n,r):(o<1e-12&&(Ge.copy(Ke),o=Math.min(a,s),Ge.setLength(o)),s<1e-12&&(Ke.copy(Ge),s=Math.min(a,o),Ke.setLength(s)),Ge.divideScalar(o),Ke.divideScalar(s),Ye.setFromUnitVectors(Ge,Ke),Xe.slerpQuaternions(qe,Ye,r),e.copy(Ge).applyQuaternion(Xe).multiplyScalar(o*(s/o)**+r).add(i))},et=new J,nt=new J,it=e=>{let t=H.flight;if(!t)return;let n=Math.min(1,(e-t.start)/(_v*1e3)),r=ty(n),i=Math.max(.01*Math.min(t.fromOffset.length(),t.toOffset.length()),1e-12);Qe(N.target,t.fromTarget,t.toTarget,r,t.pivot,i),Qe(nt,t.fromOffset,t.toOffset,r,et,i),p.position.copy(N.target).add(nt),n===1&&(N.target.copy(t.toTarget),p.position.copy(t.toTarget).add(t.toOffset),N.minDistance=t.minDistance,H.flight=null)},{positions:ot,absMags:st,count:ct}=Ft,lt=new Un,ut=(e,t,n)=>{let r=f.domElement.getBoundingClientRect(),i=e-r.left,a=t-r.top;ld(h,p),lt.multiplyMatrices(w.projectionMatrix,w.matrixWorldInverse);let o=lt.elements,s=w.position,c=null,l=1/0;for(let e=0;e<ct;e++){let t=ot[e*3],u=ot[e*3+1],d=ot[e*3+2],f=o[3]*t+o[7]*u+o[11]*d+o[15];if(f<=0)continue;let p=((o[0]*t+o[4]*u+o[8]*d+o[12])/f+1)/2*r.width,h=(1-(o[1]*t+o[5]*u+o[9]*d+o[13])/f)/2*r.height,g=Math.hypot(p-i,h-a);if(g>n)continue;let _=Math.max(Math.hypot(t-s.x,u-s.y,d-s.z)/m,1e-4),v=st[e]+5*Math.log10(_)-5;if(v>fv)continue;let y=g+v*2;y<l&&(l=y,c=e)}return c},dt=e=>{let n=u(Ft,e);return n.name||t(Lt.get(n.hip)?.bayer)||`HIP ${n.hip}`},ft=0,pt=new J,mt=(e,t,n)=>{let r=e.position.distanceTo(T.position);if(r<e.radiusAu*1.5||(pt.copy(e.position).applyMatrix4(T.matrixWorldInverse),pt.z>=0)||(pt.applyMatrix4(T.projectionMatrix),Math.abs(pt.x)>1.05||Math.abs(pt.y)>1.05))return null;let i=e.radiusAu/r*(n/2)/Math.tan(bn.degToRad(T.fov)/2);return{x:(pt.x+1)/2*t,y:(1-pt.y)/2*n,radiusPx:i}},ht=()=>D&&y.visible&&ft>=Cv,_t=()=>ft<Cv,vt=!1,yt=(e,t,n)=>{if(!D)return null;let r=ht();if(!r&&!vt)return null;let i=f.domElement.getBoundingClientRect(),a=e-i.left,o=t-i.top;ld(y,p);let s=null,c=1/0;for(let e of D.bodies){let t=e.id===`Earth`;if(!r&&!t||!D.isShown(e)||e.major===!1&&D.minorMoonFade(e.parentId)<.5)continue;let l=mt(e,i.width,i.height);if(!l)continue;let u=Math.hypot(l.x-a,l.y-o),d=t&&vt?Math.max(l.radiusPx,Tv):Math.max(l.radiusPx,0);if(!(u>d+n)){if(t&&(u-=Tv),e.parentId){let t=mt(D.byId.get(e.parentId),i.width,i.height);if(t&&Math.hypot(l.x-t.x,l.y-t.y)<wv+t.radiusPx)continue;u+=3}u<c&&(c=u,s=e.id)}}return s===`Earth`&&_t()?`Sun`:s},bt=(e,t,n)=>{if(!O||!y.visible)return null;let r=f.domElement.getBoundingClientRect();return ld(y,p),O.pick(T,r.width,r.height,e-r.left,t-r.top,n)},xt=(e,t,n)=>{let r=f.domElement.getBoundingClientRect();return ld(h,p),be.pickMaser(w,r.width,r.height,e-r.left,t-r.top,n)},St=(e,t,n)=>{let r=f.domElement.getBoundingClientRect();ld(h,p);for(let i of ng){if(!Ce[i]||!Pt.current.showClusters[i])continue;let a=Ce[i].pick(w,r.width,r.height,e-r.left,t-r.top,n);if(a!==null)return{kind:i,index:a}}return null},Ct=(e,t,n,r=!1)=>{let i=yt(e,t,n);if(i!==null)return{type:`body`,id:i};let a=xt(e,t,Math.min(n,10));if(a!==null)return{type:`maser`,index:a};let o=St(e,t,Math.min(n,10));if(o!==null)return{type:`cluster`,...o};let s=r?bt(e,t,Math.min(n,8)):null;if(s)return{type:`cloud`,...s};let c=ut(e,t,n);return c===null?null:{type:`star`,index:c}},wt=null,Mt=()=>{wt||(wt=`loading`,fetch(`/star-quiz/data/${_.meta.names_file}`).then(e=>{if(!e.ok)throw Error(`Failed to load asteroid names: ${e.statusText}`);return e.json()}).then(e=>{wt=e}).catch(e=>{console.error(e),wt=null}))},Rt=new Map((_?.meta.groups??[]).map(e=>[e.id,e.name])),zt=e=>{Mt();let t=Rt.get(e.groupId);if(typeof wt!=`object`||!wt)return t;let n=wt.H[e.index],r=n===null?null:1329/Math.sqrt(.14)*10**(-n/5),i=r===null||e.groupId===`comet`?``:` · ~${r<1?`${Math.round(r*1e3)} m`:`${Number(r.toPrecision(2))} km`}`;return`${wt.names[e.index]} · ${t}${i}`},Bt=e=>{if(Xv(ke,e?.type===`star`?ot.subarray(e.index*3,e.index*3+3):e?.type===`maser`?be.maser(e.index).position:e?.type===`cluster`?Ce[e.kind].info(e.index).position:null),Xv(V,e?.type===`body`?D.byId.get(e.id).position.toArray():e?.type===`cloud`?e.position:null),e?.type===`cloud`){let e=V.material.uniforms;e.uSize.value=V.userData.minSize,e.uOpacity.value=V.userData.opacity}H.hoverBodyId=e?.type===`body`?e.id:null},Vt=()=>{let{clientWidth:t,clientHeight:n}=e;for(let[e,r]of[[Ne,H.selectedBodyId],[V,H.hoverBodyId]]){let i=e.visible&&r?D?.byId.get(r):null;if(!i)continue;e.position.copy(i.position);let a=mt(i,t,n);a?Yv(e,a.radiusPx,d):e.material.uniforms.uOpacity.value=0}},Ht=null,Ut=null,W=null,G=null,Wt=null,Gt=e=>{Ht={x:e.clientX,y:e.clientY},Bt(null),s.style.display=`none`},Kt=e=>{let t=Ut,n=W,r=G,i=Wt;if(Ut=null,W=null,G=null,Wt=null,!Ht||e.button!==0)return;let a=Math.hypot(e.clientX-Ht.x,e.clientY-Ht.y);if(Ht=null,a>5)return;let o=t||n||r||i?null:Ct(e.clientX,e.clientY,e.pointerType===`touch`?24:14,!0);Me(r),Ie(o?.type===`maser`?o.index:null),We(i??(o?.type===`cluster`?{kind:o.kind,index:o.index}:null)),$e(o?.type===`star`?o.index:null),tt(o?.type===`body`?o.id:null),rt(t),at(n??(o?.type===`cloud`&&M[o.groupId]?o.groupId:null))},qt=null,Jt=e=>{e.pointerType!==`mouse`||e.buttons!==0||qt||(qt=requestAnimationFrame(()=>{qt=null;let t=Ct(e.clientX,e.clientY,12,!0);Bt(t),f.domElement.style.cursor=t===null?``:`pointer`,t===null?s.style.display=`none`:(s.textContent=t.type===`star`?dt(t.index):t.type===`cloud`?zt(t):t.type===`maser`?be.maser(t.index).label:t.type===`cluster`?Ce[t.kind].info(t.index).label:D.byId.get(t.id).name,s.style.display=`block`,s.style.transform=`translate(${e.clientX+14}px, ${e.clientY+10}px)`)}))},Yt=()=>{Bt(null),s.style.display=`none`},Xt=f.domElement;Xt.addEventListener(`pointerdown`,Gt),Xt.addEventListener(`pointerup`,Kt),Xt.addEventListener(`pointermove`,Jt),Xt.addEventListener(`pointerleave`,Yt);let Zt=(e,t)=>{let n=document.createElement(`div`);return n.className=t,n.textContent=e,n.style.display=`none`,o.appendChild(n),n},Qt=[];for(let e=0;e<ct;e++){let t=u(Ft,e);t.name&&Qt.push({index:e,hip:t.hip,el:Zt(t.name,`universe-3d-label`),shown:!1})}let K=Object.values(n).map(e=>({abbrev:e.abbrev,position:new J(...c(e,Ft)),el:Zt(e.name,`universe-3d-label universe-3d-label-constellation`),shown:!1})),$t=(D?.bodies??[]).filter(e=>e.major!==!1).map(e=>({body:e,el:Zt(e.name,`universe-3d-label universe-3d-label-planet${e.id===`Earth`?` universe-3d-label-earth`:``}`),shown:!1,w:0,h:0})),en,tn=e=>{let t=({body:t})=>t.id===`Sun`?0:t.id===`Earth`?1:t.id===e?2:3+(Nv[t.type]??3);$t.sort((e,n)=>t(e)-t(n)||n.body.radiusAu-e.body.radiusAu),en=e},nn=(e,t)=>{e.addEventListener(`pointerdown`,e=>{e.preventDefault(),t(),Xt.dispatchEvent(new PointerEvent(`pointerdown`,e)),Xt.hasPointerCapture(e.pointerId)||Xt.setPointerCapture(e.pointerId)}),e.addEventListener(`wheel`,e=>{e.preventDefault(),Xt.dispatchEvent(new WheelEvent(`wheel`,e))},{passive:!1})},rn=D?Vd.filter(e=>D.byId.has(e.planet)).map(e=>{let t=Zt(e.name,`universe-3d-label universe-3d-label-ring${e.kind===`gap`?` universe-3d-label-gap`:``}`);return nn(t,()=>{Ut=e.id}),{feature:e,el:t,shown:!1,selected:!1,pole:new J(...Nd(e.planet)),labelAu:Gd(e)/r,scaleAu:Wd(e)/r,minPx:e.kind===`gap`?Av:kv,w:0,h:0}}):[],an={position:new J(...lm),el:Zt(`Oort cloud (model)`,`universe-3d-label universe-3d-label-constellation universe-3d-label-link`),shown:!1,selected:!1};nn(an.el,()=>{W=`oort`});let on=[],sn={},cn=!1,ln=()=>{let e=[...$t,...rn];for(let t of e)t.el.style.display=`block`;for(let t of e)t.w=t.el.offsetWidth,t.h=t.el.offsetHeight;for(let t of e)t.el.style.display=t.shown?`block`:`none`;cn=!0},un=[],dn=e=>un.some(t=>e.x<t.x+t.w+Pv&&t.x<e.x+e.w+Pv&&e.y<t.y+t.h&&t.y<e.y+e.h),fn=new J,pn=(e,t,n)=>(fn.copy(e).project(w),fn.z>1||Math.abs(fn.x)>1.05||Math.abs(fn.y)>1.05?null:[(fn.x+1)/2*t,(1-fn.y)/2*n]),mn=(e,t,n,r)=>{let i=t!==null;i!==e.shown&&(e.el.style.display=i?`block`:`none`,e.shown=i),i&&(e.el.style.transform=`translate(${t[0]+n}px, ${t[1]+r}px)`)},hn=new J,gn=new J,_n=new J,vn=new J,yn=new J,Sn=(e,t,n,r,i)=>{let a=D.byId.get(e.feature.planet),o=a.position,s=o.distanceTo(T.position);if(!t&&e.scaleAu/s*i<e.minPx)return null;let{pole:c}=e;yn.setFromMatrixColumn(T.matrixWorld,0),gn.copy(yn).addScaledVector(c,-yn.dot(c)),gn.lengthSq()<.05&&(yn.setFromMatrixColumn(T.matrixWorld,1),gn.copy(yn).addScaledVector(c,-yn.dot(c))),gn.normalize(),_n.crossVectors(c,gn);let l=mt(a,n,r),u=jv,d=t=>{if(vn.copy(o).addScaledVector(gn,e.labelAu*Math.cos(t)).addScaledVector(_n,e.labelAu*Math.sin(t)),pt.copy(vn).applyMatrix4(T.matrixWorldInverse),pt.z>=0)return null;pt.applyMatrix4(T.projectionMatrix);let i=(pt.x+1)/2*n,a=(1-pt.y)/2*r;return i<u||i>n-u||a<u||a>r-u||l&&vn.distanceTo(T.position)>s&&Math.hypot(i-l.x,a-l.y)<l.radiusPx?null:[i,a]},f=d(0);if(f)return f;let p=null,m=1/0;for(let e=1;e<Mv;e++){let t=d(e/Mv*2*Math.PI),i=t&&Math.hypot(t[0]-n/2,t[1]-r/2);t&&i<m&&(p=t,m=i)}return p},Cn=()=>{let t=Pt.current,{clientWidth:n,clientHeight:r}=e;for(let e of Qt){let i=null;if(t.showLabels){hn.fromArray(ot,e.index*3);let a=Math.max(hn.distanceTo(w.position)/m,1e-4),o=st[e.index]+5*Math.log10(a)-5,s=t.selectedHips.has(e.hip);(o<=gv||s&&o<=fv)&&(i=pn(hn,n,r))}mn(e,i,8,-8)}for(let e of K){let i=t.showLabels&&(e.abbrev===t.selectedAbbrev||t.showLines&&t.lineKinds.allConstellations);mn(e,i?pn(e.position,n,r):null,0,0)}mn(an,t.showLabels&&pe.fade()>.3?pn(an.position,n,r):null,0,0);let i=t.selectedRegion===`oort`;i!==an.selected&&(an.el.classList.toggle(`selected`,i),an.selected=i),on.length||(on=be.labels().map(e=>{let t=Zt(e.name,`universe-3d-label universe-3d-label-constellation universe-3d-label-link`);return nn(t,()=>{G=e.id}),{id:e.id,position:e.position,el:t,shown:!1,selected:!1}}));let a=[],o=e=>a.some(t=>e.x<t.x+t.w+Pv&&t.x<e.x+e.w+Pv&&e.y<t.y+t.h&&t.y<e.y+e.h),s=e=>{e.w||(e.el.style.display=`block`,e.w=e.el.offsetWidth,e.h=e.el.offsetHeight,e.el.style.display=e.shown?`block`:`none`)},c=t.showLabels&&be.fade()>.3;for(let e of on){let i=c?pn(e.position,n,r):null;i&&(s(e),a.push({x:i[0]-e.w/2,y:i[1]-e.h/2,w:e.w,h:e.h})),mn(e,i,0,0);let o=t.selectedGalaxy===e.id;o!==e.selected&&(e.el.classList.toggle(`selected`,o),e.selected=o)}let l=[];for(let e of ng){if(!Ce[e])continue;sn[e]||(sn[e]=Ce[e].labels().map(t=>{let n=Zt(t.name,`universe-3d-label universe-3d-label-link`);return nn(n,()=>{Wt={kind:e,index:t.index}}),{index:t.index,position:t.position,el:n,shown:!1,selected:!1,w:0,h:0}}));let i=t.showLabels&&t.showClusters[e]&&Ce[e].fade()>.3;for(let a of sn[e]){let o=t.selectedCluster?.kind===e&&t.selectedCluster.index===a.index;o!==a.selected&&(a.el.classList.toggle(`selected`,o),a.selected=o);let s=i?pn(a.position,n,r):null;s?l.push({label:a,p:s,selected:o,d:a.position.distanceToSquared(w.position)}):mn(a,null,0,0)}}l.sort((e,t)=>t.selected-e.selected||e.d-t.d);for(let{label:e,p:t,selected:n}of l){s(e);let r={x:t[0]+8,y:t[1]-8,w:e.w,h:e.h},i=n||!o(r);i&&a.push(r),mn(e,i?[r.x,r.y]:null,0,0)}!cn&&n>0&&ln(),H.selectedBodyId!==en&&tn(H.selectedBodyId),un.length=0;let u=null,d=!1,f=_t()?`Solar System`:`Earth`;for(let e of $t){let{body:i}=e,a=i.id===`Earth`;a&&e.el.textContent!==f&&(e.el.textContent=f);let o=null,s=t.showLabels&&(a||t.showPlanets&&ht()&&D.isShown(i))?mt(i,n,r):null;if(i.id===`Sun`&&(u=s),s){let t=Math.min(s.radiusPx,r/4)*.7,n=a&&u&&Math.hypot(u.x-s.x,u.y-s.y)<16,i={x:s.x+t+8,y:s.y-t+(n?8:-8),w:e.w,h:e.h};(a||!dn(i))&&(un.push(i),o=[i.x,i.y],a&&(d=s.radiusPx<5))}mn(e,o,0,0)}let p=t.showLabels&&t.showPlanets&&ht(),h=r/2/Math.tan(bn.degToRad(T.fov)/2);for(let e of rn){let i=e.feature.id===t.selectedRing,a=p?Sn(e,i,n,r,h):null,o=a&&{x:a[0]-e.w/2,y:a[1]-e.h/2,w:e.w,h:e.h},s=o&&(i||!dn(o));s&&un.push(o),mn(e,s?a:null,0,0),i!==e.selected&&(e.el.classList.toggle(`selected`,i),e.selected=i)}vt=d,Pe.visible=d&&y.visible,Fe.visible=d&&!y.visible,d&&(Pe.position.copy(D.byId.get(`Earth`).position),Fe.position.copy(k))},Y=()=>{let{clientWidth:t,clientHeight:n}=e;f.setSize(t,n),Le.setPixelRatio(d),Le.setSize(t,n),p.aspect=t/n,p.updateProjectionMatrix(),D?.setViewportHeight(n*d)};Y();let wn=new ResizeObserver(Y);wn.observe(e);let Tn=``,En=()=>{let t=kt.current,n=At.current;if(!t||!n)return;let{clientWidth:r,clientHeight:i}=e;if(!i)return;let a=Math.min(120,r*.25),o=2*p.position.distanceTo(N.target)*Math.tan(bn.degToRad(p.fov)/2)/i,{lengthLy:s,label:c}=x(a*o),l=s/o,u=`${Math.round(l)}|${c}`;u!==Tn&&(Tn=u,t.style.width=`${Math.round(l)}px`,n.textContent=c)},Dn=new J,X=new J,On=jt.current.time,kn=e=>{let t=H.follow.id?D.byId.get(H.follow.id):null;if(t&&Dn.copy(t.position),D.update(new Date(e)),O?.update(new Date(e)),D.byId.has(`Earth`)&&k.copy(D.byId.get(`Earth`).position).divideScalar(i),!t)return;X.subVectors(t.position,Dn).divideScalar(i),p.position.add(X),H.follow.moveTarget&&N.target.add(X);let n=H.flight;n&&(n.pivot.add(X),H.follow.moveTarget?(n.fromTarget.add(X),n.toTarget.add(X)):n.toOffset.add(X))},An=null,jn=0,Mn=e=>{let t=jt.current,n=An===null?0:Math.min(e-An,250);An=e,t.playing&&(t.time=bn.clamp(t.time+n*t.rate,$_[0],$_[1])),D&&t.time!==On&&(kn(t.time),On=t.time),e-jn>250&&(jn=e,Nt({...t}))},Nn=new J,Pn=()=>{Nn.copy(p.position).multiplyScalar(i);let e=1/0;for(let t of D.bodies)D.isShown(t)&&(e=Math.min(e,t.position.distanceTo(Nn)-t.radiusAu));return bn.clamp(e*Ev,1e-9,1e3)},Fn=new J,In,Ln=``,Rn=!1,zn=!1,Bn=!1,Vn=Ve,Hn=t=>{Mn(t),it(t),Fn.copy(N.target),N.update();let n=1e-6*p.position.distanceTo(N.target)+1e-12*N.target.length();!H.flight&&H.focused&&Fn.distanceTo(N.target)>n&&(H.focused=!1,H.follow={id:null,moveTarget:!0},gt({type:`none`})),ft=D?D.fadeForDistance(p.position.length()*i):0,D?.setFade(ft),y.visible=ft>0&&Pt.current.showPlanets,O?.setFade(ft),O?.setCameraDistance(p.position.length()*i),pe.setVisible(Pt.current.showOort),pe.update(p.position.length()),be.setVisible(Pt.current.showGalaxy),be.setMasersVisible(Pt.current.showMasers),be.setMaserRangesVisible(Pt.current.showLines&&Pt.current.lineKinds.maserRanges);let r=Pt.current.selectedMaser===null?null:be.maser(Pt.current.selectedMaser);be.highlightMasers(r?r.card:Pt.current.selectedGalaxy===`milky_way`?null:Pt.current.selectedGalaxy),be.update(p.position);let a=Pt.current.showGalaxy&&Pt.current.showDust;me.setEnabled(a),a&&_e(),xe&&(xe.setVisible(Pt.current.showGalaxy&&Pt.current.showBand),xe.update(p.position),b.visible=xe.fade()>0),Se?.setFade(be.fade()*(1-(xe?xe.fade():0))),Se?.update(p.position);let o={};for(let t of ng){let n=Ce[t];if(o[t]=!1,!n)continue;let r=Pt.current.showGalaxy&&Pt.current.showClusters[t];n.setVisible(r),n.update(p.position,e.clientHeight,p.fov),r&&(Pt.current.selectedCluster?.kind===t||p.position.length()>lv&&n.nearest(p.position)<uv)&&De(t),Te[t]&&(Te[t].visible=r),n.setStarsOn(!!Te[t]?.visible),o[t]=n.fade()>.3}ng.some(e=>o[e]!==Vn[e])&&(Vn=o,Je(o));let s=be.fade()>.3;s!==Rn&&(Rn=s,Ae(s));let c=be.maserFade()>.3;c!==Bn&&(Bn=c,Be(c));let l=!!O&&y.visible&&ft>=Cv;l!==zn&&(zn=l,B(l));let u=yd*(1-bn.smoothstep(p.position.length(),...um));I().forEach(e=>{e!==Oe&&e!==ie&&e!==ce&&(e.material.uniforms.uMinAlpha.value=u)});let d=Pt.current;d.showFarStars&&p.position.length()>lv&&se(0),d.showFarStars&&d.showAllFarStars&&se(1),d.showFarStars&&d.showHaloStars&&p.position.length()>lv&&de(),ae.forEach((e,t)=>{e&&(e.visible=d.showFarStars&&(t===0||d.showAllFarStars))}),ce&&(ce.visible=d.showFarStars&&d.showHaloStars),D&&(y.near=Pn()),v.update(p,e.clientHeight),E(),Gv(P,w.position),D?.updateMinorMoonFade(T.position,e.clientHeight,p.fov),D?.updateTextures(T.position,e.clientHeight,p.fov),D?.updateRingView(T.position),D?.updateBrightness(T.position),Vt(),dd(Re,S),Le.render(),Cn(),En();let f=ey(N.target,H.earthPosition);f!==Ln&&Ot.current&&(Ot.current.textContent=f,Ln=f),In=requestAnimationFrame(Hn)};return In=requestAnimationFrame(Hn),()=>{cancelAnimationFrame(In),qt&&cancelAnimationFrame(qt),wn.disconnect(),Xt.removeEventListener(`pointerdown`,Gt),Xt.removeEventListener(`pointerup`,Kt),Xt.removeEventListener(`pointermove`,Jt),Xt.removeEventListener(`pointerleave`,Yt),N.dispose(),oe=!0,[ne,re,ie,Oe,...ae,ce,...Object.values(Te),ke,je,V,Ne,Pe,Fe,H.selectedLines,H.allLines].forEach(Qv),D?.dispose(),O?.dispose(),pe.dispose(),be.dispose(),Ee=!0,xe?.dispose(),Se?.dispose(),Object.values(Ce).forEach(e=>e.dispose()),me.dispose(),v.dispose(),ze.dispose(),He.dispose(),Le.dispose(),f.dispose(),e.removeChild(Xt),o.replaceChildren(),U.current=null}},[Ft,It,Lt,n,l,g,_]);let Vt=e=>{let t=U.current;t&&(t.setFollow(`Earth`,!1),t.flyTo(t.earthPosition.toArray(),c(n[e],Ft)),gt({type:`constellation`}))},Ht=()=>{let e=U.current;if(!e)return;let t=e.bodyPose(`Earth`);t?(e.setFollow(`Earth`),e.flyTo(t.position,t.target,t.minDistance),gt({type:`body`,id:`Earth`})):y?Vt(y):(e.setFollow(null),e.flyTo([0,0,0],[0,0,-500]),gt({type:`none`}))},Ut=e=>{let t=U.current,n=t?.bodyPose(e);n&&(t.setFollow(e),t.flyTo(n.position,n.target,n.minDistance),gt({type:`body`,id:e}))},W=e=>{let t=U.current,n=t?.ringPose(e);n&&(t.setFollow(Hd.get(e).planet),t.flyTo(n.position,n.target,n.minDistance),gt({type:`ring`,id:e}))},G=e=>{let t=Ft.radius[e];return Number.isNaN(t)?null:_d(t)},Wt=e=>{let t=G(e);return t?t*xv:yv},Gt=e=>{let t=U.current;if(!t)return;let n=Array.from(Ft.positions.subarray(e*3,e*3+3));t.setFollow(t.follow.id,!1),t.flyTo(t.camera.position.toArray(),n,Wt(e)),gt({type:`star`,index:e})},Kt=e=>{let t=U.current;if(!t)return;e===`oort`?Ce(!0):re(t=>new Set([...t].filter(t=>t!==e))),A(!0);let n=t.regionPose(Lv[e]);t.setFollow(null),t.flyTo(n.position,n.target,n.minDistance),gt({type:`region`,id:e}),zt(null),at(e)},qt=e=>{let t=U.current;t&&(Te(!0),zt(null),Me(e),gt({type:`galaxy`,id:e}),Ze().then(n=>{let r=Ym(n,e);r&&U.current===t&&(t.setFollow(null),t.flyTo(r.position,r.target,r.minDistance))}).catch(e=>console.error(`Error loading the galaxy model:`,e)))},Jt=e=>{zt(null),Me(e),Ze().catch(e=>console.error(`Error loading the galaxy model:`,e))},Yt=e=>{zt(null),Ie(e)},Xt=e=>{let t=U.current;t&&(Te(!0),Ee(!0),Yt(e),gt({type:`maser`,index:e}),Ze().then(n=>{if(U.current!==t)return;let r=Qm(n,e);t.setFollow(null),t.flyTo(r.position,r.target,r.minDistance)}).catch(e=>console.error(`Error loading the galaxy model:`,e)))},Zt=(e,t)=>{zt(null),We({kind:e,index:t})},Qt=(e,t)=>{let n=U.current;n&&(Te(!0),Ye(e,!0),Zt(e,t),gt({type:`cluster`,kind:e,index:t}),Ze().then(r=>{if(U.current!==n||!r.landmarks?.[e])return;let i=wg(e,r.landmarks[e],t);n.setFollow(null),n.flyTo(i.position,i.target,i.minDistance)}).catch(e=>console.error(`Error loading the galaxy model:`,e)))},K=e=>{e.type===`galaxy`?qt(e.id):e.type===`maser`?Xt(e.id):e.type===`cluster`?Qt(e.kind,e.id):e.type===`region`?Kt(e.id):e.type===`constellation`?(b(e.abbrev),Vt(e.abbrev)):e.type===`star`?(zt(e.starIndex),$t(e.starIndex)):e.type===`planet`&&(sn(e.id),Bt(e.id),Ut(e.id))},$t=e=>{let t=U.current;if(!t)return;let n=Array.from(Ft.positions.subarray(e*3,e*3+3)),r=t.earthPosition.toArray(),i=n.map((e,t)=>e-r[t]),a=Math.hypot(...i),o=G(e),s=1-(o?o*bv:Math.min(Math.max(a*.05,.3),15))/a;t.setFollow(null),t.flyTo(i.map((e,t)=>r[t]+e*s),n,Wt(e)),gt({type:`star`,index:e})},en=e=>{Object.assign(jt.current,e),Nt({...jt.current})},tn=()=>en({playing:!jt.current.playing}),nn=e=>en({rate:U_(jt.current.rate,e),playing:!0}),rn=e=>en({rate:e,playing:!0}),an=()=>en({time:Date.now(),rate:1,playing:!0}),on=e=>en({time:bn.clamp(e,$_[0],$_[1])});(0,I.useEffect)(()=>{let e=U.current;e&&(e.selectedLines&&=(e.scene.remove(e.selectedLines),Qv(e.selectedLines),null),y&&(e.selectedLines=Zv(d(n[y],Ft),6333946,.8),e.selectedLines.visible=E(`constellation`),e.scene.add(e.selectedLines)))},[y,Ft,l]),(0,I.useEffect)(()=>{let e=U.current;e&&(e.selectedLines&&(e.selectedLines.visible=E(`constellation`)),E(`allConstellations`)&&!e.allLines&&(e.allLines=Zv(Object.values(n).flatMap(e=>d(e,Ft)),9741240,.25),e.scene.add(e.allLines)),e.allLines&&(e.allLines.visible=E(`allConstellations`)),e.solar?.setShowOrbits({planets:E(`planetOrbits`),moons:E(`moonOrbits`),smallBodies:E(`smallBodyOrbits`)}))},[S,w,Ft,l,g,_]),(0,I.useEffect)(()=>{U.current?.setHaze(_t)},[_t,Ft]),(0,I.useEffect)(()=>{U.current?.setGlare(yt)},[yt,Ft]),(0,I.useEffect)(()=>{U.current?.setGlareTuning(xt,mv*Ct)},[xt,Ct,Ft]),(0,I.useEffect)(()=>{U.current?.solar?.setShowMinorMoons(j)},[j,Ft,l,g]),(0,I.useEffect)(()=>{let e=U.current,t=it===`comet`||ht.type===`region`&&ht.id===`comet`;e?.cloud?.setGroupOrbits(`comet`,t&&E(`smallBodyOrbits`)),e?.solar?.setCometOrbits(t)},[ht,it,S,w,Ft,l,g,_]),(0,I.useEffect)(()=>{let e=U.current?.cloud;for(let[t,n]of Object.entries(_?.meta.subgroup_ids??{}))for(let r of n)e?.setPartVisible(t,r,!ot.has(`${t}:${r}`));U.current?.solar?.setHiddenParts(ot)},[ot,Ft,l,g,_]);let sn=e=>{let t=U.current?.solar,n=t?.byId.get(e)&&t.partKey(t.byId.get(e));n&&(P(!0),st(e=>e.has(n)?new Set([...e].filter(e=>e!==n)):e))},cn=(_?.meta.groups??[]).map(e=>e.id),ln=[te,Se,...cn.filter(e=>e!==`other`).map(e=>!ne.has(e))],un=ln.some(Boolean),dn=ln.every(Boolean),fn=e=>{P(e),Ce(e),re(e?new Set:new Set(cn))},pn=(0,I.useRef)(null);(0,I.useEffect)(()=>{pn.current&&(pn.current.indeterminate=un&&!dn)}),(0,I.useEffect)(()=>{U.current?.solar?.setShowSmallBodies(te)},[te,Ft,l,g,_]),(0,I.useEffect)(()=>{let e=U.current?.cloud;if(e)for(let{id:t}of _.meta.groups)e.setGroupVisible(t,!ne.has(t))},[ne,Ft,l,g,_]);let mn=(0,I.useRef)(null);if((0,I.useEffect)(()=>{let e=U.current?.cloud;e&&(e.setTierVisible(1,ie),ie&&!e.hasTier(1)&&(mn.current||=(xe(`loading`),fetch(`/star-quiz/data/${_.meta.tiers[1].file}`).then(e=>{if(!e.ok)throw Error(`Failed to load more asteroids: ${e.statusText}`);return e.arrayBuffer()}).then(e=>{xe(`loaded`);let t=_.meta.tiers[1].count;return{rows:new Uint16Array(e,0,t*6),parts:new Uint8Array(e,t*12,t)}}).catch(e=>(console.error(`Error loading more asteroids:`,e),mn.current=null,xe(`error`),ae(!1),null))),mn.current.then(t=>{t&&U.current?.cloud===e&&e.addTier(1,t.rows,t.parts)})))},[ie,Ft,l,g,_]),(0,I.useEffect)(()=>{let e=U.current;if(!e)return;let t=Qe;Xv(e.selectedRing,t===null?Fe!==null&&Le?Le.xyz_ly.slice(Fe*3,Fe*3+3):Ue&&Ge?.[Ue.kind]?Ge[Ue.kind].xyz_ly.slice(Ue.index*3,Ue.index*3+3):null:Ft.positions.subarray(t*3,t*3+3)),Xv(e.bodySelectedRing,et&&e.solar?e.solar.byId.get(et).position.toArray():null),e.selectedBodyId=et,e.solar?.setHighlightOrbit(et)},[Qe,et,Fe,Le,Ue,Ge,Ft,l,g]),(0,I.useEffect)(()=>{let e=e=>{(e.target.tagName!==`SELECT`&&e.target.tagName!==`INPUT`||e.code===`Escape`)&&(e.code===`Escape`&&zt(null),e.code===`KeyL`&&C(e=>!e),e.code===`KeyN`&&O(e=>!e),e.code===`KeyR`&&Ht(),e.code===`Space`&&(e.preventDefault(),tn()),e.code===`BracketLeft`&&nn(-1),e.code===`BracketRight`&&nn(1),e.code===`KeyT`&&an(),e.code===`KeyH`&&vt(e=>!e))};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)}),!o)return(0,$.jsxs)(`div`,{className:`universe-3d-screen universe-3d-error`,children:[(0,$.jsx)(`button`,{className:`back-button`,onClick:v,children:`← Back`}),(0,$.jsx)(`p`,{children:`Failed to load the 3D star catalogue.`})]});let hn=y?n[y]:null,gn=Qe===null?null:u(Ft,Qe),_n=U.current?.solar,vn=et!==null&&_n?_n.byId.get(et):null,yn=nt===null?null:Hd.get(nt),Sn=Fe!==null&&Le&&Ne?Zm(Le,Fe):null,Cn=Ue&&Ge?.[Ue.kind]?xg(Ue.kind,Ge[Ue.kind],Ue.index):null,Y=vn&&{sun:vn.position.length(),earth:vn.position.distanceTo(_n.byId.get(`Earth`).position),parent:vn.parentId?vn.position.distanceTo(_n.byId.get(vn.parentId).position):null},wn=je&&_?_.meta.groups.filter(e=>!ne.has(e.id)).map(e=>({key:e.id,swatch:(0,$.jsx)(`span`,{className:`universe-3d-swatch`,style:{background:wp[e.id]}}),name:e.name,onClick:M[e.id]?()=>{zt(null),at(e.id)}:void 0})):[],Tn=null,En=null;if(ht.type===`constellation`&&hn)Tn=hn.name,En=hn.name_english===hn.name?null:hn.name_english;else if(ht.type===`body`&&_n?.byId.has(ht.id)){let t=_n.byId.get(ht.id).facts;Tn=t.name,En={star:`Our star`,planet:`Planet`,moon:`Moon of ${t.parent}`,...e}[t.type]}else if(ht.type===`region`)Tn=M[ht.id].label,En=ht.id===`oort`?`A model: never seen directly`:ht.id===`comet`?(0,$.jsx)(`span`,{className:`universe-3d-key`,children:Wp.map(e=>(0,$.jsxs)(`span`,{children:[(0,$.jsx)(`span`,{className:`universe-3d-swatch`,style:{background:e.color}}),e.name]},e.name))}):`Asteroids & comets`;else if(ht.type===`galaxy`)Tn=ht.id===`milky_way`?`Milky Way`:ht.id===`centre`?`Galactic Centre`:Gm[ht.id],En=ht.id===`milky_way`?`Our galaxy (model)`:ht.id===`centre`?`Sagittarius A*`:`Spiral arm`;else if(ht.type===`maser`&&Le){let e=Zm(Le,ht.index);Tn=e.name,En=`Maser · ${e.armName}`}else if(ht.type===`cluster`&&Ge?.[ht.kind]){let e=xg(ht.kind,Ge[ht.kind],ht.index);Tn=e.name,En=`${Sg[ht.kind][0]}${e.title?` · ${e.title}`:``}`}else if(ht.type===`ring`){let e=Hd.get(ht.id);Tn=e.name,En=Ud(e)}else if(ht.type===`star`){let e=u(Ft,ht.index),n=t(Lt.get(e.hip)?.bayer);Tn=e.name||n||`HIP ${e.hip}`,En=e.name&&n?n:`Star`}return(0,$.jsxs)(`div`,{className:`universe-3d-screen ${gn||vn||yn||it||V&&Ne||Sn||Cn?`has-card`:``} ${pt?`legends-shifted`:``}`,children:[(0,$.jsx)(`div`,{className:`universe-3d-canvas`,ref:Tt}),(0,$.jsx)(`div`,{className:`universe-3d-labels`,ref:Et}),(0,$.jsx)(`div`,{className:`universe-3d-tooltip`,ref:Dt}),(0,$.jsx)(`button`,{className:`back-button`,onClick:v,children:`← Back`}),(0,$.jsx)(z_,{items:Rt,starBuffers:Ft,onSelect:K}),(0,$.jsx)(`button`,{className:`universe-3d-panel-toggle`,onClick:ut,"aria-expanded":ct,children:ct?`✕ Close`:`☰ Options`}),(0,$.jsxs)(`div`,{ref:dt,className:`universe-3d-panel ${ct?`open`:``}`,children:[(0,$.jsxs)(`label`,{className:`universe-3d-checkbox`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:S,onChange:e=>C(e.target.checked)}),`Show lines`]}),Rv.filter(e=>l||e.needs!==`planets`).map(e=>{let t=!S||e.needs===`planets`&&!k||e.needs===`masers`&&!(we&&z);return(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-sub-option ${t?`disabled`:``}`,title:e.title,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:w[e.kind],disabled:t,onChange:t=>T(n=>({...n,[e.kind]:t.target.checked}))}),e.label]},e.kind)}),(0,$.jsxs)(`label`,{className:`universe-3d-checkbox`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:D,onChange:e=>O(e.target.checked)}),`Show names`]}),(0,$.jsxs)(`label`,{className:`universe-3d-checkbox`,title:`Gaia's stars beyond 330 ly with distances good to 10%, at their measured positions (out to ~16,000 ly): they show as you fly out among the stars`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:F,onChange:e=>oe(e.target.checked)}),`Distant stars (Gaia)`]}),(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-sub-option ${F?``:`disabled`}`,title:de?`Adds ${de.tiers[1].count.toLocaleString()} fainter stars (a ${Math.round(de.tiers[1].count*9/1e6)} MB download, heavy for phones)`:`Adds the fainter stars (a large download, heavy for phones)`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:se,disabled:!F||le===`loading`,onChange:e=>ce(e.target.checked)}),le===`loading`?`Loading…`:de?`All ${(de.tiers.reduce((e,t)=>e+t.count,0)/1e6).toFixed(1)} million`:`All of them`,le===`error`&&(0,$.jsx)(`span`,{className:`universe-3d-error-note`,children:` (failed)`})]}),(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-sub-option ${F?``:`disabled`}`,title:`${me?me.toLocaleString():`All of Gaia's`} RR Lyrae stars, at distances from their pulsation (out to ~470,000 ly): the halo round the disc, the Sagittarius stream, the Magellanic Clouds. Each stands in for many thousands of fainter halo stars, so they stay a faint dot from afar.`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:pe,disabled:!F,onChange:e=>L(e.target.checked)}),`Halo (RR Lyrae)`]}),l&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`label`,{className:`universe-3d-checkbox`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:k,onChange:e=>A(e.target.checked)}),`Planets`]}),g&&(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-sub-option ${k?``:`disabled`}`,title:`Hundreds of tiny moons, shown when zoomed in on their planet`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:j,disabled:!k,onChange:e=>N(e.target.checked)}),`Small moons`]}),_&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-sub-option ${k?``:`disabled`}`,title:`Asteroids, comets and dwarf planets from JPL's Small-Body Database: switches everything below`,children:[(0,$.jsx)(`input`,{ref:pn,type:`checkbox`,checked:un,disabled:!k,onChange:()=>fn(!un)}),`Asteroids & comets`]}),k&&(0,$.jsxs)(`div`,{className:`universe-3d-groups`,children:[(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-group`,title:`Dwarf planets, mission targets and famous comets, with names and cards`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:te,onChange:e=>P(e.target.checked)}),(0,$.jsx)(`span`,{className:`universe-3d-swatch`,style:{background:`#d8d2c8`}}),`Named (Ceres, Halley…)`]}),_.meta.groups.filter(e=>e.id!==`other`).map(e=>(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-group`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:!ne.has(e.id),onChange:t=>re(n=>{let r=new Set(n);return t.target.checked?r.delete(e.id):r.add(e.id),r})}),(0,$.jsx)(`span`,{className:`universe-3d-swatch`,style:{background:wp[e.id]}}),e.name]},e.id)),(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-group`,title:`Where long-period comets come from, out to ~1.6 light-years: never seen, drawn from the usual model`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:Se,onChange:e=>Ce(e.target.checked)}),(0,$.jsx)(`span`,{className:`universe-3d-swatch`,style:{background:`#9fb4d8`}}),`Oort cloud (model)`]}),(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-group`,title:`Adds ${_.meta.tiers[1].count.toLocaleString()} smaller asteroids (a ${Math.round(_.meta.tiers[1].count*12/1e6)} MB download, heavy for phones)`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:ie,disabled:be===`loading`,onChange:e=>ae(e.target.checked)}),be===`loading`?`Loading…`:`All ${((_.meta.tiers[0].count+_.meta.tiers[1].count)/1e6).toFixed(1)} million`,be===`error`&&(0,$.jsx)(`span`,{className:`universe-3d-error-note`,children:` (failed)`})]})]})]})]}),(0,$.jsxs)(`div`,{className:`universe-3d-option-row`,children:[(0,$.jsxs)(`label`,{className:`universe-3d-checkbox`,title:`Fly out past the stars to see it: the bar, arms and dust drawn from published measurements (Reid et al. 2019 and others)`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:we,onChange:e=>Te(e.target.checked)}),`Milky Way (model)`]}),(0,$.jsx)(`button`,{className:`universe-3d-info-button`,onClick:()=>Jt(`milky_way`),title:`About the Milky Way and what the model's colours mean`,"aria-label":`About the Milky Way model`,children:`?`})]}),(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-sub-option ${we?``:`disabled`}`,title:`The 199 masers whose parallaxes trace the arms (Reid et al. 2019), at their measured distances: real, not part of the drawing`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:z,disabled:!we,onChange:e=>Ee(e.target.checked)}),(0,$.jsx)(`span`,{className:`universe-3d-swatch`,style:{background:`transparent`,border:`2px solid #5eead4`}}),`Masers (measured)`]}),(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-sub-option ${we?``:`disabled`}`,title:`The Milky Way's 167 globular clusters at their measured distances (Baumgardt & Vasiliev 2021): real, not part of the drawing`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:He.globulars,disabled:!we,onChange:e=>Ye(`globulars`,e.target.checked)}),(0,$.jsx)(`span`,{className:`universe-3d-swatch`,style:{background:`#ffe2ad`}}),`Globular clusters (measured)`]}),(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-sub-option ${we?``:`disabled`}`,title:`4,000 open clusters found in Gaia DR3 (Hunt & Reffert 2023), at their measured distances, coloured by age: blue young, orange old. Real, not part of the drawing`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:He.open_clusters,disabled:!we,onChange:e=>Ye(`open_clusters`,e.target.checked)}),(0,$.jsx)(`span`,{className:`universe-3d-swatch`,style:{background:`linear-gradient(90deg, #9fc4ff, #ffe0a0, #ff9e60)`}}),`Open clusters (measured)`]}),(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-sub-option ${we?``:`disabled`}`,title:`Nebulae whose 3D shape has been measured, each drawn from its published model at its measured distance. Real, not part of the drawing`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:He.nebulae,disabled:!we,onChange:e=>Ye(`nebulae`,e.target.checked)}),(0,$.jsx)(`span`,{className:`universe-3d-swatch`,style:{background:`#ffa676`}}),`Nebulae in 3D (measured)`]}),(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-sub-option ${we?``:`disabled`}`,title:`The band across the sky: the model's starlight added up along each line of sight and dimmed by its dust, from wherever you are. Rendered, not a photo`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:De,disabled:!we,onChange:e=>Oe(e.target.checked)}),`Band on the sky`]}),(0,$.jsxs)(`label`,{className:`universe-3d-checkbox universe-3d-sub-option ${we?``:`disabled`}`,title:`Real dust within ~15,000 ly of the Sun, mapped in 3D from the reddening of millions of stars (Edenhofer et al. 2024, Vergely et al. 2022): the dark clouds in the band, and over the model from far out. Off: the model's dust everywhere`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:ge,disabled:!we,onChange:e=>_e(e.target.checked)}),`Dust near the Sun (measured)`]}),(0,$.jsxs)(`label`,{className:`universe-3d-checkbox`,title:`Bloom on everything bright: every star brighter than about mag 5 glows`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:_t,onChange:e=>vt(e.target.checked)}),`Haze`]}),(0,$.jsxs)(`label`,{className:`universe-3d-checkbox`,title:`Only stars brighter than about mag 1 glow, each by how much light it gives`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:yt,onChange:e=>bt(e.target.checked)}),`Glow follows brightness`]}),yt&&(0,$.jsxs)(`div`,{className:`universe-3d-glare-tuning universe-3d-sub-option`,children:[(0,$.jsxs)(`label`,{children:[(0,$.jsxs)(`span`,{children:[`From mag `,xt.toFixed(1)]}),(0,$.jsx)(`input`,{type:`range`,min:`-1.5`,max:`5`,step:`0.1`,value:xt,onChange:e=>St(Number(e.target.value))})]}),(0,$.jsxs)(`label`,{children:[(0,$.jsxs)(`span`,{children:[`Strength ×`,Ct.toFixed(2)]}),(0,$.jsx)(`input`,{type:`range`,min:`-2`,max:`4`,step:`0.1`,value:Math.log2(Ct),onChange:e=>wt(2**Number(e.target.value))})]})]}),(0,$.jsx)(`button`,{className:`button-secondary`,onClick:()=>Ht(),children:`Reset view`})]}),gn&&(0,$.jsx)(L_,{star:gn,lineInfo:Lt.get(gn.hip),onClose:()=>$e(null),onFlyTo:()=>$t(Qe),onFocus:()=>Gt(Qe)}),vn?.smallBody&&(0,$.jsx)(k_,{body:vn,distances:Y,time:Mt.time,onClose:()=>tt(null),onFlyTo:()=>Ut(et)}),vn&&!vn.smallBody&&(0,$.jsx)(h_,{body:vn,distances:Y,time:Mt.time,onClose:()=>tt(null),onFlyTo:()=>Ut(et)}),it&&_&&_n&&(0,$.jsx)(y_,{regionId:it,meta:_.meta,bodies:_n.bodies,time:Mt.time,hiddenParts:ot,onTogglePart:e=>st(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}),onSelectBody:e=>{sn(e),Bt(e),Ut(e)},onClose:()=>at(null)}),(0,$.jsxs)(`div`,{ref:ft,className:`map-legends`,children:[wn.length>0&&(0,$.jsx)(Bg,{title:`Asteroids & comets`,storageKey:`universe3d.legend.cloud`,items:wn}),(ke||ze||ng.some(e=>qe[e]))&&!(V&&Ne)&&(0,$.jsx)(Gg,{showModel:ke,showMasers:ze,showRanges:E(`maserRanges`),showGlobulars:qe.globulars,showOpenClusters:qe.open_clusters,showNebulae:qe.nebulae,showHalo:F&&pe&&me!==null,onOpen:()=>Jt(`milky_way`)})]}),V&&Ne&&(0,$.jsx)(t_,{id:V,cards:Ne,onSelect:Jt,onSelectMaser:Yt,onView:()=>qt(V),onClose:()=>Me(null)}),Sn&&(0,$.jsx)(a_,{info:Sn,cards:Ne,onArm:()=>Jt(Sn.card),onView:()=>Xt(Sn.index),onClose:()=>Ie(null)}),Cn&&(0,$.jsx)(o_,{info:Cn,text:Ge[Cn.kind],onView:()=>Qt(Cn.kind,Cn.index),onClose:()=>We(null)}),yn&&(0,$.jsx)(x_,{feature:yn,onClose:()=>rt(null),onView:()=>W(nt)}),l&&(0,$.jsx)(sv,{time:Mt.time,rate:Mt.rate,playing:Mt.playing,onTogglePlay:tn,onStep:nn,onSetRate:rn,onNow:an,onSetTime:on}),(0,$.jsxs)(`div`,{className:`universe-3d-scale`,title:`Scale at the orbit point (screen centre)`,children:[(0,$.jsx)(`div`,{ref:At,className:`universe-3d-scale-label`}),(0,$.jsx)(`div`,{ref:kt,className:`universe-3d-scale-bar`})]}),(0,$.jsxs)(`div`,{className:`universe-3d-footer`,children:[Tn&&(0,$.jsx)(`div`,{className:`universe-3d-title`,children:Tn}),Tn&&En&&(0,$.jsx)(`div`,{className:`universe-3d-subtitle`,children:En}),(0,$.jsx)(`div`,{ref:Ot,className:`universe-3d-distance`}),(0,$.jsx)(`div`,{className:`universe-3d-hint`,children:`Click a star, planet or ring name for details · Drag to rotate · Scroll to zoom`})]})]})}export{ny as default};