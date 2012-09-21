(function(){var a,b,c,d,e,f,g,h,i,j=!0,k=Array.prototype.slice,l=window.sharejs;typeof j!="undefined"&&j!==null?h=l.types.text:h=require("./text"),f={},f.name="json",f.create=function(){return null},f.invertComponent=function(a){var b={p:a.p};return a.si!==void 0&&(b.sd=a.si),a.sd!==void 0&&(b.si=a.sd),a.oi!==void 0&&(b.od=a.oi),a.od!==void 0&&(b.oi=a.od),a.li!==void 0&&(b.ld=a.li),a.ld!==void 0&&(b.li=a.ld),a.na!==void 0&&(b.na=-a.na),a.lm!==void 0&&(b.lm=a.p[a.p.length-1],b.p=a.p.slice(0,a.p.length-1).concat([a.lm])),b},f.invert=function(a){var b,c,d,e=a.slice().reverse(),g=[];for(c=0,d=e.length;c<d;c++)b=e[c],g.push(f.invertComponent(b));return g},f.checkValidOp=function(){},e=function(a){return Object.prototype.toString.call(a)==="[object Array]"},f.checkList=function(a){if(!e(a))throw new Error("Referenced element not a list")},f.checkObj=function(a){if(a.constructor!==Object)throw new Error("Referenced element not an object (it was "+JSON.stringify(a)+")")},f.apply=function(a,c){var d,e,g,h,i,j,k,l,m,n,o,p,q;f.checkValidOp(c),c=b(c),e={data:b(a)};try{for(i=0,o=c.length;i<o;i++){d=c[i],l=null,m=null,h=e,j="data",q=d.p;for(n=0,p=q.length;n<p;n++){k=q[n],l=h,m=j,h=h[j],j=k;if(l==null)throw new Error("Path invalid")}if(d.na!==void 0){if(typeof h[j]!="number")throw new Error("Referenced element not a number");h[j]+=d.na}else if(d.si!==void 0){if(typeof h!="string")throw new Error("Referenced element not a string (it was "+JSON.stringify(h)+")");l[m]=h.slice(0,j)+d.si+h.slice(j)}else if(d.sd!==void 0){if(typeof h!="string")throw new Error("Referenced element not a string");if(h.slice(j,j+d.sd.length)!==d.sd)throw new Error("Deleted string does not match");l[m]=h.slice(0,j)+h.slice(j+d.sd.length)}else if(d.li!==void 0&&d.ld!==void 0)f.checkList(h),h[j]=d.li;else if(d.li!==void 0)f.checkList(h),h.splice(j,0,d.li);else if(d.ld!==void 0)f.checkList(h),h.splice(j,1);else if(d.lm!==void 0)f.checkList(h),d.lm!==j&&(g=h[j],h.splice(j,1),h.splice(d.lm,0,g));else if(d.oi!==void 0)f.checkObj(h),h[j]=d.oi;else{if(d.od===void 0)throw new Error("invalid / missing instruction in op");f.checkObj(h),delete h[j]}}}catch(r){throw r}return e.data},f.pathMatches=function(a,b,c){var d,e,f;if(a.length!==b.length)return!1;for(d=0,f=a.length;d<f;d++){e=a[d];if(e!==b[d]&&(!c||d!==a.length-1))return!1}return!0},f.append=function(a,c){var d;return c=b(c),a.length!==0&&f.pathMatches(c.p,(d=a[a.length-1]).p)?d.na!==void 0&&c.na!==void 0?a[a.length-1]={p:d.p,na:d.na+c.na}:d.li!==void 0&&c.li===void 0&&c.ld===d.li?d.ld!==void 0?delete d.li:a.pop():d.od!==void 0&&d.oi===void 0&&c.oi!==void 0&&c.od===void 0?d.oi=c.oi:c.lm!==void 0&&c.p[c.p.length-1]===c.lm?null:a.push(c):a.push(c)},f.compose=function(a,c){var d,e,g,h;f.checkValidOp(a),f.checkValidOp(c),e=b(a);for(g=0,h=c.length;g<h;g++)d=c[g],f.append(e,d);return e},f.normalize=function(a){var b,c,d,g,h=[];e(a)||(a=[a]);for(c=0,d=a.length;c<d;c++)b=a[c],(g=b.p)!=null?g:b.p=[],f.append(h,b);return h},b=function(a){return JSON.parse(JSON.stringify(a))},f.commonPath=function(a,b){var c;a=a.slice(),b=b.slice(),a.unshift("data"),b.unshift("data"),a=a.slice(0,a.length-1),b=b.slice(0,b.length-1);if(b.length===0)return-1;c=0;while(a[c]===b[c]&&c<a.length){c++;if(c===b.length)return c-1}},f.transformComponent=function(a,c,d,e){var g,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z;c=b(c),c.na!==void 0&&c.p.push(0),d.na!==void 0&&d.p.push(0),g=f.commonPath(c.p,d.p),i=f.commonPath(d.p,c.p),l=c.p.length,p=d.p.length,c.na!==void 0&&c.p.pop(),d.na!==void 0&&d.p.pop();if(d.na)return i!=null&&p>=l&&d.p[i]===c.p[i]&&(c.ld!==void 0?(o=b(d),o.p=o.p.slice(l),c.ld=f.apply(b(c.ld),[o])):c.od!==void 0&&(o=b(d),o.p=o.p.slice(l),c.od=f.apply(b(c.od),[o]))),f.append(a,c),a;i!=null&&p>l&&c.p[i]===d.p[i]&&(c.ld!==void 0?(o=b(d),o.p=o.p.slice(l),c.ld=f.apply(b(c.ld),[o])):c.od!==void 0&&(o=b(d),o.p=o.p.slice(l),c.od=f.apply(b(c.od),[o])));if(g!=null){j=l===p;if(d.na===void 0)if(d.si!==void 0||d.sd!==void 0){if(c.si!==void 0||c.sd!==void 0){if(!j)throw new Error("must be a string?");k=function(a){var b={p:a.p[a.p.length-1]};return a.si?b.i=a.si:b.d=a.sd,b},v=k(c),w=k(d),t=[],h._tc(t,v,w,e);for(y=0,z=t.length;y<z;y++)u=t[y],n={p:c.p.slice(0,g)},n.p.push(u.p),u.i!=null&&(n.si=u.i),u.d!=null&&(n.sd=u.d),f.append(a,n);return a}}else if(d.li!==void 0&&d.ld!==void 0){if(d.p[g]===c.p[g]){if(!j)return a;if(c.ld!==void 0){if(c.li===void 0||e!=="left")return a;c.ld=b(d.li)}}}else if(d.li!==void 0)c.li!==void 0&&c.ld===void 0&&j&&c.p[g]===d.p[g]?e==="right"&&c.p[g]++:d.p[g]<=c.p[g]&&c.p[g]++,c.lm!==void 0&&j&&d.p[g]<=c.lm&&c.lm++;else if(d.ld!==void 0){if(c.lm!==void 0&&j){if(d.p[g]===c.p[g])return a;s=d.p[g],m=c.p[g],x=c.lm,(s<x||s===x&&m<x)&&c.lm--}if(d.p[g]<c.p[g])c.p[g]--;else if(d.p[g]===c.p[g]){if(p<l)return a;if(c.ld!==void 0){if(c.li===void 0)return a;delete c.ld}}}else if(d.lm!==void 0)if(c.lm!==void 0&&l===p){m=c.p[g],x=c.lm,q=d.p[g],r=d.lm;if(q!==r)if(m===q){if(e!=="left")return a;c.p[g]=r,m===x&&(c.lm=r)}else m>q&&c.p[g]--,m>r?c.p[g]++:m===r&&q>r&&(c.p[g]++,m===x&&c.lm++),x>q?c.lm--:x===q&&x>m&&c.lm--,x>r?c.lm++:x===r&&(r>q&&x>m||r<q&&x<m?e==="right"&&c.lm++:x>m?c.lm++:x===q&&c.lm--)}else c.li!==void 0&&c.ld===void 0&&j?(m=d.p[g],x=d.lm,s=c.p[g],s>m&&c.p[g]--,s>x&&c.p[g]++):(m=d.p[g],x=d.lm,s=c.p[g],s===m?c.p[g]=x:(s>m&&c.p[g]--,s>x?c.p[g]++:s===x&&m>x&&c.p[g]++));else if(d.oi!==void 0&&d.od!==void 0){if(c.p[g]===d.p[g]){if(c.oi===void 0||!j)return a;if(e==="right")return a;c.od=d.oi}}else if(d.oi!==void 0){if(c.oi!==void 0&&c.p[g]===d.p[g]){if(e!=="left")return a;f.append(a,{p:c.p,od:d.oi})}}else if(d.od!==void 0&&c.p[g]===d.p[g]){if(!j)return a;if(c.oi===void 0)return a;delete c.od}}return f.append(a,c),a},typeof j!="undefined"&&j!==null?(l.types||(l.types={}),l._bt(f,f.transformComponent,f.checkValidOp,f.append),l.types.json=f):(module.exports=f,require("./helpers").bootstrapTransform(f,f.transformComponent,f.checkValidOp,f.append)),typeof j=="undefined"&&(f=require("./json")),typeof j!="undefined"&&j!==null&&(d=l.extendDoc,l.extendDoc=function(b,c){return a.prototype[b]=c,d(b,c)}),c=function(a){return a.length===1&&a[0].constructor===Array?a[0]:a},a=function(){function a(a,b){this.doc=a,this.path=b}return a.prototype.at=function(){var a=1<=arguments.length?k.call(arguments,0):[];return this.doc.at(this.path.concat(c(a)))},a.prototype.get=function(){return this.doc.getAt(this.path)},a.prototype.set=function(a,b){return this.doc.setAt(this.path,a,b)},a.prototype.insert=function(a,b,c){return this.doc.insertAt(this.path,a,b,c)},a.prototype.del=function(a,b,c){return this.doc.deleteTextAt(this.path,b,a,c)},a.prototype.remove=function(a){return this.doc.removeAt(this.path,a)},a.prototype.push=function(a,b){return this.insert(this.get().length,a,b)},a.prototype.move=function(a,b,c){return this.doc.moveAt(this.path,a,b,c)},a.prototype.add=function(a,b){return this.doc.addAt(this.path,a,b)},a.prototype.on=function(a,b){return this.doc.addListener(this.path,a,b)},a.prototype.removeListener=function(a){return this.doc.removeListener(a)},a.prototype.getLength=function(){return this.get().length},a.prototype.getText=function(){return this.get()},a}(),i=function(a,b){var c,d,e,f={data:a},g="data",h=f;for(d=0,e=b.length;d<e;d++){c=b[d],h=h[g],g=c;if(typeof h=="undefined")throw new Error("bad path")}return{elem:h,key:g}},g=function(a,b){var c,d,e;if(a.length!==b.length)return!1;for(d=0,e=a.length;d<e;d++){c=a[d];if(c!==b[d])return!1}return!0},f.api={provides:{json:!0},at:function(){var b=1<=arguments.length?k.call(arguments,0):[];return new a(this,c(b))},get:function(){return this.snapshot},set:function(a,b){return this.setAt([],a,b)},getAt:function(a){var b=i(this.snapshot,a),c=b.elem,d=b.key;return c[d]},setAt:function(a,b,c){var d=i(this.snapshot,a),e=d.elem,f=d.key,g={p:a};if(e.constructor===Array)g.li=b,typeof e[f]!="undefined"&&(g.ld=e[f]);else{if(typeof e!="object")throw new Error("bad path");g.oi=b,typeof e[f]!="undefined"&&(g.od=e[f])}return this.submitOp([g],c)},removeAt:function(a,b){var c,d=i(this.snapshot,a),e=d.elem,f=d.key;if(typeof e[f]=="undefined")throw new Error("no element at that path");c={p:a};if(e.constructor===Array)c.ld=e[f];else{if(typeof e!="object")throw new Error("bad path");c.od=e[f]}return this.submitOp([c],b)},insertAt:function(a,b,c,d){var e=i(this.snapshot,a),f=e.elem,g=e.key,h={p:a.concat(b)};return f[g].constructor===Array?h.li=c:typeof f[g]=="string"&&(h.si=c),this.submitOp([h],d)},moveAt:function(a,b,c,d){var e=[{p:a.concat(b),lm:c}];return this.submitOp(e,d)},addAt:function(a,b,c){var d=[{p:a,na:b}];return this.submitOp(d,c)},deleteTextAt:function(a,b,c,d){var e=i(this.snapshot,a),f=e.elem,g=e.key,h=[{p:a.concat(c),sd:f[g].slice(c,c+b)}];return this.submitOp(h,d)},addListener:function(a,b,c){var d={path:a,event:b,cb:c};return this._listeners.push(d),d},removeListener:function(a){var b=this._listeners.indexOf(a);return b<0?!1:(this._listeners.splice(b,1),!0)},_register:function(){return this._listeners=[],this.on("change",function(a){var b,c,d,e,f,g,h,i,j,k,l=[];for(h=0,i=a.length;h<i;h++){b=a[h];if(b.na!==void 0||b.si!==void 0||b.sd!==void 0)continue;f=[],k=this._listeners;for(d=0,j=k.length;d<j;d++){e=k[d],c={p:e.path,na:0},g=this.type.transformComponent([],c,b,"left");if(g.length===0)f.push(d);else{if(g.length!==1)throw new Error("Bad assumption in json-api: xforming an 'si' op will always result in 0 or 1 components.");e.path=g[0].p}}f.sort(function(a,b){return b-a}),l.push(function(){var a,b,c=[];for(a=0,b=f.length;a<b;a++)d=f[a],c.push(this._listeners.splice(d,1));return c}.call(this))}return l}),this.on("remoteop",function(a){var b,c,d,e,f,h,i,j,k,l=[];for(j=0,k=a.length;j<k;j++)b=a[j],h=b.na===void 0?b.p.slice(0,b.p.length-1):b.p,l.push(function(){var a,j,k,l=this._listeners,m=[];for(a=0,j=l.length;a<j;a++)k=l[a],i=k.path,f=k.event,c=k.cb,m.push(function(){var a;if(g(i,h))switch(f){case"insert":if(b.li!==void 0&&b.ld===void 0)return c(b.p[b.p.length-1],b.li);if(b.oi!==void 0&&b.od===void 0)return c(b.p[b.p.length-1],b.oi);if(b.si!==void 0)return c(b.p[b.p.length-1],b.si);break;case"delete":if(b.li===void 0&&b.ld!==void 0)return c(b.p[b.p.length-1],b.ld);if(b.oi===void 0&&b.od!==void 0)return c(b.p[b.p.length-1],b.od);if(b.sd!==void 0)return c(b.p[b.p.length-1],b.sd);break;case"replace":if(b.li!==void 0&&b.ld!==void 0)return c(b.p[b.p.length-1],b.ld,b.li);if(b.oi!==void 0&&b.od!==void 0)return c(b.p[b.p.length-1],b.od,b.oi);break;case"move":if(b.lm!==void 0)return c(b.p[b.p.length-1],b.lm);break;case"add":if(b.na!==void 0)return c(b.na)}else if((e=this.type.commonPath(h,i))!=null&&f==="child op"){if(h.length===(a=i.length)&&a===e)throw new Error("paths match length and have commonality, but aren't equal?");return d=b.p.slice(e+1),c(d,b)}}.call(this));return m}.call(this));return l})}}}).call(this)