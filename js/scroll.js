// Scroll Reveal Functionality - MBV Design Portfolio
export function initScrollReveal(root, props) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealOn = (props.reveal ?? true) && !reduced;

  const targets = Array.from(root.querySelectorAll('[data-reveal]'));
  let io = null;

  if (revealOn) {
    targets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(26px)';
      el.style.transition = 'opacity 1s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1)';
    });

    io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        io.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(el => io.observe(el));
  }

  return {
    targets,
    io,
    disconnect: () => {
      if (io) io.disconnect();
    }
  };
}