(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  const year = document.querySelector('#year');
  const mobileBreakpoint = 960;

  if (year) year.textContent = String(new Date().getFullYear());

  const syncHeaderHeight = () => {
    if (!header) return;
    root.style.setProperty('--header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
  };

  syncHeaderHeight();

  if ('ResizeObserver' in window && header) {
    const headerResizeObserver = new ResizeObserver(syncHeaderHeight);
    headerResizeObserver.observe(header);
  } else {
    window.addEventListener('resize', syncHeaderHeight, { passive: true });
  }

  let scrollTicking = false;
  const updateHeader = () => {
    header?.classList.toggle('scrolled', window.scrollY > 24);
    scrollTicking = false;
  };

  const requestHeaderUpdate = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(updateHeader);
  };

  updateHeader();
  window.addEventListener('scroll', requestHeaderUpdate, { passive: true });

  let menuWasOpenedBy = null;

  const getNavLinks = () => nav ? [...nav.querySelectorAll('a')] : [];

  const openMenu = () => {
    if (!menuButton || !nav) return;
    menuWasOpenedBy = document.activeElement;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Fechar menu');
    nav.classList.add('open');
    header?.classList.add('menu-active');
    body.classList.add('menu-open');
    getNavLinks()[0]?.focus({ preventScroll: true });
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('open');
    header?.classList.remove('menu-active');
    body.classList.remove('menu-open');

    if (restoreFocus && menuWasOpenedBy instanceof HTMLElement) {
      menuWasOpenedBy.focus({ preventScroll: true });
    }
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu({ restoreFocus: true }) : openMenu();
  });

  nav?.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (link) closeMenu();
  });

  document.addEventListener('click', event => {
    if (!nav?.classList.contains('open')) return;
    if (nav.contains(event.target) || menuButton?.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;

    if (nav?.classList.contains('open')) {
      closeMenu({ restoreFocus: true });
      return;
    }

    const dialog = document.querySelector('#treatment-dialog');
    if (dialog?.open) dialog.close();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > mobileBreakpoint && nav?.classList.contains('open')) {
      closeMenu();
    }
  }, { passive: true });

  const revealElements = [...document.querySelectorAll('.reveal')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(element => element.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -32px'
    });

    revealElements.forEach(element => revealObserver.observe(element));
  }

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const panels = [...document.querySelectorAll('[role="tabpanel"]')];

  const activateTab = (tab, { moveFocus = false } = {}) => {
    if (!tab) return;
    const selectedPanel = tab.getAttribute('aria-controls');

    tabs.forEach(item => {
      const isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach(panel => {
      const isActive = panel.id === selectedPanel;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });

    if (moveFocus) tab.focus({ preventScroll: true });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));

    tab.addEventListener('keydown', event => {
      const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;

      activateTab(tabs[nextIndex], { moveFocus: true });
    });
  });

  document.querySelectorAll('.faq-item button[aria-controls]').forEach(button => {
    button.addEventListener('click', () => {
      const answerId = button.getAttribute('aria-controls');
      const answer = answerId ? document.getElementById(answerId) : null;
      const expanded = button.getAttribute('aria-expanded') === 'true';

      button.setAttribute('aria-expanded', String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  });

  const treatmentContent = {
    ultraformer: {
      title: 'Ultraformer MPT',
      text: 'Tecnologia de ultrassom micro e macrofocado utilizada em protocolos para estímulo de colágeno, melhora da firmeza e abordagem de áreas faciais e corporais. A profundidade e a estratégia variam conforme a avaliação.'
    },
    lavieen: {
      title: 'Laser Lavieen',
      text: 'Laser indicado em protocolos para textura, luminosidade, poros, manchas e uniformidade da pele. Parâmetros, frequência e associações são definidos de acordo com o tipo e a condição da pele.'
    },
    bioestimuladores: {
      title: 'Bioestimuladores',
      text: 'Substâncias utilizadas para estimular a produção de colágeno de forma progressiva. Podem integrar planos voltados à firmeza, sustentação e qualidade da pele, sempre com indicação individual.'
    },
    co2: {
      title: 'Laser de CO₂',
      text: 'Tecnologia fracionada que pode ser incluída em protocolos para textura, cicatrizes de acne, poros, rugas e sinais do tempo. Exige avaliação, preparação e cuidados específicos no pós-procedimento.'
    },
    preenchimento: {
      title: 'Preenchimento',
      text: 'Procedimento planejado para reposição de volume, suporte e valorização de proporções faciais. A proposta da clínica é preservar a identidade e evitar padronizações ou excessos.'
    },
    mmp: {
      title: 'MMP Capilar',
      text: 'Técnica de microinfusão de medicamentos e ativos diretamente no couro cabeludo. A indicação depende da investigação da causa da queda ou do enfraquecimento dos fios.'
    }
  };

  const dialog = document.querySelector('#treatment-dialog');
  const dialogTitle = document.querySelector('#dialog-title');
  const dialogText = document.querySelector('#dialog-text');
  const dialogLink = document.querySelector('#dialog-link');
  let dialogOpener = null;

  const openTreatmentDialog = (button, content) => {
    if (!dialog || !dialogTitle || !dialogText || !dialogLink) return;

    dialogOpener = button;
    dialogTitle.textContent = content.title;
    dialogText.textContent = content.text;
    dialogLink.href = `https://wa.me/5591999244443?text=${encodeURIComponent(`Olá, gostaria de conversar sobre ${content.title}.`)}`;

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  };

  document.querySelectorAll('.treatment-open').forEach(button => {
    button.addEventListener('click', () => {
      const content = treatmentContent[button.dataset.treatment];
      if (content) openTreatmentDialog(button, content);
    });
  });

  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  dialog?.addEventListener('close', () => {
    if (dialogOpener instanceof HTMLElement) {
      dialogOpener.focus({ preventScroll: true });
    }
  });

  const form = document.querySelector('#whatsapp-form');

  form?.addEventListener('submit', event => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const nome = String(data.get('nome') || '').trim();
    const interesse = String(data.get('interesse') || '').trim();
    const mensagem = String(data.get('mensagem') || '').trim();

    const text = [
      `Olá, meu nome é ${nome}.`,
      `Gostaria de falar sobre: ${interesse}.`,
      mensagem ? `Mais detalhes: ${mensagem}` : '',
      'Podem me orientar sobre o agendamento de uma avaliação?'
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/5591999244443?text=${encodeURIComponent(text)}`;
    const whatsappWindow = window.open(url, '_blank', 'noopener,noreferrer');

    if (!whatsappWindow) window.location.href = url;
  });
})();
