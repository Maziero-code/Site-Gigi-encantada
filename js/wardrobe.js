/* =========================================================
   GIGI MUNDO ENCANTADO — wardrobe.js (COMPLETO)
   ========================================================= */

/* ============ MONTAGEM DO PERSONAGEM ============ */
function hairLayers(id){
  const h = HAIRS.find(x=>x.id===id) || HAIRS[0];
  const st = HAIR_STYLES[h.style];
  return { back: st.back(h.color), front: st.front(h.color) };
}

function bodySVG(){
  return `
    <path d="M134 278 L130 422" stroke="${SKIN}" stroke-width="20" stroke-linecap="round" fill="none"/>
    <path d="M166 278 L170 422" stroke="${SKIN}" stroke-width="20" stroke-linecap="round" fill="none"/>
    <path d="M110 192 C122 182 178 182 190 192 L186 266 C186 280 182 288 176 290 L124 290 C118 288 114 280 114 266 Z" fill="${SKIN}"/>
    <path d="M114 198 C102 222 100 258 104 294" stroke="${SKIN}" stroke-width="17" stroke-linecap="round" fill="none"/>
    <path d="M186 198 C198 222 200 258 196 294" stroke="${SKIN}" stroke-width="17" stroke-linecap="round" fill="none"/>
    <circle cx="104" cy="296" r="9.5" fill="${SKIN}"/>
    <circle cx="196" cy="296" r="9.5" fill="${SKIN}"/>
  `;
}

function neckSVG(){ 
  return `<rect x="137" y="144" width="26" height="54" rx="12" fill="${SKIN_D}"/>`; 
}

function headSVG(){
  return `
    <ellipse cx="150" cy="110" rx="47" ry="53" fill="${SKIN}"/>
    <ellipse cx="103" cy="118" rx="8" ry="12" fill="${SKIN}"/>
    <ellipse cx="197" cy="118" rx="8" ry="12" fill="${SKIN}"/>
    <ellipse cx="103" cy="118" rx="4" ry="7" fill="${SKIN_D}" opacity=".6"/>
    <ellipse cx="197" cy="118" rx="4" ry="7" fill="${SKIN_D}" opacity=".6"/>
  `;
}

