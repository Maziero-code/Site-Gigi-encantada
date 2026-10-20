let beautyTab = 'lips';
const BEAUTY_TABS = [
  { k:'lips', label:'Batom' },
  { k:'eyes', label:'Sombra' },
  { k:'blush', label:'Blush' },
  { k:'liner', label:'Delineado' },
];

function renderBeauty(){
  $('#beautyPreview').innerHTML = buildGigi(state.look);
  const tabs = $('#beautyTabs');
  tabs.innerHTML = '';
  BEAUTY_TABS.forEach(t=>{
    const b = el('button','tab' + (beautyTab===t.k?' active':''), t.label);
    b.onclick = ()=>{ beautyTab = t.k; sfxClick(); renderBeauty(); };
    tabs.appendChild(b);
  });

  const box = $('#beautyItems');
  box.innerHTML = '';
  const list = { lips:LIPS, eyes:EYES, blush:BLUSH, liner:LINERS }[beautyTab];
  const mk = state.look.makeup;

  if(beautyTab !== 'lips'){
    const none = el('div','item' + (!mk[beautyTab]?' sel':''));
    none.innerHTML = `<div class="thumb"><svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="3" stroke-dasharray="6 6"/>
      <path d="M38 38 L62 62 M62 38 L38 62" stroke="rgba(255,255,255,.35)" stroke-width="3" stroke-linecap="round"/></svg></div>
      <div class="nm">Nenhum</div><div class="chk">✓</div>`;
    none.onclick = ()=>{ mk[beautyTab] = null; saveGame(); renderBeauty(); sfxClick(); };
    box.appendChild(none);
  }

  list.forEach(item=>{
    const owned = state.inventory.makeup.includes(item.id);
    const sel = mk[beautyTab] === item.id;
    const chip = beautyTab === 'liner'
      ? `<svg viewBox="0 0 100 100"><path d="M22 58 Q50 30 78 58" stroke="${item.color}" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`
      : swatchChip(item.color);
    box.appendChild(makeItem(item, owned, sel, chip, ()=>{
      mk[beautyTab] = item.id; saveGame(); renderBeauty(); sfxClick();
    }));
  });
}
