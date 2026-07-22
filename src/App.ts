import { Sidebar, bindSidebarEvents } from './components/Sidebar';
import { CookieTool, bindCookieToolEvents } from './components/CookieTool';

export const App = () => {
  return `
    <div class="flex flex-col md:flex-row items-start gap-6 w-full max-w-[1600px] mx-auto p-4 md:p-8 h-full overflow-hidden pb-24 md:pb-8">
      ${Sidebar()}
      
      <main class="w-full bg-brand-panel border border-white/5 rounded-xl md:flex-1 p-6 md:p-8 flex flex-col gap-5 shadow-2xl">
        ${CookieTool()}
      </main>
    </div>
  `;
};

export const bindAppEvents = () => {
  bindSidebarEvents();
  bindCookieToolEvents();
};
