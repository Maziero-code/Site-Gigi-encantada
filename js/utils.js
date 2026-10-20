/* ============ UTILITÁRIOS GERAIS ============ */
let _actx = null;

function sfx(freq=520, dur=0.09, type='sine', vol=0.045){
  try{
    if(!_actx) _actx = new (window.AudioContext||window.webkitAudioContext)();
    const o = _actx.createOscillator(), g = _actx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, _actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, _actx.currentTime + dur);
    o.connect(g); g.connect(_actx.destination);
    o.start(); o.stop(_actx.currentTime + dur);
  }catch(e){}
}
function sfxCoin(){ sfx(880,0.07,'triangle',0.05); setTimeout(()=>sfx(1180,0.1,'triangle',0.045),60); }
function sfxWin(){ [523,659,784,1046].forEach((f,i)=>setTimeout(()=>sfx(f,0.16,'triangle',0.05), i*95)); }
function sfxClick(){ sfx(640,0.05,'sine',0.03); }

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const clamp = (v,a,b) => Math.max(a, Math.min(b,v));

function el(tag, cls, html){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  if(html != null) e.innerHTML = html;
  return e;
}

function starPath(cx,cy,r){
  let d='';
  for(let i=0;i<10;i++){
    const a = -Math.PI/2 + i*Math.PI/5;
    const rr = i%2===0 ? r : r*0.45;
    d += (i===0?'M':'L') + (cx+Math.cos(a)*rr).toFixed(2) + ' ' + (cy+Math.sin(a)*rr).toFixed(2);
  }
  return d+'Z';
}

/* ============ TOASTS ============ */
function toast(msg, icon='✨'){
  const t = el('div','toast', `<span>${icon}</span><span>${msg}</span>`);
  $('#toasts').appendChild(t);
  setTimeout(()=>{ t.classList.add('out'); setTimeout(()=>t.remove(), 320); }, 2100);
}

/* ============ CONFETTI ============ */
function confetti(){
  const box = $('#confetti');
  const colors = ['#FF3D96','#FFD83D','#FF7FBB','#FFFFFF','#A66DD4'];
  for(let i=0;i<70;i++){
    const c = el('div','conf');
    c.style.left = Math.random()*100 + 'vw';
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.animationDuration = (1.6 + Math.random()*1.4) + 's';
    c.style.animationDelay = (Math.random()*0.4) + 's';
    c.style.width = c.style.height = (6 + Math.random()*8) + 'px';
    c.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
    box.appendChild(c);
    setTimeout(()=>c.remove(), 3400);
  }
}

/* ============ MODAL ============ */
function closeModal(){
  $('#modalBg').classList.remove('on');
}

/* ============ CHIP DE ITEM (usado no closet e na loja) ============ */
function makeItem(item, owned, selected, svg, onClick){
  const d = el('div','item' + (selected?' sel':'') + (owned?'':' locked'));
  d.innerHTML = `
    <div class="thumb">${svg}</div>
    <div class="nm">${item.name}</div>
    <div class="chk">✓</div>
    ${!owned ? `<div class="price">🪙 ${item.price}</div>` : ''}
  `;
  d.onclick = ()=>{
    if(!owned){ toast('Compre este item na Loja', '🔒'); return; }
    onClick();
  };
  return d;
}
/* ============ TRILHA SONORA GERADA VIA CÓDIGO ============ */
let musicPlaying = false;
let musicInterval = null;
let musicNoteIndex = 0;

// Melodia fofa em escala pentatônica (Dó Maior)
const melody = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 293.66, 349.23, 440.00, 349.23, 293.66];
const bass = [130.81, 130.81, 146.83, 146.83, 164.81, 164.81, 130.81, 130.81];

function toggleMusic() {
  if(!_actx) _actx = new (window.AudioContext||window.webkitAudioContext)();
  if(_actx.state === 'suspended') _actx.resume();

  const btn = document.getElementById('btnMusic');
  
  if(musicPlaying) {
    clearInterval(musicInterval);
    musicPlaying = false;
    if(btn) btn.innerHTML = '🎵';
    toast('Música pausada', '🔇');
    return;
  }

  musicPlaying = true;
  if(btn) btn.innerHTML = '🔊';
  toast('Trilha sonora ativada!', '🎶');

  musicInterval = setInterval(() => {
    if(!musicPlaying) return;
    
    // Toca a melodia principal
    const o = _actx.createOscillator();
    const g = _actx.createGain();
    o.type = 'sine';
    o.frequency.value = melody[musicNoteIndex % melody.length];
    g.gain.setValueAtTime(0.03, _actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, _actx.currentTime + 0.3);
    o.connect(g); g.connect(_actx.destination);
    o.start(); o.stop(_actx.currentTime + 0.3);

    // Toca o baixo a cada 4 notas
    if(musicNoteIndex % 4 === 0) {
      const ob = _actx.createOscillator();
      const gb = _actx.createGain();
      ob.type = 'triangle';
      ob.frequency.value = bass[Math.floor(musicNoteIndex / 4) % bass.length];
      gb.gain.setValueAtTime(0.04, _actx.currentTime);
      gb.gain.exponentialRampToValueAtTime(0.001, _actx.currentTime + 0.6);
      ob.connect(gb); gb.connect(_actx.destination);
      ob.start(); ob.stop(_actx.currentTime + 0.6);
    }
    
    musicNoteIndex++;
  }, 350);
}

/* ============ FAIRY MASCOTE ============ */
document.addEventListener('pointermove', (e) => {
  const fairy = document.getElementById('fairy');
  if(!fairy) return;
  
  // Move a fada para o mouse
  fairy.style.left = (e.clientX + 20) + 'px';
  fairy.style.top = (e.clientY + 20) + 'px';
  
  // Cria a poeira mágica (com delay para não pesar)
  if(Math.random() > 0.85) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.innerHTML = '✨';
    p.style.left = (e.clientX + 10) + 'px';
    p.style.top = (e.clientY + 10) + 'px';
    p.style.setProperty('--x', (Math.random() * 40 - 20) + 'px');
    p.style.setProperty('--y', (Math.random() * 40 - 20) + 'px');
    p.style.fontSize = '0.8rem';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
});
