function tagsOf(kind, id){
  const map = { hair:HAIRS, clothes:CLOTHES, shoes:SHOES, accessory:ACCESSORIES,
    lips:LIPS, eyes:EYES, blush:BLUSH, liner:LINERS, furniture:FURNITURE };
  const it = map[kind].find(x=>x.id===id);
  return it ? it.tags : [];
}

function collectTags(){
  const look = [];
  look.push(...tagsOf('hair', state.look.hair));
  look.push(...tagsOf('clothes', state.look.clothes));
  look.push(...tagsOf('shoes', state.look.shoes));
  state.look.accessories.forEach(a=>look.push(...tagsOf('accessory', a)));

  const mk = state.look.makeup;
  const makeup = [];
  if(mk.lips)  makeup.push(...tagsOf('lips', mk.lips));
  if(mk.eyes)  makeup.push(...tagsOf('eyes', mk.eyes));
  if(mk.blush) makeup.push(...tagsOf('blush', mk.blush));
  if(mk.liner) makeup.push(...tagsOf('liner', mk.liner));

  const room = [];
  room.push(...currentWallpaper().tags);
  room.push(...currentFloor().tags);
  state.room.items.forEach(it => room.push(...tagsOf('furniture', it.id)));

  return { look, makeup, room };
}

function matchScore(tags, target){
  const u = [...new Set(tags)];
  let hits = 0;
  target.forEach(t => { if(u.includes(t)) hits++; });
  return Math.round((hits / target.length) * 100);
}

function scoreChallenge(ch){
  const t = collectTags();
  const look = matchScore(t.look, ch.tags);
  const makeup = t.makeup.length ? matchScore(t.makeup, ch.tags) : 0;
  const room = matchScore(t.room, ch.tags);
  const variety = Math.min(10, Math.floor(new Set([...t.look, ...t.makeup, ...t.room]).size * 1.2));
  const total = Math.round((look + makeup + room) / 3) + (look > 0 && makeup > 0 && room > 0 ? variety : 0);
  const final = clamp(total, 0, 100);
  const stars = final >= 80 ? 3 : final >= 55 ? 2 : 1;
  return { look, makeup, room, total: final, stars };
}

function starsFor(stars){
  return [1,2,3].map(i=>`<span class="s ${i<=stars?'on':''}">⭐</span>`).join('');
}

function renderChallenges(){
  const grid = $('#chalGrid');
  grid.innerHTML = '';
  CHALLENGES.forEach(ch=>{
    const best = state.completed[ch.id] || 0;
    const c = el('div','chal');
    c.style.setProperty('--ch-color', ch.color + '66');
    c.innerHTML = `
      <div class="emoji">${ch.emoji}</div>
      <h3>${ch.name}</h3>
      <p>${ch.desc}</p>
      <div class="tags">${ch.tags.map(t=>`<span class="tg">${t}</span>`).join('')}</div>
      ${best ? `<div class="done-badge">${'⭐'.repeat(best)}</div>` : ''}
    `;
    c.onclick = ()=> openChallenge(ch);
    grid.appendChild(c);
  });
}

function openChallenge(ch){
  sfxClick();
  const bg = $('#modalBg'), box = $('#modalBox');
  bg.classList.add('on');
  box.innerHTML = `
    <h2>${ch.emoji} ${ch.name}</h2>
    <p class="desc">${ch.desc}</p>
    <p class="desc" style="font-size:.76rem;color:var(--pink-lt)">
      A pontuação considera seu look, sua maquiagem e o quarto decorado.
    </p>
    <div class="modal-actions">
      <button class="btn ghost" id="mCancel">Voltar</button>
      <button class="btn" id="mStart">Avaliar Look ✨</button>
    </div>
  `;
  box.querySelector('#mCancel').onclick = closeModal;
  box.querySelector('#mStart').onclick = ()=> showResult(ch);
}

function showResult(ch){
  const r = scoreChallenge(ch);
  const prevBest = state.completed[ch.id] || 0;
  const isFirst = !state.completed[ch.id];
  const coinsEarned = isFirst ? (30 + r.stars * 45 + Math.round(r.total / 3)) : Math.round((30 + r.stars * 45) * 0.35);

  state.coins += coinsEarned;
  if(r.stars > prevBest){
    state.stars += (r.stars - prevBest);
    state.completed[ch.id] = r.stars;
  }
  saveGame();
  syncStats();
  bumpStat('.coin-val');
  sfxWin();
  if(r.stars >= 3) confetti();

  const wall = currentWallpaper();
  const floorCss = currentFloor().css;

  const box = $('#modalBox');
  box.innerHTML = `
    <h2>${r.stars >= 3 ? 'Deslumbrante!' : r.stars === 2 ? 'Muito bem!' : 'Bom começo!'}</h2>
    <div class="polaroid">
      <div class="ph">
        <div class="room-mini" style="background:${wall.css}"></div>
        <div class="room-mini" style="top:68%;background:${floorCss}"></div>
        <div class="gigi-mini">${buildGigi(state.look)}</div>
      </div>
      <div class="cap">${ch.name}</div>
    </div>
    <div class="stars-big">${starsFor(r.stars)}</div>
    <div class="reward-line">
      <div class="r">🪙 +${coinsEarned}</div>
      ${r.stars > prevBest ? `<div class="r pink">⭐ +${r.stars - prevBest}</div>` : ''}
    </div>
    <div style="margin-top:18px">
      <div class="score-row"><div class="lbl">Look</div><div class="bar"><div class="fill" data-w="${r.look}"></div></div><div class="val">${r.look}</div></div>
      <div class="score-row"><div class="lbl">Maquiagem</div><div class="bar"><div class="fill" data-w="${r.makeup}"></div></div><div class="val">${r.makeup}</div></div>
      <div class="score-row"><div class="lbl">Decoração</div><div class="bar"><div class="fill" data-w="${r.room}"></div></div><div class="val">${r.room}</div></div>
      <div class="score-row"><div class="lbl" style="color:#fff">Total</div><div class="bar"><div class="fill" data-w="${r.total}" style="background:linear-gradient(90deg,var(--gold),var(--pink))"></div></div><div class="val">${r.total}</div></div>
    </div>
    <div class="modal-actions">
      <button class="btn ghost" id="mClose">Fechar</button>
      <button class="btn" id="mAgain">Tentar de novo</button>
    </div>
  `;
  setTimeout(()=>{
    box.querySelectorAll('.fill').forEach(f => f.style.width = f.dataset.w + '%');
  }, 60);
  box.querySelector('#mClose').onclick = closeModal;
  box.querySelector('#mAgain').onclick = ()=>{ closeModal(); setTimeout(()=>openChallenge(ch), 260); };
}
