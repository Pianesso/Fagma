/**
 * FAGMA CAFETERIA & HAUTE PÂTISSERIE ARTESANAL
 * Interatividade de Vanguarda, Laboratório Sensorial & Atelier de Encomendas
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Atualização do Ano de Direitos Autorais ---
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // --- 2. Cursor Magnético Customizado de Alta Confeitaria ---
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Efeito Magnético / Hover em Elementos Interativos
    const interactiveEls = document.querySelectorAll('a, button, .opt-card, .opt-chip, .sensory-tab-btn, .filter-pill');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hovering'));
    });
  }



  // --- 4. Efeito de Scroll no Cabeçalho ---
  const headerEl = document.getElementById('cabecalho');
  const handleScroll = () => {
    if (!headerEl) return;
    if (window.scrollY > 30) {
      headerEl.classList.add('scrolled');
    } else {
      headerEl.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 5. Menu Mobile Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('menu-navegacao');

  if (menuToggle && mainNav) {
    const toggleMenu = (forceState) => {
      const isCurrentlyActive = mainNav.classList.contains('is-active');
      const newState = typeof forceState === 'boolean' ? forceState : !isCurrentlyActive;
      
      menuToggle.setAttribute('aria-expanded', newState);
      menuToggle.classList.toggle('is-active', newState);
      mainNav.classList.toggle('is-active', newState);
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    const navLinks = mainNav.querySelectorAll('.nav-link, .mobile-nav-extras a, .mobile-nav-extras button');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('is-active') && !mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  // --- 6. O Laboratório dos Sentidos (Abas Interativas) ---
  const sensoryTabs = document.querySelectorAll('.sensory-tab-btn');
  const sensoryPanes = document.querySelectorAll('.sensory-pane');

  sensoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTabId = tab.getAttribute('data-tab');

      // Atualiza botões
      sensoryTabs.forEach(btn => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      // Atualiza painéis
      sensoryPanes.forEach(pane => {
        if (pane.id === `tab-pane-${targetTabId}`) {
          pane.classList.add('is-active');
        } else {
          pane.classList.remove('is-active');
        }
      });
    });
  });

  // --- 7. Filtro Interativo da Vitrine Viva ---
  const filterPills = document.querySelectorAll('.filter-pill');
  const showcaseItems = document.querySelectorAll('.showcase-item');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filterValue = pill.getAttribute('data-filter');

      // Atualiza status do filtro
      filterPills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');

      // Anima e filtra os cards
      showcaseItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category') || '';
        if (filterValue === 'all' || itemCategories.includes(filterValue)) {
          item.style.display = 'flex';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 30);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- 8. Modal do Cardápio Completo ---
  const modal = document.getElementById('modal-cardapio');
  const btnAbrirCardapioTop = document.getElementById('btn-abrir-cardapio-top');
  const btnAbrirCardapioMobile = document.getElementById('btn-abrir-cardapio-mobile');
  const btnMobileCardapio = document.getElementById('btn-mobile-cardapio');
  const btnFecharModal = document.getElementById('modal-fechar');
  const modalBackdrop = document.getElementById('modal-backdrop');

  const abrirModal = (e) => {
    if (e) e.preventDefault();
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (btnFecharModal) btnFecharModal.focus();
  };

  const fecharModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (btnAbrirCardapioTop) {
    btnAbrirCardapioTop.addEventListener('click', abrirModal);
  }
  if (btnAbrirCardapioMobile) {
    btnAbrirCardapioMobile.addEventListener('click', abrirModal);
  }
  if (btnMobileCardapio) {
    btnMobileCardapio.addEventListener('click', abrirModal);
  }

  if (btnFecharModal) {
    btnFecharModal.addEventListener('click', fecharModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', fecharModal);
  }

  // Fechar com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      fecharModal();
    }
  });

});
