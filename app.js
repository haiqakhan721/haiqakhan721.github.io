// ============================================================
// app.js — Windows 11 Desktop Portfolio
// ============================================================

let zTop = 100;
const winState = {}; // id -> { open, minimized, maximized, origStyle }

// ── SPLASH → LOCK SCREEN → DESKTOP ───────────────────────────
(function() {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    splash.style.opacity = '0';
    setTimeout(() => {
      splash.remove();
      initLockScreen();
    }, 500);
  }, 2400);
})();

function initLockScreen() {
  const ls = document.getElementById('lockscreen');
  if (!ls) {
    document.getElementById('desktop').classList.remove('hidden');
    initDesktop();
    return;
  }

  function tick() {
    const now  = new Date();
    const h    = String(now.getHours()).padStart(2,'0');
    const m    = String(now.getMinutes()).padStart(2,'0');
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const mons = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const timeEl = document.getElementById('ls-time');
    const dateEl = document.getElementById('ls-date');
    if (timeEl) timeEl.textContent = h + ':' + m;
    if (dateEl) dateEl.textContent = days[now.getDay()] + ', ' + mons[now.getMonth()] + ' ' + now.getDate();
  }
  tick();
  const lsTimer = setInterval(tick, 10000);

  ls.addEventListener('click', () => {
    clearInterval(lsTimer);
    ls.style.opacity = '0';
    ls.style.transform = 'translateY(-36px) scale(0.98)';
    setTimeout(() => {
      ls.remove();
      document.getElementById('desktop').classList.remove('hidden');
      initDesktop();
    }, 700);
  }, {once: true});
}

// ── INIT ─────────────────────────────────────────────────────
function initDesktop() {
  initStarfield();
  initCursor();
  initAuroraFollow();
  initWindowDragging();
  initWindowFocus();
  startClock();
  initTerminal();
  setTimeout(showToast, 1200);
}

// ── CUSTOM CURSOR ─────────────────────────────────────────────
function initCursor() {
  const cur = document.getElementById('cursor');
  if (!cur) return;
  document.addEventListener('mousemove', e => {
    cur.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }, { passive: true });
  document.addEventListener('mousedown', () => { cur.style.width = '8px'; cur.style.height = '8px'; });
  document.addEventListener('mouseup',   () => { cur.style.width = ''; cur.style.height = ''; });
  document.addEventListener('mouseleave',() => { cur.style.opacity = '0'; });
  document.addEventListener('mouseenter',() => { cur.style.opacity = '1'; });
}

// ── AURORA MOUSE FOLLOW ───────────────────────────────────────
function initAuroraFollow() {
  const a1 = document.getElementById('aum1');
  const a2 = document.getElementById('aum2');
  if (!a1 || !a2) return;
  let tx = 50, ty = 50, x1 = 50, y1 = 50, x2 = 50, y2 = 50;
  document.addEventListener('mousemove', e => {
    tx = (e.clientX / window.innerWidth)  * 100;
    ty = (e.clientY / window.innerHeight) * 100;
  });
  (function loop() {
    x1 += (tx - x1) * 0.025; y1 += (ty - y1) * 0.025;
    x2 += (tx - x2) * 0.018; y2 += (ty - y2) * 0.018;
    a1.style.left = (x1 - 19) + 'vw'; a1.style.top = (y1 - 16) + 'vh';
    a2.style.left = (x2 - 14) + 'vw'; a2.style.top = (y2 - 12) + 'vh';
    requestAnimationFrame(loop);
  })();
}

