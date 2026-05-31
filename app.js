/* ══════════════════════════════════════════════════════════
   LOVE.EXE — JavaScript ♡  
   ══════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────
// UTILITÁRIOS
// ─────────────────────────────────────────────
const $ = id => document.getElementById(id);
const sleep = ms => new Promise(r => setTimeout(r, ms));

function playSound(id) {
  try {
    const el = $(id);
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  } catch (e) {}
}

// Gera sons retrô via Web Audio API (fallback quando arquivos não existem)
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function beep(freq = 440, type = 'square', duration = 0.1, vol = 0.2) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function playClickSound() {
  beep(880, 'square', 0.06, 0.15);
}
function playSuccessSound() {
  // Melodia de sucesso fofa
  const notes = [523, 659, 784, 1047];
  notes.forEach((f, i) => {
    setTimeout(() => beep(f, 'square', 0.12, 0.2), i * 120);
  });
}
function playErrorSound() {
  beep(200, 'sawtooth', 0.2, 0.15);
  setTimeout(() => beep(180, 'sawtooth', 0.2, 0.15), 120);
}
function playChimeSound() {
  const notes = [784, 880, 1047, 1319];
  notes.forEach((f, i) => {
    setTimeout(() => beep(f, 'triangle', 0.15, 0.18), i * 100);
  });
}
function playAchievementSound() {
  const melody = [523, 659, 784, 659, 784, 1047];
  melody.forEach((f, i) => {
    setTimeout(() => beep(f, 'square', 0.15, 0.22), i * 140);
  });
}

// ─────────────────────────────────────────────
// ESTRELAS ANIMADAS (canvas)
// ─────────────────────────────────────────────
function initStars(canvasId) {
  const canvas = $(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let hearts = [];
  let W, H;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const STAR_COUNT = 90;
  const HEART_COUNT = 8;

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      r: Math.random() * 1.8 + 0.5,
      a: Math.random(),
      speed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
      color: ['#ffb3d1','#d4b8e0','#fff5e6','#ffffff'][Math.floor(Math.random()*4)]
    });
  }
  for (let i = 0; i < HEART_COUNT; i++) {
    hearts.push({
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      size: Math.floor(Math.random() * 3 + 1) * 4,
      a: Math.random() * 0.4 + 0.2,
      vy: -(Math.random() * 0.3 + 0.1),
      phase: Math.random() * Math.PI * 2
    });
  }

  // pixel heart
  function drawPixelHeart(ctx, x, y, size, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#ffb3d1';
    const s = size;
    // 4x4 pixel heart pattern scaled
    const pattern = [
      [0,1,0,1,0],
      [1,1,1,1,1],
      [1,1,1,1,1],
      [0,1,1,1,0],
      [0,0,1,0,0],
    ];
    const pSize = Math.max(1, Math.floor(s / 5));
    const offsetX = -pSize * 2.5;
    const offsetY = -pSize * 2.5;
    pattern.forEach((row, ri) => row.forEach((px, ci) => {
      if (px) ctx.fillRect(x + offsetX + ci * pSize, y + offsetY + ri * pSize, pSize, pSize);
    }));
    ctx.restore();
  }

  let raf;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const t = Date.now() / 1000;

    stars.forEach(s => {
      const flicker = Math.sin(t * s.speed * 60 + s.phase);
      const alpha = 0.3 + 0.7 * (0.5 + 0.5 * flicker);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.color;
      // pixel star (2x2 ou 1x1)
      const pr = Math.max(1, Math.round(s.r));
      const px = (s.x / 1000) * W;
      const py = (s.y / 1000) * H;
      ctx.fillRect(Math.floor(px), Math.floor(py), pr, pr);
      ctx.restore();
    });

    hearts.forEach(h => {
      const px = (h.x / 1000) * W;
      const py = (h.y / 1000) * H;
      const pulse = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(t * 0.8 + h.phase));
      drawPixelHeart(ctx, px, py, h.size, h.a * pulse);
    });

    raf = requestAnimationFrame(draw);
  }
  draw();
  return () => cancelAnimationFrame(raf);
}

// ─────────────────────────────────────────────
// MÁQUINA DE ESCREVER
// ─────────────────────────────────────────────
async function typewriter(el, text, speed = 40) {
  el.textContent = '';
  for (const ch of text) {
    el.textContent += ch;
    await sleep(ch === ' ' ? speed / 2 : speed);
  }
}

// ─────────────────────────────────────────────
// NAVEGAÇÃO ENTRE TELAS
// ─────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  const target = $(id);
  if (target) target.classList.add('active');
}

// ─────────────────────────────────────────────
// TELA 1 — START
// ─────────────────────────────────────────────
function initStartScreen() {
  initStars('stars-canvas');
  $('btn-start').addEventListener('click', () => {
    playClickSound();
    showScreen('screen-password');
    initPasswordScreen();
  });
}

// ─────────────────────────────────────────────
// TELA 2 — SENHA
// ─────────────────────────────────────────────
function initPasswordScreen() {
  initStars('stars-canvas-2');

  const tw = $('tw-password');
  typewriter(tw, 'Existe um cheiro que sempre me lembra você. Digite ele ♡', 35);

  const input = $('password-input');
  const feedback = $('password-feedback');
  const btn = $('btn-enter');
  const SENHA = 'baunilha';

  async function checkPassword() {
    const val = input.value.trim().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // ignora acentos

    if (val === SENHA) {
      playSuccessSound();
      feedback.textContent = 'Senha correta ♡';
      feedback.className = 'feedback-msg success';

      // Flash + corações
      $('screen-password').classList.add('screen-flash');
      spawnHearts();

      await sleep(300);
      $('screen-password').classList.remove('screen-flash');

      await sleep(900);
      showScreen('screen-loading');
      runLoadingScreen();
    } else {
      playErrorSound();
      feedback.textContent = 'Hmm... não é esse cheiro que mora em mim ♡';
      feedback.className = 'feedback-msg error';
      input.value = '';
      input.focus();
      // shake
      input.style.animation = 'none';
      input.offsetHeight;
      input.style.animation = 'shake 0.4s ease';
    }
  }

  btn.addEventListener('click', () => { playClickSound(); checkPassword(); });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { playClickSound(); checkPassword(); }
  });
  input.focus();
}

function spawnHearts() {
  const container = $('hearts-burst');
  const emojis = ['♥','♡','❤','💕','💗','💖'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('span');
    el.className = 'heart-particle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = (20 + Math.random() * 60) + '%';
    el.style.top  = (30 + Math.random() * 40) + '%';
    el.style.animationDelay = (Math.random() * 0.4) + 's';
    el.style.fontSize = (14 + Math.random() * 18) + 'px';
    el.style.color = ['#ffb3d1','#d4b8e0','#ffd700','#ffffff'][Math.floor(Math.random()*4)];
    container.appendChild(el);
    setTimeout(() => el.remove(), 1600);
  }
}

// ─────────────────────────────────────────────
// TELA 3 — LOADING
// ─────────────────────────────────────────────
async function runLoadingScreen() {
  const bar  = $('loading-bar');
  const pct  = $('loading-pct');
  const msg  = $('loading-msg');

  const messages = [
    'Carregando memórias...',
    'Abrindo o coração...',
    'Carregando 8 anos de amor...',
    'Quase lá... ♡',
    'Pronto! ♡'
  ];

  let progress = 0;
  let msgIdx = 0;

  // melodia de loading
  const loadNotes = [392, 440, 523, 392, 494, 523];
  loadNotes.forEach((f, i) => setTimeout(() => beep(f, 'triangle', 0.2, 0.12), i * 200 + 200));

  return new Promise(resolve => {
    const interval = setInterval(() => {
      progress += Math.random() * 4 + 1.5;
      if (progress > 100) progress = 100;

      bar.style.width = progress + '%';
      pct.textContent = Math.floor(progress) + '%';

      const newMsgIdx = Math.floor((progress / 100) * (messages.length - 1));
      if (newMsgIdx !== msgIdx && newMsgIdx < messages.length) {
        msgIdx = newMsgIdx;
        msg.textContent = messages[msgIdx];
        beep(660, 'triangle', 0.08, 0.1);
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          showScreen('screen-map');
          initMapScreen();
          resolve();
        }, 700);
      }
    }, 60);
  });
}

// ─────────────────────────────────────────────
// TELA 4 — MAPA
// ─────────────────────────────────────────────
function initMapScreen() {
  initStars('stars-canvas-3');

  document.querySelectorAll('.map-node').forEach(node => {
    node.addEventListener('click', () => {
      playClickSound();
      const place = node.dataset.place;
      node.classList.add('visited');
      openModal(place);
    });
  });
}

// ─────────────────────────────────────────────
// MODAIS
// ─────────────────────────────────────────────
function openModal(place) {
  playChimeSound();
  const modal = $('modal-' + place);
  if (!modal) return;
  modal.classList.add('open');

  if (place === 'casa')    initCasa();
  if (place === 'floresta') initFloresta();
  if (place === 'ceu')     initCeu();
  if (place === 'lago')    initLago();
}

function closeModal(place) {
  playClickSound();
  const modal = $('modal-' + place);
  if (modal) modal.classList.remove('open');

  // pausa áudio ao fechar rádio
  if (place === 'radio') {
    const audio = $('audio-player');
    if (audio) audio.pause();
    const wave = document.querySelector('.radio-wave');
    if (wave) wave.classList.remove('playing');
    const btn = $('btn-play');
    if (btn) btn.textContent = '[ ▶ tocar áudio ]';
  }
}

document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    const m = btn.dataset.modal;
    closeModal(m);
  });
});

// Fecha ao clicar fora
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      const id = overlay.id.replace('modal-', '');
      closeModal(id);
    }
  });
});

// ─────────────────────────────────────────────
// MODAL — CASA
// ─────────────────────────────────────────────
let casaTyped = false;
async function initCasa() {
  if (casaTyped) return;
  casaTyped = true;

  const el = $('letter-text');
  const lines = [
    'Feliz 26 anos pra minha pessoa favorita.',
    '',
    '8 anos depois… e você ainda continua',
    'sendo meu lugar favorito.',
    '',
    'Não existe cheiro melhor que você.',
    'Não existe abraço mais certo.',
    'Não existe outra mão que eu queira segurar.',
    '',
    'Obrigado por existir.',
    'Obrigado por ser meu lar.',
    '',
    'Com amor, sempre. ♡'
  ];

  el.innerHTML = '';
  for (const line of lines) {
    const span = document.createElement('div');
    el.appendChild(span);
    if (line === '') {
      span.innerHTML = '&nbsp;';
      await sleep(80);
    } else {
      await typewriter(span, line, 38);
      await sleep(120);
    }
  }
}

// ─────────────────────────────────────────────
// MODAL — FLORESTA
// ─────────────────────────────────────────────
function initFloresta() {
  document.querySelectorAll('.memory-slot').forEach(slot => {
    if (slot.dataset.init) return;
    slot.dataset.init = '1';
    slot.addEventListener('click', () => {
      playChimeSound();
      const placeholder = slot.querySelector('.slot-placeholder');
      const revealed = slot.querySelector('.slot-revealed');
      if (placeholder && revealed) {
        placeholder.style.display = 'none';
        revealed.classList.remove('hidden');
        // Tenta carregar imagem real
        const idx = parseInt(slot.dataset.index) + 1;
        const imgEl = revealed.querySelector('.photo-placeholder-img');
        if (imgEl) {
          const img = document.createElement('img');
          img.src = `assets/img/mem${idx}.jpg`;
          img.alt = `Memória ${idx}`;
          img.style.maxWidth = '100%';
          img.style.maxHeight = '180px';
          img.onload = () => { imgEl.replaceWith(img); };
          // se não carregar, mantém o placeholder
        }
      }
    });
  });
}

// ─────────────────────────────────────────────
// MODAL — CÉU
// ─────────────────────────────────────────────
const starMessages = [
  'obrigada por nunca desistir da gente ♡',
  'você deixa meus dias mais leves ♡',
  'eu escolheria você de novo ♡',
  'o cheiro de baunilha sempre vai ser casa pra mim ♡',
  'você é o meu lugar favorito no mundo ♡',
  'oito anos e parece que foi ontem ♡'
];
let skyInit = false;
let starsFound = 0;

function initCeu() {
  if (skyInit) return;
  skyInit = true;
  starsFound = 0;

  const container = $('sky-stars-container');
  const bubble = $('star-message-bubble');
  const counter = $('sky-counter');
  let hideTimer = null;

  // posições fixas para ficar bonito
  const positions = [
    { x: 12, y: 20 }, { x: 35, y: 60 }, { x: 60, y: 15 },
    { x: 80, y: 55 }, { x: 50, y: 78 }, { x: 25, y: 42 }
  ];

  starMessages.forEach((msg, i) => {
    const star = document.createElement('div');
    star.className = 'sky-star';
    star.textContent = '⭐';
    star.style.left = positions[i].x + '%';
    star.style.top  = positions[i].y + '%';
    star.style.animationDelay = (i * 0.3) + 's';
    star.style.fontSize = (18 + Math.floor(Math.random() * 10)) + 'px';

    star.addEventListener('click', () => {
      beep(1047, 'triangle', 0.2, 0.18);
      setTimeout(() => beep(1319, 'triangle', 0.2, 0.18), 120);

      if (!star.classList.contains('found')) {
        starsFound++;
        star.classList.add('found');
        counter.textContent = `${starsFound} / 6 estrelas encontradas`;
        if (starsFound === 6) {
          counter.style.color = '#ffd700';
          counter.textContent = '✦ Todas as estrelas encontradas! ♡ ✦';
          playAchievementSound();
        }
      }

      // posiciona o bubble
      const wrapper = star.closest('.sky-canvas-wrapper');
      const wRect = wrapper.getBoundingClientRect();
      const sRect = star.getBoundingClientRect();
      let left = sRect.left - wRect.left + 20;
      let top  = sRect.top  - wRect.top  - 40;
      if (left + 220 > wrapper.offsetWidth) left = wrapper.offsetWidth - 230;
      if (top < 0) top = sRect.bottom - wRect.top + 5;

      bubble.style.left = left + 'px';
      bubble.style.top  = top + 'px';
      bubble.textContent = msg;
      bubble.classList.remove('hidden');

      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => bubble.classList.add('hidden'), 2800);
    });

    container.appendChild(star);
  });
}

// ─────────────────────────────────────────────
// MODAL — RÁDIO (playlist com 3 músicas)
// ─────────────────────────────────────────────
(function initRadioButton() {
  const btn      = $('btn-play');
  const btnPrev  = $('btn-prev');
  const btnNext  = $('btn-next');
  const audio    = $('audio-player');
  const wave     = document.querySelector('.radio-wave');
  const trackEl  = $('radio-track');
  const artistEl = $('radio-artist');
  const listEl   = $('radio-playlist');
  if (!btn || !audio) return;

  // ── Defina aqui os nomes das músicas ──────────
  // Os arquivos ficam em assets/audio/musica1.mp3, musica2.mp3, musica3.mp3
  const playlist = [
    { file: 'assets/audio/musica1.mp3', name: 'Dançando', artist: 'Agridoce (pitty)' },
    { file: 'assets/audio/musica3.mp3', name: 'The Night We Met', artist: '(Lord Huron) Cover' },
    { file: 'assets/audio/musica2.mp3', name: 'Infinity', artist: 'Jaymes Young' },
  ];

  let currentIdx = 0;
  let playing = false;

  // Monta a playlist visualmente
  playlist.forEach((track, i) => {
    const item = document.createElement('div');
    item.className = 'playlist-item' + (i === 0 ? ' active' : '');
    item.textContent = `${i + 1}. ${track.name}`;
    item.addEventListener('click', () => {
      playTrack(i);
    });
    listEl.appendChild(item);
  });

  function updateDisplay(idx) {
    const t = playlist[idx];
    trackEl.textContent  = `♩ ${t.name} ♩`;
    artistEl.textContent = t.artist;
    document.querySelectorAll('.playlist-item').forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });
  }

  function playTrack(idx) {
    currentIdx = idx;
    audio.src = playlist[idx].file;
    updateDisplay(idx);
    audio.play().then(() => {
      playing = true;
      btn.textContent = '[ ⏸ pausar ]';
      wave.classList.add('playing');
    }).catch(() => {
      // arquivo não encontrado — mostra animação visual mesmo assim
      playing = true;
      btn.textContent = '[ ⏸ pausar ]';
      wave.classList.add('playing');
    });
  }

  audio.addEventListener('ended', () => {
    const next = (currentIdx + 1) % playlist.length;
    playTrack(next);
  });

  btn.addEventListener('click', () => {
    playClickSound();
    if (!playing) {
      playTrack(currentIdx);
    } else {
      audio.pause();
      playing = false;
      btn.textContent = '[ ▶ tocar ]';
      wave.classList.remove('playing');
    }
  });

  btnPrev.addEventListener('click', () => {
    playClickSound();
    const prev = (currentIdx - 1 + playlist.length) % playlist.length;
    playTrack(prev);
  });

  btnNext.addEventListener('click', () => {
    playClickSound();
    const next = (currentIdx + 1) % playlist.length;
    playTrack(next);
  });

  // Inicia exibindo a 1ª faixa
  updateDisplay(0);
})();

// ─────────────────────────────────────────────
// MODAL — LAGO (FINAL)
// ─────────────────────────────────────────────
let lagoInit = false;
function initLago() {
  if (lagoInit) return;
  lagoInit = true;
  playAchievementSound();

  const btn = $('btn-sim');
  const secret = $('final-secret');
  const secretText = $('final-secret-text');

  btn.addEventListener('click', async () => {
    playSuccessSound();
    btn.style.display = 'none';
    secret.classList.remove('hidden');

    const finalMsg = [
      'Sim.',
      '',
      'Para sempre e depois.',
      '',
      'Te amo, amorzinho. ♡'
    ];

    secretText.innerHTML = '';
    for (const line of finalMsg) {
      const d = document.createElement('div');
      secretText.appendChild(d);
      if (!line) { d.innerHTML = '&nbsp;'; await sleep(60); }
      else { await typewriter(d, line, 50); await sleep(200); }
    }

    // chuva de corações na tela toda
    setTimeout(() => fullScreenHearts(), 200);
  });
}

function fullScreenHearts() {
  const emojis = ['♥','♡','❤','💕','💗','💖','✨'];
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: 110vh;
        font-size: ${16 + Math.random() * 22}px;
        z-index: 9999;
        pointer-events: none;
        animation: riseUp 2.5s ease-out forwards;
        color: ${['#ffb3d1','#d4b8e0','#ffd700','#ffffff'][Math.floor(Math.random()*4)]};
      `;
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2600);
    }, i * 80);
  }

  // CSS keyframe para subir
  if (!document.querySelector('#rise-style')) {
    const style = document.createElement('style');
    style.id = 'rise-style';
    style.textContent = `
      @keyframes riseUp {
        from { transform: translateY(0) rotate(0deg); opacity: 1; }
        to   { transform: translateY(-120vh) rotate(${Math.random() > 0.5 ? '' : '-'}20deg); opacity: 0; }
      }
      @keyframes shake {
        0%,100% { transform: translateX(0); }
        20%     { transform: translateX(-8px); }
        40%     { transform: translateX(8px); }
        60%     { transform: translateX(-4px); }
        80%     { transform: translateX(4px); }
      }
    `;
    document.head.appendChild(style);
  }
}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initStartScreen();

  // Easter egg: Konami code → mensagem secreta
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','l','u'];
  let konamiIdx = 0;
  document.addEventListener('keydown', e => {
    if (e.key === KONAMI[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === KONAMI.length) {
        konamiIdx = 0;
        playAchievementSound();
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
          background: #0d0a14; border: 3px solid #ffd700;
          padding: 14px 24px; font-family: 'Press Start 2P', monospace;
          font-size: 9px; color: #ffd700; z-index: 9999;
          box-shadow: 4px 4px 0 #8a6a00;
          animation: slideUp 0.4s ease-out;
          letter-spacing: 2px; text-align: center; line-height: 1.7;
        `;
        toast.textContent = '✦ Mensagem especial encontrada! ✦\nvocê é incrível, amorzinho ♡';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3500);
      }
    } else {
      konamiIdx = 0;
    }
  });
});