function faceSVG(mk){
  const lip = LIPS.find(l=>l.id===mk.lips);
  const eye = EYES.find(e=>e.id===mk.eyes);
  const bl  = BLUSH.find(b=>b.id===mk.blush);
  const ln  = LINERS.find(l=>l.id===mk.liner);
  
  // Suporte para a cor de olho personalizada (azul claro da foto)
  const irisColor = mk.eyeColor || '#4A2E1F'; 
  let s = '';

  if(bl){
    s += `<ellipse cx="117" cy="133" rx="14" ry="9" fill="${bl.color}" opacity=".42"/>
          <ellipse cx="183" cy="133" rx="14" ry="9" fill="${bl.color}" opacity=".42"/>`;
  }
  if(eye){
    s += `<ellipse cx="130" cy="105" rx="15" ry="10" fill="${eye.color}" opacity=".62"/>
          <ellipse cx="170" cy="105" rx="15" ry="10" fill="${eye.color}" opacity=".62"/>`;
  }
  
  // Olhos
  s += `<ellipse cx="130" cy="116" rx="12" ry="14" fill="#fff"/>
        <ellipse cx="170" cy="116" rx="12" ry="14" fill="#fff"/>
        <ellipse cx="130" cy="117" rx="8.5" ry="10.5" fill="${irisColor}"/>
        <ellipse cx="170" cy="117" rx="8.5" ry="10.5" fill="${irisColor}"/>
        <ellipse cx="130" cy="118" rx="4.4" ry="6" fill="#140C08"/>
        <ellipse cx="170" cy="118" rx="4.4" ry="6" fill="#140C08"/>
        <circle cx="126.5" cy="111" r="3.2" fill="#fff" opacity=".95"/>
        <circle cx="166.5" cy="111" r="3.2" fill="#fff" opacity=".95"/>
        <circle cx="133" cy="122" r="1.8" fill="#fff" opacity=".55"/>
        <circle cx="173" cy="122" r="1.8" fill="#fff" opacity=".55"/>`;

  // Delineado
  if(ln && ln.style === 'cat'){
    s += `<path d="M117 108 Q130 98 143 108 L149 103" stroke="${ln.color}" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M183 108 Q170 98 157 108 L151 103" stroke="${ln.color}" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else if(ln){
    s += `<path d="M117 109 Q130 99 143 109" stroke="${ln.color}" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M183 109 Q170 99 157 109" stroke="${ln.color}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  } else {
    s += `<path d="M118 109 Q130 100 142 109" stroke="#3A2418" stroke-width="2.4" fill="none" stroke-linecap="round"/>
          <path d="M182 109 Q170 100 158 109" stroke="#3A2418" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  }

  // Sobrancelhas
  s += `<path d="M117 92 Q130 86 142 91" stroke="#4A2E1F" stroke-width="3.4" fill="none" stroke-linecap="round"/>
        <path d="M183 92 Q170 86 158 91" stroke="#4A2E1F" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;

  // Nariz
  s += `<path d="M150 124 Q146 131 152 132" stroke="${SKIN_S}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;

  // Boca
  const lc = lip ? lip.color : '#E8637E';
  s += `<path d="M139 141 Q145 135 150 138 Q155 135 161 141 Q150 148 139 141 Z" fill="${lc}"/>`;
  s += `<path d="M140 141 Q150 143.5 160 141" stroke="rgba(0,0,0,.15)" stroke-width="1" fill="none"/>`;

  return s;
}

function clothesSVG(id){ return (CLOTHES.find(x=>x.id===id) || CLOTHES[0]).render(); }

function shoesSVG(id){
  const s = SHOES.find(x=>x.id===id) || SHOES[0];
  return shoeShape(s.style, s.color, 130) + shoeShape(s.style, s.color, 170);
}

function accessoriesSVG(ids){
  if(!Array.isArray(ids)) return '';
  return ids.map(id=>{
    const a = ACCESSORIES.find(x=>x.id===id);
    return a ? a.render() : '';
  }).join('');
}

function buildGigi(look){
  const hair = hairLayers(look.hair);
  const mk = look.makeup || {};
  return `<svg viewBox="0 0 300 480" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="150" cy="446" rx="66" ry="12" fill="#000" opacity=".22"/>
    ${hair.back}
    ${bodySVG()}
    ${neckSVG()}
    ${clothesSVG(look.clothes)}
    ${shoesSVG(look.shoes)}
    ${headSVG()}
    ${faceSVG(mk)}
    ${hair.front}
    ${accessoriesSVG(look.accessories)}
  </svg>`;
}

/* ============ MINIATURAS (CHIPS) ============ */
function chipFor(kind, item){
  if(kind === 'hair'){
    const st = HAIR_STYLES[item.style];
    return `<svg viewBox="70 28 160 200" xmlns="http://www.w3.org/2000/svg">${st.back(item.color)}${st.front(item.color)}</svg>`;
  }
  if(kind === 'clothes'){
    return `<svg viewBox="96 178 108 180" xmlns="http://www.w3.org/2000/svg">${item.render()}</svg>`;
  }
  if(kind === 'shoes'){
    return `<svg viewBox="104 380 92 72" xmlns="http://www.w3.org/2000/svg">
      ${shoeShape(item.style, item.color, 130)}${shoeShape(item.style, item.color, 170)}</svg>`;
  }
  if(kind === 'accessory'){
    const views = {
      a_necklace:'110 170 80 46', a_bow:'165 48 60 52', a_earrings:'88 112 124 40',
      a_sunglasses:'102 92 96 46', a_tiara:'100 36 100 56', a_pearl:'118 170 64 46',
      a_flower:'176 60 44 46', a_choker:'124 164 52 32', a_custom_glasses:'100 90 100 50'
    };
    return `<svg viewBox="${views[item.id]||'90 90 120 60'}" xmlns="http://www.w3.org/2000/svg">${item.render()}</svg>`;
  }
  return '';
}

function swatchChip(color){
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="34" fill="${color}"/>
    <circle cx="40" cy="38" r="10" fill="#fff" opacity=".35"/></svg>`;
}

/* ============ TELA DO CLOSET ============ */
let closetTab = 'hair';
const CLOSET_TABS = [
  { k:'hair', label:'Cabelo' },
  { k:'clothes', label:'Roupas' },
  { k:'shoes', label:'Sapatos' },
  { k:'accessories', label:'Acessórios' },
];

function renderCloset(){
  $('#closetPreview').innerHTML = buildGigi(state.look);
  
  // Renderiza as abas
  const tabs = $('#closetTabs');
  tabs.innerHTML = '';
  CLOSET_TABS.forEach(t=>{
    const b = el('button','tab' + (closetTab===t.k?' active':''), t.label);
    b.onclick = ()=>{ closetTab = t.k; sfxClick(); renderCloset(); };
    tabs.appendChild(b);
  });

  // Renderiza os itens
  const box = $('#closetItems');
  box.innerHTML = '';

  if(closetTab === 'hair'){
    HAIRS.forEach(h=>{
      const owned = state.inventory.hair.includes(h.id);
      const sel = state.look.hair === h.id;
      box.appendChild(makeItem(h, owned, sel, chipFor('hair',h), ()=>{
        state.look.hair = h.id; saveGame(); renderCloset(); sfxClick();
      }));
    });
  } else if(closetTab === 'clothes'){
    CLOTHES.forEach(c=>{
      const owned = state.inventory.clothes.includes(c.id);
      const sel = state.look.clothes === c.id;
      box.appendChild(makeItem(c, owned, sel, chipFor('clothes',c), ()=>{
        state.look.clothes = c.id; saveGame(); renderCloset(); sfxClick();
      }));
    });
  } else if(closetTab === 'shoes'){
    SHOES.forEach(s=>{
      const owned = state.inventory.shoes.includes(s.id);
      const sel = state.look.shoes === s.id;
      box.appendChild(makeItem(s, owned, sel, chipFor('shoes',s), ()=>{
        state.look.shoes = s.id; saveGame(); renderCloset(); sfxClick();
      }));
    });
  } else {
    ACCESSORIES.forEach(a=>{
      const owned = state.inventory.accessories.includes(a.id);
      const sel = state.look.accessories.includes(a.id);
      box.appendChild(makeItem(a, owned, sel, chipFor('accessory',a), ()=>{
        if(sel) state.look.accessories = state.look.accessories.filter(x=>x!==a.id);
        else state.look.accessories = [...state.look.accessories, a.id];
        saveGame(); renderCloset(); sfxClick();
      }));
    });
  }

  // Renderiza o Lookbook (se você adicionou a div no HTML)
  if(typeof renderLookbook === 'function') {
    renderLookbook();
  }
}

/* =========================================================
   NOVO: GIGI INTERATIVA (A BONECA FALA)
   ========================================================= */
function gigiTalk(text) {
  if (!('speechSynthesis' in window)) {
    toast('Seu navegador não suporta voz!', '⚠️');
    return;
  }
  
  // Cancela qualquer fala anterior
  window.speechSynthesis.cancel();
  
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'pt-BR';
  msg.pitch = 1.4; // Voz mais aguda e fofa
  msg.rate = 1.1;  // Um pouco mais rápido
  msg.volume = 1;
  
  window.speechSynthesis.speak(msg);
}

// Evento para clicar na Gigi
document.addEventListener('click', (e) => {
  // Verifica se o clique foi no palco do closet ou da beleza
  if(e.target.closest('#closetPreview') || e.target.closest('#beautyPreview')) {
    
    const frases = [
      "Eu amei esse look!",
      "Você tem muito estilo!",
      "Que tal combinarmos com um batom rosa?",
      "Eu me sinto uma princesa!",
      "Essa combinação ficou incrível!",
      "Vamos brilhar hoje!",
      "Preciso de mais acessórios mágicos!",
      "Adorei a escolha!",
      "Estou pronta para o desfile!",
      "O rosa é a minha cor favorita!"
    ];
    
    // Sorteia uma frase
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    gigiTalk(fraseAleatoria);
    
    // Efeito visual rápido de "pulinho"
    const preview = e.target.closest('.gigi-wrap');
    if(preview) {
      preview.style.transform = 'scale(1.05)';
      setTimeout(() => preview.style.transform = 'scale(1)', 200);
    }
  }
});

/* =========================================================
   EXTRAS: PHOTO BOOTH (Baixar Foto) e PASSARELA (Runway)
   ========================================================= */

// 1. Baixar Look (Photo Booth)
document.addEventListener('click', (e) => {
  if(e.target && e.target.id === 'btnDownload') {
    const svgEl = document.querySelector('#closetPreview svg');
    const svgString = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement('canvas');
    canvas.width = 800; 
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    // Fundo degradê para a foto ficar estilosa
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#2E1A2E');
    grad.addColorStop(1, '#171219');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      // Ajusta a Gigi no centro da imagem
      const scale = Math.min((canvas.width - 100) / 300, (canvas.height - 100) / 480);
      const x = (canvas.width - 300 * scale) / 2;
      const y = (canvas.height - 480 * scale) / 2 + 50;
      
      ctx.drawImage(img, x, y, 300 * scale, 480 * scale);
      
      // Adiciona marca d'água
      ctx.fillStyle = '#FFD83D';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Gigi Mundo Encantado', canvas.width / 2, canvas.height - 60);
      
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = 'minha-gigi.png';
      a.click();
      URL.revokeObjectURL(url);
      toast('Foto baixada com sucesso!', '📸');
    };
    img.src = url;
  }
});