// ── STARFIELD CANVAS ──────────────────────────────────────────
function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['#ffffff','#ffe0f0','#ffb3d1','#ff9ec4','#e8d5ff','#ffd6ec'];
  const COUNT  = 240;

  const stars = Array.from({length: COUNT}, () => ({
    x:      Math.random(),
    y:      Math.random(),
    r:      0.2 + Math.random() * 1.5,
    base:   0.15 + Math.random() * 0.75,
    speed:  0.4 + Math.random() * 1.8,
    phase:  Math.random() * Math.PI * 2,
    color:  COLORS[Math.floor(Math.random() * COLORS.length)]
  }));

  // A few brighter "hero" stars
  for (let i = 0; i < 12; i++) {
    stars.push({
      x: Math.random(), y: Math.random(),
      r: 1.8 + Math.random() * 1.2,
      base: 0.6 + Math.random() * 0.4,
      speed: 0.2 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });
  }

  let shooters = [];
  function scheduleShooter() {
    setTimeout(() => {
      if (Math.random() < 0.65) {
        const angle = (Math.PI / 5) + (Math.random() - 0.5) * 0.4;
        shooters.push({
          x: Math.random() * 0.6 * W,
          y: Math.random() * 0.35 * H,
          vx: (9 + Math.random() * 7) * Math.cos(angle),
          vy: (9 + Math.random() * 7) * Math.sin(angle),
          life: 1,
          trail: []
        });
      }
      scheduleShooter();
    }, 3000 + Math.random() * 8000);
  }
  scheduleShooter();

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.016;

    // Twinkling stars
    stars.forEach(s => {
      const a = s.base * (0.35 + 0.65 * Math.sin(t * s.speed + s.phase));
      ctx.globalAlpha = Math.max(0, a);
      ctx.fillStyle   = s.color;
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Shooting stars
    shooters = shooters.filter(s => s.life > 0);
    shooters.forEach(s => {
      s.trail.push({x: s.x, y: s.y, a: s.life});
      if (s.trail.length > 24) s.trail.shift();
      s.x += s.vx; s.y += s.vy; s.life -= 0.022;

      if (s.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(s.trail[0].x, s.trail[0].y);
        s.trail.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(s.x, s.y);
        const grad = ctx.createLinearGradient(
          s.trail[0].x, s.trail[0].y, s.x, s.y
        );
        grad.addColorStop(0, 'rgba(255,180,220,0)');
        grad.addColorStop(1, `rgba(255,220,240,${s.life * 0.9})`);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.8;
        ctx.stroke();

        // Head glow
        ctx.globalAlpha = s.life;
        ctx.fillStyle   = '#fff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

// ── CLOCK ────────────────────────────────────────────────────
function startClock() {
  function tick() {
    const now = new Date();
    const h = now.getHours(), m = now.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = ((h % 12) || 12);
    document.getElementById('tbTime').textContent =
      h12 + ':' + String(m).padStart(2,'0') + ' ' + ampm;
    document.getElementById('tbDate').textContent =
      (now.getMonth()+1) + '/' + now.getDate() + '/' + now.getFullYear();
  }
  tick();
  setInterval(tick, 10000);
}

// ── WINDOW MANAGEMENT ────────────────────────────────────────
function openWindow(id) {
  const win = document.getElementById('win-' + id);
  if (!win) return;

  if (!winState[id]) winState[id] = { open: false, minimized: false, maximized: false };

  if (winState[id].open && !winState[id].minimized) {
    focusWindow(id);
    return;
  }

  // Render content on first open
  if (!winState[id].open) {
    renderContent(id);
    centerWindow(win);
  }

  winState[id].open = true;
  winState[id].minimized = false;
  win.classList.remove('hidden', 'minimizing');
  focusWindow(id);
  updateTaskbarDot(id, true);

  if (id === 'skills')   setTimeout(animateSkillBars, 150);
  if (id === 'terminal') setTimeout(runTerminalDemo, 700);

  // Achievement unlock on first open
  if (!_achieved.has(id) && _ACHIEVEMENTS[id]) {
    _achieved.add(id);
    setTimeout(() => showAchievement(_ACHIEVEMENTS[id]), 500);
  }
}

function closeWindow(id) {
  const win = document.getElementById('win-' + id);
  if (!win) return;
  win.classList.add('minimizing');
  setTimeout(() => {
    win.classList.add('hidden');
    win.classList.remove('minimizing');
  }, 180);
  if (winState[id]) { winState[id].open = false; winState[id].minimized = false; }
  updateTaskbarDot(id, false);
  updateTaskbarFocus(id, false);
}

function minimizeWindow(id) {
  const win = document.getElementById('win-' + id);
  if (!win) return;
  win.classList.add('minimizing');
  setTimeout(() => {
    win.classList.add('hidden');
    win.classList.remove('minimizing');
  }, 180);
  if (winState[id]) winState[id].minimized = true;
  updateTaskbarFocus(id, false);
}

function maximizeWindow(id) {
  const win = document.getElementById('win-' + id);
  if (!win) return;
  const state = winState[id] || (winState[id] = {});

  if (state.maximized) {
    // Restore
    if (state.origStyle) {
      win.style.cssText = state.origStyle;
    }
    state.maximized = false;
    win.classList.remove('maximized');
    document.getElementById('wmx-' + id).title = 'Maximize';
  } else {
    // Save current style, maximize
    state.origStyle = win.style.cssText;
    state.maximized = true;
    win.classList.add('maximized');
    document.getElementById('wmx-' + id).title = 'Restore Down';
  }
}

function toggleWindow(id) {
  const state = winState[id];
  if (!state || !state.open) {
    openWindow(id);
  } else if (state.minimized) {
    const win = document.getElementById('win-' + id);
    win.classList.remove('hidden');
    state.minimized = false;
    focusWindow(id);
  } else {
    minimizeWindow(id);
  }
}

function focusWindow(id) {
  // Remove focused class from all
  document.querySelectorAll('.window').forEach(w => {
    w.classList.remove('focused');
    w.style.zIndex = w.style.zIndex || 100;
  });
  document.querySelectorAll('.tb-app').forEach(a => a.classList.remove('focused'));

  const win = document.getElementById('win-' + id);
  if (win) {
    zTop++;
    win.style.zIndex = zTop;
    win.classList.add('focused');
  }
  updateTaskbarFocus(id, true);
}

function centerWindow(win) {
  const vw = window.innerWidth, vh = window.innerHeight - 48;
  const w = parseInt(win.style.width) || win.offsetWidth || 520;
  const h = win.offsetHeight || 400;
  const left = Math.max(0, Math.round((vw - w) / 2));
  const top  = Math.max(0, Math.round((vh - h) / 2.5));
  win.style.left = left + 'px';
  win.style.top  = top + 'px';
}

// ── TASKBAR INDICATORS ───────────────────────────────────────
function updateTaskbarDot(id, open) {
  const app = document.querySelector(`.tb-app[data-win="${id}"]`);
  if (!app) return;
  const dot = app.querySelector('.tb-dot');
  if (dot) dot.classList.toggle('hidden', !open);
  app.classList.toggle('open', open);
}

function updateTaskbarFocus(id, focused) {
  const app = document.querySelector(`.tb-app[data-win="${id}"]`);
  if (app) app.classList.toggle('focused', focused);
  // Unfocus others
  if (focused) {
    document.querySelectorAll('.tb-app').forEach(a => {
      if (a.dataset.win !== id) a.classList.remove('focused');
    });
  }
}

// ── WINDOW DRAGGING ──────────────────────────────────────────
function initWindowDragging() {
  ['about','projects','skills','contact','resume','terminal'].forEach(id => {
    const tb = document.getElementById('tb-' + id);
    const win = document.getElementById('win-' + id);
    if (!tb || !win) return;
    makeDraggable(tb, win, id);
  });
}

function makeDraggable(handle, win, id) {
  let sx, sy, sl, st, dragging = false;

  handle.addEventListener('mousedown', e => {
    if (e.target.closest('.win-controls')) return;
    const state = winState[id];
    if (state && state.maximized) return;
    focusWindow(id);
    dragging = true;
    sx = e.clientX; sy = e.clientY;
    sl = win.offsetLeft; st = win.offsetTop;
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const nx = sl + e.clientX - sx;
    const ny = st + e.clientY - sy;
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 48 - 10;
    win.style.left = Math.max(-win.offsetWidth + 80, Math.min(maxX, nx)) + 'px';
    win.style.top  = Math.max(0, Math.min(maxY, ny)) + 'px';
  });

  document.addEventListener('mouseup', () => { dragging = false; });
}

function initWindowFocus() {
  document.querySelectorAll('.window').forEach(win => {
    win.addEventListener('mousedown', () => {
      const id = win.id.replace('win-', '');
      focusWindow(id);
    });
  });
}

// ── ACHIEVEMENTS ─────────────────────────────────────────────
const _ACHIEVEMENTS = {
  about:    { icon: '👋', title: 'First Impression!',  msg: 'You opened my profile — hi there!' },
  projects: { icon: '🔍', title: 'Deep Dive',          msg: 'Checking out my projects. Smart.' },
  skills:   { icon: '⚡', title: 'Tech Scout',         msg: 'Evaluating my stack. I like you.' },
  contact:  { icon: '💌', title: 'Ready to Connect?',  msg: "Great — let's make it happen." },
  resume:   { icon: '📄', title: 'Resume Check',       msg: 'Impressed enough to download?' },
  terminal: { icon: '🖥️', title: 'Hacker Mode',        msg: 'Type "help" to start exploring.' },
};
const _achieved = new Set();

function showAchievement(ach) {
  // Stagger if one is already visible
  const existing = document.querySelector('.ach-toast:not(.ach-out)');
  const delay = existing ? 400 : 0;
  setTimeout(() => {
    const el = document.createElement('div');
    el.className = 'ach-toast';
    el.innerHTML = `<div class="ach-icon">${ach.icon}</div>
      <div><div class="ach-title">${ach.title}</div><div class="ach-msg">${ach.msg}</div></div>`;
    document.body.appendChild(el);
    setTimeout(() => {
      el.classList.add('ach-out');
      setTimeout(() => el.remove(), 300);
    }, 3000);
  }, delay);
}

// ── TYPEWRITER ────────────────────────────────────────────────
function typewriter(el, text, speed) {
  el.textContent = '';
  let i = 0;
  const cursor = document.createElement('span');
  cursor.style.cssText = 'display:inline-block;width:2px;height:1em;background:#ff9ec4;vertical-align:text-bottom;margin-left:1px;animation:twBlink 0.7s step-end infinite;';
  el.appendChild(cursor);

  const style = document.createElement('style');
  style.textContent = '@keyframes twBlink{0%,100%{opacity:1}50%{opacity:0}}';
  document.head.appendChild(style);

  const timer = setInterval(() => {
    if (i < text.length) {
      cursor.insertAdjacentText('beforebegin', text[i++]);
    } else {
      clearInterval(timer);
      setTimeout(() => { cursor.remove(); style.remove(); }, 600);
    }
  }, speed);
}

// ── CONTENT RENDERING ────────────────────────────────────────
function renderContent(id) {
  const el = document.getElementById('wcontent-' + id);
  if (!el || el.dataset.rendered) return;
  el.dataset.rendered = '1';

  const renders = {
    about:    renderAbout,
    projects: renderProjects,
    skills:   renderSkills,
    contact:  renderContact,
    resume:   renderResume,
  };
  if (renders[id]) el.appendChild(renders[id]());

  // Post-render effects
  if (id === 'about') {
    setTimeout(() => {
      const bioEl = el.querySelector('.about-bio');
      if (bioEl) typewriter(bioEl, PORTFOLIO.bio, 16);
    }, 200);
  }
}

// ── ABOUT ────────────────────────────────────────────────────
function renderAbout() {
  const p = PORTFOLIO;
  const d = document.createElement('div');
  d.className = 'about-wrap';
  d.innerHTML = `
    <div class="about-header">
      <div class="about-avatar">${PORTFOLIO.initials || 'HK'}</div>
      <div>
        <div class="about-name">${p.name}</div>
        <div class="about-role">${p.role}</div>
        <div class="about-loc">📍 ${p.location}</div>
        <div class="about-badge">Open to Work</div>
      </div>
    </div>
    <div class="about-bio">${p.bio}</div>
    <div class="about-links">
      <a class="about-link primary" onclick="alert('GitHub: ${p.github}')">🐙 GitHub</a>
      <a class="about-link primary" onclick="alert('LinkedIn: ${p.linkedin}')">💼 LinkedIn</a>
      <a class="about-link" onclick="alert('Email: ${p.email}')">✉️ ${p.email}</a>
      <a class="about-link" onclick="openWindow('contact')">💬 Hire Me</a>
    </div>
    <div class="about-stats">
      <div class="astat"><div class="astat-n">${PORTFOLIO.projects.length}</div><div class="astat-l">Projects</div></div>
      <div class="astat"><div class="astat-n">3 yrs</div><div class="astat-l">Python</div></div>
      <div class="astat"><div class="astat-n">Production</div><div class="astat-l">ML at UBL</div></div>
      <div class="astat"><div class="astat-n">&lt;24h</div><div class="astat-l">Response</div></div>
    </div>`;

  // Git timeline
  const tl = document.createElement('div');
  tl.className = 'git-timeline';
  tl.innerHTML = `<div class="git-timeline-title">Career Commit History</div>
    <div class="git-track">${PORTFOLIO.gitLog.map(c => `
      <div class="git-entry">
        <div class="git-dot" style="background:${c.color}; box-shadow:0 0 6px ${c.color}55;"></div>
        <div class="git-msg">${c.msg}</div>
        <div class="git-meta">
          <span class="git-hash">${c.hash}</span>
          <span class="git-branch" style="color:${c.color};">${c.branch}</span>
          <span class="git-date">${c.date}</span>
        </div>
      </div>`).join('')}
    </div>`;
  d.appendChild(tl);
  return d;
}

// ── PROJECTS ─────────────────────────────────────────────────
function renderProjects() {
  const d = document.createElement('div');
  d.className = 'projects-layout';

  const sidebar = document.createElement('div');
  sidebar.className = 'proj-sidebar';
  PORTFOLIO.projects.forEach((proj, i) => {
    const tab = document.createElement('div');
    tab.className = 'proj-tab' + (i === 0 ? ' active' : '');
    tab.innerHTML = `<div class="pt-name">${proj.name}</div><div class="pt-sub">${proj.stack.slice(0,2).join(', ')}</div>`;
    tab.onclick = () => {
      sidebar.querySelectorAll('.proj-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      showProject(proj.id, main);
    };
    sidebar.appendChild(tab);
  });

  const main = document.createElement('div');
  main.className = 'proj-main';
  showProject(PORTFOLIO.projects[0].id, main);

  d.appendChild(sidebar);
  d.appendChild(main);
  return d;
}

function showProject(id, container) {
  const proj = PORTFOLIO.projects.find(p => p.id === id);
  if (!proj) return;
  const metrics = Object.entries(proj.metrics).map(([k,v]) => `
    <div class="proj-metric">
      <div class="pm-val">${v}</div>
      <div class="pm-key">${k}</div>
    </div>`).join('');
  const badges = proj.stack.map(s => `<span class="stack-badge">${s}</span>`).join('');
  container.innerHTML = `
    <div class="proj-header">
      <div class="proj-title" style="color:${proj.color}">${proj.name}</div>
      <div class="proj-tagline">${proj.tagline}</div>
    </div>
    <div class="proj-desc">${proj.description}</div>
    <div class="proj-metrics">${metrics}</div>
    <div class="proj-stack">${badges}</div>
    <div class="proj-actions">
      <button class="proj-btn github" onclick="if('${proj.github}'!=='#')window.open('${proj.github}','_blank');else alert('GitHub repo coming soon!')">🐙 View Source</button>
    </div>`;
}

// ── SKILLS ───────────────────────────────────────────────────
function renderSkills() {
  const d = document.createElement('div');
  d.className = 'skills-wrap';
  const s = PORTFOLIO.skills;

  function section(title, items) {
    const colors = ['#e91e8c','#ff6eb4','#ff9ec4','#c77dff','#ff4d8d','#ff1493','#ffb3d1','#e040a0'];
    return `<div class="skills-section">
      <div class="skills-section-title">${title}</div>
      ${items.map((sk,i) => `
        <div class="skill-item">
          <div class="skill-row">
            <span class="skill-name">${sk.name}</span>
            <span class="skill-pct">${sk.level}%</span>
          </div>
          <div class="skill-track">
            <div class="skill-fill" data-level="${sk.level}" style="background:${colors[i % colors.length]};width:0%"></div>
          </div>
        </div>`).join('')}
    </div>`;
  }

  d.innerHTML =
    section('Languages',  s.languages) +
    section('Frameworks', s.frameworks) +
    section('Tools',      s.tools);
  return d;
}

function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = bar.dataset.level + '%';
  });
}

// ── CONTACT ──────────────────────────────────────────────────
function renderContact() {
  const p = PORTFOLIO;
  const d = document.createElement('div');
  d.className = 'contact-wrap';
  d.innerHTML = `
    <div class="contact-links">
      <a class="contact-link" onclick="alert('${p.email}')">✉️ ${p.email}</a>
      <a class="contact-link" onclick="alert('${p.github}')">🐙 ${p.github}</a>
      <a class="contact-link" onclick="alert('${p.linkedin}')">💼 ${p.linkedin}</a>
    </div>
    <div class="contact-divider">— or send a message —</div>
    <div class="contact-form">
      <div>
        <div class="cf-label">Your name</div>
        <input class="cf-input" id="cf-name" placeholder="John Doe"/>
      </div>
      <div>
        <div class="cf-label">Your email</div>
        <input class="cf-input" id="cf-email" placeholder="you@company.com"/>
      </div>
      <div>
        <div class="cf-label">Message</div>
        <textarea class="cf-textarea" id="cf-msg" placeholder="Hey Haiqa, we'd love to have you on our team..."></textarea>
      </div>
      <button class="cf-send" id="cfSendBtn" onclick="sendContact(this)">Send Message</button>
    </div>`;
  return d;
}

function sendContact(btn) {
  btn.textContent = '✓ Sent! Expect a reply within 24 hours.';
  btn.disabled = true;
}

// ── RESUME ───────────────────────────────────────────────────
function renderResume() {
  const d = document.createElement('div');
  d.className = 'resume-wrap';
  d.innerHTML = `
    <div class="resume-icon">📄</div>
    <div class="resume-name">${PORTFOLIO.name} — Resume</div>
    <div class="resume-sub">${PORTFOLIO.role} · ${PORTFOLIO.location}</div>
    <button class="resume-dl" onclick="alert('Add your resume PDF link in data.js to enable download!')">
      ↓ Download Resume
    </button>
    <div class="resume-hint">PDF · Last updated 2024</div>`;
  return d;
}

// ── TERMINAL ─────────────────────────────────────────────────
function initTerminal() {
  const input = document.getElementById('termInput');
  if (!input) return;
  termPrint('Windows PowerShell', '');
  termPrint(`Copyright (C) ${PORTFOLIO.name}. Portfolio v2.0`, '');
  termPrint('<span style="color:#555">─────────────────────────────────────</span>', '');
  termPrint('Type <span style="color:#61d6d6">help</span> for available commands.', '');
  termPrint('');
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      if (cmd) { termPrintCmd(cmd); handleTermCmd(cmd); input.value = ''; }
    }
  });
}

