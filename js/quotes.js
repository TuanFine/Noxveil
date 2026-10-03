(function () {
  class QuoteSlider {
    constructor({ root, controls, interval = 6000, current = 0 }) {
      this.root = document.querySelector(root);
      this.controls = document.querySelector(controls);
      this.items = Array.from(this.root ? this.root.querySelectorAll('.quote') : []);
      this.dots = Array.from(this.controls ? this.controls.querySelectorAll('.quote-dot') : []);
      this.current = current;
      this.interval = interval;
      this.timer = null;
      this.init();
    }

    init() {
      if (!this.root) return;
      this.show(this.current);
      this.start();

      this.root.addEventListener('mouseenter', () => this.stop());
      this.root.addEventListener('mouseleave', () => this.start());
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) this.stop();
        else this.start();
      });
    }

    start() {
      this.stop();
      this.timer = window.setInterval(() => {
        this.current = (this.current + 1) % this.items.length;
        this.show(this.current);
      }, this.interval);
    }

    stop() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    show(index) {
      this.items.forEach((item, idx) => {
        item.classList.toggle('active', idx === index);
      });
      this.dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
      });
      this.current = index;
    }
  }

  window.QuoteSlider = QuoteSlider;
})();
