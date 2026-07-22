import { Sidebar, bindSidebarEvents } from './components/Sidebar';
import { CookieTool, bindCookieToolEvents } from './components/CookieTool';

export const App = () => {
  return `
    <div class="flex flex-col md:flex-row items-start gap-3 w-full max-w-[1600px] mx-auto p-2 md:p-4 min-h-dvh">
      ${Sidebar()}
      
      <main class="w-full bg-brand-panel border border-white/5 rounded-xl flex-1 p-3 md:p-4 flex flex-col gap-3 shadow-2xl">
        ${CookieTool()}
      </main>
    </div>
  `;
};

export const bindAppEvents = () => {
  bindSidebarEvents();
  bindCookieToolEvents();
};