// 2. Modo Passarela (Runway)
document.addEventListener('click', (e) => {
  if(e.target && e.target.id === 'btnRunway') {
    const overlay = el('div');
    overlay.id = 'runway-overlay';
    overlay.innerHTML = `
      <div class="runway-title">✨ Desfile Exclusivo ✨</div>
      <div class="runway-floor"></div>
      <div class="runway-gigi">${buildGigi(state.look)}</div>
      <div class="camera-flash" id="flash1"></div>
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => overlay.classList.add('active'), 50);
    sfxWin();
    
    const flashInterval = setInterval(() => {
      if(!overlay.classList.contains('active')) return;
      const flash = document.getElementById('flash1');
      flash.classList.remove('flash');
      void flash.offsetWidth; 
      flash.classList.add('flash');
      sfx(1200, 0.05, 'square', 0.02);
    }, 1200);
    
    overlay.onclick = () => {
      overlay.classList.remove('active');
      clearInterval(flashInterval);
      setTimeout(() => overlay.remove(), 500);
      toast('Que desfile incrível!', '👏');
    };
  }
});

/* =========================================================
   EXTRAS: LOOKBOOK (Salvar Looks Favoritos)
   ========================================================= */
function renderLookbook() {
  const container = document.getElementById('lookbookContainer');
  if(!container) return;
  container.innerHTML = '';

  // Cria 3 slots
  for(let i = 0; i < 3; i++) {
    const look = state.favLooks[i];
    const slot = document.createElement('button');
    slot.className = 'item';
    slot.style.width = '60px';
    slot.style.height = '80px';
    slot.style.aspectRatio = 'auto';

    if(look) {
      // Se tem look salvo, mostra o mini boneco
      slot.innerHTML = `<div class="thumb" style="padding:2px;">${buildGigi(look)}</div>`;
      slot.onclick = () => {
        state.look = JSON.parse(JSON.stringify(look)); // Clona o look
        saveGame();
        renderCloset();
        sfxClick();
        toast('Look carregado!', '👗');
        gigiTalk("Que bom que você gostou desse look!");
      };
    } else {
      // Slot vazio
      slot.innerHTML = `<div style="color:var(--txt-dim); font-size:1.5rem; display:grid; place-items:center; height:100%;">+</div>`;
      slot.style.opacity = '0.5';
      slot.onclick = () => toast('Salve um look para preencher!', '💾');
    }
    container.appendChild(slot);
  }
}

// Evento do botão salvar look
document.addEventListener('click', (e) => {
  if(e.target && e.target.id === 'saveLookBtn') {
    if(state.favLooks.length >= 3) {
      state.favLooks.shift(); 
    }
    state.favLooks.push(JSON.parse(JSON.stringify(state.look)));
    saveGame();
    renderLookbook();
    toast('Look salvo no Lookbook!', '💖');
    sfxWin();
    gigiTalk("Salvei esse look no meu coração!");
  }
});
