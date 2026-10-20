let shopTab = 'clothes';
const SHOP_TABS = [
  { k:'clothes', label:'Roupas' },
  { k:'hair', label:'Cabelos' },
  { k:'shoes', label:'Sapatos' },
  { k:'accessories', label:'Acessórios' },
  { k:'makeup', label:'Maquiagem' },
  { k:'furniture', label:'Móveis' },
];

function renderShop(){
  const tabs = $('#shopTabs');
  tabs.innerHTML = '';
  SHOP_TABS.forEach(t=>{
    const b = el('button','tab' + (shopTab===t.k?' active':''), t.label);
    b.onclick = ()=>{ shopTab = t.k; sfxClick(); renderShop(); };
    tabs.appendChild(b);
  });

  const grid = $('#shopGrid');
  grid.innerHTML = '';

  let list = [];
  if(shopTab === 'clothes') list = CLOTHES.filter(x=>x.price>0).map(x=>({item:x, kind:'clothes', svg:chipFor('clothes',x)}));
  if(shopTab === 'hair') list = HAIRS.filter(x=>x.price>0).map(x=>({item:x, kind:'hair', svg:chipFor('hair',x)}));
  if(shopTab === 'shoes') list = SHOES.filter(x=>x.price>0).map(x=>({item:x, kind:'shoes', svg:chipFor('shoes',x)}));
  if(shopTab === 'accessories') list = ACCESSORIES.filter(x=>x.price>0).map(x=>({item:x, kind:'accessory', svg:chipFor('accessory',x)}));
  if(shopTab === 'furniture') list = FURNITURE.filter(x=>x.price>0).map(x=>({item:x, kind:'furniture', svg:x.svg}));
  if(shopTab === 'makeup'){
    [...LIPS, ...EYES, ...BLUSH, ...LINERS].filter(x=>x.price>0).forEach(m=>{
      list.push({ item:m, kind:'makeup', svg: swatchChip(m.color) });
    });
  }

  if(!list.length){
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--txt-dim);padding:40px 0;font-size:.85rem">Você já tem tudo desta categoria! 💖</div>`;
    return;
  }

  list.forEach(({item, kind, svg})=>{
    const invKey = kind === 'makeup' ? 'makeup' : kind;
    const owned = state.inventory[invKey].includes(item.id);
    const canBuy = state.coins >= item.price;
    const d = el('div','shop-item');
    d.innerHTML = `
      <div class="thumb">${svg}</div>
      <div class="info">
        <div class="nm">${item.name}</div>
        <button class="buy ${owned?'owned':(canBuy?'':'cant')}">
          ${owned ? '✓ Adquirido' : `🪙 ${item.price}`}
        </button>
      </div>
    `;
    if(!owned && canBuy){
      d.querySelector('.buy').onclick = ()=> buyItem(kind, item);
    }
    grid.appendChild(d);
  });
}

function buyItem(kind, item){
  const invKey = kind === 'makeup' ? 'makeup' : kind;
  if(state.inventory[invKey].includes(item.id)) return;
  if(state.coins < item.price){ toast('Moedas insuficientes', '🪙'); return; }
  state.coins -= item.price;
  state.inventory[invKey].push(item.id);
  saveGame(); syncStats(); bumpStat('.coin-val');
  sfxCoin();
  toast(`${item.name} desbloqueado!`, '🎉');
  renderShop();
}
