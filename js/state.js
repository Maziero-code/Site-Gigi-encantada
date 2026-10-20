/* ============ ESTADO GLOBAL ============ */
function defaultState(){
  const free = arr => arr.filter(x => x.price === 0).map(x => x.id);
  return {
    coins: 150000,
    stars: 0,
    inventory: {
      hair: free(HAIRS),
      clothes: free(CLOTHES),
      shoes: free(SHOES),
      accessories: free(ACCESSORIES),
      makeup: [...free(LIPS), ...free(EYES), ...free(BLUSH), ...free(LINERS)],
      furniture: free(FURNITURE),
      wallpaper: free(WALLPAPERS),
      floor: free(FLOORS),
    },
    look: {
      hair: HAIRS[0].id,
      clothes: CLOTHES[0].id,
      shoes: SHOES[0].id,
      accessories: [],
      makeup: { lips: LIPS[0].id, eyes: null, blush: null, liner: null }
    },
    room: { wallpaper: WALLPAPERS[0].id, floor: FLOORS[0].id, items: [] },
    completed: {},
    favLooks: []
  };
}

let state = (typeof loadGame === 'function' ? loadGame() : null) || defaultState();

function syncStats(){
  $$('.coin-val').forEach(e=>e.textContent = state.coins);
  $$('.star-val').forEach(e=>e.textContent = state.stars);
}
function bumpStat(sel){
  $$(sel).forEach(e=>{
    const p = e.closest('.stat');
    if(!p) return;
    p.classList.remove('pop'); void p.offsetWidth; p.classList.add('pop');
  });
}