// ── TERMINAL AUTO-DEMO ────────────────────────────────────────
let _termDemoRan = false;

const _DEMO_STEPS = [
  { cmd: 'whoami',           wait: 1000 },
  { cmd: 'python projects', wait: 1200 },
  { cmd: 'open coder',      wait: 1200 },
];

function runTerminalDemo() {
  if (_termDemoRan) return;
  _termDemoRan = true;
  const input = document.getElementById('termInput');
  if (input) input.disabled = true;

  let stepIdx = 0;
  function nextStep() {
    if (stepIdx >= _DEMO_STEPS.length) {
      // Re-enable after progress bar finishes (~2.5s)
      setTimeout(() => {
        if (input) { input.disabled = false; input.focus(); }
        termPrint('');
        termPrint('<span style="color:#ff9ec4">✦ Demo complete. Your turn — type <span style="color:#61d6d6">help</span> to explore.</span>', '');
      }, 3200);
      return;
    }
    const { cmd, wait } = _DEMO_STEPS[stepIdx++];
    setTimeout(() => {
      _demoTypeCmd(cmd, () => {
        setTimeout(() => {
          handleTermCmd(cmd);
          setTimeout(nextStep, stepIdx < _DEMO_STEPS.length ? 400 : 200);
        }, 300);
      });
    }, wait);
  }
  nextStep();
}

