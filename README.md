# Sozoq – Next.js

Full landing page built from Figma at 1440px design width:

- Hero (node 3549:1294)
- Work · Trusted by · highlights strip (node 3994:1526)
- Services · Work · About · FAQ · Footer (frame 3658:1687, file `gyHsVxMJIrtU3hoqXsb3b7`)
- Work page `/work` (node 3979:6342) – same components as the home Work section
- Case studies: `/work/sozokyu`, `/work/sozokyu-dashboard` (node 3895:4497), `/work/workley`

## Run
```bash
npm install
npm run assets   # downloads the raster photos from Figma -> public/assets/images
npm run assets:dashboard   # the 2 screenshots for /work/sozokyu-dashboard
npm run assets:trusted     # the 'Trusted by' logos -> public/assets/logos
npm run assets:work        # the cat mascot on /work -> public/assets/images/work-cat.png
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure
```
public/assets/icons/   exact SVGs exported from Figma
public/assets/images/  raster photos (filled by `npm run assets`)
scripts/               fetch-figma-assets.mjs
src/app/               layout.js (fonts), page.js, globals.css
src/components/        Header, Hero, Services, Work, About, Faq, Footer, ...
src/data/content.js    all copy, image paths, icon paths
```

## Sozokyu e-commerce case study (/work/sozokyu)
"Design & development" uses the Wireframe ⇄ Full colour switch with
`public/assets/images/case-sozokyu-wireframe.png` and `case-sozokyu-colour.png`
(separate from the dashboard page's `case-dashboard-*.png`).
They are currently copies of the dashboard screenshots – export the e-commerce
product-page frames from Figma (PNG @2x) and overwrite these two files.
