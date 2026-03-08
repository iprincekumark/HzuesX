# 🌌 Princevrse — Developer Portfolio

> **Premium developer portfolio** with Aurora backgrounds, glassmorphism UI, luxury watch clock, and interactive animations.

**Live**: [princevrse.com](https://princevrse.com)

---

## ⚡ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + Vite 6 |
| **Styling** | TailwindCSS v4 |
| **Animations** | GSAP + ScrollTrigger |
| **Background** | OGL Aurora (dark) · Aceternity Aurora (light) |
| **Icons** | react-icons |
| **Email** | EmailJS |
| **Deployment** | Vercel |

---

## 🎨 Features

- 🌗 **Time-based theme** — Auto light/dark (6AM–6PM = light)
- 🔮 **Aurora backgrounds** — OGL shader (dark), CSS gradients (light)
- 🪟 **Glassmorphism** — Frosted glass section cards
- ⌚ **Luxury SVG clock** — Live analog watch at section boundary
- 📜 **Scroll animations** — GSAP ScrollTrigger reveals
- 🛡️ **Security shield** — DevTools detection, anti-scraping, bot blocking
- 📬 **Contact form** — Sends emails via EmailJS
- 📱 **Fully responsive** — Mobile, tablet, desktop

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone git@github.com:iprincekumark/HzuesX.git
cd HzuesX/princevrse
npm install
```

### Environment Variables

Create `.env` in the `princevrse/` directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
npm run preview
```

---

## 📬 Contact Form Email Setup

1. Create account at [emailjs.com](https://www.emailjs.com/)
2. Add Gmail service → Create email template
3. Template variables: `{{from_name}}`, `{{from_email}}`, `{{company}}`, `{{message}}`
4. Copy Service ID, Template ID, Public Key into `.env`

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set **Root Directory**: `princevrse`
4. Set **Build Command**: `npm run build`
5. Set **Output Directory**: `dist`
6. Add environment variables
7. Deploy

### Custom Domain

| DNS Record | Name | Value |
|---|---|---|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

---

## 🔒 Security

- Source maps disabled in production
- Terser minification (console/debugger stripped)
- DevTools detection with 3D popup modal
- Right-click, keyboard shortcuts blocked
- Bot/headless browser detection
- Security headers via `vercel.json`

---

## 📁 Project Structure

```
princevrse/
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/            # Images and static assets
│   ├── components/
│   │   ├── animation/     # CurvedLoopPrince
│   │   ├── background/    # OGL Aurora shader
│   │   ├── layout/        # Navbar, Footer, GlassSection
│   │   ├── sections/      # About, Skills, Projects, Contact
│   │   ├── security/      # SecurityShield
│   │   └── ui/            # ScrollReveal, SplitClock, CaughtYouModal
│   ├── hooks/             # useDevToolsDetect
│   ├── sections/home/     # HeroIntro, GlitchPrince
│   ├── styles/            # CSS modules
│   ├── theme/             # AppBackground
│   ├── App.jsx
│   └── index.css
├── .env
├── vite.config.js
├── vercel.json
└── package.json
```

---

## 📊 SEO

- Meta tags, Open Graph, Twitter Cards in `index.html`
- JSON-LD structured data
- `robots.txt` + `sitemap.xml`
- Canonical URL: `https://princevrse.com`
- Semantic HTML with proper heading hierarchy

---

## 📄 License

MIT © [Prince Kumar](https://github.com/iprincekumark)

---

<p align="center">
  Designed & Built with ❤️ by <strong>Prince Kumar</strong>
</p>