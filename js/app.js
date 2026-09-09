// Main Application - MBV Design Portfolio
// This file contains the Component class and all functionality

// Make Component class globally available for dc-runtime
window.Component = class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
    this.barRef = React.createRef();
    this.tcRef = React.createRef();
    this.state = Object.assign({}, this.state, { menuOpen: false });
  }

  componentDidMount() {
    const root = this.rootRef.current;
    if (!root) return;
    
    // Scroll Reveal
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealOn = (this.props.reveal ?? true) && !reduced;

    this.targets = Array.from(root.querySelectorAll('[data-reveal]'));
    if (revealOn) {
      this.targets.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(26px)';
        el.style.transition = 'opacity 1s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1)';
      });
      this.io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          this.io.unobserve(e.target);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
      this.targets.forEach(el => this.io.observe(el));
    }

    // Timecode Counter
    const pad = n => String(n).padStart(2, '0');
    const t0 = Date.now();
    this.tcTimer = setInterval(() => {
      const el = this.tcRef.current;
      if (!el) return;
      const ms = Date.now() - t0;
      const f = Math.floor((ms % 1000) / 40);
      const s = Math.floor(ms / 1000) % 60;
      const m = Math.floor(ms / 60000) % 60;
      el.textContent = '00:' + pad(m) + ':' + pad(s) + ':' + pad(f);
    }, 40);

    // Progress Bar
    if (this.props.progressBar ?? true) {
      this.onScroll = () => {
        const bar = this.barRef.current;
        if (!bar) return;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
      };
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.onScroll();
    } else if (this.barRef.current) {
      this.barRef.current.style.display = 'none';
    }
  }

  componentWillUnmount() {
    if (this.tcTimer) clearInterval(this.tcTimer);
    if (this.io) this.io.disconnect();
    if (this.onScroll) window.removeEventListener('scroll', this.onScroll);
  }

  renderVals() {
    const hints = this.props.scrollHints ?? true;
    return {
      rootRef: this.rootRef,
      barRef: this.barRef,
      tcRef: this.tcRef,
      dimHover: { opacity: 0.55 },
      liftHover: { color: '#ffffff' },
      zoomHover: { transform: 'scale(1.03)' },
      goNext: (e) => {
        const sel = e.currentTarget.getAttribute('data-next');
        const el = sel && document.querySelector(sel);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top, behavior: 'smooth' });
      },
      hints,
      menuOpen: !!this.state.menuOpen,
      menuHover: { color: '#ffffff', background: 'rgba(255,255,255,.04)' },
      openMenu: () => this.setState({ menuOpen: true }),
      closeMenu: () => this.setState({ menuOpen: false }),
      toggleMenu: () => this.setState(s => ({ menuOpen: !s.menuOpen })),
      goMenu: (e) => {
        const sel = e.currentTarget.getAttribute('data-next');
        const el = sel && document.querySelector(sel);
        this.setState({ menuOpen: false });
        if (!el) return;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24, behavior: 'smooth' });
      }
    };
  }

  componentDidUpdate() {
    const root = this.rootRef.current;
    if (!root) return;
    const show = (this.props.scrollHints ?? true) ? 'flex' : 'none';
    root.querySelectorAll('header button[data-next], section button[data-next]').forEach(b => { b.style.display = show; });
  }
}