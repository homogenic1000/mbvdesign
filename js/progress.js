// Progress Bar Functionality - MBV Design Portfolio
export function initProgressBar(ref, props) {
  let onScroll = null;

  if (props.progressBar ?? true) {
    onScroll = () => {
      const bar = ref.current;
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  } else if (ref.current) {
    ref.current.style.display = 'none';
  }

  return {
    onScroll,
    remove: () => {
      if (onScroll) window.removeEventListener('scroll', onScroll);
    }
  };
}