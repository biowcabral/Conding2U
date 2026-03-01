/* ═══════════════════════════════════════════════════════
   STUDIO.LP — MAIN JAVASCRIPT
   GSAP + ScrollTrigger + Lenis + Custom Cursor + Particles
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────
     SCROLL RESTORATION — força retorno ao topo no refresh
     ───────────────────────────────────────────────────── */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  /* ─────────────────────────────────────────────────────
     RESET DE ESTADOS — limpa inline styles do GSAP e
     classes dinâmicas antes de reanimar no refresh
     ───────────────────────────────────────────────────── */
  function resetAnimationStates() {
    window.scrollTo(0, 0);

    // Mata todos os ScrollTriggers existentes
    ScrollTrigger.getAll().forEach(t => t.kill());

    // Reverte inline styles dos elementos de reveal (volta ao CSS: opacity:0 / translateY)
    gsap.utils.toArray('.reveal-up, .reveal-card').forEach(el => gsap.set(el, { clearProps: 'all' }));

    // Reverte hero elements
    gsap.set('#hero-sub, #hero-ctas, #hero-stats, .scroll-indicator, #hero-eyebrow', { clearProps: 'all' });
    document.querySelectorAll('.hero-line span, .hero-line em').forEach(el => gsap.set(el, { clearProps: 'all' }));

    // Glows não têm opacity:0 no CSS, então forçar 0 antes de animar
    gsap.set('.glow-1, .glow-2, .glow-3', { opacity: 0 });

    // Remove classes lit do manifesto
    document.querySelectorAll('.m-word').forEach(w => w.classList.remove('lit'));
  }

  /* ─────────────────────────────────────────────────────
     AGUARDA GSAP ESTAR DISPONÍVEL
     ───────────────────────────────────────────────────── */
  function waitForGSAP(cb) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      cb();
    } else {
      setTimeout(() => waitForGSAP(cb), 60);
    }
  }



  /* ─────────────────────────────────────────────────────
     PARTÍCULAS CSS
     ───────────────────────────────────────────────────── */
  function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const count = window.innerWidth < 768 ? 8 : 20;
    const style = document.createElement('style');
    let cssText = '';

    for (let i = 0; i < count; i++) {
      const size    = Math.random() * 3 + 1;
      const x       = Math.random() * 100;
      const y       = Math.random() * 100;
      const dur     = Math.random() * 20 + 15;
      const delay   = Math.random() * 10;
      const opacity = Math.random() * 0.3 + 0.05;
      const hue     = Math.random() > 0.6 ? '250' : (Math.random() > 0.5 ? '280' : '45');

      const p = document.createElement('div');
      p.className = `particle p${i}`;
      container.appendChild(p);

      cssText += `
        .p${i} {
          position: absolute;
          left: ${x}%;
          top: ${y}%;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: hsl(${hue}, 80%, 70%);
          opacity: ${opacity};
          animation: floatParticle${i} ${dur}s ${delay}s ease-in-out infinite;
        }
        @keyframes floatParticle${i} {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: ${opacity}; }
          33% { transform: translate(${(Math.random()-0.5)*60}px, ${(Math.random()-0.5)*60}px) scale(1.2); opacity: ${opacity * 1.5}; }
          66% { transform: translate(${(Math.random()-0.5)*40}px, ${(Math.random()-0.5)*40}px) scale(0.8); opacity: ${opacity * 0.7}; }
        }
      `;
    }

    style.textContent = cssText;
    document.head.appendChild(style);
  }

  /* ─────────────────────────────────────────────────────
     NAVBAR — SCROLL + HAMBURGER
     ───────────────────────────────────────────────────── */
  function initNavbar() {
    const navbar  = document.getElementById('navbar');
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .nav-link');

    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
      }, { passive: true });
    }

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = mobileMenu.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity   = mobileMenu.classList.contains('open') ? '0' : '1';
        spans[2].style.transform = mobileMenu.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
      });
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu) mobileMenu.classList.remove('open');
      });
    });
  }

  /* ─────────────────────────────────────────────────────
     MAGNETIC BUTTONS
     ───────────────────────────────────────────────────── */
  function initMagnetic() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect   = el.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = e.clientX - cx;
        const dy     = e.clientY - cy;
        const dist   = Math.sqrt(dx * dx + dy * dy);
        const limit  = 80;
        if (dist < limit) {
          const pull = (limit - dist) / limit;
          el.style.transform = `translate(${dx * pull * 0.4}px, ${dy * pull * 0.4}px)`;
        }
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        el.style.transform = '';
      });
    });
  }

  /* ─────────────────────────────────────────────────────
     ANIMAÇÃO DO HERÓI
     ───────────────────────────────────────────────────── */
  function animateHero() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Glows de fundo
    tl.to('.glow-1', { opacity: 1, duration: 2, ease: 'power2.out' }, 0)
      .to('.glow-2', { opacity: 1, duration: 2, ease: 'power2.out' }, 0.3)
      .to('.glow-3', { opacity: 1, duration: 2, ease: 'power2.out' }, 0.5);

    // Eyebrow
    tl.from('#hero-eyebrow', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, 0.4);
    tl.set('#hero-eyebrow', { opacity: 1 }, 0.4);
    tl.to('#hero-eyebrow', { opacity: 1, y: 0, duration: 0.8 }, 0.4);

    // Linhas do título — cada uma sobe por dentro do clip
    document.querySelectorAll('.hero-line').forEach((line, i) => {
      const inner = line.querySelectorAll('span, em');
      tl.from(inner, {
        y: '110%',
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out',
      }, 0.5 + i * 0.15);
    });

    // Subtítulo, CTAs, stats
    tl.to('#hero-sub',   { opacity: 1, y: 0, duration: 0.9 }, 1.0)
      .to('#hero-ctas',  { opacity: 1, y: 0, duration: 0.9 }, 1.15)
      .to('#hero-stats', { opacity: 1, y: 0, duration: 0.9 }, 1.3)
      .to('.scroll-indicator', { opacity: 1, duration: 1 }, 1.8);

    // Contadores do hero
    animateCounters(document.querySelectorAll('.hero-stats .stat-number'), tl, 1.3);
  }

  /* ─────────────────────────────────────────────────────
     MANIFESTO — PALAVRA POR PALAVRA COM SCROLL
     ───────────────────────────────────────────────────── */
  function initManifesto() {
    const words = document.querySelectorAll('.m-word');
    if (!words.length) return;

    ScrollTrigger.create({
      trigger: '#manifesto',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const total    = words.length;
        words.forEach((w, i) => {
          const threshold = i / total;
          if (progress > threshold) {
            w.classList.add('lit');
          } else {
            w.classList.remove('lit');
          }
        });
      },
    });
  }

  /* ─────────────────────────────────────────────────────
     REVEAL — ELEMENTOS GERAIS COM SCROLL
     ───────────────────────────────────────────────────── */
  function initReveal() {
    // .reveal-up — entram de baixo
    gsap.utils.toArray('.reveal-up').forEach((el) => {
      const delay = (parseFloat(el.style.getPropertyValue('--delay')) || 0) * 0.15;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    // .reveal-card — cards com stagger via delay CSS var
    gsap.utils.toArray('.reveal-card').forEach((el) => {
      const delay = (parseFloat(el.style.getPropertyValue('--delay')) || 0) * 0.12;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  /* ─────────────────────────────────────────────────────
     CONTADORES — ANIMAÇÃO DE NÚMEROS
     ───────────────────────────────────────────────────── */
  function animateCounters(nodes, tl, startTime) {
    nodes.forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const obj    = { val: 0 };

      if (tl) {
        tl.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val); },
        }, startTime);
      } else {
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val); },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    });
  }

  function initCounters() {
    // Contadores na seção de números (não no hero)
    animateCounters(
      document.querySelectorAll('.numbers-section .big-number'),
      null
    );
  }

  /* ─────────────────────────────────────────────────────
     PARALLAX SUTIL NOS GLOWS
     ───────────────────────────────────────────────────── */
  function initParallax() {
    gsap.to('.glow-1', {
      y: -80,
      scrollTrigger: { trigger: '#hero', scrub: 1.5, start: 'top top', end: 'bottom top' },
    });
    gsap.to('.glow-2', {
      y: 60,
      scrollTrigger: { trigger: '#hero', scrub: 2, start: 'top top', end: 'bottom top' },
    });
  }

  /* ─────────────────────────────────────────────────────
     FLUXO DE AUTOMAÇÃO — PULSO SEQUENCIAL
     ───────────────────────────────────────────────────── */
  function initFlowAnimation() {
    const nodes = document.querySelectorAll('.flow-node');
    if (!nodes.length) return;

    let current = 0;
    function pulse() {
      nodes.forEach(n => n.style.boxShadow = '');
      nodes[current].style.boxShadow = '0 0 20px rgba(99,102,241,0.6)';
      current = (current + 1) % nodes.length;
    }

    ScrollTrigger.create({
      trigger: '.flow-visual',
      start: 'top 80%',
      onEnter: () => {
        setInterval(pulse, 600);
      },
    });
  }

  /* ─────────────────────────────────────────────────────
     PORTFOLIO FILTER
     ───────────────────────────────────────────────────── */
  function initPortfolioFilter() {
    const btns  = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        items.forEach((item) => {
          const show = filter === 'all' || item.dataset.category === filter;
          if (show) {
            item.classList.remove('hidden');
            gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
          } else {
            gsap.to(item, {
              opacity: 0, y: -10, duration: 0.3,
              onComplete: () => item.classList.add('hidden'),
            });
          }
        });
      });
    });
  }

  /* ─────────────────────────────────────────────────────
     PRICING TOGGLE — MENSAL / ÚNICO
     ───────────────────────────────────────────────────── */
  function initPricingToggle() {
    const toggle = document.getElementById('pricing-toggle-input');
    if (!toggle) return;

    toggle.addEventListener('change', () => {
      const monthly = toggle.checked;
      document.querySelectorAll('.price-amount').forEach((el) => {
        const targetVal = monthly
          ? parseInt(el.dataset.monthly, 10)
          : parseInt(el.textContent.replace(/\D/g, ''), 10);
        const onceVal = el.dataset.once || el.textContent.replace(/\./g, '').trim();

        // Guarda valor único se ainda não tem
        if (!el.dataset.once) {
          el.dataset.once = el.textContent.replace(/\./g, '').trim();
        }

        const from = parseInt(el.textContent.replace(/\D/g, ''), 10);
        const to   = monthly
          ? parseInt(el.dataset.monthly, 10)
          : parseInt(el.dataset.once, 10);
        const obj  = { val: from };

        gsap.to(obj, {
          val: to,
          duration: 0.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString('pt-BR');
          },
        });
      });

      // Atualiza período
      const isLang = document.documentElement.dataset.lang;
      document.querySelectorAll('.price-period').forEach((el) => {
        el.textContent = monthly
          ? (isLang === 'en' ? '/month' : '/mês')
          : (isLang === 'en' ? '/project' : '/projeto');
      });
    });
  }

  /* ─────────────────────────────────────────────────────
     FORMULÁRIO DE CONTATO
     ───────────────────────────────────────────────────── */
  function initContactForm() {
    const form     = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name  = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const svc   = document.getElementById('cf-service').value;

      if (!name || !email || !svc) {
        showFeedback('error', 'Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      const btn = form.querySelector('.form-submit');
      btn.disabled = true;
      btn.textContent = '⏳ Enviando...';

      // Simulação de envio (integre seu backend/Formspree aqui)
      setTimeout(() => {
        showFeedback('success', '✅ Mensagem enviada! Retornarei em até 24h.');
        form.reset();
        btn.disabled = false;
        btn.textContent = btn.dataset.pt || 'Enviar Mensagem →';
      }, 1800);
    });

    function showFeedback(type, msg) {
      feedback.textContent = msg;
      feedback.className = 'form-feedback ' + type;
      setTimeout(() => { feedback.className = 'form-feedback'; }, 5000);
    }
  }

  /* ─────────────────────────────────────────────────────
     INTERNACIONALIZAÇÃO — PT / EN
     ───────────────────────────────────────────────────── */
  function initI18n() {
    const btn  = document.getElementById('lang-toggle');
    const html = document.documentElement;
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isEn = html.dataset.lang === 'en';
      const next = isEn ? 'pt' : 'en';
      html.dataset.lang = next;
      html.lang         = next === 'pt' ? 'pt-BR' : 'en';

      // Troca todos os elementos com data-pt / data-en
      document.querySelectorAll('[data-pt][data-en]').forEach((el) => {
        const text = el.dataset[next];
        if (text !== undefined) {
          // innerHTML para elementos com tags (h2 com <br>, <em>)
          if (el.innerHTML.includes('<')) {
            el.innerHTML = text;
          } else {
            el.textContent = text;
          }
        }
      });

      // Select options
      document.querySelectorAll('select option[data-pt]').forEach((opt) => {
        const text = opt.dataset[next];
        if (text) opt.textContent = text;
      });

      // Atualiza button text
      btn.textContent = next === 'pt' ? 'PT / EN' : 'EN / PT';

      // Atualiza atributo html.lang
      document.title = next === 'en'
        ? 'conding2u — Landing Pages & Automations'
        : 'conding2u — Landing Pages & Automações';
    });
  }

  /* ─────────────────────────────────────────────────────
     LINHA HORIZONTAL NOS CARDS DE PREÇO — GRADIENTE ANIMADO
     ───────────────────────────────────────────────────── */
  function initPricingGlow() {
    document.querySelectorAll('.pricing-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width)  * 100;
        const y = ((e.clientY - rect.top)  / rect.height) * 100;
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
      });
    });

    // Adiciona CSS para o efeito via JS para evitar inline style no HTML
    const s = document.createElement('style');
    s.textContent = `
      .pricing-card { --mx: 50%; --my: 50%; }
      .pricing-card:hover .pricing-card-glow {
        background: radial-gradient(circle at var(--mx) var(--my), rgba(99,102,241,0.12) 0%, transparent 60%);
      }
    `;
    document.head.appendChild(s);
  }

  /* ─────────────────────────────────────────────────────
     SEÇÃO DE NÚMEROS — LINHA SEPARADORA ANIMADA
     ───────────────────────────────────────────────────── */
  function initNumbersDividers() {
    const blocks = document.querySelectorAll('.number-block');
    blocks.forEach((b, i) => {
      if (i < blocks.length - 1) {
        const divider = document.createElement('div');
        divider.style.cssText = 'width:1px;background:rgba(255,255,255,0.15);height:60px;align-self:center;';
        b.after(divider);
      }
    });
  }

  /* ─────────────────────────────────────────────────────
     FOOTER — SCROLL DE TEXTO EM LOOP
     ───────────────────────────────────────────────────── */
  function initMarquee() {
    // Cria uma faixa de marquee acima do footer
    const marqueeWrap = document.createElement('div');
    marqueeWrap.style.cssText = `
      overflow: hidden;
      background: var(--accent);
      padding: 14px 0;
      white-space: nowrap;
    `;

    const text = 'Landing Pages ✦ Automações ✦ ChatBots ✦ Funis de Venda ✦ E-mail Marketing ✦ Integrações ✦ ';
    const track = document.createElement('div');
    track.style.cssText = 'display:inline-block;';
    track.innerHTML = (text + text + text).split('').map(c => `<span style="display:inline">${c}</span>`).join('');

    // Mais eficiente: apenas duplicar o texto
    track.innerHTML = `<span style="font-family:var(--font-display);font-size:1.15rem;letter-spacing:0.06em;color:white">${text.repeat(6)}</span>`;

    marqueeWrap.appendChild(track);

    const footer = document.getElementById('footer');
    if (footer) footer.before(marqueeWrap);

    gsap.to(track, {
      xPercent: -50,
      duration: 25,
      ease: 'none',
      repeat: -1,
    });
  }

  /* ─────────────────────────────────────────────────────
     INIT GERAL
     ───────────────────────────────────────────────────── */
  function init() {
    // Não-GSAP — inicia imediatamente
    initParticles();
    initNavbar();
    initContactForm();
    initI18n();
    initPortfolioFilter();

    // GSAP-dependent
    waitForGSAP(() => {
      gsap.registerPlugin(ScrollTrigger);
      if (typeof TextPlugin !== 'undefined') gsap.registerPlugin(TextPlugin);

      gsap.ticker.lagSmoothing(0);

      resetAnimationStates();
      animateHero();
      initManifesto();
      initReveal();
      initCounters();
      initParallax();
      initFlowAnimation();
      initPricingToggle();
      initMagnetic();
      initPricingGlow();
      initNumbersDividers();
      initMarquee();
    });
  }

  // Inicia quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
