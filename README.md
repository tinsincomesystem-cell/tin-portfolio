# How to edit my site

This is Tin's portfolio website. You **never need to touch code** to change text, prices, photos or links. Everything lives in a few plain-text files.

---

## 1. Where everything lives

| I want to change… | Edit this file |
|---|---|
| My name, email, booking link, social links, hero headline, SEO | `src/content/site.yaml` |
| The 4 services + "not in real estate" branding offers | `src/content/services.yaml` |
| **Prices**, plans, features, "Most popular" | `src/content/pricing.yaml` |
| VA Need Score questions, weights, result tiers | `src/content/quiz.yaml` |
| Brand case studies + brand packets (Luxe, Naomi…) | `src/content/brands.yaml` |
| Website gallery (screenshots, live links, filters) | `src/content/websites.yaml` |
| Automation diagram, calculator, system screenshots | `src/content/automation.yaml` |
| Testimonials | `src/content/testimonials.yaml` |
| About me, tools, certificates, intro video | `src/content/about.yaml` |
| Process steps | `src/content/process.yaml` |
| FAQ | `src/content/faq.yaml` |
| **Colors, fonts, spacing, animation speed** | `src/styles/tokens.css` |
| Order of sections on the homepage | `src/pages/index.astro` (move the `<Section />` lines) |

### Rules for `.yaml` files (the only thing that can break)
- Keep the **indentation** (spaces at the start of lines) exactly as it is. Use spaces, never tabs.
- If your text contains a colon `:` or starts with a special character, keep it inside **"double quotes"**.
- To add an item to a list, copy an existing item (the line starting with `-` and everything indented under it) and change the values.
- Lines starting with `#` are notes to you. The website ignores them.
- Make a word *italic gold* in a headline by wrapping it in stars: `"Brands that *sell* homes."`

If you make a typo, the build will stop and tell you the file and line, e.g. *"There's a typo in src/content/pricing.yaml…"*. Nothing breaks on your live site; the old version stays up until the fix is in.

---

## 2. Change a price

Open `src/content/pricing.yaml`, find the plan, and change the number:

```yaml
      - name: "Essentials"
        price: "$650"        ← change this
        period: "/month"
```

- Move the "Most popular" badge by putting `popular: true` on a different plan.
- `mode: monthly` plans appear under **Monthly support**. `mode: project` plans appear under **One-time projects**.

## 3. Change or add a photo

1. Put your image (JPG, PNG or WebP, the larger the better) into the right folder inside `src/assets/` (e.g. `src/assets/websites/`).
2. In the matching `.yaml` file, set the path **without** `src/assets/`, e.g. `image: "websites/my-new-site.png"`.

Or simply **replace a file with a new one that has the exact same name**, and nothing else needs to change.

The site automatically converts photos to fast modern formats (WebP) in several sizes, so don't worry about file size.

- **Hero photo:** `src/assets/me/tin-arms-crossed.png`. A transparent-background PNG looks best.
- **Website "hover to scroll" preview:** add a tall full-page screenshot as `scroll:` on that website.

## 4. Testimonials

In `src/content/testimonials.yaml`, paste the client's words between the quotes after `quote:`. Cards with an empty quote are hidden on the live site.

## 5. TODO markers

While `showTodos: true` (in `site.yaml`), unfinished spots show a dashed **TODO** badge so you can find them. **Before launch, set `showTodos: false`**: TODO badges disappear and empty testimonials/websites are hidden.

Current TODOs: search the project for `TODO` (in VS Code: Ctrl/Cmd + Shift + F).

## 6. Leads: where do form submissions go?

- **Contact form** and **VA Score email capture** are Netlify Forms (with spam protection). Submissions appear in Netlify → *Forms*, and Netlify emails them to you (set under Forms → Form notifications).
- **Send leads into GoHighLevel or n8n (optional):** in Netlify go to *Site configuration → Environment variables → Add variable*:
  - Key: `CRM_WEBHOOK_URL`
  - Value: your GHL *Inbound Webhook* URL (Automation → Workflows → trigger "Inbound Webhook") or your n8n *Webhook* node URL.

  Every submission is then forwarded automatically (name, email, phone, interests, budget, message, VA score, tier, top leaks and answers). Redeploy once after adding it.
- **Booking calendar:** change `bookingUrl` in `site.yaml`.

## 7. Brand packets (send to clients)

Every brand in `brands.yaml` gets its own page: `/brand/luxe-realty-group`, `/brand/naomi-rhodes`.
Open it and click **Download PDF** (choose "Save as PDF" and turn on "Background graphics") to get a client-ready guidelines packet.

To add a new brand, copy a whole brand block in `brands.yaml` (from `- slug:` down) and change the name, colors, fonts and images. Logo, postcards, yard sign, business cards and website concept are all drawn automatically from those values. The brand fonts must be added in `src/styles/fonts.css`.

## 8. Hero motion clip (optional): "me tapping the mockups"

The hero already animates your mockups being tapped as people scroll. To make it **you** doing the tapping:

1. Film a 6–8 second clip, phone **vertical**, camera still, against a plain wall, black top, good front light:
   - Look at the camera, smile, and **tap the air** with your index finger at roughly: upper-left → upper-right → middle-left → middle-right → lower-left → lower-right (where the cards float), about 1 second each.
   - Finish by **crossing your arms and smiling** for 1–2 seconds.
2. Send the video to your developer (or Claude). It gets cut into transparent frames (`public/hero-frames/frame-001.webp …`).
3. In `site.yaml`, set `frames: { count: 90, … }` (the number of frames). The site will play the clip in sync with scrolling. No code changes needed.

## 9. Colors, fonts and motion

Open `src/styles/tokens.css`:
- Colors: change any hex value, e.g. `--champagne: #c8a97e;`
- Fonts: font names are at `--font-display`, `--font-body`, `--font-mono` (the files are declared in `src/styles/fonts.css`).
- Animation speed: `--motion-scale: 1;` (1.5 = slower, 0.7 = faster). Turn smooth scrolling off with `--smooth-scroll: 0;`.
- Visitors who turn on "reduce motion" on their device automatically get a calm version with no animation.

---

## For developers

```bash
npm install
npm run dev       # local preview at http://localhost:4321
npm run build     # production build → dist/
```

- Astro 5 (static) + TypeScript, vanilla CSS with design tokens, GSAP + ScrollTrigger, Lenis.
- Content: `src/content/*.yaml`, loaded by `src/lib/content.ts`. Images via `src/lib/images.ts` (`astro:assets`).
- Netlify: `netlify.toml`. Forms are detected from the static HTML. `netlify/functions/submission-created.mjs` forwards submissions to `CRM_WEBHOOK_URL`.
- Pages: `/` (home), `/brand/[slug]` (brand packets), `/thank-you` (no-JS form fallback), `/404`.
