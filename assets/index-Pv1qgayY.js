(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const l=()=>{const t=[{id:"Surtu 2",label:"Surtu 2",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>'},{id:"Draft",label:"Draft",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'},{id:"Revisi",label:"Revisi",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>'}];return`
    <aside class="fixed bottom-0 left-0 w-full md:relative md:w-[280px] bg-brand-panel border-t md:border border-white/5 md:rounded-xl p-2 md:p-6 flex flex-row md:flex-col shrink-0 shadow-2xl z-50">
      <div class="hidden md:flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold tracking-wide text-white text-left w-full">Barantin Tools</h2>
      </div>
      <nav id="sidebarNav" class="flex flex-row md:flex-col justify-around md:justify-start w-full md:gap-1.5">
        ${t.map(n=>`
      <a href="#" class="nav-item flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-xl md:rounded-lg text-[11px] md:text-base transition-all ${n.id==="Surtu 2"?"active text-brand-accent md:bg-brand-accent-bg font-semibold":"text-brand-text-muted hover:text-white md:hover:bg-white/5"}" data-menu="${n.id}">
        ${n.icon}
        <span>${n.label}</span>
      </a>
    `).join("")}
      </nav>
    </aside>
  `},d=()=>{const t=document.querySelectorAll(".nav-item");t.forEach(r=>{r.addEventListener("click",n=>{n.preventDefault(),t.forEach(a=>{a.classList.remove("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold"),a.classList.add("text-brand-text-muted")}),r.classList.remove("text-brand-text-muted"),r.classList.add("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold")})})},i=()=>`
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
  `,c=()=>{const t=document.getElementById("processBtn"),r=document.getElementById("cookieContent"),n=document.getElementById("processingResults"),a=document.getElementById("extractUidToggle");t&&t.addEventListener("click",()=>{const e=r.value,o=a.checked;if(!e.trim()){n.value="Please enter some cookies to process.";return}let s=`Processing...

`;s+=`Extract UID Option: ${o?"Enabled":"Disabled"}

`,s+=`Input Length: ${e.length} characters.
`,s+=`
(Cookie parsing logic goes here)`,n.value=s})},u=()=>`
    <div class="flex flex-col md:flex-row items-start gap-6 w-full max-w-[1600px] mx-auto p-4 md:p-8 min-h-screen pb-24 md:pb-8">
      ${l()}
      
      <main class="w-full bg-brand-panel border border-white/5 rounded-xl flex-1 p-6 md:p-8 flex flex-col gap-5 shadow-2xl">
        ${i()}
      </main>
    </div>
  `,m=()=>{d(),c()};"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js",{scope:"/"}).then(t=>{console.log("SW registered: ",t)}).catch(t=>{console.log("SW registration failed: ",t)})});document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("app");t&&(t.innerHTML=u(),m())});
