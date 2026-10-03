(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let particles = [];
  let animationId;
  let lastTime = 0;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    canvas.style.display = 'none';
    return;
  }

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticle() {
    const ember = Math.random() < 0.18;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: randomBetween(-0.18, 0.18),
      vy: ember ? randomBetween(-0.12, -0.04) : randomBetween(-0.2, 0.08),
      size: ember ? randomBetween(2, 4) : randomBetween(1, 2),
      ember,
      drift: randomBetween(0.7, 1.5),
      alpha: ember ? randomBetween(0.25, 0.85) : randomBetween(0.05, 0.28)
    };
  }

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const area = width * height;
    const targetCount = Math.min(120, Math.max(26, Math.round(area / 12000)));

    while (particles.length < targetCount) particles.push(createParticle());
    while (particles.length > targetCount) particles.pop();
  }

  function drawParticle(p) {
    if (p.ember) {
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
      glow.addColorStop(0, `rgba(194, 65, 12, ${p.alpha})`);
      glow.addColorStop(0.35, `rgba(139, 30, 30, ${p.alpha * 0.8})`);
      glow.addColorStop(1, 'rgba(10, 10, 15, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(214, 207, 196, ${p.alpha * 0.8})`;
      ctx.fillRect(p.x, p.y, 1.5, 1.5);
    } else {
      ctx.fillStyle = `rgba(255,255,255, ${p.alpha})`;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
  }

  function updateParticles(delta) {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx * delta * p.drift;
      p.y += p.vy * delta * p.drift;

      if (p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
        Object.assign(p, createParticle());
      }

      drawParticle(p);
    });
  }

  function tick(timestamp) {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(tick);
      return;
    }

    const delta = timestamp - lastTime || 16;
    lastTime = timestamp;
    updateParticles(delta / 16);
    animationId = requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      lastTime = 0;
      animationId = requestAnimationFrame(tick);
    }
  });

  resizeCanvas();
  animationId = requestAnimationFrame(tick);
})();
