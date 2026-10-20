# Gigi Mundo Encantado

Jogo de navegador de moda, maquiagem, decoração e desafios criativos feito com HTML, CSS e JavaScript puro.

## Identidade visual

- Rosa: `#FF3D96`
- Preto ameixa: `#171219`
- Amarelo dourado: `#FFD83D`

## Funcionalidades incluídas no protótipo

- Menu principal e navegação entre telas.
- Closet com seleção de roupas, cabelos, sapatos e acessórios.
- Beauty Lab com opções de batom, sombra e blush.
- Dream Room com itens decorativos que podem ser adicionados e removidos.
- Desafios com recompensas em moedas e estrelas.
- Loja com desbloqueio de itens.
- Salvamento local do progresso com LocalStorage.
- Mensagens toast, modal de recompensa e confetes.
- Layout responsivo para telas menores.

## Como executar

1. Baixe ou extraia a pasta do projeto.
2. Abra `index.html` no navegador.
3. Para desenvolvimento, recomenda-se usar a extensão Live Server do Visual Studio Code.

O projeto não exige instalação de dependências ou servidor para o protótipo inicial.

## Estrutura

- `index.html`: estrutura das telas.
- `css/style.css`: identidade visual e estilos.
- `css/responsive.css`: adaptação para telas menores.
- `js/utils.js`: toast, modal, confetes e utilitários.
- `js/data.js`: catálogo inicial de itens e desafios.
- `js/storage.js`: leitura e gravação no LocalStorage.
- `js/state.js`: estado do jogo, inventário e moedas.
- `js/wardrobe.js`: closet e personagem.
- `js/makeup.js`: maquiagem.
- `js/decoration.js`: decoração do quarto.
- `js/challenges.js`: desafios e recompensas.
- `js/shop.js`: loja.
- `js/main.js`: inicialização e navegação.

## Observações

- As imagens da personagem no protótipo são formas CSS ilustrativas. Para uma versão final, substitua-as por ilustrações próprias em PNG transparente ou SVG.
- O progresso é salvo apenas no navegador e dispositivo atuais.
- A avaliação dos desafios é demonstrativa nesta versão inicial.
- A decoração usa posições aleatórias simples; arrastar e soltar pode ser adicionado posteriormente.
- A fonte do Google Fonts requer conexão com a internet; o jogo possui fontes alternativas caso não carregue.
