// Menu Functionality - MBV Design Portfolio
export function initMenu(setState) {
  const toggleMenu = () => setState(s => ({ menuOpen: !s.menuOpen }));
  const openMenu = () => setState({ menuOpen: true });
  const closeMenu = () => setState({ menuOpen: false });
  
  const goMenu = (e) => {
    const sel = e.currentTarget.getAttribute('data-next');
    const el = sel && document.querySelector(sel);
    setState({ menuOpen: false });
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24, behavior: 'smooth' });
  };

  return {
    toggleMenu,
    openMenu,
    closeMenu,
    goMenu
  };
}