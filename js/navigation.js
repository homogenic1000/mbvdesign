// Navigation Functionality - MBV Design Portfolio
export function initNavigation() {
  const goNext = (e) => {
    const sel = e.currentTarget.getAttribute('data-next');
    const el = sel && document.querySelector(sel);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return {
    goNext
  };
}