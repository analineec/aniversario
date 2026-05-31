# 💾 LOVE.EXE — Guia de Personalização ♡

Parabéns! O site da Lucilly está pronto. Aqui está como personalizar cada detalhe.

---

## 📁 Estrutura de Arquivos

```
love-exe/
├── index.html       ← estrutura do site
├── style.css        ← visual e cores
├── app.js           ← lógica e interações
└── assets/
    ├── img/
    │   ├── mem1.jpg  ← foto 1 (Floresta das Memórias)
    │   ├── mem2.jpg  ← foto 2
    │   └── mem3.jpg  ← foto 3
    └── audio/
        ├── musica.mp3  ← música da Pitty (ou outra)
        ├── click.mp3   ← som de clique (opcional)
        ├── success.mp3 ← som de senha correta (opcional)
        └── error.mp3   ← som de erro (opcional)
```

> **Nota:** Se os arquivos de áudio não existirem, o site gera sons retrô automaticamente via Web Audio API. Os sons são fofos e funcionam sem nenhum arquivo! 🎵

---

## 🖼️ Adicionando Fotos (8 fotos)

1. Coloque as fotos na pasta `assets/img/`
2. Renomeie para `mem1.jpg`, `mem2.jpg`, ..., `mem8.jpg`
3. Formatos aceitos: `.jpg`, `.jpeg`, `.png`, `.webp`

## 🎵 Adicionando as Músicas (3 músicas)

1. Coloque os arquivos em `assets/audio/`
2. Renomeie para `musica1.mp3`, `musica2.mp3`, `musica3.mp3`
3. Para mudar os nomes que aparecem na tela, abra `app.js` e edite:
```javascript
const playlist = [
  { file: 'assets/audio/musica1.mp3', name: 'O Mundo Acaba Hoje', artist: 'Pitty ♡' },
  { file: 'assets/audio/musica2.mp3', name: 'Música 2', artist: 'para você ♡' },
  { file: 'assets/audio/musica3.mp3', name: 'Música 3', artist: 'para você ♡' },
];
```

---

## 💌 Personalizando a Carta (Casa 🏠)

Abra `app.js` e procure por:
```javascript
const lines = [
  'Feliz 26 anos pra minha pessoa favorita.',
  '',
  '8 anos depois… e você ainda continua',
  ...
];
```
Edite as linhas como quiser. Linhas vazias (`''`) viram espaços.

---

## ⭐ Mensagens do Céu

Abra `app.js` e procure por:
```javascript
const starMessages = [
  'obrigada por nunca desistir da gente ♡',
  ...
];
```
Você pode mudar qualquer mensagem.

---

## 🔐 Mudando a Senha

Abra `app.js` e procure por:
```javascript
const SENHA = 'baunilha';
```
Troque por outra palavra especial para vocês!

---

## 🎨 Mudando as Cores

Abra `style.css` e edite as variáveis no topo:
```css
:root {
  --pink:      #ffb3d1;   /* rosa principal */
  --lilac:     #d4b8e0;   /* lilás */
  --cream:     #fff5e6;   /* creme */
  --bg:        #0d0a14;   /* fundo escuro */
}
```

---

## 🌐 Como Hospedar

### Opção 1 — Netlify Drop (gratuito, mais fácil)
1. Acesse https://netlify.com/drop
2. Arraste a pasta `love-exe/` inteira
3. Receba um link para enviar para a Lucilly!

### Opção 2 — GitHub Pages (gratuito)
1. Crie um repositório no GitHub
2. Suba os arquivos
3. Ative GitHub Pages nas configurações

### Opção 3 — Abrir local
Só abrir o `index.html` no navegador. 
(Áudios podem não funcionar localmente por restrições de segurança — use um servidor simples)

```bash
# Se tiver Python:
cd love-exe
python -m http.server 8080
# Acesse: http://localhost:8080
```

---

## 🥚 Easter Eggs Incluídos

- **Konami Code** no teclado: ↑↑↓↓←→←→BA → mensagem secreta
- **Céu**: 6 estrelas escondidas com mensagens
- **Floresta**: fotos desbloqueáveis ao clicar
- **Lago**: mensagem final surpresa após clicar em "Sim ♡"

---

## ❤️ Feito com amor

Este site foi criado especialmente para o aniversário da Lucilly.
Cada pixel foi pensado com carinho. ♡