function _demoTypeCmd(cmd, onDone) {
  const out = document.getElementById('termOutput');
  if (!out) { onDone(); return; }
  const line = document.createElement('div');
  line.className = 'term-line';
  out.appendChild(line);
  out.scrollTop = out.scrollHeight;

  const PS = `<span style="color:#61d6d6">PS C:\\Haiqa</span><span style="color:#aaa">&gt;</span> `;
  let typed = '', i = 0;

  function tick() {
    if (i < cmd.length) {
      typed += cmd[i++];
      line.innerHTML = PS +
        `<span style="color:#e5e5e5">${typed}</span>` +
        `<span style="color:#ff9ec4;font-weight:300;">▌</span>`;
      out.scrollTop = out.scrollHeight;
      setTimeout(tick, 38 + Math.random() * 52);
    } else {
      line.innerHTML = PS + `<span style="color:#e5e5e5">${cmd}</span>`;
      onDone();
    }
  }
  tick();
}

function termPrint(msg, prefix = '<span style="color:#4ade80">→</span> ') {
  const out = document.getElementById('termOutput');
  if (!out) return;
  const line = document.createElement('div');
  line.className = 'term-line';
  line.innerHTML = prefix + msg;
  out.appendChild(line);
  out.scrollTop = out.scrollHeight;
}

