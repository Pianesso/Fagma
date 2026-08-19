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
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('is-open')) {
        fecharModal();
      }
      if (cartDrawer && cartDrawer.classList.contains('is-open')) {
        fecharCarrinho();
      }
    }
  });

  // ==========================================================================
  // --- 9. Carrinho de Compras Interativo & Checkout para WhatsApp ---
  // ==========================================================================
  const WHATSAPP_NUMBER = '5565999450519';

  // Utilitários de Preço
  const parsePrice = (priceVal) => {
    if (typeof priceVal === 'number') return priceVal;
    if (!priceVal) return 0;
    const cleanStr = String(priceVal)
      .replace(/[^\d.,]/g, '')
      .replace(',', '.');
    const parsed = parseFloat(cleanStr);
    return isNaN(parsed) ? 0 : parsed;
  };

  const formatBRL = (num) => {
    return Number(num || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  };

  // Estado do Carrinho
  let cart = [];

  const loadCartFromStorage = () => {
    try {
      const saved = localStorage.getItem('fagma_cart');
      if (saved) {
        cart = JSON.parse(saved);
        if (!Array.isArray(cart)) cart = [];
      }
    } catch (err) {
      console.warn('Erro ao carregar carrinho local:', err);
      cart = [];
    }
  };

  const saveCartToStorage = () => {
    try {
      localStorage.setItem('fagma_cart', JSON.stringify(cart));
    } catch (err) {
      console.warn('Erro ao salvar carrinho local:', err);
    }
  };

  // Elementos da Interface do Carrinho
  const cartDrawer = document.getElementById('cart-drawer');
  const cartDrawerBackdrop = document.getElementById('cart-drawer-backdrop');
  const cartDrawerClose = document.getElementById('cart-drawer-close');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartDrawerItemsCount = document.getElementById('cart-drawer-items-count');
  const cartSubtotalVal = document.getElementById('cart-subtotal-val');
  const cartTotalVal = document.getElementById('cart-total-val');
  const cartCheckoutForm = document.getElementById('cart-checkout-form');
  const cartDrawerFooter = document.getElementById('cart-drawer-footer');
  const btnFinalizarWhatsApp = document.getElementById('btn-finalizar-whatsapp');
  const btnLimparCarrinho = document.getElementById('btn-limpar-carrinho');
  const cartToast = document.getElementById('cart-toast');
  const floatingCartPill = document.getElementById('floating-cart-pill');
  const btnFloatingCart = document.getElementById('btn-floating-cart');
  const floatingCartTotal = document.getElementById('floating-cart-total');
  const floatingCartText = document.getElementById('floating-cart-text');

  // Badges de Contagem
  const badgeHeader = document.getElementById('cart-badge-header');
  const badgeNav = document.getElementById('cart-badge-nav');
  const badgeFloat = document.getElementById('cart-badge-float');
  const badgeMobile = document.getElementById('cart-badge-mobile');

  // Botões de Abertura da Sacola
  const btnAbrirCarrinhoHeader = document.getElementById('btn-abrir-carrinho-header');
  const btnAbrirCarrinhoNav = document.getElementById('btn-abrir-carrinho-nav');
  const btnMobileCarrinho = document.getElementById('btn-mobile-carrinho');

  // Controle de Entrega / Retirada no Formulário
  const addressGroup = document.getElementById('cart-address-group');
  const deliveryRadios = document.querySelectorAll('input[name="cart-order-type"]');

  deliveryRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (addressGroup) {
        if (e.target.value === 'delivery') {
          addressGroup.style.display = 'block';
        } else {
          addressGroup.style.display = 'none';
        }
      }
    });
  });

  // Toast Notifier
  let toastTimeout = null;
  const showToast = (message) => {
    if (!cartToast) return;
    cartToast.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fbe09e" stroke-width="2.2" aria-hidden="true">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;
    cartToast.classList.add('is-visible');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      cartToast.classList.remove('is-visible');
    }, 2500);
  };

  // Abrir / Fechar Carrinho
  const abrirCarrinho = (e) => {
    if (e) e.preventDefault();
    if (!cartDrawer || !cartDrawerBackdrop) return;
    renderCartUI();
    cartDrawer.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartDrawerBackdrop.classList.add('is-open');
    cartDrawerBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const fecharCarrinho = () => {
    if (!cartDrawer || !cartDrawerBackdrop) return;
    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartDrawerBackdrop.classList.remove('is-open');
    cartDrawerBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (btnAbrirCarrinhoHeader) btnAbrirCarrinhoHeader.addEventListener('click', abrirCarrinho);
  if (btnAbrirCarrinhoNav) btnAbrirCarrinhoNav.addEventListener('click', abrirCarrinho);
  if (btnMobileCarrinho) btnMobileCarrinho.addEventListener('click', abrirCarrinho);
  if (btnFloatingCart) btnFloatingCart.addEventListener('click', abrirCarrinho);
  if (cartDrawerClose) cartDrawerClose.addEventListener('click', fecharCarrinho);
  if (cartDrawerBackdrop) cartDrawerBackdrop.addEventListener('click', fecharCarrinho);

  // Cálculos do Carrinho
  const getCartTotals = () => {
    let totalQty = 0;
    let totalPrice = 0;
    cart.forEach(item => {
      totalQty += item.qty;
      totalPrice += item.price * item.qty;
    });
    return { totalQty, totalPrice };
  };

  // Atualização Visual do Carrinho
  const renderCartUI = () => {
    const { totalQty, totalPrice } = getCartTotals();
    const formattedTotal = formatBRL(totalPrice);

    // Atualiza Badges
    const badges = [badgeHeader, badgeNav, badgeFloat, badgeMobile];
    badges.forEach(b => {
      if (b) {
        b.textContent = totalQty;
        b.style.display = totalQty > 0 ? 'inline-block' : 'none';
        b.classList.remove('is-animating');
        void b.offsetWidth; // trigger reflow
        b.classList.add('is-animating');
      }
    });

    // Atualiza Barra Flutuante (Acompanha o Scroll)
    if (floatingCartPill) {
      floatingCartPill.classList.add('is-visible');
      if (totalQty > 0) {
        if (floatingCartTotal) floatingCartTotal.textContent = formattedTotal;
        if (floatingCartText) {
          floatingCartText.textContent = totalQty === 1 ? '1 item na Sacola' : `${totalQty} itens na Sacola`;
        }
      } else {
        if (floatingCartTotal) floatingCartTotal.textContent = '0 itens';
        if (floatingCartText) {
          floatingCartText.textContent = 'Minha Sacola';
        }
      }
    }

    // Atualiza Drawer Header & Subtitle
    if (cartDrawerItemsCount) {
      cartDrawerItemsCount.textContent = totalQty === 1 ? '1 item adicionado' : `${totalQty} itens adicionados`;
    }

    // Totais no Footer do Drawer
    if (cartSubtotalVal) cartSubtotalVal.textContent = formattedTotal;
    if (cartTotalVal) cartTotalVal.textContent = formattedTotal;

    // Renderiza Lista de Itens no Drawer
    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <h3 class="cart-empty-title">Sua sacola está vazia</h3>
          <p class="cart-empty-desc">Adicione nossos pudins artesanais e salgados gourmet para montar seu pedido especial.</p>
          <button class="btn btn-outline btn-sm" id="btn-cart-explorar">
            <span>Explorar Vitrine</span>
          </button>
        </div>
      `;

      const btnExplorar = document.getElementById('btn-cart-explorar');
      if (btnExplorar) {
        btnExplorar.addEventListener('click', () => {
          fecharCarrinho();
          const vitrineSec = document.getElementById('vitrine');
          if (vitrineSec) vitrineSec.scrollIntoView({ behavior: 'smooth' });
        });
      }

      if (cartCheckoutForm) cartCheckoutForm.style.display = 'none';
      if (cartDrawerFooter) cartDrawerFooter.style.display = 'none';
    } else {
      if (cartCheckoutForm) cartCheckoutForm.style.display = 'block';
      if (cartDrawerFooter) cartDrawerFooter.style.display = 'block';

      cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-id="${item.id}">
          ${item.img ? `<img src="${item.img}" alt="${item.name}" class="cart-item-img" loading="lazy">` : ''}
          <div class="cart-item-info">
            <h4 class="cart-item-name" title="${item.name}">${item.name}</h4>
            <span class="cart-item-unit-price">${formatBRL(item.price)} cada</span>
          </div>
          <div class="cart-item-controls">
            <div class="cart-stepper">
              <button class="cart-step-btn btn-qty-minus" data-id="${item.id}" aria-label="Diminuir quantidade">&minus;</button>
              <span class="cart-step-qty">${item.qty}</span>
              <button class="cart-step-btn btn-qty-plus" data-id="${item.id}" aria-label="Aumentar quantidade">&plus;</button>
            </div>
            <span class="cart-item-total">${formatBRL(item.price * item.qty)}</span>
            <button class="cart-item-remove btn-item-delete" data-id="${item.id}" aria-label="Remover item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      `).join('');
    }
  };

  // Funções de Manipulação de Itens
  const addToCart = (name, price, img) => {
    if (!name) return;
    const cleanPrice = parsePrice(price);
    const existingIndex = cart.findIndex(item => item.name.toLowerCase().trim() === name.toLowerCase().trim());

    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
      if (img && !cart[existingIndex].img) cart[existingIndex].img = img;
    } else {
      cart.push({
        id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        name: name.trim(),
        price: cleanPrice,
        qty: 1,
        img: img || ''
      });
    }

    saveCartToStorage();
    renderCartUI();
    showToast(`"${name}" adicionado à sacola!`);
  };

  const updateItemQty = (id, delta) => {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex === -1) return;

    cart[itemIndex].qty += delta;
    if (cart[itemIndex].qty <= 0) {
      cart.splice(itemIndex, 1);
    }

    saveCartToStorage();
    renderCartUI();
  };

  const removeItem = (id) => {
    cart = cart.filter(item => item.id !== id);
    saveCartToStorage();
    renderCartUI();
  };

  const clearCart = () => {
    if (cart.length === 0) return;
    if (confirm('Deseja realmente esvaziar sua sacola de pedidos?')) {
      cart = [];
      saveCartToStorage();
      renderCartUI();
      showToast('Sacola esvaziada.');
    }
  };

  if (btnLimparCarrinho) {
    btnLimparCarrinho.addEventListener('click', clearCart);
  }

  // Delegação de Eventos na Lista do Carrinho (Botões + / - / Lixeira)
  if (cartItemsList) {
    cartItemsList.addEventListener('click', (e) => {
      const btnPlus = e.target.closest('.btn-qty-plus');
      const btnMinus = e.target.closest('.btn-qty-minus');
      const btnDelete = e.target.closest('.btn-item-delete');

      if (btnPlus) {
        updateItemQty(btnPlus.getAttribute('data-id'), 1);
      } else if (btnMinus) {
        updateItemQty(btnMinus.getAttribute('data-id'), -1);
      } else if (btnDelete) {
        removeItem(btnDelete.getAttribute('data-id'));
      }
    });
  }

  // Delegação Global para Cliques em "Adicionar ao Carrinho"
  document.addEventListener('click', (e) => {
    const btnAdd = e.target.closest('.btn-add-cart, .btn-add-modal');
    if (!btnAdd) return;

    e.preventDefault();
    const name = btnAdd.getAttribute('data-name');
    const price = btnAdd.getAttribute('data-price');
    const img = btnAdd.getAttribute('data-img') || '';

    if (name && price) {
      addToCart(name, price, img);
    }
  });

  // Finalização do Pedido para WhatsApp
  const finalizarPedidoWhatsApp = () => {
    if (cart.length === 0) {
      alert('Sua sacola está vazia. Adicione itens antes de finalizar.');
      return;
    }

    const nameInput = document.getElementById('cart-input-name');
    const customerName = nameInput ? nameInput.value.trim() : '';

    const orderTypeInput = document.querySelector('input[name="cart-order-type"]:checked');
    const isDelivery = orderTypeInput ? orderTypeInput.value === 'delivery' : true;

    const addressInput = document.getElementById('cart-input-address');
    const address = addressInput ? addressInput.value.trim() : '';

    if (isDelivery && !address) {
      alert('Por favor, informe o seu Endereço de Entrega em Cuiabá para prosseguir.');
      if (addressInput) addressInput.focus();
      return;
    }

    const paymentSelect = document.getElementById('cart-input-payment');
    const paymentMethod = paymentSelect ? paymentSelect.value : 'Pix';

    const notesInput = document.getElementById('cart-input-notes');
    const notes = notesInput ? notesInput.value.trim() : '';

    // Construção de Mensagem Limpa e Organizada para WhatsApp (Sem emojis e sem divisórias)
    let msg = `*NOVO PEDIDO - FAGMA CAFETERIA*\n\n`;
    msg += `*Cliente:* ${customerName || 'Não informado'}\n`;
    msg += `*Tipo de Pedido:* ${isDelivery ? 'Entrega (Delivery)' : 'Retirada no Ateliê (CPA 2)'}\n`;
    
    if (isDelivery) {
      msg += `*Endereço:* ${address}\n`;
    }
    
    msg += `*Forma de Pagamento:* ${paymentMethod}\n\n`;
    msg += `*ITENS DO PEDIDO:*\n`;

    cart.forEach((item) => {
      const itemSubtotal = item.price * item.qty;
      msg += `- ${item.qty}x ${item.name} (${formatBRL(item.price)} un.) = ${formatBRL(itemSubtotal)}\n`;
    });

    msg += `\n*VALOR TOTAL:* ${formatBRL(totalPrice)}\n`;

    if (notes) {
      msg += `\n*Observações:* ${notes}\n`;
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (btnFinalizarWhatsApp) {
    btnFinalizarWhatsApp.addEventListener('click', finalizarPedidoWhatsApp);
  }

  // Inicialização do Carrinho ao carregar a página
  loadCartFromStorage();
  renderCartUI();

});

