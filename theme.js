
(function () {
    const KEY = 'taskwave-theme';
    const SUN = './images/sun-svgrepo-com.svg';
    const MOON = './images/moon-svgrepo-com.svg';
  
    function applyDarkClass(isDark) {
      
      document.documentElement.classList.toggle('dark', isDark);
      if (document.body) document.body.classList.toggle('dark', isDark);
      else document.addEventListener('DOMContentLoaded', () => document.body.classList.toggle('dark', isDark), { once: true });
    }
  
    function setTheme(mode) {
      const isDark = mode === 'dark';
      applyDarkClass(isDark);
      try { localStorage.setItem(KEY, mode); } catch (e) {}
      updateToggleIcons();
    }
  
    function updateToggleIcons() {
      document.querySelectorAll('.modeToggle img.modeImg').forEach(img => {
        const desired = document.documentElement.classList.contains('dark') ? MOON : SUN;
       
        const tmp = new Image();
        tmp.onload = () => img.src = desired;
        tmp.onerror = () => img.src = SUN; 
        tmp.src = desired;
        img.alt = document.documentElement.classList.contains('dark') ? 'dark mode' : 'light mode';
      });
    }
  
    
    function wireToggles() {
      document.querySelectorAll('.modeToggle').forEach(btn => {
        btn.addEventListener('click', () => {
          const isDark = document.documentElement.classList.contains('dark');
          setTheme(isDark ? 'light' : 'dark');
        });
      });
    }
  
   
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === 'dark') applyDarkClass(true);
      else if (saved === 'light') applyDarkClass(false);
      // If nothing saved: do nothing (let site default show) OR you can uncomment the next block
      // to follow system preference:
      // else applyDarkClass(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch (e) {}
  
    // DOM ready hooks
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => { wireToggles(); updateToggleIcons(); });
    } else {
      wireToggles(); updateToggleIcons();
    }
  
    // keep in sync with system preference if user hasn't explicitly chosen (optional)
    try {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change', e => {
        try {
          if (!localStorage.getItem(KEY)) setTheme(e.matches ? 'dark' : 'light');
        } catch (err) {}
      });
    } catch (e) {}
  })();
  