function termPrintCmd(cmd) {
  const out = document.getElementById('termOutput');
  if (!out) return;
  const line = document.createElement('div');
  line.className = 'term-line';
  line.innerHTML = `<span style="color:#61d6d6">PS C:\\Haiqa</span><span style="color:#aaa">&gt;</span> <span style="color:#e5e5e5">${cmd}</span>`;
  out.appendChild(line);
}

function handleTermCmd(raw) {
  const cmd = raw.toLowerCase().trim();
  if (cmd === 'clear' || cmd === 'cls') {
    document.getElementById('termOutput').innerHTML = ''; return;
  }
  if (cmd === 'help') {
    termPrint(PORTFOLIO.terminalCommands.help.replace(/\n/g,'<br>')); return;
  }
  if (cmd === 'ls' || cmd === 'dir') {
    termPrint(PORTFOLIO.terminalCommands.ls.replace(/\n/g,'<br>')); return;
  }
  if (cmd === 'cat about.txt' || cmd === 'type about.txt') {
    termPrint(PORTFOLIO.bio.replace(/\n/g,'<br>')); return;
  }
  if (cmd === 'python projects' || cmd === 'python3 projects') {
    termPrint(PORTFOLIO.terminalCommands['python projects'].replace(/\n/g,'<br>')); return;
  }
  if (cmd.startsWith('open ')) {
    const p = cmd.split(' ')[1];
    if (['urdu','parser','docver','style','rag','asr','coder'].includes(p)) {
      runFakeProgress(p);
    } else {
      termPrint(`<span style="color:#f87171">Error: project "${p}" not found. Try: urdu, parser, docver, rag, asr, coder, style</span>`);
    }
    return;
  }
  if (cmd === 'contact') { openWindow('contact'); termPrint('Opening Contact window...'); return; }
  if (cmd === 'github')  { termPrint(PORTFOLIO.terminalCommands.github); return; }
  if (cmd === 'cat skills.json') {
    const out = Object.entries(PORTFOLIO.skills).map(([k,v]) =>
      `${k}: ${v.map(s=>s.name).join(', ')}`).join('<br>');
    termPrint(out); return;
  }
  if (cmd === 'whoami') {
    termPrint(`${PORTFOLIO.name} — ${PORTFOLIO.role}`); return;
  }
  if (cmd === 'pwd') {
    termPrint('C:\\Haiqa\\Portfolio'); return;
  }
  termPrint(`<span style="color:#f87171">'${raw}' is not recognized. Type <span style="color:#61d6d6">help</span> for commands.</span>`);
}

