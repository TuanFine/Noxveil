# Noxveil — The Veil Between Sin and Sorrow

A single-page, production-ready static portfolio site for the demon character "Noxveil". Dark, cinematic, and intentionally handcrafted — ready to deploy via GitHub Pages with zero build step.

![screenshot placeholder](assets/images/screenshot.png)

Live demo (placeholder): https://TuanFine.github.io/Noxveil

## File structure
/poxveil-portfolio
- index.html
- README.md
- LICENSE
- .gitignore
- /assets
  - /images (drop character photos here)
  - /icons
    - favicon.svg
  - /fonts
- /css
  - reset.css, variables.css, base.css, layout.css, components.css, animations.css, responsive.css
- /js
  - main.js, particles.js, scrollReveal.js, cursor.js, quotes.js
- /data
  - content.json

## How to replace placeholders with your own art

This project ships with CDN placeholder images so you can preview layout and responsive behavior immediately. To replace them with your own final art, follow these steps:

1. Hero portrait
   - File path used in markup: `assets/images/hero-portrait.jpg` (recommended)
   - Recommended dimensions & aspect ratio: 1200 x 1600 (3:4 ratio). For best results, export at 1200×1600 or 2400×3200 for high-res displays.
   - In `index.html` the hero image currently uses the CDN placeholder. Replace the `src` on the `<img>` inside `.portrait-frame` with `assets/images/hero-portrait.jpg` or point it to your CDN. Keep the `alt`, `loading="lazy"`, and `decoding="async"` attributes.

2. Gallery images
   - Paths used in markup: `assets/images/placeholder-01.jpg` … `assets/images/placeholder-06.jpg` (recommended filenames)
   - Recommended dimensions: 800 x 800 (square) or larger; export as 1600×1600 for retina.
   - Swap the `src` on each `<img>` inside `.gallery-item` to the corresponding `assets/images/placeholder-0X.jpg` file.

3. CDN placeholders used (these are the images currently in the HTML):
   - Hero: `https://placehold.co/1200x1600/1a0b2e/8b1e1e?text=Noxveil%0AHero+Portrait`
   - Gallery (Gallery 01..06): `https://placehold.co/800x800/0a0a0f/c2410c?text=Gallery+0X` (replace X with 1..6)

4. Image failure handling
   - Images include an `onerror` handler that will hide the broken image and add an `.img-failed` class to the parent container. The CSS then shows a gradient fallback background and displays the alt text. No extra code required.

5. After adding images
   - Commit the new image files and push to `main`.
   - If you prefer to keep images in a CDN, update the `src` links in `index.html` to point to your CDN-hosted files.

## How to deploy to GitHub Pages
1. Push this repository to GitHub.
2. Go to Settings → Pages.
3. Under "Build and deployment" set "Deploy from" to `Branch: main` and folder `/ (root)`.
4. Save.

## Customization guide
- Colors: edit `css/variables.css` (CSS custom properties)
- Copy: edit `data/content.json`
- Layout and responsive rules: `css/layout.css` and `css/responsive.css`
- Animations & particles: `css/animations.css`, `js/particles.js`

## Credits
- Fonts: Cinzel, Inter, Cormorant Garamond (Google Fonts)

## License
MIT — see LICENSE file.
