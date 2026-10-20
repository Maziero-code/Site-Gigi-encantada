/* ============ NAVEGAÇÃO E INICIALIZAÇÃO ============ */
let currentScreen = 'menu';

function go(screen){
  if(screen === currentScreen) return;
  if(typeof sfxClick === 'function') sfxClick();
  
  const cur = $('#screen-' + currentScreen);
  const nxt = $('#screen-' + screen);
  
  if(cur) cur.classList.remove('active');
  if(nxt) nxt.classList.add('active');
  
  currentScreen = screen;

  // Renderiza a tela que está sendo aberta
  if(screen === 'closet' && typeof renderCloset === 'function') renderCloset();
  if(screen === 'beauty' && typeof renderBeauty === 'function') renderBeauty();
  if(screen === 'room' && typeof renderRoomScreen === 'function') renderRoomScreen();
  if(screen === 'challenges' && typeof renderChallenges === 'function') renderChallenges();
  if(screen === 'shop' && typeof renderShop === 'function') renderShop();
  
  if(typeof syncStats === 'function') syncStats();
}

function init(){
  // Carrega o jogo salvo
  if(typeof loadGame === 'function') {
    const loaded = loadGame();
    if(loaded) state = loaded;
  }

  if(typeof syncStats === 'function') syncStats();

  // Configura os botões de navegação (Menu Principal)
  document.querySelectorAll('[data-go]').forEach(b => {
    b.onclick = () => go(b.dataset.go);
  });

  // Botão Salvar no Menu
  const btnSaveMenu = $('#btnSaveMenu');
  if(btnSaveMenu) {
    btnSaveMenu.onclick = () => { 
      saveGame(); 
      toast('Progresso salvo!', '💾'); 
      sfxClick(); 
    };
  }

  // Botão Recomeçar
  const btnReset = $('#btnReset');
  if(btnReset) {
    btnReset.onclick = () => {
      const bg = $('#modalBg'), box = $('#modalBox');
      bg.classList.add('on');
      box.innerHTML = `
        <h2>Recomeçar?</h2>
        <p class="desc">Todo o progresso será apagado: moedas, itens, looks, decoração e desafios. Esta ação não pode ser desfeita.</p>
        <div class="modal-actions">
          <button class="btn ghost" id="rNo">Cancelar</button>
          <button class="btn" id="rYes">Apagar tudo</button>
        </div>`;
      box.querySelector('#rNo').onclick = closeModal;
      box.querySelector('#rYes').onclick = () => {
        localStorage.removeItem(SAVE_KEY);
        state = defaultState();
        saveGame();
        syncStats();
        closeModal();
        toast('Novo jogo iniciado', '✨');
        go('menu');
      };
    };
  }

  // Fecha o modal ao clicar fora
  const modalBg = $('#modalBg');
  if(modalBg) {
    modalBg.addEventListener('click', (e) => { 
      if(e.target.id === 'modalBg') closeModal(); 
    });
  }

  // Fecha o modal com ESC
  document.addEventListener('keydown', (e) => { 
    if(e.key === 'Escape') closeModal(); 
  });

  // Salva automaticamente ao sair ou a cada 20 segundos
  window.addEventListener('beforeunload', saveGame);
  setInterval(saveGame, 20000);

  // Boas-vindas
  setTimeout(() => {
    if(!localStorage.getItem(SAVE_KEY)) {
      toast('Bem-vinda ao Gigi Mundo Encantado!', '✨');
    } else {
      toast('Bem-vinda de volta!', '💖');
    }
  }, 600);
}

// Inicia o jogo!
init();
