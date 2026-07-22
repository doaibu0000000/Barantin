(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&d(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function d(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const x=()=>{const a=[{id:"Surtu 2",label:"Surtu 2",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>'},{id:"Draft",label:"Draft",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'},{id:"Revisi",label:"Revisi",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>'}];return`
    <aside class="fixed bottom-0 left-0 w-full md:relative md:w-[280px] bg-brand-panel border-t md:border border-white/5 md:rounded-xl p-2 md:p-6 flex flex-row md:flex-col shrink-0 shadow-2xl z-50">
      <div class="hidden md:flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold tracking-wide text-white text-left w-full">Barantin Tools</h2>
      </div>
      <nav id="sidebarNav" class="flex flex-row md:flex-col justify-around md:justify-start w-full md:gap-1.5">
        ${a.map(r=>`
      <a href="#" class="nav-item flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-xl md:rounded-lg text-[11px] md:text-base transition-all ${r.id==="Surtu 2"?"active text-brand-accent md:bg-brand-accent-bg font-semibold":"text-brand-text-muted hover:text-white md:hover:bg-white/5"}" data-menu="${r.id}">
        ${r.icon}
        <span>${r.label}</span>
      </a>
    `).join("")}
      </nav>
    </aside>
  `},v=()=>{const a=document.querySelectorAll(".nav-item");a.forEach(i=>{i.addEventListener("click",r=>{r.preventDefault(),a.forEach(d=>{d.classList.remove("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold"),d.classList.add("text-brand-text-muted")}),i.classList.remove("text-brand-text-muted"),i.classList.add("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold")})})},g=()=>`
    <div class="flex flex-col gap-2 mb-1">
      <h1 class="text-xl font-bold text-white">Cookie Handle Tools</h1>
      <div class="flex items-center gap-3">
        <span class="text-xs font-semibold text-white">Extract UID</span>
        <label class="switch">
          <input type="checkbox" id="extractUidToggle" checked>
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label for="cookieContent" class="text-xs font-semibold text-white">Cookie Content</label>
      <textarea id="cookieContent" placeholder="Input cookie contents..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8"></textarea>
    </div>

    <button id="processBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md">
      Processing Cookies
    </button>

    <div class="flex flex-col gap-2">
      <label for="processingResults" class="text-xs font-semibold text-white">Processing Results</label>
      <textarea id="processingResults" placeholder="The processing results are shown here..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8" readonly></textarea>
    </div>
  `,w=()=>{const a=document.getElementById("processBtn"),i=document.getElementById("cookieContent"),r=document.getElementById("processingResults"),d=document.getElementById("extractUidToggle");a&&a.addEventListener("click",()=>{const e=i.value,t=d.checked;if(!e.trim()){r.value="Please enter some cookies to process.";return}let o=`Processing...

`;o+=`Extract UID Option: ${t?"Enabled":"Disabled"}

`,o+=`Input Length: ${e.length} characters.
`,o+=`
(Cookie parsing logic goes here)`,r.value=o})},y=()=>`
    <div class="flex flex-col md:flex-row items-start gap-6 w-full max-w-[1600px] mx-auto p-4 md:p-8 min-h-screen pb-24 md:pb-8">
      ${x()}
      
      <main class="w-full bg-brand-panel border border-white/5 rounded-xl flex-1 p-6 md:p-8 flex flex-col gap-5 shadow-2xl">
        ${g()}
      </main>
    </div>
  `,k=()=>{v(),w()},E="modulepreload",L=function(a,i){return new URL(a,i).href},b={},C=function(i,r,d){let e=Promise.resolve();if(r&&r.length>0){const o=document.getElementsByTagName("link"),n=document.querySelector("meta[property=csp-nonce]"),c=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));e=Promise.allSettled(r.map(l=>{if(l=L(l,d),l in b)return;b[l]=!0;const f=l.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(!!d)for(let m=o.length-1;m>=0;m--){const p=o[m];if(p.href===l&&(!f||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${h}`))return;const u=document.createElement("link");if(u.rel=f?"stylesheet":E,f||(u.as="script"),u.crossOrigin="",u.href=l,c&&u.setAttribute("nonce",c),document.head.appendChild(u),f)return new Promise((m,p)=>{u.addEventListener("load",m),u.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function t(o){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=o,window.dispatchEvent(n),!n.defaultPrevented)throw o}return e.then(o=>{for(const n of o||[])n.status==="rejected"&&t(n.reason);return i().catch(t)})};function P(a={}){const{immediate:i=!1,onNeedReload:r,onNeedRefresh:d,onOfflineReady:e,onRegistered:t,onRegisteredSW:o,onRegisterError:n}=a;let c,l;const f=async(s=!0)=>{await l};async function h(){if("serviceWorker"in navigator){if(c=await C(async()=>{const{Workbox:s}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:s}},[],import.meta.url).then(({Workbox:s})=>new s("./sw.js",{scope:"./",type:"classic"})).catch(s=>{n==null||n(s)}),!c)return;c.addEventListener("activated",s=>{(s.isUpdate||s.isExternal)&&(r?r():window.location.reload())}),c.addEventListener("installed",s=>{s.isUpdate||e==null||e()}),c.register({immediate:i}).then(s=>{o?o("./sw.js",s):t==null||t(s)}).catch(s=>{n==null||n(s)})}}return l=h(),f}P({immediate:!0});document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("app");a&&(a.innerHTML=y(),k())});
