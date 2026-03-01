# Studio.LP — Instruções para o Copilot

## Visão geral
Portfolio cinematográfico de landing pages e automações. Arquivo único `index.html` com CSS em `assets/css/style.css` e JS em `assets/js/main.js`.

## Arquitetura
- Projeto estático (HTML + CSS + JS puro)
- Animações via GSAP 3 + ScrollTrigger (CDN)
- Smooth scroll via Lenis (CDN)
- Bilíngue: cada elemento com `data-pt` e `data-en`; troca via `main.js → initI18n()`

## Regras de edição
- Sempre manter os atributos `data-pt` e `data-en` em sync
- Variáveis CSS estão em `:root` no início de `style.css`
- Animações de entrada usam as classes `.reveal-up` e `.reveal-card` (animadas pelo GSAP)
- Não usar frameworks JS — manter vanilla
