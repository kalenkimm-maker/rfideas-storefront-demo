/* Amazon Brand Store — Main JS */

/* ============================================================
   Partial loader
   ============================================================ */
async function loadPartials() {
  try {
    const [headerRes, footerRes] = await Promise.all([
      fetch('partials/header.html'),
      fetch('partials/footer.html')
    ]);
    const [headerHTML, footerHTML] = await Promise.all([
      headerRes.text(),
      footerRes.text()
    ]);
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');
    if (headerEl) headerEl.innerHTML = headerHTML;
    if (footerEl) footerEl.innerHTML = footerHTML;
  } catch (e) {
    console.warn('Could not load partials (normal via file://):', e.message);
  }
  initMobileNav();
  initActiveNav();
  initSmoothScroll();
}

/* ============================================================
   Mobile Nav Toggle
   ============================================================ */
function initMobileNav() {
  const allBtn = document.querySelector('.amz-nav-all-btn');
  const drawer = document.querySelector('.amz-mobile-drawer');
  if (allBtn && drawer) {
    allBtn.addEventListener('click', function (e) {
      e.preventDefault();
      drawer.classList.toggle('open');
    });
  }
}

/* ============================================================
   Active Brand Nav Link
   ============================================================ */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.brand-subnav-tabs a, .amz-mobile-drawer a').forEach(function (link) {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   Smooth Scroll
   ============================================================ */
function initSmoothScroll() {
  const drawer = document.querySelector('.amz-mobile-drawer');
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const selector = this.getAttribute('href');
      if (!selector || selector === '#') return;
      const target = document.querySelector(selector);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (drawer) drawer.classList.remove('open');
      }
    });
  });
}

/* ============================================================
   Homepage Hero Canvas — Light particle network (cyan nodes)
   Targets .hero-home-canvas
   ============================================================ */
function initHomeHeroCanvas() {
  var canvas = document.querySelector('.hero-home-canvas');
  if (!canvas) return;

  var ctx            = canvas.getContext('2d');
  var PARTICLE_COUNT = 60;
  var CONNECT_DIST   = 150;
  var particles      = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function makeParticle() {
    return {
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 2 + 1,
      a:  Math.random() * 0.35 + 0.1
    };
  }

  for (var i = 0; i < PARTICLE_COUNT; i++) particles.push(makeParticle());

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx   = particles[i].x - particles[j].x;
        var dy   = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          var alpha = (1 - dist / CONNECT_DIST) * 0.18;
          ctx.strokeStyle = 'rgba(0,144,204,' + alpha + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,174,239,' + p.a + ')';
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }

    requestAnimationFrame(tick);
  }

  tick();
}

/* ============================================================
   Sub-page Hero Canvas — Darker particle network
   Targets .hero-page-canvas (product pages)
   ============================================================ */
function initPageHeroCanvas() {
  var canvas = document.querySelector('.hero-page-canvas');
  if (!canvas) return;

  var ctx            = canvas.getContext('2d');
  var PARTICLE_COUNT = 55;
  var CONNECT_DIST   = 140;
  var particles      = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function makeParticle() {
    return {
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r:  Math.random() * 1.8 + 0.7,
      a:  Math.random() * 0.4 + 0.15
    };
  }

  for (var i = 0; i < PARTICLE_COUNT; i++) particles.push(makeParticle());

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx   = particles[i].x - particles[j].x;
        var dy   = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          ctx.strokeStyle = 'rgba(0,174,239,' + ((1 - dist / CONNECT_DIST) * 0.22) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,174,239,' + p.a + ')';
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }

    requestAnimationFrame(tick);
  }

  tick();
}

/* ============================================================
   Boot
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  loadPartials();
  initHomeHeroCanvas();
  initPageHeroCanvas();
});
