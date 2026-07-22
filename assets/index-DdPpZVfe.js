(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const i=()=>{const o=["Cookie","Text Editor","Card Key Splitter"];return`
    <aside class="w-full md:w-[280px] bg-brand-panel border border-white/5 md:rounded-xl p-5 md:p-6 flex flex-col shrink-0 self-stretch shadow-2xl">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-sm font-bold tracking-wide text-white text-center md:text-left w-full">Practical Tools</h2>
        <button id="mobileMenuBtn" class="md:hidden text-white p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
      <nav id="sidebarNav" class="hidden md:flex flex-col gap-1.5 flex-1">
        ${o.map(n=>`
      <a href="#" class="nav-item ${n==="Cookie"?"active bg-brand-accent-bg text-brand-accent font-semibold":"text-brand-text-muted hover:bg-white/5 hover:text-white"} px-4 py-2.5 rounded-lg text-sm transition-all" data-menu="${n}">
        ${n}
      </a>
    `).join("")}
      </nav>
    </aside>
  `},c=()=>{const o=document.querySelectorAll(".nav-item");o.forEach(r=>{r.addEventListener("click",e=>{e.preventDefault(),o.forEach(t=>{t.classList.remove("active","bg-brand-accent-bg","text-brand-accent","font-semibold"),t.classList.add("text-brand-text-muted")}),r.classList.remove("text-brand-text-muted"),r.classList.add("active","bg-brand-accent-bg","text-brand-accent","font-semibold")})});const s=document.getElementById("mobileMenuBtn"),n=document.getElementById("sidebarNav");s&&n&&s.addEventListener("click",()=>{n.classList.toggle("hidden"),n.classList.toggle("flex")})},a=()=>`
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
  `,d=()=>{const o=document.getElementById("processBtn"),s=document.getElementById("cookieContent"),n=document.getElementById("processingResults"),r=document.getElementById("extractUidToggle");o&&o.addEventListener("click",()=>{const e=s.value,t=r.checked;if(!e.trim()){n.value="Please enter some cookies to process.";return}let l=`Processing...

`;l+=`Extract UID Option: ${t?"Enabled":"Disabled"}

`,l+=`Input Length: ${e.length} characters.
`,l+=`
(Cookie parsing logic goes here)`,n.value=l})},u=()=>`
    <div class="flex flex-col md:flex-row items-stretch gap-6 w-full max-w-[1600px] mx-auto p-4 md:p-8 min-h-screen">
      ${i()}
      
      <main class="bg-brand-panel border border-white/5 rounded-xl flex-1 p-6 md:p-8 flex flex-col gap-5 shadow-2xl">
        ${a()}
      </main>
    </div>
  `,b=()=>{c(),d()};"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js",{scope:"/"}).then(o=>{console.log("SW registered: ",o)}).catch(o=>{console.log("SW registration failed: ",o)})});document.addEventListener("DOMContentLoaded",()=>{const o=document.getElementById("app");o&&(o.innerHTML=u(),b())});
