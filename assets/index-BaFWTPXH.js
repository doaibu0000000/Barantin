(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const a=()=>{const n=["Cookie","Text Editor","Card Key Splitter","Html Image","Link Html","Merge Files","JSON","Account","Fb Link"];return`
    <aside class="w-full md:w-[250px] bg-brand-panel md:rounded-lg p-4 md:p-6 flex flex-col shrink-0 overflow-hidden">
      <div class="flex justify-between items-center md:mb-6">
        <h2 class="text-base font-bold text-center md:text-left w-full">Practical Tools</h2>
        <button id="mobileMenuBtn" class="md:hidden text-white p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
      <nav id="sidebarNav" class="hidden md:flex flex-col gap-1 mt-4 md:mt-0">
        ${n.map(o=>`
      <a href="#" class="nav-item ${o==="Cookie"?"active bg-brand-accent-bg text-brand-accent":"text-brand-text-muted hover:bg-white/5 hover:text-white"} px-4 py-3 rounded-md text-sm font-medium transition-all" data-menu="${o}">
        ${o}
      </a>
    `).join("")}
      </nav>
    </aside>
  `},d=()=>{const n=document.querySelectorAll(".nav-item");n.forEach(r=>{r.addEventListener("click",e=>{e.preventDefault(),n.forEach(t=>{t.classList.remove("active","bg-brand-accent-bg","text-brand-accent"),t.classList.add("text-brand-text-muted")}),r.classList.remove("text-brand-text-muted"),r.classList.add("active","bg-brand-accent-bg","text-brand-accent")})});const s=document.getElementById("mobileMenuBtn"),o=document.getElementById("sidebarNav");s&&o&&s.addEventListener("click",()=>{o.classList.toggle("hidden"),o.classList.toggle("flex")})},l=()=>`
    <div class="flex flex-col gap-3 mb-2">
      <h1 class="text-xl font-bold">Cookie Handle Tools</h1>
      <div class="flex items-center gap-3">
        <span class="text-[13px] font-medium">Extract UID</span>
        <label class="switch">
          <input type="checkbox" id="extractUidToggle" checked>
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label for="cookieContent" class="text-sm font-medium">Cookie Content</label>
      <textarea id="cookieContent" class="w-full bg-brand-input border border-brand-border rounded-md p-3 text-brand-text font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8"></textarea>
    </div>

    <button id="processBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-md p-3.5 text-sm font-semibold cursor-pointer transition-colors">
      Processing Cookies
    </button>

    <div class="flex flex-col gap-2">
      <label for="processingResults" class="text-sm font-medium">Processing Results</label>
      <textarea id="processingResults" class="w-full bg-brand-input border border-brand-border rounded-md p-3 text-brand-text font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8" readonly></textarea>
    </div>
  `,c=()=>{const n=document.getElementById("processBtn"),s=document.getElementById("cookieContent"),o=document.getElementById("processingResults"),r=document.getElementById("extractUidToggle");n&&n.addEventListener("click",()=>{const e=s.value,t=r.checked;if(!e.trim()){o.value="Please enter some cookies to process.";return}let i=`Processing...

`;i+=`Extract UID Option: ${t?"Enabled":"Disabled"}

`,i+=`Input Length: ${e.length} characters.
`,i+=`
(Cookie parsing logic goes here)`,o.value=i})},u=()=>`
    <div class="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto p-4 md:p-10 min-h-screen">
      ${a()}
      
      <main class="bg-brand-panel rounded-lg flex-1 p-6 md:p-8 flex flex-col gap-6">
        ${l()}
      </main>
    </div>
  `,m=()=>{d(),c()};"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js",{scope:"/"}).then(n=>{console.log("SW registered: ",n)}).catch(n=>{console.log("SW registration failed: ",n)})});document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("app");n&&(n.innerHTML=u(),m())});
