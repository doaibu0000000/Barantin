import { Sidebar, bindSidebarEvents } from './components/Sidebar';
import { CookieTool, bindCookieToolEvents } from './components/CookieTool';

export const App = () => {
  return `
    <div class="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto p-4 md:p-10 min-h-screen">
      ${Sidebar()}
      
      <main class="bg-brand-panel rounded-lg flex-1 p-6 md:p-8 flex flex-col gap-6">
        ${CookieTool()}
      </main>
    </div>
  `;
};

export const bindAppEvents = () => {
  bindSidebarEvents();
  bindCookieToolEvents();
};
