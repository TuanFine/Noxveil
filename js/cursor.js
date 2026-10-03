(function () {
  const root = document.documentElement;
  if (window.matchMedia('(pointer: coarse)').matches) {
    const cursor = document.getElementById('custom-cursor');
    if (cursor) cursor.style.display = 'none';
    return;
  }

  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const current = { x: target.x, y: target.y };
  const lerp = 0.15;

  function move(event) {
    target.x = event.clientX;
    target.y = event.clientY;
    cursor.style.opacity = '1';
  }

  function animate() {
    current.x += (target.x - current.x) * lerp;
    current.y += (target.y - current.y) * lerp;
    cursor.style.transform = `translate(${current.x - 24}px, ${current.y - 24}px)`;
    requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', move, { passive: true });
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseover', (event) => {
    const interactive = event.target.closest('a, button, input, textarea, .gallery-item');
    if (interactive) {
      cursor.style.opacity = '0.7';
      cursor.style.transform += ' scale(0.9)';
    }
  });

  animate();
})();
