function currentWallpaper(){ return WALLPAPERS.find(w=>w.id===state.room.wallpaper) || WALLPAPERS[0]; }
function currentFloor(){ return FLOORS.find(f=>f.id===state.room.floor) || FLOORS[0]; }

function renderRoomScreen(){
  const wall = currentWallpaper();
  const fl = currentFloor();
  $('#roomWall').style.background = wall.css;
  $('#roomFloor').style.background = fl.css;

  const ws = $('#wallSwatches'); ws.innerHTML = '';
  WALLPAPERS.forEach(w=>{
    const b = el('button','sw' + (state.room.wallpaper===w.id?' sel':''));
    b.style.background = w.css; b.style.backgroundSize = 'cover';
    b.title = w.name;
    b.onclick = ()=>{ state.room.wallpaper = w.id; saveGame(); renderRoomScreen(); sfxClick(); };
    ws.appendChild(b);
  });
  const fs = $('#floorSwatches'); fs.innerHTML = '';
  FLOORS.forEach(f=>{
    const b = el('button','sw' + (state.room.floor===f.id?' sel':''));
    b.style.background = f.css; b.title = f.name;
    b.onclick = ()=>{ state.room.floor = f.id; saveGame(); renderRoomScreen(); sfxClick(); };
    fs.appendChild(b);
  });

  renderFurni();
  renderFurniPalette();
}

function renderFurni(){
  const box = $('#roomFurni');
  box.innerHTML = '';
  state.room.items.forEach((it)=>{
    const f = FURNITURE.find(x=>x.id===it.id);
    if(!f) return;
    const d = el('div','furni');
    d.style.left = it.x + '%';
    d.style.top = it.y + '%';
    d.style.width = f.w + '%';
    d.style.height = f.h + '%';
    d.innerHTML = f.svg + `<button class="del">✕</button>`;

    d.addEventListener('pointerdown', (e)=>{
      if(e.target.classList.contains('del')) return;
      e.preventDefault();
      $$('.furni').forEach(x=>x.classList.remove('sel'));
      d.classList.add('sel');
      startDrag(e, d, it);
    });
    const del = d.querySelector('.del');
    del.addEventListener('pointerdown', (e)=>{
      e.stopPropagation(); e.preventDefault();
      state.room.items = state.room.items.filter(x=>x!==it);
      saveGame(); renderFurni(); sfxClick();
    });
    box.appendChild(d);
  });
  
  $('#roomEl').addEventListener('pointerdown', (e)=>{
    if(!e.target.closest('.furni')) $$('.furni').forEach(x=>x.classList.remove('sel'));
  });
}

function startDrag(e, elm, it){
  const room = $('#roomEl');
  const rect = room.getBoundingClientRect();
  const startPx = (e.clientX - rect.left) / rect.width * 100;
  const startPy = (e.clientY - rect.top) / rect.height * 100;
  const dx = startPx - it.x, dy = startPy - it.y;
  let moved = false;

  function move(ev){
    moved = true;
    const nx = (ev.clientX - rect.left) / rect.width * 100 - dx;
    const ny = (ev.clientY - rect.top) / rect.height * 100 - dy;
    it.x = clamp(nx, 6, 94);
    it.y = clamp(ny, 8, 98);
    elm.style.left = it.x + '%';
    elm.style.top = it.y + '%';
  }
  function up(){
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', up);
    if(moved) saveGame();
  }
  document.addEventListener('pointermove', move);
  document.addEventListener('pointerup', up);
}

function renderFurniPalette(){
  const box = $('#furniItems');
  box.innerHTML = '';
  FURNITURE.forEach(f=>{
    const owned = state.inventory.furniture.includes(f.id);
    const placed = state.room.items.some(x=>x.id===f.id);
    const d = el('div','item' + (placed?' sel':'') + (owned?'':' locked'));
    d.innerHTML = `
      <div class="thumb">${f.svg}</div>
      <div class="nm">${f.name}</div>
      ${placed ? '<div class="chk">✓</div>' : ''}
      ${!owned ? `<div class="price">🪙 ${f.price}</div>` : ''}
    `;
    d.onclick = ()=>{
      if(!owned){ toast('Compre este móvel na Loja','🔒'); return; }
      if(placed){
        state.room.items = state.room.items.filter(x=>x.id!==f.id);
        toast(f.name + ' removido', '🗑️');
      } else {
        state.room.items.push({ id:f.id, x: clamp(f.def.x + (Math.random()*6-3),8,92), y: clamp(f.def.y,10,97) });
        toast(f.name + ' adicionado', '✨');
      }
      saveGame(); renderRoomScreen(); sfxClick();
    };
    box.appendChild(d);
  });
}
