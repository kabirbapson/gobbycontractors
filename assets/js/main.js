/* ==========================================================================
   GOBBY CONTRACTORS & CONSULTANTS LTD. (gobbycontractors.com.ng)
   Simple Interactive UI Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* 1. Sticky Header & Mobile Menu */
  const header = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* 2. Hero Project Slideshow */
  const heroSlides = [
    {
      img: 'assets/images/projects/soron-ingila-interior.jpg',
      tag: 'Heritage & Structural Engineering',
      title: 'Reconstruction of Reception Hall (Soron-Ingila), Kano Emir’s Palace',
      sub: 'Structural reconstruction and traditional architectural finishing'
    },
    {
      img: 'assets/images/projects/zazzau-museum-completed.jpg',
      tag: 'Building Construction',
      title: 'Aliyu Dan Sidi Museum & Documentation Centre, Zazzau Emir’s Palace',
      sub: 'Construction of museum complex and external works in Zaria'
    },
    {
      img: 'assets/images/projects/usman-yero-clinic-after.jpg',
      tag: 'Healthcare Infrastructure',
      title: 'Renovation of First Zazzau Emir’s Palace Clinic (Usman Yero Clinic)',
      sub: 'Structural upgrade, stone cladding, roofing, and clinical finishing'
    },
    {
      img: 'assets/images/projects/sarki-jaafaru-after.jpg',
      tag: 'Educational Infrastructure',
      title: 'Rehabilitation of Sarki Ja’afaru L.G.E.A Primary School, Zaria',
      sub: 'Classroom blocks, flooring, sanitation facilities, and pupil furniture'
    },
    {
      img: 'assets/images/projects/solar-ngala-panels.jpg',
      tag: 'Solar Power & IT/ICT Consultancy',
      title: 'Solar PV Installation & ICT Systems Deployment',
      sub: 'Clean solar power array, inverter system, computer hardware, and software'
    }
  ];

  const heroImg = document.getElementById('heroShowcaseImg');
  const heroTag = document.getElementById('heroShowcaseTag');
  const heroTitle = document.getElementById('heroShowcaseTitle');
  const heroSub = document.getElementById('heroShowcaseSub');
  const heroDotsContainer = document.getElementById('heroShowcaseDots');

  let currentSlide = 0;
  let slideTimer = null;

  function renderHeroSlide(index) {
    const s = heroSlides[index];
    if (!heroImg) return;
    heroImg.style.opacity = '0.35';
    setTimeout(() => {
      heroImg.src = s.img;
      heroImg.alt = s.title;
      heroTag.textContent = s.tag;
      heroTitle.textContent = s.title;
      heroSub.textContent = s.sub;
      heroImg.style.opacity = '1';
    }, 150);

    if (heroDotsContainer) {
      Array.from(heroDotsContainer.children).forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
      });
    }
  }

  if (heroDotsContainer) {
    heroSlides.forEach((_, idx) => {
      const btn = document.createElement('button');
      btn.className = `showcase-dot ${idx === 0 ? 'active' : ''}`;
      btn.setAttribute('aria-label', `Slide ${idx + 1}`);
      btn.addEventListener('click', () => {
        currentSlide = idx;
        renderHeroSlide(currentSlide);
        resetSlideTimer();
      });
      heroDotsContainer.appendChild(btn);
    });

    function resetSlideTimer() {
      if (slideTimer) clearInterval(slideTimer);
      slideTimer = setInterval(() => {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        renderHeroSlide(currentSlide);
      }, 5000);
    }
    resetSlideTimer();
  }

  /* 3. Portfolio Category Filter */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach((card) => {
        const cardCats = (card.dataset.category || '').split(' ');
        card.style.display = cat === 'all' || cardCats.includes(cat) ? 'flex' : 'none';
      });
    });
  });

  /* 4. Before & After Comparison Slider */
  const baCases = [
    {
      before: 'assets/images/projects/sarki-jaafaru-before.jpg',
      after: 'assets/images/projects/sarki-jaafaru-after.jpg',
      title: 'Sarki Ja’afaru L.G.E.A Primary School, Zaria — Before & After Rehabilitation'
    },
    {
      before: 'assets/images/projects/usman-yero-clinic-before.jpg',
      after: 'assets/images/projects/usman-yero-clinic-after.jpg',
      title: 'First Zazzau Emir’s Palace Clinic (Usman Yero Clinic), Zaria — Before & After Renovation'
    },
    {
      before: 'assets/images/projects/orphanage-stairs-before.jpg',
      after: 'assets/images/projects/orphanage-stairs-after.jpg',
      title: 'Jam’iyyar Matan Arewa Orphanage Junior Secondary School, Kaduna — Before & After Renovation'
    }
  ];

  const baTabs = document.querySelectorAll('.ba-tab');
  const baBeforeImg = document.getElementById('baBeforeImg');
  const baAfterImg = document.getElementById('baAfterImg');
  const baBeforeLayer = document.getElementById('baBeforeLayer');
  const baHandle = document.getElementById('baHandle');
  const baRange = document.getElementById('baRange');
  const baMetaTitle = document.getElementById('baMetaTitle');

  function updateBaSlider(val) {
    if (!baBeforeLayer || !baHandle) return;
    const pct = Number(val);
    baBeforeLayer.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    baHandle.style.left = `${pct}%`;
  }

  if (baRange) {
    baRange.addEventListener('input', (e) => updateBaSlider(e.target.value));
  }

  baTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = Number(tab.dataset.index);
      const item = baCases[idx];
      if (!item) return;

      baTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      baBeforeImg.src = item.before;
      baAfterImg.src = item.after;
      baMetaTitle.textContent = item.title;
      if (baRange) {
        baRange.value = 50;
        updateBaSlider(50);
      }
    });
  });

  /* 5. Lightbox for Project Photos */
  const modal = document.getElementById('lightboxModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  function closeLightbox() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeLightbox);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  document.querySelectorAll('[data-lightbox-src]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      modalTitle.textContent = trigger.dataset.lightboxTitle || 'Project Photo';
      modalImg.src = trigger.dataset.lightboxSrc;
      modalImg.alt = modalTitle.textContent;
      modalCaption.textContent = trigger.dataset.lightboxCaption || '';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  /* 6. Contact Form */
  const inquiryForm = document.getElementById('inquiryForm');
  const whatsappSendBtn = document.getElementById('whatsappSendBtn');

  function getFormPayload() {
    return {
      name: (document.getElementById('fName')?.value || '').trim(),
      phone: (document.getElementById('fPhone')?.value || '').trim(),
      email: (document.getElementById('fEmail')?.value || '').trim(),
      service: (document.getElementById('fService')?.value || '').trim(),
      message: (document.getElementById('fMessage')?.value || '').trim()
    };
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = getFormPayload();
      const subject = encodeURIComponent(`[${d.service || 'Inquiry'}] ${d.name}`);
      const body = encodeURIComponent(
        `Name: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}\nService: ${d.service}\n\nMessage:\n${d.message}`
      );
      window.location.href = `mailto:info@gobbycontractors.com.ng?subject=${subject}&body=${body}`;
    });
  }

  if (whatsappSendBtn) {
    whatsappSendBtn.addEventListener('click', () => {
      const d = getFormPayload();
      const text = encodeURIComponent(
        `Hello Gobby Contractors & Consultants Ltd.,\nName: ${d.name}\nService: ${d.service}\nMessage: ${d.message}`
      );
      window.open(`https://wa.me/2348023099722?text=${text}`, '_blank', 'noopener');
    });
  }
});
