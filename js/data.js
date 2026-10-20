/* ============ PALETA DO PERSONAGEM ============ */
const SKIN = '#F6D2BC';
const SKIN_D = '#E5B79E';
const SKIN_S = '#D9A68B';

/* ============ HELPERS DE RENDER ============ */
function dressBody(color, hemY, hemW, neckY=206){
  return `<path d="M110 192 Q150 ${neckY} 190 192 L${150+hemW*0.32} 268 L${150+hemW} ${hemY} Q150 ${hemY+14} ${150-hemW} ${hemY} L${150-hemW*0.32} 268 Z" fill="${color}"/>`;
}
function topBody(color, hemY=252, hemW=46){
  return `<path d="M110 192 Q150 204 190 192 L${150+hemW} ${hemY} Q150 ${hemY+10} ${150-hemW} ${hemY} Z" fill="${color}"/>`;
}
function skirtShape(color, topY=240, hemY=330, hemW=78){
  return `<path d="M120 ${topY} L180 ${topY} L${150+hemW} ${hemY} Q150 ${hemY+14} ${150-hemW} ${hemY} Z" fill="${color}"/>`;
}
function sleeve(color, type){
  if(type==='none') return '';
  if(type==='short') return `<path d="M110 192 Q96 204 98 234 L116 230 Q114 206 122 196 Z" fill="${color}"/><path d="M190 192 Q204 204 202 234 L184 230 Q186 206 178 196 Z" fill="${color}"/>`;
  if(type==='long') return `<path d="M110 192 Q96 204 96 240 L100 296 L116 296 L114 240 Q114 208 122 196 Z" fill="${color}"/><path d="M190 192 Q204 204 204 240 L200 296 L184 296 L186 240 Q186 208 178 196 Z" fill="${color}"/>`;
  if(type==='puff') return `<ellipse cx="107" cy="212" rx="15" ry="20" fill="${color}"/><ellipse cx="193" cy="212" rx="15" ry="20" fill="${color}"/>`;
  return '';
}
function shoeShape(style, c, cx){
  if(style==='sneaker') return `<path d="M${cx-17} 420 Q${cx-21} 440 ${cx-11} 445 L${cx+11} 445 Q${cx+21} 440 ${cx+17} 420 Z" fill="${c}"/>
    <path d="M${cx-17} 434 L${cx+17} 434" stroke="#fff" stroke-width="3" opacity=".85"/>
    <path d="M${cx-6} 421 L${cx-6} 431 M${cx+2} 421 L${cx+2} 431" stroke="#fff" stroke-width="2" opacity=".7"/>`;
  if(style==='heel') return `<path d="M${cx-16} 418 Q${cx-20} 436 ${cx-13} 441 L${cx+13} 441 Q${cx+19} 435 ${cx+15} 418 Z" fill="${c}"/>
    <rect x="${cx-3}" y="441" width="5" height="13" rx="1.5" fill="${c}"/>`;
  if(style==='boot') return `<path d="M${cx-17} 388 L${cx+17} 388 L${cx+17} 439 Q${cx+17} 445 ${cx+9} 445 L${cx-17} 445 Z" fill="${c}"/>
    <path d="M${cx-17} 440 L${cx+17} 440" stroke="#000" stroke-width="3" opacity=".25"/>`;
  if(style==='sandal') return `<path d="M${cx-15} 437 Q${cx-18} 444 ${cx-9} 445 L${cx+14} 445 Q${cx+18} 440 ${cx+14} 435 Z" fill="${c}"/>
    <path d="M${cx-12} 437 Q${cx} 424 ${cx+12} 437" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  return `<ellipse cx="${cx}" cy="438" rx="16" ry="8" fill="${c}"/>`;
}

/* ============ CABELOS ============ */
const HAIRS = [
  { id:'h_long_brown', name:'Longo Castanho', color:'#6B4226', price:0, tags:['casual','natural','romantico'], style:'long' },
  { id:'h_wavy_black', name:'Ondas Negras', color:'#241C2B', price:120, tags:['elegante','glam','noite'], style:'wavy' },
  { id:'h_bob_pink', name:'Chanel Rosa', color:'#FF6FB5', price:0, tags:['fofo','casual','primavera'], style:'bob' },
  { id:'h_pony_blonde', name:'Rabo de Cavalo', color:'#E8C170', price:140, tags:['esportivo','praia','casual','leve'], style:'pony' },
  { id:'h_twin_purple', name:'Marias-Chiquinhas', color:'#A66DD4', price:180, tags:['fofo','magico','festa'], style:'twin' },
  { id:'h_curly_red', name:'Cachos Ruivos', color:'#C0392B', price:200, tags:['natural','festa','romantico','floral'], style:'curly' },
];

const HAIR_STYLES = {
  long: {
    back: c => `<path d="M150 40C96 40 88 86 88 120c0 40-4 120-8 200 10 14 28 12 32-6 6-56 8-116 10-156h56c2 40 4 100 10 156 4 18 22 20 32 6-4-80-8-160-8-200 0-34-8-80-62-80z" fill="${c}"/>`,
    front: c => `<path d="M150 40C100 40 94 84 94 116c2-24 14-42 32-48 8 14 16 20 24 20s16-6 24-20c18 6 30 24 32 48 0-32-6-76-56-76z" fill="${c}"/>`
  },
  wavy: {
    back: c => `<path d="M150 40C96 40 88 86 88 120c0 40-6 110-10 180 2 18 16 26 26 16 8-8 10-24 14-40 6-24 8-60 10-96h44c2 36 4 72 10 96 4 16 6 32 14 40 10 10 24 2 26-16-4-70-10-140-10-180 0-34-8-80-62-80z" fill="${c}"/>`,
    front: c => `<path d="M150 40C100 40 94 84 94 116c4-22 16-40 34-46 6 16 14 24 22 24s16-8 22-24c18 6 30 24 34 46 0-32-6-76-56-76z" fill="${c}"/>`
  },
  bob: {
    back: c => `<path d="M150 40C96 40 88 86 88 122c0 22 2 42 8 56 6 10 22 10 26-4 2-6 2-16 2-24h52c0 8 0 18 2 24 4 14 20 14 26 4 6-14 8-34 8-56 0-36-8-82-62-82z" fill="${c}"/>`,
    front: c => `<path d="M150 40C100 40 94 84 94 116c4-24 16-42 34-48 6 16 14 22 22 22s16-6 22-22c18 6 30 24 34 48 0-32-6-76-56-76z" fill="${c}"/>`
  },
  pony: {
    back: c => `<path d="M150 40C96 40 88 86 88 120c0 30-2 60-4 84 8 12 22 12 28 0 6-14 8-40 10-64h56c2 24 4 50 10 64 6 12 20 12 28 0-2-24-4-54-4-84 0-34-8-80-62-80z" fill="${c}"/>
      <path d="M196 128c22 12 34 44 30 82-2 22-14 34-26 30-10-4-8-22-4-40 6-26 4-50-4-66z" fill="${c}"/>`,
    front: c => `<path d="M150 40C100 40 94 84 94 116c2-20 10-38 26-46 10 10 20 16 30 16s20-6 30-16c16 8 24 26 26 46 0-32-6-76-56-76z" fill="${c}"/>`
  },
  twin: {
    back: c => `<path d="M150 40C96 40 88 86 88 122c0 20 2 38 6 50 8 10 22 8 24-6 2-10 2-22 2-30h60c0 8 0 20 2 30 2 14 16 16 24 6 4-12 6-30 6-50 0-36-8-82-62-82z" fill="${c}"/>
      <path d="M92 130c-18 20-26 54-20 86 4 20 18 28 28 20 8-6 4-24 0-42-6-24-6-46-8-64z" fill="${c}"/>
      <path d="M208 130c18 20 26 54 20 86-4 20-18 28-28 20-8-6-4-24 0-42 6-24 6-46 8-64z" fill="${c}"/>`,
    front: c => `<path d="M150 40C100 40 94 84 94 116c4-24 16-42 34-48 6 16 14 22 22 22s16-6 22-22c18 6 30 24 34 48 0-32-6-76-56-76z" fill="${c}"/>`
  },
  curly: {
    back: c => `<g fill="${c}">
      <circle cx="150" cy="60" r="48"/><circle cx="102" cy="96" r="26"/><circle cx="198" cy="96" r="26"/>
      <circle cx="94" cy="140" r="24"/><circle cx="206" cy="140" r="24"/><circle cx="98" cy="186" r="22"/>
      <circle cx="202" cy="186" r="22"/><circle cx="108" cy="228" r="20"/><circle cx="192" cy="228" r="20"/>
    </g>`,
    front: c => `<path d="M150 42C104 42 96 84 96 112c4-22 14-38 28-44 8 14 16 20 26 20s18-6 26-20c14 6 24 22 28 44 0-28-8-70-54-70z" fill="${c}"/>`
  }
};

/* ============ ROUPAS ============ */
const CLOTHES = [
  { id:'c_pink_dress', name:'Vestido Rosa', price:0, tags:['fofo','casual','primavera','romantico'],
    render:()=> dressBody('#FF3D96',330,86) + sleeve('#FF3D96','short') +
      `<path d="M118 194 Q150 210 182 194" stroke="#FF8FC4" stroke-width="2.5" fill="none"/>` },
  { id:'c_floral', name:'Vestido Floral', price:0, tags:['floral','primavera','romantico','natural'],
    render:()=> dressBody('#FFF4F8',336,88) + sleeve('#FFF4F8','puff') +
      [[128,230],[158,248],[140,290],[168,300],[124,310],[152,214]].map(([x,y])=>
        `<g transform="translate(${x} ${y})"><circle r="4" fill="#FF7FBB"/><circle r="1.8" fill="#FFD83D"/></g>`).join('') },
  { id:'c_black_dress', name:'Preto Elegante', price:0, tags:['elegante','noite','glam'],
    render:()=> dressBody('#1C1420',392,88) + sleeve('#1C1420','none') +
      `<path d="M132 196 Q150 212 168 196" stroke="#FFD83D" stroke-width="2" fill="none" opacity=".8"/>
       <path d="M150 240 L150 300" stroke="#2E2436" stroke-width="2" opacity=".6"/>` },
  { id:'c_jeans', name:'Camiseta + Jeans', price:0, tags:['casual','praia','leve','verao'],
    render:()=> topBody('#FFFFFF',256,48) + sleeve('#FFFFFF','short') +
      `<path d="M124 248 L176 248 L172 296 L152 296 L150 262 L148 296 L128 296 Z" fill="#4A7DB5"/>
       <rect x="122" y="244" width="56" height="8" rx="3" fill="#3A66A0"/>
       <path d="M118 194 Q150 208 182 194" stroke="#E8E8F0" stroke-width="2.5" fill="none"/>` },
  { id:'c_sundress', name:'Vestido Azul Céu', price:0, tags:['leve','verao','romantico','praia'],
    render:()=> dressBody('#8FD3F0',324,80) + sleeve('#8FD3F0','none') +
      `<path d="M124 192 Q150 180 176 192" stroke="#FFFFFF" stroke-width="3" fill="none"/>
       <path d="M112 194 L150 176 L188 194" stroke="#FFFFFF" stroke-width="2.5" fill="none" opacity=".8"/>` },
  { id:'c_skirt', name:'Blusa + Saia', price:0, tags:['fofo','casual','primavera'],
    render:()=> topBody('#FFE0EF',244,48) + sleeve('#FFE0EF','short') +
      skirtShape('#FF7FBB',238,326,82) +
      `<path d="M126 240 L174 240" stroke="#FFB8D8" stroke-width="2"/>
       <path d="M136 250 L136 320 M150 250 L150 322 M164 250 L164 320" stroke="#FFB8D8" stroke-width="1.5" opacity=".7"/>` },
  { id:'c_gold_gown', name:'Vestido Dourado', price:300, tags:['elegante','dourado','glam','noite','festa'],
    render:()=> dressBody('#FFD83D',400,90) + sleeve('#FFD83D','none') +
      `<path d="M150 200 L150 396" stroke="#E0B520" stroke-width="2" opacity=".6"/>
       <path d="M136 196 Q150 214 164 196" stroke="#FFF3B8" stroke-width="2.5" fill="none"/>` },
  { id:'c_star_dress', name:'Vestido Estrelado', price:350, tags:['magico','estrelado','noite','elegante'],
    render:()=> dressBody('#1E1B45',396,90) + sleeve('#1E1B45','none') +
      [[130,230],[164,260],[140,300],[170,330],[126,350],[156,378]].map(([x,y])=>
        `<path d="${starPath(x,y,6)}" fill="#FFD83D" opacity=".9"/>`).join('') },
  { id:'c_overall', name:'Macacão Jeans', price:200, tags:['casual','praia','leve','verao'],
    render:()=> `<path d="M118 196 Q150 186 182 196 L186 250 L176 250 L180 320 L156 320 L150 254 L144 320 L120 320 L124 250 L114 250 Z" fill="#4A7DB5"/>
       <path d="M126 196 L126 214 M174 196 L174 214" stroke="#3A66A0" stroke-width="3"/>
       <circle cx="126" cy="212" r="3" fill="#FFD83D"/><circle cx="174" cy="212" r="3" fill="#FFD83D"/>
       <rect x="128" y="240" width="44" height="22" rx="3" fill="#3A66A0" opacity=".6"/>` },
  { id:'c_tutu', name:'Tutu Pastel', price:250, tags:['fofo','magico','festa','colorido','primavera'],
    render:()=> topBody('#FFD1E8',240,44) + sleeve('#FFD1E8','puff') +
      `<ellipse cx="150" cy="270" rx="86" ry="34" fill="#FFB8D8"/>
       <ellipse cx="150" cy="264" rx="78" ry="28" fill="#FFE0EF"/>
       <ellipse cx="150" cy="300" rx="70" ry="24" fill="#FFC7E0"/>
       <ellipse cx="150" cy="294" rx="62" ry="18" fill="#FFF0F7"/>` },
  { id:'c_red_party', name:'Vermelho Festa', price:280, tags:['festa','glam','romantico','noite'],
    render:()=> dressBody('#D6203F',340,84) + sleeve('#D6203F','none') +
      `<path d="M124 192 Q150 178 176 192" stroke="#FF8F9E" stroke-width="2.5" fill="none"/>
       <path d="M150 250 L150 330" stroke="#B01833" stroke-width="2" opacity=".5"/>` },
  { id:'c_sport', name:'Conjunto Esportivo', price:180, tags:['esportivo','casual','praia','leve'],
    render:()=> topBody('#FF3D96',248,48) + sleeve('#FF3D96','short') +
      `<path d="M124 244 L176 244 L172 300 L152 300 L150 264 L148 300 L128 300 Z" fill="#171219"/>
       <path d="M126 246 L174 246" stroke="#FFD83D" stroke-width="3"/>
       <path d="M110 196 L192 196" stroke="#FFD83D" stroke-width="2.5" opacity=".8"/>` },
];

/* ============ SAPATOS ============ */
const SHOES = [
  { id:'s_sneaker', name:'Tênis Branco', price:0, tags:['casual','esportivo','praia','leve'], style:'sneaker', color:'#FFFFFF' },
  { id:'s_sandal', name:'Sandália Dourada', price:0, tags:['dourado','elegante','verao','praia'], style:'sandal', color:'#FFD83D' },
  { id:'s_flat', name:'Sapatilha Rosa', price:0, tags:['fofo','casual','romantico','primavera'], style:'flat', color:'#FF7FBB' },
  { id:'s_heel_black', name:'Salto Preto', price:150, tags:['elegante','glam','noite'], style:'heel', color:'#1C1420' },
  { id:'s_boot', name:'Bota Preta', price:160, tags:['glam','noite','casual','esportivo'], style:'boot', color:'#2E2436' },
];

/* ============ ACESSÓRIOS ============ */
const ACCESSORIES = [
  { id:'a_necklace', name:'Colar Dourado', price:0, tags:['dourado','elegante','glam'],
    render:()=> `<path d="M133 188 Q150 208 167 188" stroke="#FFD83D" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="150" cy="204" r="4.5" fill="#FFD83D"/><circle cx="150" cy="204" r="2" fill="#FFF3B8"/>` },
  { id:'a_bow', name:'Laço Rosa', price:0, tags:['fofo','primavera','romantico'],
    render:()=> `<g transform="translate(193 72)">
      <path d="M0 0 C-16 -10 -20 10 0 7 C20 10 16 -10 0 0 Z" fill="#FF3D96"/>
      <path d="M0 0 C-14 -6 -16 8 0 6 C16 8 14 -6 0 0 Z" fill="#FF7FBB"/>
      <circle r="4" fill="#FF3D96"/></g>` },
  { id:'a_earrings', name:'Brincos Estrela', price:0, tags:['magico','estrelado','fofo'],
    render:()=> `<path d="${starPath(103,133,6)}" fill="#FFD83D"/><path d="${starPath(197,133,6)}" fill="#FFD83D"/>` },
  { id:'a_sunglasses', name:'Óculos de Sol', price:0, tags:['praia','verao','casual'],
    render:()=> `<rect x="113" y="105" width="32" height="20" rx="9" fill="#171219" opacity=".88"/>
      <rect x="155" y="105" width="32" height="20" rx="9" fill="#171219" opacity=".88"/>
      <path d="M145 113 h10" stroke="#171219" stroke-width="3.5"/>
      <path d="M117 109 l6 -3" stroke="#fff" stroke-width="2" opacity=".4"/>` },
  { id:'a_tiara', name:'Tiara Mágica', price:120, tags:['magico','elegante','festa','estrelado'],
    render:()=> `<path d="M112 68 Q150 44 188 68" stroke="#FFD83D" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="${starPath(150,52,9)}" fill="#FFD83D"/>
      <circle cx="150" cy="52" r="3.5" fill="#FF3D96"/>` },
  { id:'a_pearl', name:'Colar de Pérolas', price:140, tags:['elegante','romantico','fofo'],
    render:()=> `<path d="M133 188 Q150 208 167 188" stroke="#F5EFE6" stroke-width="4" fill="none"
      stroke-dasharray="1 5.5" stroke-linecap="round"/>` },
  { id:'a_flower', name:'Presilha de Flor', price:100, tags:['floral','primavera','natural','fofo'],
    render:()=> `<g transform="translate(196 82)">
      ${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-8" rx="4.5" ry="8" fill="#FF7FBB" transform="rotate(${a})"/>`).join('')}
      <circle r="4" fill="#FFD83D"/></g>` },
  { id:'a_choker', name:'Gargantilha', price:110, tags:['glam','noite','elegante'],
    render:()=> `<path d="M137 176 Q150 186 163 176" stroke="#171219" stroke-width="5" fill="none" stroke-linecap="round"/>
      <circle cx="150" cy="184" r="3" fill="#FF3D96"/>` },
];

/* ============ MAQUIAGEM ============ */
const LIPS = [
  { id:'lip_rose', name:'Rosa', color:'#E8637E', price:0, tags:['fofo','romantico','primavera'] },
  { id:'lip_red', name:'Vermelho', color:'#D6203F', price:0, tags:['glam','festa','noite'] },
  { id:'lip_nude', name:'Nude', color:'#C98B7A', price:0, tags:['natural','casual','leve'] },
  { id:'lip_purple', name:'Roxo', color:'#8E44AD', price:80, tags:['magico','glam','noite','estrelado'] },
];
const EYES = [
  { id:'eye_rose', name:'Sombra Rosa', color:'#FF7FBB', price:0, tags:['fofo','romantico','primavera'] },
  { id:'eye_blue', name:'Sombra Azul', color:'#5B8FD4', price:0, tags:['magico','noite','estrelado','leve'] },
  { id:'eye_gold', name:'Sombra Dourada', color:'#FFD83D', price:0, tags:['dourado','glam','elegante','festa'] },
];
const BLUSH = [
  { id:'bl_rose', name:'Blush Rosa', color:'#FF6FA5', price:0, tags:['fofo','romantico','primavera'] },
  { id:'bl_peach', name:'Blush Pêssego', color:'#FF9E7A', price:0, tags:['natural','leve','verao'] },
  { id:'bl_coral', name:'Blush Coral', color:'#FF6B5B', price:0, tags:['verao','praia','colorido'] },
];
const LINERS = [
  { id:'ln_classic', name:'Delineado Clássico', color:'#171219', style:'classic', price:0, tags:['elegante','casual'] },
  { id:'ln_cat', name:'Delineado Gatinho', color:'#171219', style:'cat', price:0, tags:['glam','festa','noite'] },
];

/* ============ MÓVEIS ============ */
const FURNITURE = [
  { id:'f_bed', name:'Cama', price:0, tags:['casual','fofo','conforto'], w:34, h:26, def:{x:28,y:88},
    svg:`<svg viewBox="0 0 100 100"><rect x="6" y="42" width="88" height="34" rx="6" fill="#C99BE8"/><rect x="6" y="30" width="88" height="16" rx="8" fill="#E7C9F7"/><rect x="10" y="20" width="28" height="16" rx="7" fill="#fff"/><rect x="6" y="76" width="7" height="12" rx="2" fill="#8B6BA8"/><rect x="87" y="76" width="7" height="12" rx="2" fill="#8B6BA8"/><rect x="20" y="50" width="60" height="5" rx="2" fill="#B98BD9" opacity=".6"/></svg>` },
  { id:'f_rug', name:'Tapete', price:0, tags:['fofo','conforto','romantico'], w:30, h:12, def:{x:62,y:96},
    svg:`<svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="47" ry="46" fill="#FF7FBB" opacity=".85"/><ellipse cx="50" cy="50" rx="32" ry="30" fill="#FFD83D" opacity=".55"/><ellipse cx="50" cy="50" rx="16" ry="14" fill="#FF7FBB" opacity=".8"/></svg>` },
  { id:'f_plant', name:'Planta', price:0, tags:['natural','primavera','jardim','floral'], w:13, h:22, def:{x:14,y:92},
    svg:`<svg viewBox="0 0 100 100"><path d="M50 62 L40 96 L60 96 Z" fill="#C77B4A"/><rect x="36" y="58" width="28" height="8" rx="3" fill="#A8632F"/><ellipse cx="50" cy="42" rx="17" ry="22" fill="#4CAF6E"/><ellipse cx="34" cy="52" rx="12" ry="16" fill="#3E9B5E"/><ellipse cx="66" cy="52" rx="12" ry="16" fill="#3E9B5E"/><ellipse cx="50" cy="24" rx="10" ry="14" fill="#5CC47E"/></svg>` },
  { id:'f_lamp', name:'Abajur', price:0, tags:['conforto','noite','aconchegante'], w:11, h:22, def:{x:86,y:92},
    svg:`<svg viewBox="0 0 100 100"><path d="M50 16 L28 56 L72 56 Z" fill="#FFD83D"/><path d="M50 16 L28 56 L72 56 Z" fill="none" stroke="#E0B520" stroke-width="2"/><rect x="46" y="56" width="8" height="32" fill="#B08A3E"/><ellipse cx="50" cy="90" rx="18" ry="5" fill="#B08A3E"/></svg>` },
  { id:'f_table', name:'Mesinha', price:0, tags:['casual','arte','conforto'], w:16, h:16, def:{x:44,y:92},
    svg:`<svg viewBox="0 0 100 100"><rect x="8" y="34" width="84" height="11" rx="4" fill="#C77B4A"/><rect x="8" y="34" width="84" height="4" rx="2" fill="#DDA271"/><rect x="17" y="45" width="8" height="42" rx="2" fill="#A8632F"/><rect x="75" y="45" width="8" height="42" rx="2" fill="#A8632F"/></svg>` },
  { id:'f_painting', name:'Quadro', price:0, tags:['elegante','arte','romantico'], w:16, h:15, def:{x:50,y:44},
    svg:`<svg viewBox="0 0 100 100"><rect x="4" y="6" width="92" height="88" rx="4" fill="#FFD83D"/><rect x="12" y="14" width="76" height="72" fill="#FFF8E6"/><circle cx="50" cy="40" r="15" fill="#FF3D96"/><path d="M12 86 L36 56 L56 78 L70 62 L88 86 Z" fill="#4CAF6E"/></svg>` },
  { id:'f_lights', name:'Varal de Luzes', price:180, tags:['magico','festa','noite','aconchegante'], w:44, h:12, def:{x:50,y:20},
    svg:`<svg viewBox="0 0 100 100"><path d="M2 22 Q26 62 50 34 T98 40" stroke="#B08A3E" stroke-width="2.5" fill="none"/><circle cx="18" cy="42" r="6" fill="#FFD83D"/><circle cx="50" cy="35" r="6" fill="#FF3D96"/><circle cx="80" cy="37" r="6" fill="#FFD83D"/><circle cx="34" cy="45" r="3.5" fill="#FF7FBB"/><circle cx="66" cy="38" r="3.5" fill="#FF7FBB"/></svg>` },
  { id:'f_mirror', name:'Espelho', price:150, tags:['elegante','glam','arte'], w:13, h:24, def:{x:88,y:72},
    svg:`<svg viewBox="0 0 100 100"><ellipse cx="50" cy="42" rx="33" ry="38" fill="#FFD83D"/><ellipse cx="50" cy="42" rx="26" ry="31" fill="#CFEAF5"/><path d="M34 30 Q46 22 58 34" stroke="#fff" stroke-width="5" fill="none" opacity=".75" stroke-linecap="round"/><rect x="43" y="80" width="14" height="16" rx="3" fill="#B08A3E"/></svg>` },
  { id:'f_shelf', name:'Estante', price:130, tags:['casual','arte','conforto'], w:16, h:26, def:{x:12,y:74},
    svg:`<svg viewBox="0 0 100 100"><rect x="8" y="8" width="84" height="84" rx="4" fill="#C77B4A"/><rect x="14" y="52" width="72" height="6" fill="#8B5A2B"/><rect x="14" y="86" width="72" height="6" fill="#8B5A2B"/><rect x="18" y="24" width="10" height="28" fill="#FF3D96"/><rect x="30" y="30" width="10" height="22" fill="#FFD83D"/><rect x="42" y="22" width="10" height="30" fill="#4CAF6E"/><rect x="56" y="60" width="20" height="24" fill="#FF7FBB"/></svg>` },
  { id:'f_armchair', name:'Poltrona', price:160, tags:['elegante','conforto','glam'], w:17, h:20, def:{x:76,y:92},
    svg:`<svg viewBox="0 0 100 100"><rect x="22" y="18" width="56" height="42" rx="12" fill="#FF3D96"/><rect x="14" y="50" width="72" height="20" rx="9" fill="#FF5BA8"/><rect x="18" y="70" width="9" height="22" rx="2" fill="#8B6BA8"/><rect x="73" y="70" width="9" height="22" rx="2" fill="#8B6BA8"/><rect x="30" y="26" width="40" height="8" rx="4" fill="#FF7FBB" opacity=".6"/></svg>` },
  { id:'f_teddy', name:'Ursinho', price:100, tags:['fofo','romantico','conforto'], w:11, h:15, def:{x:30,y:92},
    svg:`<svg viewBox="0 0 100 100"><circle cx="28" cy="24" r="13" fill="#C77B4A"/><circle cx="72" cy="24" r="13" fill="#C77B4A"/><circle cx="50" cy="36" r="24" fill="#D9945E"/><ellipse cx="50" cy="80" rx="30" ry="22" fill="#D9945E"/><circle cx="41" cy="32" r="4" fill="#171219"/><circle cx="59" cy="32" r="4" fill="#171219"/><ellipse cx="50" cy="44" rx="6" ry="4.5" fill="#171219"/><ellipse cx="50" cy="82" rx="14" ry="10" fill="#E8B48A"/></svg>` },
  { id:'f_cushion', name:'Almofada', price:120, tags:['fofo','conforto','romantico'], w:11, h:9, def:{x:40,y:92},
    svg:`<svg viewBox="0 0 100 100"><rect x="8" y="18" width="84" height="64" rx="20" fill="#FF7FBB"/><circle cx="50" cy="50" r="14" fill="#FFD83D" opacity=".65"/><circle cx="50" cy="50" r="7" fill="#FF3D96" opacity=".5"/></svg>` },
];

/* ============ PAPEL DE PAREDE / PISO ============ */
const WALLPAPERS = [
  { id:'wp_pink', name:'Rosa Suave', price:0, tags:['fofo','romantico'],
    css:'linear-gradient(160deg,#FFE0EF,#FFC7E0)' },
  { id:'wp_star', name:'Noite Estrelada', price:0, tags:['magico','noite','estrelado'],
    css:'radial-gradient(circle at 20% 25%, rgba(255,216,61,.5) 0 1.5px, transparent 2px), radial-gradient(circle at 70% 55%, rgba(255,255,255,.5) 0 1.5px, transparent 2px), radial-gradient(circle at 45% 80%, rgba(255,61,150,.5) 0 1.5px, transparent 2px), radial-gradient(circle at 85% 15%, rgba(255,216,61,.4) 0 1.5px, transparent 2px), linear-gradient(160deg,#3A2A55,#171219)' },
  { id:'wp_floral', name:'Jardim Florido', price:0, tags:['floral','primavera','natural'],
    css:'radial-gradient(circle at 18% 26%, #FF7FBB 0 8px, transparent 9px), radial-gradient(circle at 72% 62%, #FF9ECB 0 7px, transparent 8px), radial-gradient(circle at 42% 84%, #FF7FBB 0 6px, transparent 7px), radial-gradient(circle at 88% 22%, #FFB8D8 0 6px, transparent 7px), linear-gradient(160deg,#FFEFF6,#FFD9EA)' },
  { id:'wp_sky', name:'Céu Azul', price:0, tags:['leve','praia','verao'],
    css:'radial-gradient(circle at 30% 20%, #fff 0 26px, transparent 27px), radial-gradient(circle at 70% 40%, #fff 0 20px, transparent 21px), radial-gradient(circle at 20% 70%, #fff 0 18px, transparent 19px), linear-gradient(180deg,#9FDDF5,#DCF2FB)' },
];
const FLOORS = [
  { id:'fl_wood', name:'Madeira', price:0, tags:['natural','conforto','casual'],
    css:'repeating-linear-gradient(90deg,#C9915E 0 46px,#B87F4E 46px 48px)' },
  { id:'fl_marble', name:'Mármore', price:0, tags:['elegante','glam'],
    css:'linear-gradient(135deg,#F6F2EE 0%,#E4DEDA 48%,#F8F5F2 100%)' },
  { id:'fl_carpet', name:'Carpete Rosa', price:0, tags:['fofo','romantico','conforto'],
    css:'repeating-linear-gradient(45deg,#FFB8D8 0 12px,#FFAAD0 12px 24px)' },
  { id:'fl_sand', name:'Areia', price:0, tags:['praia','verao','natural'],
    css:'radial-gradient(circle at 20% 30%, #E8D3AE 0 2px, transparent 3px), radial-gradient(circle at 70% 60%, #E8D3AE 0 2px, transparent 3px), #F0DFC0' },
];

/* ============ DESAFIOS ============ */
const CHALLENGES = [
  { id:'ch_jardim', name:'Encontro no Jardim', emoji:'🌷', color:'#4CAF6E',
    desc:'Um passeio tranquilo entre flores. Aposte no natural e romântico.',
    tags:['natural','primavera','romantico','floral'] },
  { id:'ch_lua', name:'Princesa da Lua', emoji:'🌙', color:'#5B8FD4',
    desc:'Magia noturna e elegância estrelada. Brilhe como a lua.',
    tags:['magico','elegante','noite','estrelado'] },
  { id:'ch_primavera', name:'Festa de Primavera', emoji:'🌸', color:'#FF7FBB',
    desc:'Cores, flores e fofura. Celebre a estação mais doce.',
    tags:['primavera','floral','fofo','colorido'] },
  { id:'ch_gala', name:'Noite de Gala', emoji:'✨', color:'#FFD83D',
    desc:'Tudo o que brilha. Glamour, dourado e muito estilo.',
    tags:['elegante','glam','noite','dourado'] },
  { id:'ch_praia', name:'Dia de Praia', emoji:'🌊', color:'#4FC3E8',
    desc:'Leveza, sol e brisa. Um look fresquinho para o mar.',
    tags:['praia','casual','verao','leve'] },
];
