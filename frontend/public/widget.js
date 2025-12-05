(function() {
  // 1. Get the config from the script tag
  const currentScript = document.currentScript;
  const chatbotId = currentScript.getAttribute('data-chat-id');
  const baseUrl = new URL(currentScript.src).origin;

  if (!chatbotId) {
    console.error('SupportIQ: Missing data-chat-id attribute');
    return;
  }

  // 2. Inject CSS for the Bubble and Iframe
  const style = document.createElement('style');
  style.innerHTML = `
    #supportiq-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
      font-family: system-ui, -apple-system, sans-serif;
    }
    #supportiq-bubble {
      width: 60px;
      height: 60px;
      background-color: #6366F1; /* SupportIQ Indigo */
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
    }
    #supportiq-bubble:hover {
      transform: scale(1.05);
    }
    #supportiq-bubble svg {
      width: 30px;
      height: 30px;
      color: white;
    }
    #supportiq-iframe {
      width: 400px;
      height: 600px;
      max-height: 80vh;
      background: white;
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
      border: 1px solid #e4e4e7;
      display: none; /* Hidden by default */
      overflow: hidden;
    }
    /* Mobile Responsive */
    @media (max-width: 480px) {
      #supportiq-iframe {
        width: 90vw;
        height: 80vh;
        bottom: 90px;
        right: 5vw;
      }
    }
  `;
  document.head.appendChild(style);

  // 3. Create the Container
  const container = document.createElement('div');
  container.id = 'supportiq-container';

  // 4. Create the Iframe (Hidden initially)
  const iframe = document.createElement('iframe');
  iframe.id = 'supportiq-iframe';
  iframe.src = `${baseUrl}/widget/${chatbotId}`; // Points to Next.js page
  iframe.frameBorder = '0';

  // 5. Create the Bubble Button
  const bubble = document.createElement('div');
  bubble.id = 'supportiq-bubble';
  bubble.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  `;

  // 6. Toggle Logic
  let isOpen = false;
  bubble.onclick = () => {
    isOpen = !isOpen;
    iframe.style.display = isOpen ? 'block' : 'none';
    // Change Icon (Chat vs X)
    bubble.innerHTML = isOpen 
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>`;
  };

  container.appendChild(iframe);
  container.appendChild(bubble);
  document.body.appendChild(container);
})();