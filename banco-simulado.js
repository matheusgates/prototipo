// Banco simulado em memória (imita window.claude) usado pela apresentação offline.
// Lê window.__SEED, que o gerar-apresentacao.py preenche com dados-exemplo/dados-exemplo.json.
(function(){
const stores={};const subs={};const dsubs={};
const S=c=>stores[c]||(stores[c]={});
Object.entries(window.__SEED||{}).forEach(([c,docs])=>Object.assign(S(c),docs));
const snapOf=c=>{const docs=Object.entries(S(c)).map(([id,d])=>({id,exists:true,data:()=>d,metadata:{fromCache:false,hasPendingWrites:false}}));return{docs,size:docs.length,empty:!docs.length,metadata:{fromCache:false,hasPendingWrites:false},docChanges:()=>[]}};
const dsnap=(c,id)=>({id,exists:id in S(c),data:()=>S(c)[id],metadata:{fromCache:false,hasPendingWrites:false}});
const emit=c=>setTimeout(()=>{(subs[c]||[]).forEach(f=>f(snapOf(c)));Object.entries(dsubs).forEach(([k,fs])=>{const[cc,id]=k.split("|");if(cc===c)fs.forEach(f=>f(dsnap(cc,id)))})},10);
const merge=(a,b)=>{for(const k in b){if(b[k]&&typeof b[k]==="object"&&!Array.isArray(b[k])&&a[k]&&typeof a[k]==="object")merge(a[k],b[k]);else a[k]=b[k]}return a};
let n=0;
const doc=(c,id)=>({id,acquire:async()=>({acquired:true}),get:async()=>dsnap(c,id),set:async d=>{S(c)[id]=JSON.parse(JSON.stringify(d));emit(c)},update:async d=>{if(!S(c)[id])throw{code:"invalid_argument"};merge(S(c)[id],JSON.parse(JSON.stringify(d)));emit(c)},delete:async()=>{delete S(c)[id];emit(c)},
  onSnapshot:f=>{(dsubs[c+"|"+id]=dsubs[c+"|"+id]||[]).push(f);setTimeout(()=>f(dsnap(c,id)),10);return()=>{}}});
const db={collection:c=>({doc:id=>doc(c,id||"x"+(++n)),onSnapshot:f=>{(subs[c]=subs[c]||[]).push(f);emit(c);return()=>{}}}),doc:p=>{const[c,id]=p.split("/");return doc(c,id)}};
const assets={upload:async f=>({id:"asset"+(++n),url:URL.createObjectURL(f),contentType:f.type}),delete:async()=>({})};
const downloads={save:async r=>{window.__saved=r;return{}}};
window.claude={use:async k=>({db,assets,downloads,user:{can:async()=>true}})[k]??null};
window.__stores=stores;
})();
