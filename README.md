# The Spine Centre — Website

## 🚀 Deploy to Vercel (3 Methods)

---

### METHOD 1: Drag & Drop (Easiest — No Account Needed)

1. Go to **https://vercel.com/new**
2. Sign up / log in with GitHub, Google, or email
3. Click **"Deploy without Git"** or drag the entire `spine-centre` folder onto the page
4. Vercel auto-detects it as a static site
5. Click **Deploy** → your site is live in ~30 seconds!
6. You'll get a free URL like: `the-spine-centre.vercel.app`

---

### METHOD 2: Via GitHub (Recommended for Updates)

1. Go to **https://github.com/new** → create a new repo (e.g. `the-spine-centre`)
2. Upload all files from this folder to the repo
3. Go to **https://vercel.com/new**
4. Click **"Import Git Repository"** → select your GitHub repo
5. Click **Deploy** — done!

> **Bonus:** Every time you push changes to GitHub, Vercel auto-redeploys!

---

### METHOD 3: Vercel CLI

```bash
npm install -g vercel
cd spine-centre
vercel
```
Follow the prompts. Your site deploys in seconds.

---

## 📁 Project Structure

```
spine-centre/
├── index.html          ← Main entry point
├── vercel.json         ← Vercel deployment config
├── favicon.ico         ← Browser tab icon
├── favicon-192.png     ← Mobile/Apple icon
├── thesspinelogo.jpg   ← The Spine Centre logo
├── css/
│   ├── shared.css      ← Global styles, nav, footer
│   ├── home.css        ← Home page styles
│   └── services.css    ← Service pages styles
├── js/
│   └── main.js         ← Navigation, animations, booking
└── pages/              ← Page HTML components (reference)
```

---

## 🌐 Custom Domain (Optional)

After deploying:
1. Go to your Vercel project dashboard
2. Click **Settings → Domains**
3. Add your domain (e.g. `thespinecentre.com`)
4. Update your domain's DNS as instructed by Vercel

---

## 📞 Contact Info in Website

- Phone: +91 97121 55905
- WhatsApp: https://wa.me/919712155905
- Hours: Mon–Sun 9am–7:30pm