function runFakeProgress(projectId) {
  const proj = PORTFOLIO.projects.find(p => p.id === projectId);
  if (!proj) return;
  termPrint(`Loading <span style="color:${proj.color}">${proj.name}</span>...`);
  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.floor(Math.random() * 15) + 5;
    if (pct >= 100) {
      pct = 100; clearInterval(interval);
      termPrint(`<span style="color:#4ade80">✓ ${proj.name} ready. Accuracy: ${proj.metrics.accuracy || 'N/A'}</span>`);
      setTimeout(() => openWindow('projects'), 300);
    }
    const bar = '█'.repeat(Math.floor(pct/10)) + '░'.repeat(10-Math.floor(pct/10));
    const out = document.getElementById('termOutput');
    const last = out.lastElementChild;
    if (last && last.dataset.prog) {
      last.innerHTML = `<span style="color:#888">[${bar}] ${pct}%</span>`;
    } else {
      const ln = document.createElement('div');
      ln.className='term-line'; ln.dataset.prog='1';
      ln.innerHTML = `<span style="color:#888">[${bar}] ${pct}%</span>`;
      out.appendChild(ln); out.scrollTop = out.scrollHeight;
    }
  }, 140);
}

// ── START MENU ───────────────────────────────────────────────
function toggleStartMenu() {
  const menu = document.getElementById('startMenu');
  const overlay = document.getElementById('startOverlay');
  const btn = document.getElementById('startBtn');
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    overlay.classList.remove('hidden');
    btn.classList.add('active');
    setTimeout(() => document.getElementById('smSearch').focus(), 100);
  } else {
    closeStartMenu();
  }
}

