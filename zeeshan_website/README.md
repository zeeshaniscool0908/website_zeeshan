# Syed Zeeshan Ahmad — Personal Portfolio

A fully coded, multi-page personal portfolio site. Design system: **Imperial Scholar** — deep black backgrounds, blood red accents, gold highlights, and a mix of Playfair Display, Rajdhani, Caveat, and Crimson Pro fonts.

## File Structure

```
/
├── index.html                  Home — hero, carousel, identity grid
├── about.html                  Bio, values, quote, fun facts, photo gallery
├── hobbies.html                Skills, hobbies, goals timeline
├── contact.html                Social links, contact info
├── galleries.html              Gallery hub — 4 category cards
├── galleries-3d.html           3D printing gallery
├── galleries-maps.html         H.E.A. world-building maps
├── galleries-art.html          Calligraphy, painting, digital art
├── galleries-achievements.html Academic and personal achievements
├── css/
│   ├── style.css               Master stylesheet (all theming, components, animations)
│   └── dark.css                Stub — dark mode is handled via :root in style.css
├── js/
│   ├── main.js                 Theme toggle, nav, lightbox, carousel, skill bars
│   └── animations.js           IntersectionObserver scroll animations
├── images/                     Add real images here (see below)
├── favicon.svg                 Arabic "زيشان" favicon
├── sitemap.xml                 SEO sitemap
├── robots.txt                  Search crawler config
└── README.md                   This file
```

---

## Deploy: GitHub Pages

1. Push this folder to a GitHub repo (e.g. `zeeshan-portfolio`)
2. Go to **Settings → Pages**
3. Set Source to **Deploy from a branch → main → / (root)**
4. Your site will be live at `https://yourusername.github.io/zeeshan-portfolio/`

To use a custom domain, add a `CNAME` file with your domain (e.g. `zeeshanahmad.dev`) and configure DNS.

---

## Deploy: Netlify

**Option A — Drag & Drop**
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag the entire portfolio folder onto the deploy zone
3. Done — you'll get a `*.netlify.app` URL instantly

**Option B — Git-connected**
1. Push the folder to GitHub
2. Go to Netlify → **Add new site → Import an existing project**
3. Connect to GitHub and select your repo
4. Set build command to *(leave empty)* and publish directory to `/`
5. Deploy

---

## Deploy: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. From the portfolio folder, run: `vercel`
3. Follow the prompts — no build command needed for static HTML
4. Your site will be live at a `*.vercel.app` URL

---

## Replacing Placeholder Images

All images are currently CSS-rendered emoji placeholders. To replace with real photos:

1. Add your image files to the `/images/` folder
2. Find any `<div class="photo-item" data-lightbox ...>` or `<div class="gallery-item" ...>` element
3. Replace the emoji text node with an `<img>` tag:

```html
<!-- Before -->
<div class="photo-item" data-lightbox data-emoji="🎓" data-caption="Graduation Day">
  🎓
  <div class="photo-item__overlay">...</div>
</div>

<!-- After -->
<div class="photo-item" data-lightbox data-emoji="" data-caption="Graduation Day">
  <img src="images/graduation.jpg" alt="Graduation Day" style="width:100%;height:100%;object-fit:cover;border-radius:0;">
  <div class="photo-item__overlay">...</div>
</div>
```

4. For the hero and bio photo placeholders, find `.hero__photo` and `.bio-photo` divs and add an `<img>` inside them similarly.

---

## Theme

Dark mode is the default. Light mode is toggled by adding the `.light` class to `<body>` via the ☀️ button. State persists in `localStorage` under key `zeeshan-theme`.

To customize colors, edit the CSS custom properties in `:root` and `body.light` at the top of `css/style.css`.

---

## Fonts (Google Fonts)

| Role | Font |
|------|------|
| Headers | Playfair Display |
| Navigation / Tech text | Rajdhani |
| Playful labels | Caveat |
| Body text | Crimson Pro |

Loaded via CDN in every `<head>`. No install needed.

---

*Built for Syed Zeeshan Ahmad — Penn State Class of 2030.*
