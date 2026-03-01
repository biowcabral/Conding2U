# Studio.LP — Portfólio de Landing Pages & Automações

Portfolio cinematográfico com scroll narrativo para vender serviços de landing pages e automações de marketing.

## Stack
- HTML5 + CSS3 + JavaScript (vanilla)
- [GSAP 3](https://greensock.com/gsap/) + ScrollTrigger (animações de scroll)
- [Lenis](https://lenis.darkroom.engineering/) (smooth scroll)
- Google Fonts (Bebas Neue, Inter, DM Serif Display)

## Estrutura
```
Portfolio-LP/
├── index.html          ← página principal
├── assets/
│   ├── css/style.css   ← todo o CSS (dark theme + responsivo)
│   └── js/main.js      ← GSAP, Lenis, cursor, i18n, formulário
└── .github/
    └── copilot-instructions.md
```

## Como visualizar
Abra o arquivo `index.html` diretamente no navegador **ou** use a extensão **Live Server** do VS Code (botão direito → "Open with Live Server").

## Como personalizar
| O que mudar | Onde |
|---|---|
| Nome/marca | `index.html` → `.nav-logo`, `.footer-logo` |
| Cores | `style.css` → `:root { --accent: ... }` |
| Textos PT | Atributos `data-pt="..."` em cada elemento |
| Textos EN | Atributos `data-en="..."` em cada elemento |
| Preços | `index.html` → `.price-amount` e `data-monthly` |
| WhatsApp | `index.html` → link `https://wa.me/55SEUNUMERO` |
| E-mail | `index.html` → `contato@studio-lp.com` |
| Formulário | `main.js` → função `initContactForm()` — integre Formspree, EmailJS ou seu backend |

## Deploy
Qualquer hospedagem de arquivos estáticos:
- **Vercel**: `vercel --prod` ou conecte o repositório
- **Netlify**: arraste a pasta para netlify.com/drop
- **GitHub Pages**: ative nas configurações do repositório
- **Railway**: adicione como static site