function closeStartMenu() {
  document.getElementById('startMenu').classList.add('hidden');
  document.getElementById('startOverlay').classList.add('hidden');
  document.getElementById('startBtn').classList.remove('active');
}

function openStartMenu() { // alias for search click
  document.getElementById('startMenu').classList.remove('hidden');
  document.getElementById('startOverlay').classList.remove('hidden');
  document.getElementById('startBtn').classList.add('active');
  setTimeout(() => document.getElementById('smSearch').focus(), 100);
}

// ── TOAST NOTIFICATION ───────────────────────────────────────
function showToast() {
  const toast = document.getElementById('notifToast');
  toast.classList.remove('hidden');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(hideToast, 6000);
}

function hideToast() {
  document.getElementById('notifToast').classList.add('hidden');
}

// ── CURSOR SPARKLE TRAIL ──────────────────────────────────────
(function() {
  const COLORS = ['#ff9ec4','#e91e8c','#ff6eb4','#ffb3d1','#c77dff','#ff1493','#fff0f7'];
  const SHAPES = ['✦','✧','⋆','·','✿','♡','★'];
  let lastX = 0, lastY = 0;

  function spawnSparkle(x, y) {
    const el = document.createElement('div');
    const angle  = Math.random() * 360;
    const dist   = 18 + Math.random() * 32;
    const size   = 8 + Math.random() * 10;
    const color  = COLORS[Math.floor(Math.random() * COLORS.length)];
    const shape  = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const dur    = 500 + Math.random() * 400;
    const dx = Math.cos(angle * Math.PI / 180) * dist;
    const dy = Math.sin(angle * Math.PI / 180) * dist - 20;

    el.textContent = shape;
    el.style.cssText = `
      position:fixed;
      left:${x}px;top:${y}px;
      font-size:${size}px;
      color:${color};
      pointer-events:none;
      user-select:none;
      z-index:99999;
      line-height:1;
      transform:translate(-50%,-50%);
      transition:transform ${dur}ms ease-out, opacity ${dur}ms ease-out;
      will-change:transform,opacity;
      text-shadow:0 0 6px ${color};
    `;
    document.body.appendChild(el);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.3)`;
        el.style.opacity = '0';
      });
    });

    setTimeout(() => el.remove(), dur);
  }

  document.addEventListener('mousemove', e => {
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    if (dx * dx + dy * dy < 100) return;
    lastX = e.clientX; lastY = e.clientY;
    const count = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      setTimeout(() => spawnSparkle(e.clientX, e.clientY), i * 40);
    }
  });
})();

// ── KEYBOARD SHORTCUTS ────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeStartMenu();
  // Win key (rare but fun)
  if (e.key === 'Meta') { e.preventDefault(); toggleStartMenu(); }
});

// ── DESKTOP ICON DESELECT ─────────────────────────────────────
document.getElementById('desktop').addEventListener('click', e => {
  if (!e.target.closest('.di') && !e.target.closest('.window') && !e.target.closest('#taskbar') && !e.target.closest('#startMenu')) {
    document.querySelectorAll('.di.selected').forEach(d => d.classList.remove('selected'));
  }
});
