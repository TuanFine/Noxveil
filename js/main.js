'use strict';

const FALLBACK = {
  site: {
    tagline: 'The Veil Between Sin and Sorrow',
    heroQuote: 'I did not come to destroy you. I came to see how long you last.'
  },
  lore: {
    lede: 'Born from the first lie humanity ever told itself, Noxveil drifts at the seam where falsehood hardens into myth.',
    pullQuote: 'Humans hate me because they see themselves in my eyes.'
  },
  traits: [
    { name: 'Manipulative', desc: 'He arranges truths like bones, knowing precisely where they will crack.' },
    { name: 'Patient', desc: 'Centuries are merely minutes to a creature who has learned to wait.' },
    { name: 'Observant', desc: 'Every twitch of fear, grief, and delight is recorded in the ash.' },
    { name: 'Cynical', desc: 'He does not despise hope — he simply understands how easily it burns.' },
    { name: 'Fascinated by Humans', desc: 'Their stubbornness is both awful and beautiful to behold.' },
    { name: 'Eternally Lonely', desc: 'Even power cannot warm the silence that follows him.' }
  ],
  powers: [
    { name: 'Veilwalk', desc: 'Slip through the folds between waking and dreaming, revealing the hidden shape behind a lie.' },
    { name: 'Whisper of Truth', desc: 'A single phrase can split a secret open, or force a wound into honesty.' },
    { name: 'Ashbind', desc: 'Bind memory to ash until the soul offers the truth willingly.' },
    { name: 'Empathic Echo', desc: 'He hears the ache beneath your words and returns it with a sharper edge.' }
  ],
  whispers: [
    'I learned to count silence by the number of confessions left unspoken.',
    'Do you know the sound a lie makes when it is pulled loose from the throat? It is ugly, and honest.',
    'You call me cruel. I call it observation. There is a difference, though many miss it.',
    'Hope is a beautiful wound. It burns most when it is sincere.',
    'I do not want to destroy you. I want to know how long your heart survives the truth.'
  ],
  form: { success: 'Your offering is accepted. I will keep it warm between the folds of the Veil.' }
};

async function loadContent() {
  try {
    const response = await fetch('data/content.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Fetch failed');
    return await response.json();
  } catch (error) {
    console.warn('Falling back to built-in copy:', error);
    return FALLBACK;
  }
}

function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function populateHero(data) {
  const site = data.site || {};
  const heroTagline = document.getElementById('hero-tagline');
  const heroSub = document.getElementById('hero-sub');
  if (heroTagline) heroTagline.textContent = site.tagline || FALLBACK.site.tagline;
  if (heroSub) heroSub.textContent = `“${site.heroQuote || FALLBACK.site.heroQuote}”`;
}

function populateLore(data) {
  const lore = data.lore || {};
  const lede = document.getElementById('lore-text');
  const quote = document.getElementById('lore-quote');
  if (lede) lede.textContent = lore.lede || FALLBACK.lore.lede;
  if (quote) quote.textContent = `“${lore.pullQuote || FALLBACK.lore.pullQuote}”`;
}

function buildTraits(traits) {
  const root = document.getElementById('traits-grid');
  if (!root) return;
  root.innerHTML = '';

  traits.forEach((trait) => {
    const card = document.createElement('article');
    card.className = 'trait-card';
    card.innerHTML = `
      <div class="sigil" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="30" height="30">
          <circle cx="24" cy="24" r="16" fill="rgba(255,255,255,0.04)"></circle>
          <path d="M10 27c8-14 28-14 30 0" stroke="var(--color-ember)" stroke-width="1.8" fill="none" stroke-linecap="round"></path>
        </svg>
      </div>
      <div>
        <h3>${trait.name}</h3>
        <p>${trait.desc}</p>
      </div>
    `;
    root.appendChild(card);
  });
}

function buildPowers(powers) {
  const root = document.getElementById('powers-grid');
  if (!root) return;
  root.innerHTML = '';

  powers.forEach((power) => {
    const card = document.createElement('article');
    card.className = 'power-card';
    card.innerHTML = `
      <h3>${power.name}</h3>
      <p>${power.desc}</p>
    `;
    root.appendChild(card);
  });
}

function buildQuotes(quotes) {
  const quotesRoot = document.getElementById('quotes');
  const controlsRoot = document.getElementById('quotes-controls');
  if (!quotesRoot || !controlsRoot) return;

  quotesRoot.innerHTML = '';
  controlsRoot.innerHTML = '';

  quotes.forEach((quoteText, index) => {
    const quoteEl = document.createElement('div');
    quoteEl.className = `quote${index === 0 ? ' active' : ''}`;
    quoteEl.textContent = quoteText;
    quotesRoot.appendChild(quoteEl);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `quote-dot${index === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Show quote ${index + 1}`);
    dot.addEventListener('click', () => {
      if (window.quoteSlider) window.quoteSlider.show(index);
    });
    controlsRoot.appendChild(dot);
  });

  if (window.QuoteSlider) {
    window.quoteSlider = new window.QuoteSlider({
      root: '#quotes',
      controls: '#quotes-controls',
      interval: 6000,
      current: 0
    });
  }
}

function setupForm(data) {
  const form = document.getElementById('summoning-form');
  const responseEl = document.getElementById('form-response');
  const submitBtn = document.getElementById('submit-btn');
  if (!form || !responseEl || !submitBtn) return;

  const successText = (data && data.form && data.form.success) || FALLBACK.form.success;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('true-name').value.trim();
    const message = document.getElementById('offering').value.trim();

    if (!name || !message) {
      responseEl.textContent = 'Noxveil demands both your true name and your offering.';
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Listening...';

    setTimeout(() => {
      responseEl.textContent = `${name}, your offering has reached the Veil.`;
      submitBtn.textContent = `${successText}`;

      setTimeout(() => {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }, 700);
  });
}

function updateScrollProgress() {
  const progress = document.getElementById('scroll-progress');
  if (!progress) return;

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
}

function setupHeader() {
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
    updateScrollProgress();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initRevealSections() {
  const sections = document.querySelectorAll('.section-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  sections.forEach((section) => observer.observe(section));
}

function initTitleAnimation() {
  const letters = document.querySelectorAll('.hero-title span');
  letters.forEach((letter, index) => {
    letter.style.animationDelay = `${index * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--title-stagger') || 80)}ms`;
  });
}

async function init() {
  setYear();
  const data = await loadContent();
  populateHero(data);
  populateLore(data);
  buildTraits(data.traits || FALLBACK.traits);
  buildPowers(data.powers || FALLBACK.powers);
  buildQuotes(data.whispers || FALLBACK.whispers);
  setupForm(data);
  setupHeader();
  initTitleAnimation();
  initRevealSections();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
  } else {
    document.documentElement.classList.add('prefers-motion-safe');
  }
}

document.addEventListener('DOMContentLoaded', init);
