# Noxveil — The Veil Between Sin and Sorrow

A cinematic single-page character portfolio for a dark-fantasy demon named Noxveil — built with pure HTML, CSS, and vanilla JavaScript for zero-build deployment on GitHub Pages.

![Screenshot placeholder](assets/images/screenshot.png)

Live demo placeholder: https://TuanFine.github.io/Noxveil

## Files and structure

- `index.html` — single-page portfolio shell
- `css/` — reset, variables, typography, layout, components, animation, responsive styles
- `js/` — particle system, form behavior, quote slider, custom cursor
- `data/content.json` — lore, traits, powers, whispers, and dynamic content
- `assets/images/` — hero and gallery placeholders for future photography
- `assets/icons/favicon.svg` — custom Noxveil sigil

## Adding character photos

1. Drop your images into `assets/images/`.
2. Replace the hero placeholder by renaming or updating the reference to `hero-portrait.jpg` in `index.html`.
3. Replace gallery placeholders `placeholder-01.jpg` through `placeholder-06.jpg`.
4. Update any captions in `index.html` or the JSON in `data/content.json` if you want custom wording.

Recommended hero image size: 1200x1600 for a 3:4 portrait.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. Go to `Settings` → `Pages`.
3. Under `Build and deployment`, choose `Deploy from a branch`.
4. Set the branch to `main` and the folder to `/ (root)`.
5. Save. The site will be published at `https://<username>.github.io/<repo-name>`.

## Customization guide

- Theme colors: edit `css/variables.css`
- Copy and lore: edit `data/content.json`
- Layout and spacing: review `css/layout.css` and `css/components.css`
- Motion and effects: review `css/animations.css` and `js/particles.js`

## Credits

- Google Fonts: Cinzel, Inter, Cormorant Garamond
- Inspiration: dark-fantasy character sites, gothic portfolio design, cinematic demonic aesthetics

## License

MIT. See `LICENSE` for full details.

