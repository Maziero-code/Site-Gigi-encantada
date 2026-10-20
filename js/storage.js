/* ============ LOCALSTORAGE ============ */
const SAVE_KEY = 'gigiMundoEncantadoSave';

function saveGame(){
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch(e){}
}

function loadGame(){
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if(!raw) return null;
    const d = JSON.parse(raw);
    if(!d || typeof d !== 'object') return null;
    const base = defaultState();
    const merged = { ...base, ...d,
      inventory: { ...base.inventory, ...(d.inventory||{}) },
      look: { ...base.look, ...(d.look||{}), makeup: { ...base.look.makeup, ...((d.look&&d.look.makeup)||{}) } },
      room: { ...base.room, ...(d.room||{}) },
      completed: d.completed || {},
      favLooks: d.favLooks || []
    };
    if(!HAIRS.some(h=>h.id===merged.look.hair)) merged.look.hair = HAIRS[0].id;
    if(!CLOTHES.some(c=>c.id===merged.look.clothes)) merged.look.clothes = CLOTHES[0].id;
    if(!SHOES.some(s=>s.id===merged.look.shoes)) merged.look.shoes = SHOES[0].id;
    if(!Array.isArray(merged.look.accessories)) merged.look.accessories = [];
    if(!Array.isArray(merged.room.items)) merged.room.items = [];
    merged.coins = Number(merged.coins) || 0;
    merged.stars = Number(merged.stars) || 0;
    return merged;
  } catch(e){ return null; }
}
