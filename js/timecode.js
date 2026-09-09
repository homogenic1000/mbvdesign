// Timecode Counter Functionality - MBV Design Portfolio
export function initTimecode(ref) {
  const pad = n => String(n).padStart(2, '0');
  const t0 = Date.now();
  
  const timer = setInterval(() => {
    const el = ref.current;
    if (!el) return;
    const ms = Date.now() - t0;
    const f = Math.floor((ms % 1000) / 40);
    const s = Math.floor(ms / 1000) % 60;
    const m = Math.floor(ms / 60000) % 60;
    el.textContent = '00:' + pad(m) + ':' + pad(s) + ':' + pad(f);
  }, 40);

  return {
    timer,
    clear: () => {
      clearInterval(timer);
    }
  };
}