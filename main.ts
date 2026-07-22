import './style.css';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const processBtn = document.getElementById('processBtn') as HTMLButtonElement;
  const cookieContent = document.getElementById('cookieContent') as HTMLTextAreaElement;
  const processingResults = document.getElementById('processingResults') as HTMLTextAreaElement;
  const extractUidToggle = document.getElementById('extractUidToggle') as HTMLInputElement;

  processBtn.addEventListener('click', () => {
    const inputCookies = cookieContent.value;
    const shouldExtractUid = extractUidToggle.checked;
    
    if (!inputCookies.trim()) {
      processingResults.value = "Please enter some cookies to process.";
      return;
    }

    // Basic placeholder logic for the tool
    let result = "Processing...\n\n";
    result += `Extract UID Option: ${shouldExtractUid ? 'Enabled' : 'Disabled'}\n\n`;
    result += `Input Length: ${inputCookies.length} characters.\n`;
    
    // TODO: Add actual cookie processing logic here
    result += "\n(Cookie parsing logic goes here)";
    
    processingResults.value = result;
  });

  // Setup sidebar navigation (visual only)
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      // Remove active class from all
      navItems.forEach(nav => nav.classList.remove('active'));
      // Add active class to clicked
      item.classList.add('active');
    });
  });
});
